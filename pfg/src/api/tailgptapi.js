export const GPTTailAPI = async ({ ans, job, question}) => {
    const messages = [
        {
            "role": "system",
            "content": `You are the interviewer. It proceeds in the following order.`
        },
        {
            role: "user",
            content: `
            1. The user enters the job position.
            2. The user enters the interview question.
            3. The user will type an answer to the interview question.
            4. Create other interview questions based on your answers to the interview questions you have entered.
            5. However, it should not be similar to the interview questions you received.
            6. Use an output example to output.

            Also, do not print examples.
            Translate into Korean and use the output in the following JSON format:
            {
                response: [Enter only one interview question here.]
            }
            `
        },
        {
            "role": "user",
            "content": `
                user job: ${job}
                interview questions: ${question}
                user response: ${ans}
            `
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