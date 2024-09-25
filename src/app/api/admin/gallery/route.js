import executeQuery from "../../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../../lib/functions";
import path from "path";
import { writeFile } from "fs/promises";
import { promises as fs } from 'fs';

// Function to generate a unique file name if a file with the same name exists
async function generateUniqueFileName(directory, fileName) {
  let counter = 1;
  let newFileName = fileName;
  const fileExtension = path.extname(fileName);
  const fileNameWithoutExtension = path.basename(fileName, fileExtension);

  while (await fs.stat(path.join(directory, newFileName)).catch(() => false)) {
    newFileName = `${fileNameWithoutExtension}(${counter})${fileExtension}`;
    counter += 1;
  }
  
  return newFileName;
}

export async function POST(req) {
  try {
    const apiKey = await req.headers.get("authorization"); // Extract API key from header
    if (!isApiValid(apiKey)) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const formData = await req.formData();

    // Get the file and store it first
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ 'error': "No files received" }, { 'status': 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.replaceAll(" ", "_");
    const fullPathDirectory = path.join(process.cwd(), "public/assets/gallery");
    const uniqueFileName = await generateUniqueFileName(fullPathDirectory, fileName);
    const fullPath = "/assets/gallery/" + uniqueFileName;

    await writeFile(
      path.join(fullPathDirectory, uniqueFileName),
      buffer
    );
    
    // Get other data from the form
    const title = await formData.get('title');
    
    // Insert data into gallery table
    const isAdded = await executeQuery({
      query: `INSERT INTO gallery (title, image) values(?,?)`,
      values: [title, fullPath]
    });
    
    if (isAdded.affectedRows == 1) {
      return NextResponse.json("Image Uploaded Successfully", { status: 201 });
    } else {
      return NextResponse.json("Something went wrong", { status: 500 });
    }

  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM gallery"
    });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const apiKey = await req.headers.get('authorization');

    if (!isApiValid(apiKey)) {
      return NextResponse.json('unauthorized', { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json('ID not provided', { status: 400 });
    }

    // Delete the event's image
    const imageData = await executeQuery({
      query: `SELECT * from gallery WHERE imageId = ${id}`
    });

    if (imageData.length === 0) {
      return NextResponse.json('Image not found', { status: 404 });
    }

    const imageDataPath = path.join(process.cwd(), 'public', imageData[0].image);

    // Caution: it deletes the file, check the path above before running this
    await fs.unlink(imageDataPath).catch(() => {
      console.log("File already deleted or not found.");
    });
    
    // Delete the event from the database
    const result = await executeQuery({
      query: `DELETE FROM gallery WHERE imageId=${id}`
    });

    if (result.affectedRows == 1) {
      return NextResponse.json('Image has been deleted!', { status: 200 });
    } else {
      return NextResponse.json('Could not delete the image, an error occurred', { status: 500 });
    }

  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
