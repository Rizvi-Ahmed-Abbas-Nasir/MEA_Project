import executeQuery from "../../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../../lib/functions";
import path from "path";
import { promises as fs } from 'fs';
import { writeFile } from "fs/promises";

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
    const fullPathDirectory = path.join(process.cwd(), "public/assets/events");
    const uniqueFileName = await generateUniqueFileName(fullPathDirectory, fileName);
    const fullPath = "/assets/events/" + uniqueFileName;

    await writeFile(
      path.join(fullPathDirectory, uniqueFileName),
      buffer
    );
    
    // Get other data from the form
    const title = await formData.get('title');
    const date = await formData.get('date');
    const desc = await formData.get('description');

    const isAdded = await executeQuery({
      query: `INSERT INTO events (title, date, image, description) values(?,?,?,?)`,
      values: [title, date, fullPath, desc]
    });
    
    if (isAdded.affectedRows == 1) {
      return NextResponse.json("Image Uploaded Successfully", { status: 201 });
    } else {
      return NextResponse.json("Something went wrong", { status: 500 });
    }

  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM events"
    });
    return NextResponse.json(result);
  } catch (e) {
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
    const eventData = await executeQuery({
      query: `SELECT * from events WHERE eventId = ${id}`
    });

    if (eventData.length === 0) {
      return NextResponse.json('Event not found', { status: 404 });
    }

    const eventImagePath = path.join(process.cwd(), 'public', eventData[0].image);

    // Caution: it deletes the file, check the path above before running this
    await fs.unlink(eventImagePath).catch(() => {
      console.log("File already deleted or not found.");
    });
    
    // Delete the event from the database
    const result = await executeQuery({
      query: `DELETE FROM events WHERE eventId=${id}`
    });

    if (result.affectedRows == 1) {
      return NextResponse.json('Event has been deleted!', { status: 200 });
    } else {
      return NextResponse.json('Could not delete the event, an error occurred', { status: 500 });
    }

  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
