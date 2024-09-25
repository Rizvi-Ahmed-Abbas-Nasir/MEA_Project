import { NextResponse } from "next/server";
import executeQuery from "../../lib/db";
const bcrypt = require('bcrypt');

export async function POST(req) {
    try {
        const data = await req.json()
        // const body = {}
        // data.forEach((value, key) => {
        //     body[key] = value
        // })


        const { email, password} = data
        
        const doesEmailExist = await executeQuery({
            query: `SELECT * FROM memberReg WHERE email = '${email}'`
        })

        if (doesEmailExist.length > 0 && doesEmailExist[0].length > 0){

            //check password
            const originalPassword = await doesEmailExist[0][0].password 
            const match = await bcrypt.compare(password, originalPassword) 

            if (match) {
                return NextResponse.json({"Your Data:" : doesEmailExist[0][0]})
            } else {
                return NextResponse.json({ error: 'password dekhle ekbaar' }, { status: 401 })
            }


        } else {
            return NextResponse.json({ error: 'email dekhle ekbaar' }, { status: 401 })
        }

    } catch (e){
        console.log(e)
        return NextResponse.json({error: e},{status: 500});

    }
}