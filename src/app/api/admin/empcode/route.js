import executeQuery from "../../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../../lib/functions";

export async function GET(){
    try{
        const result = await executeQuery({
            query: "SELECT * FROM employee_codes"
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
            return NextResponse.json('Unauthorized', {status: 401})
        }

        const data = await req.json()
        
        const { employee_code } = data
        
        const result = await executeQuery({
            query: "INSERT INTO employee_codes (employee_id) VALUES (?)",
            values: [employee_code]
        })

        if(result.affectedRows == 1){

            return NextResponse.json("Employee Code Added Successfully!", {status: 200})
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
        console.log(id)

        if (!id) {
            return NextResponse.json('ID not provided', { status: 400 });
        }

        // Perform the DELETE operation
        const result = await executeQuery({
            query: `DELETE FROM employee_codes WHERE id = ?`,
            values: [id]
        });
        console.log(result)

        if (result.affectedRows === 1) {
            return NextResponse.json('Employee Code has been deleted', { status: 200 });
        } else {
            return NextResponse.json('Could not delete employee code, or has already been deleted', { status: 500 });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
