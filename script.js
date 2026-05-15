const homeScreen = document.getElementById("homeScreen");
const studyScreen = document.getElementById("studyScreen");
const editScreen = document.getElementById("editScreen");


const studyButton = document.getElementById("studyButton");
const editButton = document.getElementById("editButton");


const backFromStudy = document.getElementById("backFromStudy");
const backFromEdit = document.getElementById("backFromEdit");


const addPageButton = document.getElementById("addPageButton");

const pageScreen = document.getElementById("pageScreen");
const pageTitle = document.getElementById("pageTitle");
const backFromPage = document.getElementById("backFromPage");

const addQuestionButton = document.getElementById("addQuestionButton");
const questionList = document.getElementById("questionList");

const studyPageList = document.getElementById("studyPageList");

const questionArea = document.getElementById("questionArea");

const studyQuestion = document.getElementById("studyQuestion");
const studyAnswer = document.getElementById("studyAnswer");

const answerArea = document.getElementById("answerArea");

const showAnswerButton = document.getElementById("showAnswerButton");
const nextQuestionButton = document.getElementById("nextQuestionButton");

let currentStudyPage = "";
let currentQuestion = null;
let currentPage = "";

const pageList = document.getElementById("pageList");


let pages = JSON.parse(localStorage.getItem("pages")) || {};

function savePages() {
    localStorage.setItem("pages", JSON.stringify(pages));
}

function displayQuestions() {

    questionList.innerHTML = "";

    const questions = pages[currentPage];

    questions.forEach((item) => {

        const div = document.createElement("div");

        div.className = "page-item";

        div.innerHTML = `
            <strong>問題:</strong> ${item.question}<br>
            <strong>答え:</strong> ${item.answer}<br><br>

            <button class="delete-question-button">
                この問題を削除
            </button>
        `;

        const deleteButton = div.querySelector(".delete-question-button");

        deleteButton.addEventListener("click", () => {

            const check = confirm("この問題を削除しますか？");

            if (!check) return;

            const newQuestions = pages[currentPage].filter((q) => {

                return q.question !== item.question;

            });

            pages[currentPage] = newQuestions;

            savePages();

            displayQuestions();

        });

        questionList.appendChild(div);

    });
}

function displayStudyPages() {

    studyPageList.innerHTML = "";

    Object.keys(pages).forEach((pageName) => {

        const div = document.createElement("div");

        div.className = "page-item";

        div.textContent = pageName;
        
        studyPageList.appendChild(div);

    });
}

function showRandomQuestion() {

    const questions = pages[currentStudyPage];

    if (questions.length === 0) {

        alert("問題がありません");
        return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

    studyQuestion.textContent = currentQuestion.question;
    studyAnswer.textContent = "";

    questionArea.style.display = "block";
}

function displayPages() {

    pageList.innerHTML = "";

    Object.keys(pages).forEach((pageName) => {

        const div = document.createElement("div");

        div.className = "page-item";

        div.innerHTML = `
            <span>${pageName}</span>

            <button class="delete-page-button">
                削除
            </button>
        `;

        const pageNameSpan = div.querySelector("span");

        const deleteButton = div.querySelector(".delete-page-button");

        deleteButton.addEventListener("click", (event) => {

            event.stopPropagation();

            const check = confirm(`${pageName} を削除しますか？`);

            if (!check) return;

            delete pages[pageName];

            savePages();

            displayPages();

        });

        pageNameSpan.addEventListener("click", () => {

            currentPage = pageName;

            pageTitle.textContent = currentPage;

            displayQuestions();

            showScreen(pageScreen);

        });

        pageList.appendChild(div);

    });
}

function showScreen(screen) {

    homeScreen.style.display = "none";
    studyScreen.style.display = "none";
    editScreen.style.display = "none";
    pageScreen.style.display = "none";

    screen.style.display = "block";
}

studyButton.addEventListener("click", () => {

    displayStudyPages();

    questionArea.style.display = "none";

    showScreen(studyScreen);

});

editButton.addEventListener("click", () => {
    showScreen(editScreen);
});

backFromStudy.addEventListener("click", () => {
    showScreen(homeScreen);
});

backFromEdit.addEventListener("click", () => {
    showScreen(homeScreen);
});

addPageButton.addEventListener("click", () => {

    const pageName = prompt("ページ名を入力してください");

    if (!pageName) return;

    if (pages[pageName]) {

        alert("同じ名前のページがあります");
        return;
    }

    pages[pageName] = [];

    savePages();

    displayPages();

});

displayPages();

backFromPage.addEventListener("click", () => {
    showScreen(editScreen);
});

addQuestionButton.addEventListener("click", () => {

    const question = prompt("問題を入力してください");
    if (!question) return;

    const answer = prompt("答えを入力してください");
    if (!answer) return;

    const duplicate = pages[currentPage].find((item) => {

       return (
            item.question === question ||
            item.answer === answer
        );

    });

    if (duplicate) {

        alert("同じ問題または答えがあります");
        return;
    }

    pages[currentPage].push({
        question: question,
        answer: answer
    });

    savePages();

    displayQuestions();

});

showAnswerButton.addEventListener("click", () => {

    studyAnswer.textContent = currentQuestion.answer;

});

nextQuestionButton.addEventListener("click", () => {

    showRandomQuestion();

});