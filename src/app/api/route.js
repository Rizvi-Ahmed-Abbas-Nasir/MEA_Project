import { NextResponse } from "next/server";
import executeQuery from "../lib/db";

export async function GET(req) {
  try {
    // SQL statement to create the memberReg table if it doesn't exist
    const createMemberRegTable = `
      CREATE TABLE IF NOT EXISTS memberReg (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        fullName VARCHAR(45),
        email VARCHAR(45) UNIQUE,
        contactNumber VARCHAR(20),
        designation VARCHAR(45),
        password VARCHAR(100),
        isApproved BOOLEAN DEFAULT FALSE,
        Role VARCHAR(45) DEFAULT 'user'
      );
    `;

    // SQL statement to create the replies table if it doesn't exist
    const createRepliesTable = `
      CREATE TABLE IF NOT EXISTS replies (
        replyId INT PRIMARY KEY AUTO_INCREMENT,
        fullName VARCHAR(45),
        email VARCHAR(45),
        contactNumber VARCHAR(20),
        address VARCHAR(200),
        message VARCHAR(300)
      );
    `;

    //create members table
    const createMembersTable = `
    CREATE TABLE IF NOT EXISTS members (
      memberId INT PRIMARY KEY AUTO_INCREMENT,
      fullName VARCHAR(45),
      email VARCHAR(45) UNIQUE,
      contactNumber VARCHAR(20),
      designation VARCHAR(200),
      password VARCHAR(100),
      Role VARCHAR(45)
    );
  `;

    //create Events table
    const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
      eventId INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255),
      date VARCHAR(20),
      image VARCHAR(100),
      description VARCHAR(255)
    );
  `;

      //create Gallery table
      const createGalleryTable = `
      CREATE TABLE IF NOT EXISTS gallery (
        imageId INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100),
        image VARCHAR(100)
      );
    `;

      //create honorary table
      const createHonoraryTable = `
      CREATE TABLE IF NOT EXISTS honorary (
        honoraryId INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        role VARCHAR(100)
      );
    `;

    // Execute the query to create the memberReg table
    const resultMemberReg = await executeQuery({ query: createMemberRegTable });
    console.log("memberReg table created or already exists.");

    // Execute the query to create the replies table
    const resultReplies = await executeQuery({ query: createRepliesTable });
    console.log("replies table created or already exists.");

    const resultMembers = await executeQuery({ query: createMembersTable });
    console.log("members table created or already exists.");

    const resultEvents = await executeQuery({ query: createEventsTable });
    console.log("events table created or already exists.");

    const resultGallery = await executeQuery({ query: createGalleryTable });
    console.log("gallery table created or already exists.");

    const resultHonorary = await executeQuery({ query: createHonoraryTable });
    console.log("honorary table created or already exists.");
    // Return the result as a JSON response
    return NextResponse.json({ result: { resultMemberReg, resultReplies, resultMembers, resultEvents, resultGallery, resultHonorary } });

  } catch (err) {
    console.error("Error executing query:", err);

    // Return an error response
    return NextResponse.json({ error: "Error executing query" }, { status: 500 });
  }
}
