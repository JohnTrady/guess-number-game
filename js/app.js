'use sctrict';

import {isMobile} from "../js/isMobile.js";
const lastResult = document.getElementById('last-result');
const guessField  =document.getElementById('guess-field');
const submitButton = document.getElementById('submit-button');
const prevGuesses = document.getElementById('previous-guesses');
const lowOrHigh = document.getElementById('low-or-high');
const resetButton = document.getElementById('reset-btn');
const txt = document.getElementById('text');
const numpad = document.getElementById('numpad');
let randomNumber = Math.floor(Math.random() *  100) +1;
let guessCount = 1;
console.log(randomNumber);
guessField.value = '';
let lastDigit = guessField.value.length - 1;

const setGameOver = () => {
    guessField.disabled = true;
    submitButton.setAttribute('data-btn', 'reset');
    submitButton.textContent ='Start New Game'
    

 }

 const  resetGame = () =>{
    guessCount = 1;
    guessField.disabled = false;
    guessField.value = '';
    lastResult.textContent = '';
    prevGuesses.textContent = '';
    randomNumber = Math.floor(Math.random() *  100) +1;
    console.log(randomNumber);
    prevGuesses.classList.remove('_visible');
    submitButton.setAttribute('data-btn', 'submit');
    submitButton.textContent = 'Submit';
    txt.style.display = 'none';
    numpad.classList.add('_visible');
    if(!isMobile.any()) guessField.focus();
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
        if(!isMobile.any()) guessField.focus();
    }
 }

 document.addEventListener('click', e =>{ 
    const target = e.target
    if(target.closest('[data-btn="submit"]')) {
        e.preventDefault();
        chechGuess();
    } else if (target.closest('[data-btn="reset"]')) {
        e.preventDefault();
        resetGame();
    }

    if (target.closest('.numpad-num')) {
        guessField.value += target.textContent;
    } else if (target.closest('.numpad-clear')) {
        guessField.value = guessField.value.slice(0, -1);
    }

    
 });

