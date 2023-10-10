import { connectToDB } from "@utils/database";
import Prompt from "@models/promptmodel";

export const GET = async (req, res) => {

    try {
        await connectToDB();

        const promptData = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(promptData), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts...", { status: 500 });
    }

}