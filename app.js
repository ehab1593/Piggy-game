/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//initializing a state variable called gamePlaying to handle game resume capabilities

var scores, roundScore, activePlayer, dice, dice2, totalDice, gamePlaying; 

init();
//Math.floor removes decimal values from results, *6 gives numbers between 0 and 6, while +1 remo

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


document.querySelector('.btn-roll').addEventListener('click', function (){
   
   if (gamePlaying) {
      //Random number
    var dice = Math.floor(Math.random() * 6) +1;
    var dice2 = Math.floor(Math.random() * 6) +1;

    totalDice = dice + dice2;

    //Display the dice
    var diceDom = document.querySelector('.dice');
    var diceDom2 = document.querySelector('.dice2');


    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    diceDom2.style.display = 'block';
    diceDom2.src = 'dice-' + dice2 + '.png';



    //update the roundscore if the number rolled was not a 1
   //  if(dice === 1 || dice2 === 1) {
   //    scores[activePlayer] = 0;
   //    document.querySelector('#score-' + activePlayer).textContent = '0';
   //    nextPlayer();

   // } else 
   

   //if one of the dices is a 1 then next player plays
   if(dice !== 1 && dice2 !== 1) {
    //add number
    roundScore += totalDice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else{
    //next player plays
      nextPlayer();
   }
   //lastScore = dice;

}
});


//function to hold the score and add it to total score

document.querySelector('.btn-hold').addEventListener('click', function() {

   if (gamePlaying){
      scores[activePlayer] += roundScore;

   // Update the UI
   document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

   // Check if player won the game

   var input = document.querySelector('.score-final').value;
   var winningScore;

   //to check if user input any value, if null or not entered then default winning score is set to 100
   if (input){
      winningScore = input;
   } else{
      winningScore = 100;
   }

   if (scores[activePlayer] >= winningScore ) {
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
       document.querySelector('.dice').style.display = 'none';
       document.querySelector('.dice2').style.display = 'none';
       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
       document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
       gamePlaying = false;
   } else {
       //Next player
       nextPlayer();
   }

   }
   


});


function nextPlayer() {
   //Next player
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;

   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   //document.querySelector('.player-0-panel').classList.remove('active');
   //document.querySelector('.player-1-panel').classList.add('active');

   document.querySelector('.dice').style.display = 'none';
   document.querySelector('.dice2').style.display = 'none';

}


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
   scores = [0,0];
   roundScore = 0;
   activePlayer = 0;
   gamePlaying = true;

   document.querySelector('.dice').style.display = 'none';
   document.querySelector('.dice2').style.display = 'none';


   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
}
