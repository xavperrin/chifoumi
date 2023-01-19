const startBtn=document.querySelector('#start'); 
const rockBtn=document.querySelector('#rock');
const paperBtn=document.querySelector('#paper');
const scissorsBtn=document.querySelector('#scissors');

 
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

const getRandomChoice=()=>{
    const randomNumber=Math.floor(Math.random()*choiceEnumeration.length);
    console.log('random number:', randomNumber)
    return randomNumber;
}

const getPlayerChoice=(event)=>{
    try{
        console.log(typeof event.srcElement.id.toUpperCase());
    let choice=event.srcElement.id.toUpperCase();
     if(choice!==ROCK && choice!==PAPER && choice !==SCISSORS ){
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
    
    const computerSelection= getComputerChoice();
    const playerSelection=getPlayerChoice(event);

    switch(computerSelection){
        case ROCK:
            scissorsLight.style.visibility='hidden';
            rockLight.style.visibility='visible';
            paperLight.style.visibility='hidden';
            break;
        case PAPER:
            scissorsLight.style.visibility='hidden';
            rockLight.style.visibility='hidden';
            paperLight.style.visibility='visible';
            break;
        case SCISSORS:
            scissorsLight.style.visibility='visible';
            rockLight.style.visibility='hidden';
            paperLight.style.visibility='hidden';
            break;

    }

    if(computerSelection===playerSelection){
        document.body.style.backgroundColor="#ffffff";
        return result.textContent='draw';

    }
    else if(playerSelection===PAPER && computerSelection===SCISSORS||playerSelection===SCISSORS && computerSelection===ROCK){
        document.body.style.backgroundColor="#FE2F60";
        return result.textContent='Computer win.';
    }
    else{
        document.body.style.backgroundColor="#82C00F";
        return result.textContent='You win.';
    }

    

};



rockBtn.addEventListener('click', launchRound);
paperBtn.addEventListener('click', launchRound);
scissorsBtn.addEventListener('click', launchRound);


