import { pipeline } from "@huggingface/transformers";
import { json, error } from "@sveltejs/kit";

const generator = await pipeline(
  "text-generation",
  "onnx-community/Llama-3.2-1B-Instruct",
);

export async function GET({ url }) {
    const text = url.searchParams.get("text");

    console.log(text);

    if (!text) {
        return error(400, "No text provided");
      }

    const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
    ];

    const output = await generator(messages, { max_new_tokens: 128 });
    console.log(output[0].generated_text.at(-1).content)
    return json(output[0].generated_text.at(-1).content);
}