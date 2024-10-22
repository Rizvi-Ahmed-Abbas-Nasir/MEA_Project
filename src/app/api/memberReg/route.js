import { NextResponse } from "next/server";
import executeQuery from "../../lib/db";
import bcrypt from "bcrypt";
import { isApiValid, generateUniqueFileName } from "../../lib/functions";
import path from "path";
import { writeFile } from "fs/promises";

// Helper function to check if the user exists
async function userExists(email) {
  const query = "SELECT email FROM members WHERE email = ?;";
  const values = [email];
  const result = await executeQuery({ query, values });
  return result.length > 0;
}

// Helper function to check if the user is already registered
async function isAlreadyRegistered(email) {
  const query = "SELECT email FROM memberReg WHERE email = ?;";
  const values = [email];
  const result = await executeQuery({ query, values });
  return result.length > 0;
}

// Helper function to validate employee ID
async function isValidEmployeeCode(employee_id) {
  const query = "SELECT employee_id FROM employee_codes WHERE employee_id = ?;";
  const values = [employee_id];
  const result = await executeQuery({ query, values });
  return result.length > 0;
}

// Helper function to save file
async function saveFile(file, directory) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.replaceAll(" ", "_");
  const uniqueFileName = await generateUniqueFileName(directory, fileName);
  await writeFile(path.join(directory, uniqueFileName), buffer);
  return uniqueFileName;
}

export async function POST(req) {
  try {
    const apiKey = await req.headers.get("authorization");
    if (!isApiValid(apiKey)) return NextResponse.json("Unauthorized", { status: 401 });

    const formData = await req.formData();
    const { fullName, email, employee_id, contactNumber, designation, password } = Object.fromEntries(formData);

    // Check if email is already a member
    if (await userExists(email)) {
      return NextResponse.json({ message: "The associated email is already a member" }, { status: 400 });
    }

    // Check if email is already registered
    if (await isAlreadyRegistered(email)) {
      return NextResponse.json({ message: "Already Registered" }, { status: 400 });
    }

    // Validate employee ID
    if (!await isValidEmployeeCode(employee_id)) {
      return NextResponse.json({ message: "Incorrect Employee Code" }, { status: 400 });
    }

    // Access files from formData
    const bmcLetter = formData.get("bmcLetter");
    const bmcLetter50 = formData.get("bmcLetter50");

    // Check if files are provided
    if (!bmcLetter || !bmcLetter50) {
      return NextResponse.json({ error: "Both files are required" }, { status: 400 });
    }

    // Save files
    const bmcLetterFileName = await saveFile(bmcLetter, path.join(process.cwd(), "src/form/form_empty"));
    const bmcLetter50FileName = await saveFile(bmcLetter50, path.join(process.cwd(), "src/form/form_50"));

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert member registration details
    const query = "INSERT INTO memberReg (fullName, email, employee_id, contactNumber, designation, password, bmcLetter, bmcLetter50) values(?,?,?,?,?,?,?,?)";
    const values = [fullName, email, employee_id, contactNumber, designation, hashedPassword, bmcLetterFileName, bmcLetter50FileName];
    const result = await executeQuery({ query, values });

    if (result?.affectedRows == 1) {
      return NextResponse.json({ message: "Successfully registered!" }, { status: 201 });
    } else {
      // console.log("RESULT: ",result)
      // console.log("GOT: " , result.error.code)
      if (result?.error.code === 'ER_DUP_ENTRY' && result.error?.sqlMessage.includes('employee_id_UNIQUE')) {
        return NextResponse.json({ message: "Employee code has already registered" }, { status: 400 });
      } else {
        return NextResponse.json({ message: "Error during registration" }, { status: 500 });
      }
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
