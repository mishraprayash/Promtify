
// import Prompt from "@models/promptmodel";
// import User from "@models/usermodel";
// import { connectToDB } from "@utils/database";
// import { NextRequest, NextResponse } from "next/server";

// export const GET = async (request, { params }) => {
//     const { query } = params;
//     console.log(query[0])
//     try {
//         if (query[0] === '#') {
//             console.log('tag');
//             const prompt = await Prompt.find({ tag: { $regex: query, $options: "i" } });
//             if (!prompt) {
//                 return NextResponse.json({
//                     message: "Not Found with the given tag"
//                 }, { status: 404 })
//             }
//             console.log(prompt);
//             return NextRequest.json({ prompt }, { status: 200 });
//         }
//         else {
//             console.log('username');
//             const user = await User.find({ username: query });
//             if (!user) {
//                 return NextResponse.json({
//                     message: "User not Found"
//                 }, { status404 });
//             }
//             console.log(user);
//             return NextResponse.json({user},{status:200});
//         }
//     } catch (error) {
//         return new Response("Unable to search", { status: 500 });
//     }
// }
