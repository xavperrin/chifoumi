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

let computerChoice;
let playerChoice;


const DEFAULT_CHOICE=ROCK;
const choiceEnumeration=[ROCK, PAPER, SCISSORS];

const resultDisplay=document.querySelector('.result');



function getRandomChoice(){
    const randomNumber=Math.floor(Math.random()*choiceEnumeration.length);
    return randomNumber;
} 

const getPlayerChoice=(event)=>{
    
    try{
        console.log(typeof event.srcElement.id.toUpperCase());
    let choice=event.srcElement.id.toUpperCase();

     if(!choiceEnumeration.includes(choice)){
        choice=getRandomChoice();
    }
    else{
        console.log(choice);
        getComputerChoice()
        return choice;
    }
    }
    catch(error){
        console.error(error);
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

function updateRoundResult(computer, player){
    let roundResult;
    if(computer === player){
        roundResult = "draw";
    }
    else if(player === PAPER && computer === SCISSORS||player === SCISSORS && computer === ROCK){
        roundResult = "computer wins";
    }
    else{
        roundResult = "you win";
    }
    return roundResult;
}
function getBackgroundColor(result){
    const DRAW_COLOR='#ffffff';
    const COMPUTER_WINS_COLOR='#FE2F60';
    const PLAYER_WINS_COLOR='#82C00F';

    if(!result){
        console.log("result falsy : null or not define.", typeof result);
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

const getComputerChoice=()=>{

   return choiceEnumeration[getRandomChoice()];
}
 const launchRound=(event)=>{
let roundResult;

    hideComputerChoice();

    computerChoice= getComputerChoice();
    playerChoice=getPlayerChoice(event);

    displayComputerChoice(computerChoice);

    roundResult= updateRoundResult(computerChoice, playerChoice);
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


