const startBtn=document.querySelector('#start'); 
const rockBtn=document.querySelector('#rock');
const paperBtn=document.querySelector('#paper');
const scissorsBtn=document.querySelector('#scissors');
const logResults=document.querySelector('#log-results');
const rockLight=document.querySelector('#rock-cpu');
const paperLight=document.querySelector('#paper-cpu');
const scissorsLight=document.querySelector('#scissors-cpu');

const ROCK='ROCK';
const PAPER ='PAPER';
const SCISSORS ='SCISSORS';
const DEFAULT_CHOICE=ROCK;

const CHOICE=[ROCK, PAPER, SCISSORS];

/**
 * @constant COLOR
 * @property {string} DRAW - The color code for a draw result.
 * @property {string} COMPUTER_WINS - The color code for a computer win result.
 * @property {string} PLAYER_WINS - The color code for a player win result.
 */
const COLOR = {
    DRAW : '#ffffff',
    COMPUTER_WINS : '#FE2F60',
    PLAYER_WINS : '#82C00F'
  }


const resultDisplay=document.querySelector('.result');

class PlayerModel{
/**
 * @function getChoice
 * @param {Event} event - The event object of the player's choice
 * @returns {string} choice - The player's choice in uppercase
 */
    static getChoice=(event)=>{
    
        console.log(typeof event.target.id.toUpperCase());
        let choice=event.target.id.toUpperCase();

            
            console.log(choice);
            document.dispatchEvent(new CustomEvent("playerChoiceMade", { detail: choice }));
            return choice;

    }
}


class ComputerModel{
    

    constructor() {
        if (ComputerModel._instance) {
            return ComputerModel._instance
          }
          ComputerModel._instance = this;
        this.userHistory = new Map();
    }

    static getRandomNumber(){
        const randomNumber=Math.floor(Math.random()*CHOICE.length);
        return randomNumber;
    } 



    static getRandomChoice=()=>{
       
        return CHOICE[this.getRandomNumber()];
    }




    getComputerChoice() {
        let userChoice;
        if (this.userHistory.size === 0) {
            userChoice = ComputerModel.getRandomChoice();
        } else {
            let maxCount = 0;
            for (let key of this.userHistory.keys()) {
                if (this.userHistory.get(key) > maxCount) {
                    maxCount = this.userHistory.get(key);
                    userChoice = key;
                }
            }
        }

        let computerChoice;
        if (userChoice === ROCK) {
            computerChoice = PAPER;
        } else if (userChoice === PAPER) {
            computerChoice = SCISSORS;
        } else {
            computerChoice = ROCK;
        }
        return computerChoice;
    }

    updateUserHistory(choice) {
        if (!this.userHistory.has(choice)) {
            this.userHistory.set(choice, 1);
        } else {
            let amount=this.userHistory.get(choice);
            amount++;
            this.userHistory.set(choice, amount);
            
        }
    }

    listenToPlayerChoice() {
        // Ecouter l'événement personalisé pour mettre à jour l'historique
        document.addEventListener("playerChoiceMade", (event) => {
            this.updateUserHistory(event.detail);
        });

    }
    
    
}

class GameModel{
/**
     * @function getRoundResult
     * @param {string} computer - the computer choice
     * @param {string} player - the player choice
     * @returns {string} roundResult - the result of the round
     * @throws {Error} if computer or player choice is falsy
     */  

static getRoundResult(computer, player){
        let roundResult;
        if(!computer){
            throw new TypeError("computer choice is falsy", typeof computer);
        }
        if(!player){
            throw new TypeError("player choice is falsy", typeof player);
        }
        if(typeof player!=='string'||typeof computer!=='string'){
            throw new TypeError(`Wrong type given`);
        }
        if(computer === player){
            roundResult = "draw";
        }
        else if(player === PAPER && computer === SCISSORS||player === SCISSORS && computer === ROCK || player === ROCK && computer === PAPER ){
            roundResult = "computer wins";
        }
        else if(player === SCISSORS && computer === PAPER || player === ROCK && computer === SCISSORS || player === PAPER && computer === ROCK ){
            roundResult = "you win";
        }
        else {
            console.error("something wrong happened.", "computer choice: ", computer, "player choice: ", player);
            roundResult = "unexpected value";
            throw new Error("Unexpected value of player or computer choice.");
        }
        return roundResult;
    }

    /**
 * @function getBackgroundColor
 * @param {string} result - The result of a round. Can be 'draw', 'computer wins', or 'you win'
 * @returns {string} colorCode - The color code corresponding to the round result.
 */
   static getBackgroundColor(result){

    try{
        return this.getColor(result);
    } catch(e){
        console.error("error:", e);
        }
    }

    
    static getColor(result)
    {
        if(!result){
            throw new Error("result falsy : null or not defined.", typeof result);
        }
        switch(result){
            case 'draw':
                return COLOR.DRAW;
                break;
            case 'computer wins':
                return COLOR.COMPUTER_WINS;
                break;
            case 'you win':
                return COLOR.PLAYER_WINS;
                break;
            default:
                throw new Error("Unexpected result value", result);
        }

    }

}

function    hideComputerChoice(){
        // Cacher tous les boutons au démarrage
        scissorsLight.style.visibility='hidden';
        paperLight.style.visibility='hidden';
        rockLight.style.visibility='hidden';
    }

    function  displayComputerChoice(choice){

        switch(choice){
        case ROCK:
        rockLight.style.visibility='visible';
        break;
        case PAPER:
        paperLight.style.visibility='visible';
        break;
        case SCISSORS:
        scissorsLight.style.visibility='visible';
        break;
        }
    }

    function getLogInnerItem(result){
    
        let innerItem;
        let fontAwesomeIcon;
    
        
        if(!result){
            throw new Error("result falsy : null or not defined.", typeof result);
        }
        switch(result){
            case 'draw':
                fontAwesomeIcon=`<i class="fas fa-equals"></i>`;
                break;
            case 'computer wins':
                fontAwesomeIcon= `<i class="fas fa-robot"></i>`;
                break;
            case 'you win':
                fontAwesomeIcon=`<i class="fas fa-hand-peace"></i>`;
                break;
            default:
                throw new Error("Unexpected result value.", result);
        }
        innerItem=`${fontAwesomeIcon} <span style="font-family: monospace;" >${result}</span>`;
        console.log(innerItem);
    
        return innerItem;
    
    }
    
    
    
    function displayBackgroundColor(backgroundColor){
        document.body.style.backgroundColor=backgroundColor;
    }
    
    
    function updateResultView(result){
        resultDisplay.textContent=result;
    }





 const launchRound=(event)=>{
let roundResult;

let computerChoice;
let playerChoice;




    hideComputerChoice();
    const computer=new ComputerModel();
    computer.listenToPlayerChoice();
    computerChoice= computer.getComputerChoice();
    playerChoice=PlayerModel.getChoice(event);

    roundResult= GameModel.getRoundResult(computerChoice, playerChoice);
    displayComputerChoice(computerChoice);
    updateResultView(roundResult);
    displayBackgroundColor(GameModel.getBackgroundColor(roundResult));
    const resultItem = document.createElement("li");
    resultItem.innerHTML=getLogInnerItem(roundResult);
    logResults.prepend(resultItem); 
};



rockBtn.addEventListener('click', launchRound);
paperBtn.addEventListener('click', launchRound);
scissorsBtn.addEventListener('click', launchRound);
