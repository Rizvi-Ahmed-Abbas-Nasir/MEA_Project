import { NextResponse } from "next/server";

import { isApiValid, generateUniqueFileName } from "../../../lib/functions";
import path from "path";
import { writeFile } from "fs/promises";


export async function POST(req) {
  try {
    const apiKey = await req.headers.get("authorization"); // Extract API key from header
    if (!isApiValid(apiKey)) {
      return NextResponse.json("unauthorized", { status: 401 });
    }
    const formData = await req.formData();
  

    // Access the files directly from formData
    const slideImage = formData.get("slideImage");

    //saving files
    // console.log("FormData:" ,formData)
    console.log("file:" ,slideImage)

    if (!slideImage) {
      return NextResponse.json({ error: "slideImage not received" }, { status: 400 });
    }

    //saving bmcLetter file
    const buffer = Buffer.from(await slideImage.arrayBuffer());
    const fileName = slideImage.name.replaceAll(" ", "_");
    const fullPathDirectory = path.join(process.cwd(), "public/images");
    // console.log(fullPathDirectory)
    const slideImageName = await generateUniqueFileName(fullPathDirectory, fileName);
    console.log(slideImageName);

    await writeFile(path.join(fullPathDirectory, slideImageName), buffer);
    return NextResponse.json({ message: "Successfully Stored Slide Images" }, { status: 200 });

  } catch (error) {
    console.error("Error Saving SlideImage (catch):", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
