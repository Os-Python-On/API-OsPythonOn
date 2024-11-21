const question = [
    {
        question: "Qual é a função do Definition of Done (DoD) no contexto de desenvolvimento ágil?",
        answers: [
            { text: "Definir as regras e normas da equipe.", correct: false },
            { text: "Avaliar o desempenho individual dos membros da equipe após cada sprint.", correct: false },
            { text: "Criar um cronograma para a realização de sprints.", correct: false },
            { text: "Estabelecer o valor mínimo necessário que uma entrega deve ter para ser considerada completa.", correct: true },
        ]
    },
    {
        question: "Qual é a principal importância do Time-boxing no gerenciamento de projetos ágeis?",
        answers: [
            { text: "Aumentar a quantidade de tarefas em andamento simultaneamente.", correct: false },
            { text: "Ele decide as funcionalidades do produto a serem desenvolvidas.", correct: false },
            { text: "Melhorar a previsibilidade do progresso e forçar a priorização das atividades a serem entregues.", correct: true },
            { text: "Prolongar o tempo necessário para a entrega das tarefas.", correct: false },
        ]
    },
    {
        question: "O que caracteriza um Definition of Ready (DoR) na metodologia Scrum?",
        answers: [
            { text: "Um documento que finaliza o projeto após a entrega.", correct: false },
            { text: "Um registro dos feedbacks recebidos do cliente ao longo do projeto.", correct: false },
            { text: "A definição clara de quando uma tarefa está pronta para ser iniciada pela equipe de desenvolvimento.", correct: true },
            { text: "Um cronograma de reuniões para revisão de tarefas.", correct: false },
        ]
    },
    {
        question: "O que representa um Increment em um projeto Scrum?",
        answers: [
            { text: "Apenas os itens do product backlog que não foram completados.", correct: false },
            { text: "Um documento de planejamento que descreve o próximo sprint.", correct: false },
            { text: "Um conjunto de tarefas que ainda precisam ser feitas.", correct: false },
            { text: "A soma de todos os itens do product backlog que foram completados durante um sprint, incluindo incrementos anteriores.", correct: true },
        ]
    },
    {
        question: "De que maneira as iterações influenciam a equipe de desenvolvimento durante um projeto?",
        answers: [
            { text: "Permitem que a equipe ajuste suas atividades com base nas novas demandas do cliente a cada sprint.", correct: true },
            { text: "Elas aumentam a carga de trabalho de cada membro da equipe.", correct: false },
            { text: "Tornam o projeto menos flexível ao impor regras rígidas.", correct: false },
            { text: "Exigem mais tempo para concluir cada tarefa, reduzindo a eficiência.", correct: false },
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