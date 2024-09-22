import { NextResponse } from "next/server";
import executeQuery from "../../lib/db";
import bcrypt from "bcrypt";
import { isApiValid, generateUniqueFileName } from "../../lib/functions";
import path from "path";
import { promises as fs } from "fs";
import { writeFile } from "fs/promises";

//member registration here:

export async function POST(req) {
  try {
    const apiKey = await req.headers.get("authorization"); // Extract API key from header
    if (!isApiValid(apiKey)) {
      return NextResponse.json("unauthorized", { status: 401 });
    }
    const formData = await req.formData();
    console.log(formData);
    const {
      fullName,
      email,
      employee_id,
      contactNumber,
      designation,
      password
    } = Object.fromEntries(formData);;

    // Access the files directly from formData
    const bmcLetter = formData.get('bmcLetter');
    const bmcLetter50 = formData.get('bmcLetter50');

    //saving files
    console.log("FormData:" ,formData)
    console.log("file 1:" ,bmcLetter)
    console.log("file 2:" ,bmcLetter50)


    if (!bmcLetter) {
      return NextResponse.json(
        { error: "File 1 not received" },
        { status: 400 }
      );
    }

    if (!bmcLetter50) {
      return NextResponse.json(
        { error: "File 2 not received" },
        { status: 400 }
      );
    }

    //saving bmcLetter file
    const buffer = Buffer.from(await bmcLetter.arrayBuffer());
    const fileName = bmcLetter.name.replaceAll(" ", "_");
    const fullPathDirectory = path.join(process.cwd(), "src/form/form_empty");
    const bmcLetterFileName = await generateUniqueFileName(
      fullPathDirectory,
      fileName
    );


    //saving bmcLetter50 file
    const buffer2 = Buffer.from(await bmcLetter50.arrayBuffer());
    const fileName2 = bmcLetter50.name.replaceAll(" ", "_");
    const fullPathDirectory2 = path.join(process.cwd(), "src/form/form_50");
    const bmcLetter50FileName = await generateUniqueFileName(
      fullPathDirectory2,
      fileName2
    );



    //continue saving the user

    const hashedPassword = await bcrypt.hash(password, 10);

    //main query
    const query =
      "INSERT INTO memberReg (fullName, email,employee_id, contactNumber, designation, password, bmcLetter, bmcLetter50) values(?,?,?,?,?,?,?,?)";
    const values = [
      fullName,
      email,
      employee_id,
      contactNumber,
      designation,
      hashedPassword,
      bmcLetterFileName,
      bmcLetter50FileName
    ];

    const result = await executeQuery({ query, values });

    if (result?.affectedRows == 1) {
      await writeFile(path.join(fullPathDirectory, bmcLetterFileName), buffer);
      await writeFile(
        path.join(fullPathDirectory2, bmcLetter50FileName),
        buffer2
      );
      return NextResponse.json({message:"Successfully registered!"}, { status: "201" });
    } else {
      return NextResponse.json({message:"duplicate email OR Error"}, { status: "500" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({message:error.message }, { status: 500 });
  }
}
