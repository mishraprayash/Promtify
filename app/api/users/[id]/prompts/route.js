import { connectToDB } from "@utils/database";
import Prompt from "@models/promptmodel";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const promptData = await Prompt.find({ creator: params.id }).populate('creator');
        return new Response(JSON.stringify(promptData), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts...", { status: 500 });
    }

}