const question = [
    {
        question: "Qual é uma das principais funcionalidades do Jira?",
        answers: [
            { text: "Desenvolvimento de software sem suporte a metodologias ágeis.", correct: false },
            { text: "Gestão de backlog, planejamento de sprints e acompanhamento do progresso da equipe.", correct: true },
            { text: "Apenas organização de e-mails.", correct: false },
            { text: "Criação de gráficos de vendas.", correct: false },
        ]
    },
    {
        question: "O que caracteriza o Trello como uma ferramenta para gestão de projetos?",
        answers: [
            { text: "Foco exclusivo em sprints de longa duração.", correct: false },
            { text: "Baseado na metodologia Kanban, permite organizar tarefas em listas.", correct: true },
            { text: "Não possui personalização de quadros.", correct: false },
            { text: "É voltado apenas para grandes empresas.", correct: false },
        ]
    },
    {
        question: "Como o Scrum pode facilitar a transformação digital nas empresas?",
        answers: [
            { text: "Impede a colaboração entre equipes.", correct: false },
            { text: "Promove flexibilidade, melhorias contínuas e entregas frequentes para gerar valor rapidamente.", correct: true },
            { text: "Foca apenas em processos rígidos.", correct: false },
            { text: "Não tem impacto na comunicação com o cliente.", correct: false },
        ]
    },
    {
        question: "Qual é um dos princípios do Scrum na transformação digital?",
        answers: [
            { text: "Centralização nos processos e hierarquia rígida.", correct: false },
            { text: "Centralização no cliente, colaboração e transparência na comunicação.", correct: true },
            { text: "Ignorar as necessidades do usuário final.", correct: false },
            { text: "Resistência a mudanças constantes.", correct: false },
        ]
    },
    {
        question: "Como o Scrum contribui para a satisfação do usuário final?",
        answers: [
            { text: "Focando em entregas pontuais sem feedback.", correct: false },
            { text: "Entregando incrementos frequentes de valor que atendem às necessidades do cliente.", correct: true },
            { text: "Ignorando o feedback do cliente durante o desenvolvimento.", correct: false },
            { text: "Mantendo os produtos inalterados até o final do projeto.", correct: false },
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