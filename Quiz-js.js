const questions = [
    {
        question: "En quelle classe sont Miyuki et Kaguya au début de l'animé ?",
        answers: [
            { text: "3ème", correct: false },
            { text: "Seconde", correct: true },
            { text: "Première", correct: false },
            { text: "Terminale", correct: false }
        ],
        multiple: false
    },
    {
        question: "Chika triche tout le temps aux jeux.",
        answers: [
            { text: "Vrai", correct: true },
            { text: "Faux", correct: false }
        ],
        multiple: false
    },
    {
        question: "Qui est Ai Hayasaka pour Kaguya ?",
        answers: [
            { text: "Son amie", correct: true },
            { text: "Sa servante", correct: true },
            { text: "Sa confidente", correct: true },
            { text: "Sa cuisinière", correct: false }
        ],
        multiple: true
    },
    {
        question: "Quand Mini-Kaguya apparait ?",
        answers: [
            { text: "Quand elle est heureuse", correct: true },
            { text: "Quand elle est amoureuse", correct: false },
            { text: "Quand elle fuit la réalité", correct: true },
            { text: "Quand elle est fatiguée", correct: true }
        ],
        multiple: true
    },
    {
        question: "De quoi Ishigami a peur ?",
        answers: [
            { text: "Du noir", correct: false },
            { text: "Des filles", correct: false },
            { text: "De Kaguya", correct: true },
            { text: "Du regard des autres", correct: true }
        ],
        multiple: true
    },
    {
        question: "Qu'elle phrase iconique de l'animée redoute tant Miyuki de venir de Kaguya ?",
        answers: [
            { text: "Nerd", correct: false },
            { text: "Za Warudo", correct: false },
            { text: "Ratio", correct: false },
            { text: "Comme c'est mignon", correct: true }
        ],
        multiple: false
    },
    {
        question: "Iino miko appartient au commité de discipline.",
        answers: [
            { text: "Vrai", correct: true },
            { text: "Faux", correct: false },
        ],
        multiple: false
    },
    {
        question: "Quel métier Chika aime jouer lorsqu'elle entend des ragots ?",
        answers: [
            { text: "La Juge", correct: false },
            { text: "La Sportive", correct: false },
            { text: "La Policière", correct: false },
            { text: "La Détective", correct: true }
        ],
        multiple: false
    },
    {
        question: "Quel est le surnom de Kaguya ?",
        answers: [
            { text: "Mini Kaguya", correct: false },
            { text: "La reine de glace", correct: true },
            { text: "Shinomiya", correct: false },
            { text: "L'intello", correct: false }
        ],
        multiple: false
    },
    {
        question: "Ishigami est secrétaire du BDE.",
        answers: [
            { text: "Vrai", correct: false },
            { text: "Faux", correct: true },
        ],
        multiple: false
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
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
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Désactivez uniquement le bouton actuel, car il s'agit d'une question à choix multiple
    selectedBtn.disabled = true;

    // Si la question est à choix unique, désactivez tous les boutons après avoir sélectionné une réponse
    if (!questions[currentQuestionIndex].multiple) {
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
        });
    }

    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `Tu as eu ${score} sur ${questions.length} bonnes réponses!`;
    nextButton.innerHTML = "Jouer à nouveau";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();