const answer = document.querySelector(".answer");
let faqs;
const loadAnswer = (faq) => {
    console.log("ejecutado");
    answer.textContent = faq.answer;
}
const selectButton = (i) => {
    const buttons = document.querySelectorAll(".questions ul li button")
    console.log(buttons);
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        if (index == i) {
            button.id = "buttonSelected";
        } else {
            button.id = "";
        }
    }
}
function selectQuestion(i) {
    //funcion hecha para q no se refiera a la referencia de i sino al valor 
    // de i al momento de agregarlo como evento
    return function () {
        console.log(i);
        loadAnswer(faqs[i]);
        selectButton(i);
    }
}
const loadQuestions = () => {
    const questionsUl = document.querySelector(".questions ul");
    let i = 0;
    faqs.forEach(faq => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        questionsUl.appendChild(li);
        li.appendChild(button);
        button.textContent = faq.question;
        button.addEventListener("click", selectQuestion(i));
        i++;
    });
}

fetch("../faq/faqs.json")
    .then(response => response.json())
    .then(
        param => {
            faqs = param;
            loadQuestions();
            const sq0 = selectQuestion(0);
            sq0();
        }
    );

