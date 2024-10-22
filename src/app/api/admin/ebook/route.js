import { NextResponse } from "next/server";
import executeQuery from "../../../lib/db";
import bcrypt from "bcrypt";
import { isApiValid, generateUniqueFileName } from "../../../lib/functions";
import path from "path";
// import { promises as fs } from "fs";
import { writeFile } from "fs/promises";

//member registration here:

export async function POST(req) {
  try {
    const apiKey = await req.headers.get("authorization"); // Extract API key from header
    if (!isApiValid(apiKey)) {
      return NextResponse.json("unauthorized", { status: 401 });
    }
    const formData = await req.formData();
    // console.log(formData);
    const {
    title
    } = Object.fromEntries(formData);

    // Access the files directly from formData
    const ebook = formData.get('ebook');

    //saving files
    // console.log("FormData:" ,formData)
    // console.log("file:" ,ebook)

    if (!ebook) {
      return NextResponse.json(
        { error: "book not received" },
        { status: 400 }
      );
    }


    //saving bmcLetter file
    const buffer = Buffer.from(await ebook.arrayBuffer());
    const fileName = ebook.name.replaceAll(" ", "_");
    const fullPathDirectory = path.join(process.cwd(), "src/ebook");
    // console.log(fullPathDirectory)
    const ebookName = await generateUniqueFileName(
      fullPathDirectory,
      fileName
    );
    console.log(ebookName)

    //main query
    const query =
      "INSERT INTO ebooks (title, ebook) values(?,?)";
    const values = [
        title,
        ebookName
    ];

    const result = await executeQuery({ query, values });

    if (result?.affectedRows == 1) {
      await writeFile(path.join(fullPathDirectory, ebookName), buffer);
      return NextResponse.json({message:"Successfully Stored Ebook!"}, { status: "201" });
    } else {
      return NextResponse.json({message:"Error Saving Ebook"}, { status: "500" });
    }
  } catch (error) {
    console.error("Error Saving Ebook (catch):", error);
    return NextResponse.json({message:error.message }, { status: 500 });
  }
}
