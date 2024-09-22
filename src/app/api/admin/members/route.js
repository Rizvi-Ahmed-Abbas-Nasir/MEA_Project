import executeQuery from "../../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../../lib/functions";

export async function GET() {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM members ORDER BY memberId DESC",
    });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const apiKey = await req.headers.get("authorization");
    if (!isApiValid(apiKey)) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    //get the data from memberReg
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const result = await executeQuery({
      query: `SELECT * FROM memberReg WHERE id = ${id}`,
    });

    const {
      fullName,
      email,
      contactNumber,
      designation,
      password,
      isApproved,
      Role,
    } = result[0];

    //marking member as approved
    const status = await changeStatus(id);
    if (status?.changedRows == 1) {
      //adding to the members table
      const isAdded = await executeQuery({
        query: `INSERT INTO members (fullName, email, contactNumber, designation, password, Role) VALUES(?,?,?,?,?,?)`,
        values: [fullName, email, contactNumber, designation, password, Role],
      });

      return NextResponse.json(
        "Member has been approved and added successfully",
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        "unable to approve the member OR is already approved",
        { status: 500 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

async function changeStatus(id) {
  const result = await executeQuery({
    query: `UPDATE memberReg SET isApproved =1 WHERE id=${id};`,
  });
  return result;
}

//delete from member registrations
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
      query: `DELETE FROM memberReg WHERE id = ?`,
      values: [id],
    });

    if (result.affectedRows === 1) {
      return NextResponse.json(
        "Member rejected and deleted from members requests",
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        "Could not reject the member, an error occurred",
        { status: 500 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
