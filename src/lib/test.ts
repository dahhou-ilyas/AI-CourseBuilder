
import axios from "axios"

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export async function test() {
    const promptMessage = {
		model:"gpt-3.5-turbo",
		messages:[
			{role: "user", content:"hello" },
		],
		max_tokens: 3000,
		temperature: 1
	  };
	const response= await axios.post('https://api.openai.com/v1/chat/completions', promptMessage, {
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
	  }
	})
	return response.data.choices[0].message.content
}

