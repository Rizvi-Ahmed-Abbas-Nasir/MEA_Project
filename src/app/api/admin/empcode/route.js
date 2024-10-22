import executeQuery from "../../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../../lib/functions";

// GET request handler
export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM employee_codes",
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("GET request error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
    try {
      const apiKey = await req.headers.get("authorization");
      if (!isApiValid(apiKey)) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
  
      const data = await req.json();
      console.log("Received data:", data); // Add this to log the incoming data
  
      const { employee_code } = data;
  
      // Ensure employee_code is provided
      if (!employee_code) {
        return NextResponse.json("Employee code is required", { status: 400 });
      }
  
      const result = await executeQuery({
        query: "INSERT INTO employee_codes (employee_id) VALUES (?)",
        values: [employee_code],
      });
  
      if (result.affectedRows === 1) {
        return NextResponse.json("Employee Code Added Successfully!", { status: 200 });
      } else {
        return NextResponse.json("Failed to add employee code", { status: 500 });
      }
    } catch (err) {
      console.error("POST request error:", err);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
// DELETE request handler
export async function DELETE(req) {
  try {
    // Extract the API key from the headers
    const apiKey = req.headers.get("authorization");

    if (!isApiValid(apiKey)) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // Extract the ID from the URL parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json("ID not provided", { status: 400 });
    }

    // Perform the DELETE operation
    const result = await executeQuery({
      query: `DELETE FROM employee_codes WHERE id = ?`,
      values: [id],
    });

    if (result.affectedRows === 1) {
      return NextResponse.json("Employee Code has been deleted", { status: 200 });
    } else {
      return NextResponse.json("Could not delete employee code or it has already been deleted", { status: 500 });
    }
  } catch (err) {
    console.error("DELETE request error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
