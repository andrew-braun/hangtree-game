# Hangtree Game

A learning project focusing on using JavaScript to create a sliding menu and a modal that fades in/out. Uses a simple profile/portfolio page as a base. Based on a project from [Brad Traversy's Vanilla JavaScript course](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842130#questions).

Uses WordsAPI to request random words, obscuring API key by making request through a Heroku proxy server that contains the key as an environment variable.

### Link to project

https://andrew-braun.github.io/hangtree-game/

## Functionality

- Generates random word and displays spaces on page
- Takes keystroke input and checks for correct answer
- Adds letters to word on correct answer
- Adds strokes to SVG tree on wrong answer
- Detects win and loss conditions
- "Play Again" resets game to initial state

## Concepts

- Game design
- SVG creation
- Helper functions
- Checking inputs
- API calls and key obfuscation

## Technologies

- HTML5
- CSS3
- Vanilla JS
- Heroku

## Planned Features

- Random word API (Done!)
- Reveal word on defeat (Done!)
- Show word definition on game end (Done!)
- Aesthetic overhaul (In progress)
- Better mobile experience
- Better tree
- "Guesses left" counter (Done!)
- Animations (Added: popup)
- Play again responds to enter key press (Done!)
- Make sure words are commonly-used/easy
- Add loading animation
- Add limited fallback dictionary in case random word API fails
