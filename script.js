const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const submitBtn = document.querySelector('.submitBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const nextBtn = document.querySelector('.nextBtn');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. How do you remove the last element from an array?",
        choices: ["removeLast()", "deleteLast()", "pop()", "splice()"],
        answer: "pop()"
    },
    {
        question: "Q. What is the correct way to declare a variable in JS?",
        choices: ["variable x = 10", "var x = 10", "x = 10", "int x = 10"],
        answer: "var x = 10"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. How do you add an element to the end of an array?",
        choices: ["add()", "push()", "append()", "concat()"],
        answer: "push()"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
let flag = 0;
let right = 0;
let timeUp = 0;
let time = 0;
let timeOut;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    nextBtn.classList.add("disabled");
    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');

        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');

        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            const demo = document.querySelectorAll(".choice");
            console.log(demo);
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');

            }
            else {
                for (let j = 0; j < 4; j++) {
                    demo.forEach(element => {
                        if (element.classList.contains('selected')) element.classList.remove('selected');
                    });
                }
            }
            choiceDiv.classList.add('selected');

        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        console.log("right");
        // alert("Correct Answer!");
        right = 0;
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        right = 1;
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    setTimeout(() => {
        if (time !== 1) {
            nextQuestion();
        }
        else {
            time = 0;
        }

    }, 3000);
}

// Function to display next question
const nextQuestion = () => {

    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        stopTimer();
        removeTimer();
        if (time === 1) {
            console.log("next")
            setTimeout(() => {
                showQuestions();
                startTimer();
            }, 500);
        }
        else {
            showQuestions();
            startTimer();
        }
    }
    else {
        stopTimer();
        removeTimer();
        if (time === 1) {
            setTimeout(() => {
                showScore();
            }, 500);
        }
        else {
            showScore();
        }
    }
}

// Function to show score
const showScore = () => {
    nextBtn.style.display = "none"
    questionBox.textContent = "You have completed the Quiz."
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    if (flag == 0) displayAlert("You have completed this quiz!");
    flag = 0;
    submitBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    if (right == 1) {
        right = 0;
        alert.style.backgroundColor = "#f41e1e";
    }
    else if (right == 2) {
        alert.style.backgroundColor = "grey"
    }
    else {
        alert.style.backgroundColor = "#5d9b63";
    }

    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 3000);
}

// Function to Start Timer
const startTimer = () => {

    timer.style.display = "flex";
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 5) {
            nextBtn.classList.remove("disabled");
        }
        if (timeLeft === 0) {
            right = 2;
            timeUp = 1;
            nextQuestion();
            nextBtn.classList.add("disabled");
            displayAlert(`No answer selected. ${quiz[currentQuestionIndex].answer} is the correct answer`)
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () => {
    container.style.display = "block";
    console.log(123)
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Function to remove time
const removeTimer = () => {
    timer.style.display = "none";
}



nextBtn.addEventListener('click', () => {
    if (nextBtn.classList.contains('disabled')) return;
    // timeLeft = 15;
    alert.style.display = "none";
    time = 1;
    nextQuestion();
})


submitBtn.addEventListener('click', () => {

    nextBtn.classList.remove("disabled");
    console.log("removed")
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && submitBtn.textContent === "Submit") {

        // alert("Select your answer");
        nextBtn.classList.add("disabled");

        right = 2;
        displayAlert("Select your answer");
        return;
    }
    
    stopTimer();
    if (quizOver) {
        submitBtn.textContent = "Submit";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        nextBtn.style.display = "block"
        nextBtn.classList.add("disabled");
        startQuiz();
    }
    else {
        setTimeout(() => {
            checkAnswer();
        }, 500);
    }
});

window.onload = startQuiz(); // To load first question upon reloading
