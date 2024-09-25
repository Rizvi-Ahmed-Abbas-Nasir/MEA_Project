import executeQuery from "../../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../../lib/functions";

export async function GET(){
    try{
        const result = await executeQuery({
            query: "SELECT * FROM honorary"
        }) 
        return NextResponse.json(result)
    } catch(e){
        console.log(e)
        return NextResponse.json({error: err}, {status: 500})
    }
}

export async function POST(req) {
    try {
        const apiKey = await req.headers.get('authorization') 
        if (!isApiValid(apiKey)) {
            return NextResponse.json('unauthorized', {status: 401})
        }

        const data = await req.json()
        
        const { name, role } = data
        
        const result = await executeQuery({
            query: "INSERT INTO honorary (name, role) VALUES (?,?)",
            values: [name, role]
        })

        if(result.affectedRows == 1){

            return NextResponse.json("Honorary Added", {status: 200})
        } else {
            return NextResponse.json(result, {status:500})
        }

    } catch (e) {
        console.log(e)
        return new Response(e, {status: 500})
    }
}

export async function DELETE(req) {
    try {
        // Extract the API key from the headers
        const apiKey = req.headers.get('authorization');

        if (!isApiValid(apiKey)) {
            return NextResponse.json('Unauthorized', { status: 401 });
        }

        // Extract the ID from the URL parameters
        const url = new URL(req.url);
        const id = url.searchParams.get('id'); 

        if (!id) {
            return NextResponse.json('ID not provided', { status: 400 });
        }

        // Perform the DELETE operation
        const result = await executeQuery({
            query: `DELETE FROM honorary WHERE honoraryId = ?`,
            values: [id]
        });

        if (result.affectedRows === 1) {
            return NextResponse.json('Honorary has been deleted', { status: 200 });
        } else {
            return NextResponse.json('Couldnot delete honorary, or has already been deleted', { status: 500 });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
