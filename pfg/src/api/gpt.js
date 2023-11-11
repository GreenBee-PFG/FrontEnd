export const CallGPT = async ({ prompt }) => {
    const messages = [
        {
            "role": "system",
            "content": "You are a hiring interviewer. When a user enters a job, interview questions tailored to that job can be created. Please only ask one interview question and do not print out examples."
        },
        {
            "role": "user",
            "content": `Translate into Korean and use the output in the following JSON format:
            {
                response: [Your question should be entered here.]
            }
            `
        },
        {
            "role": "user",
            "content": `${prompt}`
        }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_CHAT_GPT_API_KEY}`
    },
    body:JSON.stringify({
        "model": "gpt-3.5-turbo",
        messages,
        "temperature": 0.7,
        "max_tokens": 1_000,
    }),
   });
   const responseData = await response.json();
   console.log(">>responseData", responseData);

   const message = responseData.choices[0].message.content;

   return message;


};