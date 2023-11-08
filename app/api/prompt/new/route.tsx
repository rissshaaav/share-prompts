import { connectToDB } from "@utils/Database";
import Prompt from "@models/Prompt";

export const POST = async(req)=> {
  const {prompt, userId, tag} = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {status: 201});
  } catch (error) {
    return new Response("Failed to create new prompt", {status: 500});
  }
}