import { NextResponse } from "next/server";
import executeQuery from "../../lib/db";

export async function POST(req) {
    try {
        const data = await req.json()
        // const body = {}
        // data.forEach((value, key) => {
        //     body[key] = value
        // }) 
        const { fullName, email, contactNumber, address, message} = data

        const result = await executeQuery({
            query: "INSERT INTO replies (fullName, email, contactNumber, address, message) values(?,?,?,?,?)",
            values: [fullName, email, contactNumber, address, message]
        })


        return NextResponse.json({result})
    } catch (e) {
        console.log(e)
        return NextResponse.json({error: e},{status: 500});
    }
}