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


const resultDisplay=document.querySelector('.result');

class PlayerModel{
/**
 * @function getPlayerChoice
 * @param {Event} event - The event object of the player's choice
 * @returns {string} choice - The player's choice in uppercase
 * @throws {Error} if there is an error retrieving the player's choice
 */
    static getPlayerChoice=(event)=>{
    
        try{
            console.log(typeof event.target.id.toUpperCase());
        let choice=event.target.id.toUpperCase();

            
            console.log(choice);
            
            return choice;
        
        }
        catch(error){
            console.error(error);
        }
    }
}


class ComputerModel{
    
    static getRandomChoice(){
        const randomNumber=Math.floor(Math.random()*CHOICE.length);
        return randomNumber;
    } 
    static getComputerChoice=()=>{
       
        return CHOICE[this.getRandomChoice()];
    }
}

function hideComputerChoice(){
    // Cacher tous les boutons au démarrage
    scissorsLight.style.visibility='hidden';
    paperLight.style.visibility='hidden';
    rockLight.style.visibility='hidden';
}

function displayComputerChoice(choice){
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
        throw new Error("computer choice is falsy");
    }
    if(!player){
        throw new Error("player choice is falsy");
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
    }
    return roundResult;
}
}
function getBackgroundColor(result){
    const DRAW_COLOR='#ffffff';
    const COMPUTER_WINS_COLOR='#FE2F60';
    const PLAYER_WINS_COLOR='#82C00F';

    if(!result){
        console.log("result falsy : null or not defined.", typeof result);
        return;
    }

    if(result==='draw'){
        return DRAW_COLOR;
        
    }
    else if(result==='computer wins'){
       return COMPUTER_WINS_COLOR;
    }
    else{
       return PLAYER_WINS_COLOR;
    }
}

function getLogInnerItem(result){
    
    let innerItem;
    if(!result){
        console.log("result falsy : null or not define.", typeof result);
        
        return;
    }
    if(result==='draw'){
        innerItem=`<i class="fas fa-equals"></i> <span style="font-family: monospace;" >${result}</span>`;
        
    }
    else if(result==='computer wins'){
        innerItem= `<i class="fas fa-robot"></i> <span style="font-family: monospace;" >${result}</span>`;
    }
    else{
        innerItem= `<i class="fas fa-hand-peace"></i> <span style="font-family: monospace;" >${result}</span>`;
    }

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

    computerChoice= ComputerModel.getComputerChoice();
    playerChoice=PlayerModel.getPlayerChoice(event);



    roundResult= GameModel.getRoundResult(computerChoice, playerChoice);
    displayComputerChoice(computerChoice);
    updateResultView(roundResult);
    displayBackgroundColor(getBackgroundColor(roundResult));
    const resultItem = document.createElement("li");
    resultItem.innerHTML=getLogInnerItem(roundResult);
    logResults.prepend(resultItem);
};



rockBtn.addEventListener('click', launchRound);
paperBtn.addEventListener('click', launchRound);
scissorsBtn.addEventListener('click', launchRound);


