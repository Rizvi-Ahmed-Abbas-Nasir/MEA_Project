import { NextResponse } from "next/server";
import executeQuery from "../../lib/db";
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const data = await req.json()
        const { fullName, email, contactNumber, address, message} = data
        console.log(data);
        // const body = {}
        // data.forEach((value, key) => {
        //     body[key] = value
        // }) 
         const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            port:465,
            auth: {
                user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
                pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS
              }
          });
           

          console.log(email);
           const reciver = {
            from: 'bhambidsatyam1@gmail.com', // sender address
            to: 'bhambidsatyam@gmail.com', // list of receivers
            subject:'Someone tried to contact you from Mea-Website', // Subject line
            text: "Someone tried to contact you from Mea-Website", // plain text body
            html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #4CAF50;">New Message Received</h1>
        
        

        <div style="text-align: center; padding-top: 20px;">
          <p style="font-size: 12px; color: #bbb;">${fullName} tried to contact you from MEA website</p>
          <p style="font-size: 12px; color: #bbb;">contact: ${contactNumber}</p>
          <p style="font-size: 12px; color: #bbb;">address: ${address}</p>
          <p style="font-size: 12px; color: #bbb;">message: ${message}</p>
        </div>
      </div>
    </div>
  </body>
</html>
`, // html body
         
           }
           const info = await transporter.sendMail(reciver);
           console.log("Message sent: %s", info.messageId);

        const result = await executeQuery({
            query: "INSERT INTO replies (fullName, email, contactNumber, address, message) values(?,?,?,?,?)",
            values: [fullName, email, contactNumber, address, message]
        })

        
         return NextResponse.json({message: "message sent!", result: result, info}, {status: 200})

    } catch (e) {
        console.log(e)
        return NextResponse.json({error: e},{status: 500});
    }
}
