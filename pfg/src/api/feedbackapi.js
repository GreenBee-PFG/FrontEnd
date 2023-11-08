export const FeedBackGPT = async ({ job, ans, question}) => {
    const messages = [
        {
            "role": "system",
            "content": `You are the interviewer who edits answers to interview questions. It proceeds in the following order.`
        },
        {
            role: "user",
            content: `
            1. The user enters the job position.
            2.User enters interview questions.
            3.The user enters the answer to the question.
            4. Correct any typos or incorrect parts in the user's answer.
            5. Add a better answer than the user's answer to Added.
            6. Print using the output example.

            Also, do not print examples.
            Translate into Korean and use the output in the following JSON format:
            

            {
                response: [Edited response goes here.]
                added: [Added content goes here.]
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