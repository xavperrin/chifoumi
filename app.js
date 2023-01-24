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
const choiceEnumeration=[ROCK, PAPER, SCISSORS];
let gameIsRunning=false;
const result=document.querySelector('.result');

// Cacher tous les boutons au démarrage
rockLight.style.display = "hidden";
paperLight.style.display = "hidden";
scissorsLight.style.display = "hidden";



function getRandomChoice(){
    const randomNumber=Math.floor(Math.random()*choiceEnumeration.length);
    console.log('random number:', randomNumber)
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


const getComputerChoice=()=>{

   return choiceEnumeration[getRandomChoice()];
}
 const launchRound=(event)=>{
    scissorsLight.style.visibility='hidden';
    paperLight.style.visibility='hidden';
    rockLight.style.visibility='hidden';

    const computerSelection= getComputerChoice();
    const playerSelection=getPlayerChoice(event);

    switch(computerSelection){
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

    let isDraw=()=>{
       return computerSelection===playerSelection;
    }

    if(isDraw()){
        document.body.style.backgroundColor="#ffffff";
        const resultItem = document.createElement("li");
        resultItem.innerHTML = '<i class="fas fa-equals"></i> <span style="font-family: monospace;" >draw</span>';
        logResults.prepend(resultItem);
        return result.textContent='draw';

    }
    else if(playerSelection===PAPER && computerSelection===SCISSORS||playerSelection===SCISSORS && computerSelection===ROCK){
        document.body.style.backgroundColor="#FE2F60";
        const resultItem = document.createElement("li");
        resultItem.innerHTML ='<i class="fas fa-robot"></i> <span style="font-family: monospace;" >Computer wins</span>';
        logResults.prepend(resultItem);
        return result.textContent='Computer wins.';
    }
    else{
        document.body.style.backgroundColor="#82C00F";
        const resultItem = document.createElement("li");
        resultItem.innerHTML = '<i class="fas fa-hand-peace"></i> <span style="font-family: monospace;" >You win</span>';
        logResults.prepend(resultItem);
        return result.textContent='You win.';
    }
};



rockBtn.addEventListener('click', launchRound);
paperBtn.addEventListener('click', launchRound);
scissorsBtn.addEventListener('click', launchRound);


