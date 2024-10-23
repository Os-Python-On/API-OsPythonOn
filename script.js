const question = [
    {
        question: "Qual é a definição de Scrum e qual a sua principal característica?",
        answers: [
            { text: "É uma metodologia ágil baseada em sprints que assegura revisões e aperfeiçoamentos constantes. ", correct: true },
            { text: "É um modelo de negócios tradicional que segue um cronograma fixo.", correct: false },
            { text: "É um sistema rígido de desenvolvimento de software.", correct: false },
            { text: "É uma técnica de gestão de tempo que não permite mudanças.", correct: false },
        ]
    },
    {
        question: "Qual á função do Scrum Master?",
        answers: [
            { text: " Ele é responsável pela gestão financeira do projeto.", correct: false },
            { text: "Ele decide as funcionalidades do produto a serem desenvolvidas.", correct: false },
            { text: "Ele garante que a equipe siga a metodologia Scrum, atuando como líder e facilitador.", correct: true },
            { text: "Ele elabora os documentos técnicos do projeto.", correct: false },
        ]
    },
    {
        question: "Qual é o principal objetivo do Dev Team dentro do Scrum?",
        answers: [
            { text: "Criar o produto através de design, teste e construção.", correct: true },
            { text: "Coordenar as reuniões diárias da equipe.", correct: false },
            { text: "Definir os requisitos do cliente para o projeto.", correct: false },
            { text: "Avaliar o desempenho do Product Owner.", correct: false },
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
    },
    {
        question: "Quais são os três principais pilares do Scrum?",
        answers: [
            { text: "Transparência, inspeção, adaptação.", correct: true },
            { text: "Planejamento, execução, finalização.", correct: false },
            { text: "Inovação, colaboração, eficiência.", correct: false },
            { text: "Análise, desenvolvimento, entrega.", correct: false },
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
