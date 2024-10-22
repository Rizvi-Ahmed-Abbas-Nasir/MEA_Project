// import { NextResponse } from "next/server";
// import executeQuery from "../../../lib/db";

// //check if member is already registered

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     console.log(data);
//     const { email } = data;

//     const query = "SELECT email FROM members WHERE email = ?;";
//     const values = [email];

//     const result = await executeQuery({ query, values });

//     if (result.length > 0) {
//       return NextResponse.json(
//         {
//           message: "in the members table",
//           result: result,
//         },
//         { status: 400 }
//       );
//     } else {
//       //not in the members table
//       const query = "SELECT email FROM memberReg WHERE email = ?;";
//       const values = [email];
//       const isReg = await executeQuery({ query, values });

//       if (isReg.length > 0) {
//         return NextResponse.json(
//           {
//             message: "Already Registered",
//             result: result,
//           },
//           { status: 400 }
//         );
//       } else {
//         return NextResponse.json({ message: "OK" }, { status: 200 });
//       }
//     }
//   } catch (error) {
//     console.error("Error Validating Email:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
