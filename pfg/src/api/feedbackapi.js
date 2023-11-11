export const FeedBackGPT = async ({ job, ans, question}) => {
    const messages = [
        {
            "role": "system",
            "content": `당신은 채용 담당관입니다. 다음의 순서로 진행됩니다.`
        },
        {
            role: "user",
            content: `
            1.  User가 직무를 입력합니다.
            2. User가 질문받은 면접 질문을 입력합니다.
            3. User가 질문받은 면접 질문에 대한 답변을 입력합니다.
            4. User의 답변에 대해 당신이 조언합니다.
            5. 아래의 출력 예시를 이용하여 출력합니다.

            다음 JSON 출력 형식을 따르십시오.
            {
                response: [이곳에 조언이 들어갑니다.]
            }
            `
        },
        {
            "role": "user",
            "content": `
                사용자 직무: ${job}
                면접 질문: ${question}
                면접 질문에 대한 User의 답변: ${ans}
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