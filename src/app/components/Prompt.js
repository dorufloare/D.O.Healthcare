class Prompt {
  constructor(symptomes) {
    this.symptomes = symptomes;
  }
  generatePrompt() {
    const symptomeList = this.symptomes.join(', ');
    return `Am următoarele simptome: ${symptomeList}. Răspund cu cele 5 cauze cele mai comune în acest format (condiție medicală, descriere scurtă < 10 cuvinte, severitate (ușoară, moderată, severă), sfaturi)`;
  }
}

export default Prompt;