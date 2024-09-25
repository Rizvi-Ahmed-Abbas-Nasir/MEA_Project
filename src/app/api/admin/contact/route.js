import executeQuery from "../../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../../lib/functions";

export async function GET(req) {
  try {
    const apiKey = await req.headers.get("authorization"); // Extract API key from header

    if (!isApiValid(apiKey)) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const result = await executeQuery({
      query: "SELECT * FROM replies ORDER BY replyId DESC;",
    });
    // console.log("Authorized");
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
