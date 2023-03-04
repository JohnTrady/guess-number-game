'use sctrict';


const lastResult = document.getElementById('last-result');
const guessField  =document.getElementById('guess-field');
const submitButton = document.getElementById('submit-button');
const prevGuesses = document.getElementById('previous-guesses');
const lowOrHigh = document.getElementById('low-or-high');
const resetButton = document.getElementById('reset-btn');
const txt = document.getElementById('text');
let randomNumber = Math.floor(Math.random() *  100) +1;
let guessCount = 1;
console.log(randomNumber)

const setGameOver = () => {
    guessField.disabled = true;
    submitButton.disabled = true;
    submitButton.classList.add('_disabled');
    resetButton.classList.add('_visible');
    

 }

 const  resetGame = () =>{
    guessCount = 1;
    guessField.disabled = false;
    submitButton.disabled = false;
    submitButton.classList.remove('_disabled');
    guessField.value = '';
    lastResult.textContent = '';
    prevGuesses.textContent = '';
    randomNumber = Math.floor(Math.random() *  100) +1;
    console.log(randomNumber);
    resetButton.classList.remove('_visible');
    prevGuesses.classList.remove('_visible');
    txt.style.display ='block';
    // guessField.focus();
 }

 const chechGuess = () => {
    let userGuess = Number(guessField.value);
   
    if(guessCount === 1 ) {
        prevGuesses.textContent = 'Previous guesses: ';
        prevGuesses.classList.add('_visible');
        lowOrHigh.classList.add('_visible');
       
    }
    prevGuesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.color =' #23B123'
        lowOrHigh.textContent = '';
        lowOrHigh.classList.remove('_visible');
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHigh.classList.remove('_visible');
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!!!';
        lastResult.style.color = 'red';
        if(userGuess > randomNumber) {
            lowOrHigh.textContent ='Last guess was too high!';
        
        } else if (userGuess < randomNumber) {
            lowOrHigh.textContent ='Last guess was too low!';
        
        }
        guessCount++;
        guessField.value = '';
        guessField.focus();
    }
 }

 document.addEventListener('click', e =>{ 
    const target = e.target
    if(target.closest('#submit-button')) {
        e.preventDefault();
        chechGuess();
    } else if (target.closest('#reset-btn')) {
        resetGame();
    }

    
 });

 guessField.addEventListener('focus', e => {
    txt.style.display= 'none';
   
 })