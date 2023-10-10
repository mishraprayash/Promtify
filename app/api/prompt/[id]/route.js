// This route will be able to handle three types of request


// GET requst to read the specific prompt with provided id.
// PATCH request to update the prompt with given id.
// DELETE request to delete the prompt with given id

import { connectToDB } from "@utils/database";
import Prompt from "@models/promptmodel";


export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        if (!prompt) {
            return new Response("Prompt doesnot exist", { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Couldnot fetch the prompt", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    if(!params.id){
        return new Response("Not a valid Id or missing Id",{status:400});
    }
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response("Prompt doesnot exist", { status: 404 });
        }
        const updatedPromt = await Prompt.findByIdAndUpdate({ _id: params.id }, { $set: { prompt: prompt, tag: tag } }, { new: true });

        return new Response(JSON.stringify(updatedPromt), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Failed update the prompt", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Successfully deleted the prompt", { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete the prompt", { status: 500 })
    }
}