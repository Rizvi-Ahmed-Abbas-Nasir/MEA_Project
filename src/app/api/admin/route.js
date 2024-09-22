import executeQuery from "../../lib/db";
import { NextResponse } from "next/server";
import { isApiValid } from "../../lib/functions";

export async function GET(){
    //fetching member Registration Table here
    try{
        const result = await executeQuery({
            query: "SELECT * FROM memberReg ORDER BY id DESC"
        }) 
        return NextResponse.json(result)
    } catch(e){
        return NextResponse.json(e, {status: 500})
    }
}