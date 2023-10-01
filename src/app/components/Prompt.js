
import axios from "axios";
import dotenv from 'dotenv'; 

dotenv.config(); 


class Prompt {
  constructor(symptomes) {
    this.symptomes = symptomes;
  }
  generatePrompt() {
    const symptomeList = this.symptomes.join(', ');
    return `Am următoarele simptome: ${symptomeList}. Răspund cu cele 5 cauze cele mai comune în acest format (PROBLEM: posibila boala, DESCRIPTION: descriere a bolii < 10 cuvinte, SEVERITY: gradul de severitate(usor, moderat, sever), ADVICE: ce sa faci in situatia asta. ORICE AR FII DA-MI INFORMATIILE IN FORMATUL PREZENTAT. elementele scrise cu litere mari sa imi apara exact asa si in raspuns.`;
  }
  async getResponse() {
    const info = this.generatePrompt();
    console.log(info);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: info}], 
        },
        {
          headers: { 
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
      console.log(response.data.choices[0].message.content);
      const inputString = response.data.choices[0].message.content;

      const sections = inputString.trim().split('\n\n');
      const jsonArray = [];

      for (const section of sections) {
        const lines = section.split('\n');
        const jsonObject = {};

        for (const line of lines) {
          const [key, value] = line.split(': ');
          jsonObject[key] = value;
        }

        jsonArray.push(jsonObject);
      }
      
      console.log(jsonArray);
      return jsonArray;

    } catch (error) {
      console.error('Error sending POST request to OpenAI API:', error);
    }
  }
}

export default Prompt;