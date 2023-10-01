
import axios from "axios";
import dotenv from 'dotenv'; 

dotenv.config(); 


class Prompt {
  constructor(symptomes) {
    this.symptomes = symptomes;
  }
  generatePrompt() {
    const symptomeList = this.symptomes.join(', ');
    return `Am următoarele simptome: ${symptomeList}. Răspunde cu 5 cauze cele mai comune în acest format asemenea unui JSON(FIECARE CAUZA SA AIBA UN JSON SEPARAT, jsonurile separate prin virgula si bagate in paranteze patrate). {PROBLEMA: [cauza gasita de tine], DESCRIERE: [descriere scurta de max 10 cuvinte a problemei], SEVERITATE: [usor/moderat/sever], SFAT:[sfatul propus de tine]}ORICE AR FII DA-MI INFORMATIILE IN FORMATUL PREZENTAT. orice ar fii, rezultatul sa fie ca un text care arata ca un JSON si sa poate fii format in JSON in javascript prin JSON.parse. da-mi direct doar rezultatul, nu spune nimic pe langa, nu adauga nimic in plus, nu da un titlu la sirul de obiecte si nu da nume la obiecte`;
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
      var inputString = response.data.choices[0].message.content;

      //sometimes, the ai dosent add the square brakets
      if (inputString[0] !== '[') {
        inputString = "[" + inputString + "]";
      }
      
      console.log(inputString);
      const JSONInput = JSON.parse(inputString);  
      console.log(JSONInput);
      return JSONInput;

    } catch (error) {
      console.error('Error sending POST request to OpenAI API:', error);
    }
  }
}

export default Prompt;