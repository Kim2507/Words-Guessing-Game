class Model{
    #wordList=[];

    constructor(){
        this.#wordList=[];
    }

    async getWordList(){
        this.#wordList = API.getWordList;
        // console.log(wordList);
        return this.#wordList;
    }
  
    getWord() {
      const randomIndex = Math.floor(Math.random() * this.#wordList.length);
      return this.#wordList[randomIndex];
    }
  };
  
  class View{
    constructor(){
        this.guessButton = document.querySelectorAll('#guess-button');
        this.guessInput = document.querySelectorAll('#guess-input');
        this.guessCounter = document.querySelectorAll('#guess-counter');
        this.wordContainer = document.querySelectorAll('#word-container');
        this.resultContainer = document.querySelectorAll('#result-container');

    }
   
    getCounterField(){
        return this.guessCounter;
    }

    renderWord (word, hiddenPositions){
        let output = '';
        for (let i = 0; i < word.length; i++) {
          if (hiddenPositions.includes(i)) {
            output += '_ ';
          } else {
            output += word[i] + ' ';
          }
        }
        // console.log(this.wordContainer);
        this.wordContainer.textContent = output;
    }

    displayResult(message){
        this.resultContainer.textContent = message;
    }
    clearInput () {
      this.guessInput='';
    }
  
};
  
class Controller{
    #word;
    #hiddenPositions;
    #guessCounter = 10;

    constructor(model, view){
        this.model = model;
        this.view = view;
        this.init();
    }
  
    init = () => {
        // this.model.getWordList.then(() =>{
        //     const list = this.model.wordList;
        //     this.getWordListAndRenderWord();
        // })
        this.getWordListAndRenderWord();
        this.updateView();
    }

    updateView() {
        const currentState = this.model.getState();
        
        this.view.wordContainer.innerHTML = currentState.wordWithGuesses;
        this.view.guessCounter.textContent = `Guesses left: ${this.model.getCounter()}`;
        
        if (currentState.status === 'win') {
          this.view.showWinMessage();
        } else if (currentState.status === 'lose') {
          this.view.showLoseMessage(currentState.word);
        }
      }
      

    getCounter(){
        return this.#guessCounter;
    }
    newGame(){
        this.#word = this.model.getWord();
        console.log(this.#word);
        this.#hiddenPositions = this.getHiddenPositions(this.#word);
        this.#guessCounter = 10;
        this.view.guessCounter.textContent = `Guesses left: ${this.getCounter()}`;
        // View.elements.guessCounter.textContent = 
        this.view.renderWord(this.#word, this.#hiddenPositions);
        this.view.clearInput();
      }
      
      
  
    getWordListAndRenderWord =() =>{
      this.model.getWordList(),
    //   console.log(this.model.getWordList());
      this.newGame();
    }

    getHiddenPositions = (word) => {
        const numHidden = Math.floor(Math.random() * (this.#word.length - 1)) + 1;
        const hiddenPositions = new Set();
        while (hiddenPositions.size < numHidden) {
          const randomIndex = Math.floor(Math.random() * this.#word.length);
          if (!hiddenPositions.has(randomIndex)) {
            hiddenPositions.add(randomIndex);
          }
        }
        return Array.from(hiddenPositions);
      }
  
    
  
    
  
   handleGuess = () => {
      const guess = this.view.guessInput.value.toLowerCase();
      if (!guess.match(/^[a-zA-Z]+$/)) {
        View.displayResult('Invalid guess. Please enter a letter.');
        return;
      }
      if (this.#guessCounter === 0) {
        View.displayResult(`Game over! The word was "${word}".`);
        return;
      }
      if (this.#guessCounter.length !== 1) {
        View.displayResult('Please guess one letter at a time.');
        return;
      }
      this.#guessCounter--;
      View.elements.guessCounter.textContent = `Guesses left: ${this.#guessCounter}`;
      if (word.toLowerCase().includes(guess)) {
        const indices = [];
        for (let i = 0; i < word.length; i++) {
          if (word[i].toLowerCase() === guess) {
            indices.push(i);
          }
        }
        for (let index of indices) {
          hiddenWord[index] = word[index];
        }
        View.renderWord(word, hiddenPositions, hiddenWord);
        if (hiddenWord.indexOf('_') === -1) {
          View.displayResult('You win!');
          View.disableInput();
          return;
        }
      } else {
        View.displayResult(`Wrong guess. You have ${guessCounter} guesses left.`);
        if (guessCounter === 0) {
          View.displayResult(`Game over. The word was "${word}".`);
          View.disableInput();
        }
      }
    }
  
};
  
  const app = new Controller(new Model(), new View());
  
      