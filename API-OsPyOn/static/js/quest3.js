const question = [
    {
        question: "Quais são os princípios de auto-organização e cross-funcionalidade em equipes ágeis?",
        answers: [
            { text: "As equipes devem ser gerenciadas de forma rígida e hierárquica.", correct: false },
            { text: "As equipes são compostas por membros com habilidades complementares que se organizam autonomamente.", correct: true },
            { text: "Cada membro deve se especializar em uma única função.", correct: false },
            { text: "A equipe deve seguir um líder designado em todas as etapas do projeto.", correct: false },
        ]
    },
    {
        question: "O que é um Burndown Chart?",
        answers: [
            { text: "Um gráfico que representa o progresso do trabalho ao longo do tempo, mostrando quanto trabalho resta a ser feito.", correct: true },
            { text: "Um gráfico que mostra o tempo estimado para a entrega final do projeto.", correct: false },
            { text: "Um relatório de todos os erros encontrados no sistema.", correct: false },
            { text: "Um documento que descreve as atividades planejadas para o próximo sprint.", correct: false },
        ]
    },
    {
        question: "Como as metodologias tradicionais se diferenciam das metodologias ágeis?",
        answers: [
            { text: "O planejamento ocorre no início do projeto e o produto final é entregue após o desenvolvimento, sem revisões constantes.", correct: true },
            { text: "O planejamento é contínuo e se adapta a cada etapa do projeto.", correct: false },
            { text: "Elas não realizam levantamento de requisitos.", correct: false },
            { text: "Elas utilizam exclusivamente métodos visuais, como Kanban.", correct: false },
        ]
    },
    {
        question: "Como o Scrum se compara a outras metodologias ágeis, como Kanban e Extreme Programming?",
        answers: [
            { text: "O Scrum não permite mudanças durante o desenvolvimento.", correct: false },
            { text: "O Scrum se concentra em sprints curtos e revisões regulares, enquanto outras metodologias podem ser mais lineares ou improvisadas.", correct: true },
            { text: "O Scrum é menos flexível em comparação com as outras metodologias.", correct: false },
            { text: "O Scrum não utiliza feedback do cliente.", correct: false },
        ]
    },
    {
        question: "O que é fundamental no uso de Burndown Charts?",
        answers: [
            { text: "Monitoramento contínuo do progresso e previsão de finalização do trabalho.", correct: true },
            { text: "Aumento do número de tarefas a serem realizadas.", correct: false },
            { text: "Documentação detalhada de cada tarefa.", correct: false },
            { text: "Avaliação apenas ao final do projeto.", correct: false },
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
