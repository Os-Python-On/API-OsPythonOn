const question = [
    {
        question: "Qual é a responsabilidade do PO?",
        answers: [
            { text: "Conversar o cliente para descobrir os requisitos do produto.", correct: true },
            { text: "Coordenar o time, distribuindo as tarefas para cada pessoa.", correct: false },
            { text: "Ser comunicativo e conversar com o cliente para tranquilizá-lo sobre o produto.", correct: false },
            { text: "Ter conhecimento técnico e concluir os requisitos dados pelo cliente.", correct: false },
        ]
    },
    {
        question: "Por que o Product Owner é considerado a voz do cliente dentro da equipe?",
        answers: [
            { text: "Porque ele decide sozinho quais serão os requisitos do projeto.", correct: false },
            { text: "Porque ele faz parte da equipe do cliente.", correct: false },
            { text: "Porque ele representa as necessidades do cliente para o time.", correct: true },
            { text: "Porque ele se reporta diretamente ao CEO da empresa.", correct: false },
        ]
    },
    {
        question: "Por que é importante que o Product Owner tenha uma visão crítica em relação às exigências do cliente?",
        answers: [
            { text: "Para evitar aceitar demandas que sobrecarreguem a equipe", correct: true },
            { text: "Para decidir quais membros da equipe podem trabalhar em cada tarefa", correct: false },
            { text: "Para saber quais tecnologias usar no desenvolvimento", correct: false },
            { text: "Para aceitar todas as exigências e agradar o cliente", correct: false },
        ]
    },
    {
        question: "Quais habilidades são essenciais para um bom Product Owner?",
        answers: [
            { text: "Habilidades técnicas avançadas e experiência em programação", correct: false },
            { text: "Especialização em design gráfico e testes de software", correct: false },
            { text: "Visão crítica, comunicação, interesse, capacidade de fazer boas perguntas e trabalho em equipe", correct: true },
            { text: "Capacidade de gerenciar o orçamento do projeto e liderança", correct: false },
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
    nextButton.style.display = "none";  // Oculta o botão inicialmente
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        button.dataset.correct = answer.correct;
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";  // Oculta o botão "Next" até que uma resposta seja selecionada
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);  // Remove os botões de resposta antigos
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    
    if (correct) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;  // Desabilita todos os botões após a seleção
        if (button.dataset.correct === "true") {
            button.classList.add("correct");  // Marca a resposta correta
        }
    });

    nextButton.style.display = "block";  // Exibe o botão "Next" após a seleção da resposta
}

nextButton.addEventListener("click", handleNextQuestion);

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();  // Exibe o placar final quando todas as perguntas são respondidas
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${question.length}!`;
    nextButton.innerHTML = "Reiniciar";
    nextButton.style.display = "block";

    // Atualiza o evento do botão "Next" para reiniciar o quiz corretamente
    nextButton.removeEventListener("click", handleNextQuestion);
    nextButton.addEventListener("click", restartQuiz);
}

function restartQuiz() {
    // Reseta o evento de clique para funcionar como "Next" novamente
    nextButton.removeEventListener("click", restartQuiz);
    nextButton.addEventListener("click", handleNextQuestion);
    
    // Reinicia o quiz
    startQuiz();
}

// Inicia o quiz na primeira vez
startQuiz();