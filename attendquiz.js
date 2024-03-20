// Variable declarations and function definitions go here

const questions = [
    {
        question: "What is the purpose of a VPN (Virtual Private Network) in computer networking?",
        answers: [
            { text: " To encrypt and secure internet connections", correct: true },
            { text: " To increase the speed of data transmission", correct: false },
            { text: " To create virtual servers", correct: false },
        ]
    },
    {
        question: "Which encryption algorithm is commonly used for securing online communications via HTTPS?",
        answers: [
            { text: "RSA", correct: true },
            { text: "AES", correct: false },
            { text: "SHA", correct: false },
        ]
    },
    {
        question: "What is the purpose of a CDN (Content Delivery Network) in web development?",
        answers: [
            { text: "To manage domain names", correct: false },
            { text: "To secure database connections", correct: false },
            { text: "To optimize website performance by caching content closer to users", correct: true },
        ]
    },
    {
        question: "Which data structure is typically used for implementing LIFO (Last In, First Out) behavior?",
        answers: [
            { text: "Stack", correct: true },
            { text: " Queue", correct: false },
            { text: "Linked List", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;

        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = You scored ${score} out of ${questions.length}!;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function updateLocalStorage() {
    const state = { currentQuestionIndex, score };
    localStorage.setItem('quizState', JSON.stringify(state));
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
        localStorage.removeItem('quizState');
    }
    updateLocalStorage();
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

// Check if there's any previously saved state in localStorage
const quizState = JSON.parse(localStorage.getItem('quizState'));

// Initialize or load quiz based on the stored state
if (quizState) {
    currentQuestionIndex = quizState.currentQuestionIndex;
    score = quizState.score;
    showQuestion();
} else {
    startQuiz();
}
