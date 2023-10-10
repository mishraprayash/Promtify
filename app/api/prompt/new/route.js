
// api route for handling creation of new prompt.

import { connectToDB } from "@utils/database";
import Prompt from "@models/promptmodel";

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt: prompt,
            tag: tag
        });
        await newPrompt.save();
        return new Response("Prompt created", { status: 201 })

    } catch (error) {
        console.log(error);
        return new Response.json("Unable to create Prompt", { status: 500 })
    }
}

// another way of creating a response

// export async function POST(req, res) {
//     try {
//         const reqBody = await req.json();
//         const { userId, prompt, tag } = reqBody;
//         const newPrompt = new Prompt({
//             creator: userId,
//             tag: tag,
//             prompt: prompt,
//         });
//         await newPrompt.save();
//         return NextResponse.json({
//             message: "New Prompt Created"
//         }, {
//             status: 201
//         })

// //     } catch (error) {
//             return NextResponse.json({
//                 message:"Unable to create the prompt"
//             },{status:500})
// //         console.log(error);
// //     }
// // }

