import { NextResponse } from "next/server";
import executeQuery from "../../lib/db";

//validate user here (Check the employee id)
export async function POST (req){
try {
    const data = await req.json()
    console.log(data)
    const { employee_id } = data

    const query = "SELECT employee_id FROM employee_codes WHERE employee_id = ? ";
    const values = [employee_id];

    const result = await executeQuery({ query, values }); 

    if (result.length > 0){
        return NextResponse.json({message: "true", result: result})
    } else {
        return NextResponse.json({message: "false", result: result})
    }
    
} catch (error) {
    console.error("Error Validating User:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}