const question = [
    {
        question: "Qual é o impacto da entrega incremental no Scrum?",
        answers: [
            { text: "Permite feedback e ajustes contínuos, aumentando a satisfação do cliente.", correct: true },
            { text: "Dificulta a entrega de valor ao cliente.", correct: false },
            { text: "Reduz o número de entregas realizadas.", correct: false },
            { text: "Impede a adaptação a novas demandas.", correct: false },
        ]
    },
    {
        question: "O que pode ser um desafio relacionado à resistência à mudança na implementação do Scrum?",
        answers: [
            { text: "A transição é sempre fácil e rápida.", correct: false },
            { text: "As equipes podem não se adaptar rapidamente a novas práticas.", correct: true },
            { text: "As equipes estão sempre abertas a novas metodologias.", correct: false },
            { text: "A resistência vem apenas de novos membros.", correct: false },
        ]
    },
    {
        question: "Qual é um dos principais desafios que equipes enfrentam em relação aos papéis no Scrum?",
        answers: [
            { text: "Todos entendem perfeitamente suas responsabilidades.", correct: false },
            { text: "A má compreensão dos papéis pode levar a conflitos e ineficiências.", correct: true },
            { text: "Os papéis são excessivamente simplificados e não precisam de atenção.", correct: false },
            { text: "Há uma total aceitação das mudanças pelos gestores.", correct: false },
        ]
    },
    {
        question: "Quais são alguns benefícios observados em empresas que utilizam Scrum, como Spotify e Microsoft?",
        answers: [
            { text: "Redução da comunicação entre as equipes.", correct: false },
            { text: "Maior flexibilidade e adaptação rápida a mudanças.", correct: true },
            { text: "Menor frequência de entregas de produtos.", correct: false },
            { text: "Aumento da burocracia nos processos.", correct: false },
        ]
    },
    {
        question: "Qual é uma lição importante aprendida com a aplicação do Scrum em empresas?",
        answers: [
            { text: "A comunicação não é necessária para o sucesso do projeto.", correct: false },
            { text: "A definição clara de papéis é fundamental para evitar confusões.", correct: true },
            { text: "Retrospectivas não impactam na melhoria contínua.", correct: false },
            { text: "O feedback do cliente deve ser evitado.", correct: false },
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