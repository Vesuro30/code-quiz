# 04 Web APIs: Code Quiz

## Your Task

At some point in your journey to become a full-stack web developer, you’ll likely be asked to complete a coding assessment&mdash;perhaps as part of an interview process. A typical coding assessment includes both multiple-choice questions and interactive coding challenges.

To help familiarize you with these tests and allow you to use the skills covered in this module, this Challenge invites you to build a timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface.

This week’s coursework will equip you with all the skills you need to succeed in this assignment.

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

This script runs behind an html page in order to implement a "quiz" in which
n-number of questions can be asked (presented on the webpage along with n-number
of multiple-choice answers). The quiz-taker starts the quiz with a button push,
which presents the first question and starts a count-down clock.
Answers are submitted by clicking on the desired answer. If the answer is correct,
a subsequent question and its associated answer choices are presented. If the
answer is incorrect, the participant is shown an "incorrect" message and the time
remaining on the clock is reduced by a defined number of seconds as a penalty
for submitting an incorrect answer. The participant is not shown another question
until s/he has answered the current one correctly.
The quiz ends upon either of the following conditions:
• All questions have been answered correctly
• The count-down clock reaches zero

    The count-down clock is stopped when the quiz ends, and the time remaining is shown.

    Upon quiz conclusion, the participant is asked for his/her name, and that name,
    along with the time remaining, are stored in the browser's local storage.

define the questions, their answer choices, and the number of the correct answer
• "questions" is an array of question objects, with each object containing a question,
the multiple-choice answers for the question, and the identity of the correct answer

• each question object is structured as:
Property q string The question text
a array of strings Each answer text
c integer Number of correct answer
