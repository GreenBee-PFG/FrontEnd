export const FeedBackGPT = async ({ job, ans, question}) => {
    const messages = [
        {
            "role": "system",
            "content": `You are the interviewer giving advice on answers to interview questions. It proceeds in the following order.`
        },
        {
            role: "user",
            content: `
            1. The user enters a job position.
            2. User enters interview questions.
            3. User enters answers to interview questions.
            4. Reference your answers to generate better answers to interview questions.
            5. Print using the output example below.

            Also, do not print examples.
            Translate into Korean and use the output in the following JSON format:
            

            {
                response: [A better answer goes here.]
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