
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer  = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
let correctAnswers=0;
let attempt = 0;


// push the question into available questions array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion;i++){
        availableQuestions.push(quiz[i])
    }
}

//set quesion number , question and options
function getNewQuestion(){
    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get the pos of question index from the available question
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the question index from the available question array so that the question does not repeat
    availableQuestions.splice(index1,1);
    //set options
    // get the length of options
    const optionLen = currentQuestion.options.length;
    //push options into available options array
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML ='';
    let animationDelay=0.15;
    // create option in html
    for(let i=0;i<optionLen;i++){
        //random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the pos from the availoptions
        const index2 = availableOptions.indexOf(optonIndex);
        // remove the opton index from available options so that option does not repeat
        availableOptions.splice(index2,1);

        const option= document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id=optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++
}

// get the result of current attempt ques
function getResult(element){
    const id = parseInt(element.id);
    // get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        //set the green color to the correct optn
        element.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
         //set the red color to the wrong optn
         element.classList.add("wrong");
         // add the indicator to wrong mark
        updateAnswerIndicator("wrong");

         //if answer is wrong then dispplay correct ans
         const optionLen = optionContainer.children.length;
         for(let i=0;i<optionLen;i++){
             if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                 optionContainer.children[i].classList.add("correct");
             }
         }
    }
    attempt++;
    unclickableOptions();
}
// make all options unclickable once the user select a option
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quiz.length){
        
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    //hide quiz box
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
    quizResult();
}
// get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percen= (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percen.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / " + quiz.length;
}

function resetQuiz(){
    questionCounter=0;
    correctAnswers=0;
    attempt = 0;

}

function tryAgainQuiz(){
    //hide the resultBOx
    resultBox.classList.add("hide");
    //show the quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide result box
    resultBox.classList.add("hide");
    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}
// starting point

function startQuiz(){
    // hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    // first we will set all questions in available questions array
    setAvailableQuestions();
    // second we will call getquestion(); function
    getNewQuestion();
    // to create  indicator of answers
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}