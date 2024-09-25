// pages/api/download.js
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { isApiValid } from '../../lib/functions';

export async function GET(req) {
  const apiKey = req.headers.get("authorization"); // Extract API key from header
  if (!isApiValid(apiKey)) {
    return NextResponse.json("unauthorized", { status: 401 });
  }

  const fileName = req.headers.get('fileName');
  const formType = req.headers.get('formType');
  const download = req.headers.get('download')
  
  if (!fileName || !formType) {
    return NextResponse.json({ message: "fileName or formType not specified" }, { status: 400 });
  }

  // Define the file path you want to send
  const filePath = path.resolve(process.cwd(), 'src', 'form', formType, fileName);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Create a stream for the file
    const fileStream = fs.createReadStream(filePath);

    // Set the headers for downloading the file
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf'); 

    if(download == true){
      headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    }
    // Return a new Response and stream the file
    return new Response(fileStream, { headers });
  } else {
    return NextResponse.json({ message: 'File not found' }, { status: 404 });
  }
}
