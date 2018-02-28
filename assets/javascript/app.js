$( document ).ready(function(){

// Hides Screens Until Ready
// $("#questionScreen").hide();
// $("#resultsScreen").hide();
     
// Create Array Of Objects For Questions
var questions = [
   
    questionOne = {
        question: "What Time Is 10pm?",
        rightAnswer: "10pm",
        wrongAnswerOne: "12pm",
        wrongAnswerTwo: "8pm",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},
    
    questionTwo = {
        question: "Whats up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionThree = {
        question: "Wadfzsds up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionFour = {
        question: "asdfjk;as up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionFive = {
        question: "Wasdkfad;slkj;s up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionSix = {
        question: "Wasdfas up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionSeven = {
        question: "Wkjasdfs up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionEight = {
        question: "Weraeer up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionNine = {
        question: "yep up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},

    questionTen = {
        question: "adlkj up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "3pm",
        fact: "stuff to add"},
    ];

// Stores Objects That Are Picked To Prevent Duplicate Q&A 
var alreadyPickedQ = [];
var answerPosition = [0,1,2,3];

// The Array Position For The Question
var pick;

// Question Cooresponding To The Picked Array Position
var questionSelected;

// The Array Position For Answers
var answerSpot; 

// Correct Guesses
var correctCount = 0;

// Wrong Guesses
var wrongCount = 0;

// Intervals On Transition Screen
var transitionTime = 10;

// Number Of Questions Asked
var questionCount = 0;
var questionsRemaining = 10; 

// Sets Countdown For Transition Timer
var transInterval;

// Sets Countdown For Guess Timer
var guessInterval

// Amount Of Time For A Guess
var guessTime;

// Sets The Timout Delay For A Guess
var guessTimeout;

// Sets The Timeout Delay For Transition
var transTimeout;

// =============================================================

// Function - Starts The Game
function startGame(){
    alreadyPickedQ = [];
    correctCount = 0;
    wrongCount = 0;
    questionCount=0; 
    questionsRemaining = 10;
    clearInterval(transInterval);
    clearInterval(guessInterval);
    clearTimeout(guessTimeout);
    nextQuestion();
    $("#correctCount").text(correctCount);
    $("#wrongCount").text(wrongCount);
    $("#questionsLeft").text(questionsRemaining);
    // $("#playAgain").hide();
}

// Function - Advances To Another Question
function nextQuestion(){
    $("#startScreen").hide();
    $("#resultsScreen").hide();
    $("#questionScreen").show();
    pickQuestion();
    answerShuffle();
    questionCount++;
    console.log("Question Count: " + questionCount);

    // Resets The Transition Timer So Its Ready When Called Next
    clearInterval(transInterval);
    transitionTime=10;
    $("#countDown").text(transitionTime);

    // Initiates Guess Timer
    guessTimer();
}

// Function - Randomly Picks Question Array Spot & Verifies Only Asked Once
function pickQuestion() {
    pick = Math.floor(Math.random() * 10);
    if (alreadyPickedQ.indexOf(pick) > -1 && alreadyPickedQ.length < 10) {
    
        while (alreadyPickedQ.indexOf(pick) > -1) {
            pick = Math.floor(Math.random() * 10);
        }      
    }
    alreadyPickedQ.push(pick);
    console.log("Question Pick Number: " + pick);
    console.log("Already Picked Array: " + alreadyPickedQ);

    questionSelected = questions[pick];
    console.log("Question Selected Is: " + questionSelected.question);
    $("#questionBox").text(questionSelected.question);
    return questionSelected;
}

// Function - Randomly Shuffles Answers 
function answerShuffle() {
    answerPositions = [];
    for (var i = 0; i < 4; i++){
        
        // Note: Array spots are between 1 and 4 since spot one on object is the question
        answerSpot = Math.ceil(Math.random() * 4);
        if (answerPositions.indexOf(answerSpot) > -1){
            
            while (answerPositions.indexOf(answerSpot) > -1) {
                answerSpot = Math.ceil(Math.random() * 4);
            } 
        }
        answerPositions.push(answerSpot);
        console.log("Answer Spot Picked: " + answerSpot);
    }
    
    console.log("Answer Positions Array: " + answerPositions);
    
    // Assigns The Question To The HTML and Check Attribute
    $("#1").text(questionSelected.rightAnswer);
    $("#1").attr("check", "right");
    $("#2").text(questionSelected.wrongAnswerOne);
    $("#2").attr("check", "wrong");
    $("#3").text(questionSelected.wrongAnswerTwo);
    $("#3").attr("check", "wrong");
    $("#4").text(questionSelected.wrongAnswerThree);
    $("#4").attr("check", "wrong");

    // Good Example
    // $('#' + answerPosition[0]).text("test place");
    // console.log('"#' + answerPosition[0] +'"');
}

// Function - Checks Guess
function checkAnswer(){
    $("#startScreen").hide();
    $("#resultsScreen").show();
    $("#questionScreen").hide();
    questionsRemaining--;
    console.log("Questions Remaining: " + questionsRemaining);
    $("#questionsLeft").text(questionsRemaining);
    
    // Game End Check
    if(questionsRemaining === 0){
        $("#correctCount").text(correctCount);
        $("#resultsMessage").text("Correct!");
        $("#correctMessage").text("The Right Answer Was: " + questionSelected.rightAnswer);
        $("#countDownHeader").hide();
        $("#countDown").text("Game Over!");
        $("#playAgain").show();
    }

    else{
       
        // Resets The Guess Timer So Its Ready When Called Next
        clearInterval(guessInterval);
        clearTimeout(guessTimeout);
        guessTime=30;
        $("#guessTimer").text(guessTime);

        // Initiates Transition Timer
        transTimer();

        // Assigns The "Check" Parameter Of The Selected Div To A Guess Var
        userGuess = $(this).attr("check");
        console.log("this is: " +userGuess);

        // Updates Messages & Count If User Is Right Or Wrong
        if(userGuess === "right"){
            correctCount++;
            $("#correctCount").text(correctCount);
            $("#resultsMessage").text("Correct!");
            $("#correctMessage").text("The Right Answer Was: " + questionSelected.rightAnswer);
            $("#fact").text(questionSelected.fact);
        }
        
        else {
            wrongCount++;
            $("#wrongCount").text(wrongCount);
            $("#resultsMessage").text("Incorrect!");
            $("#correctMessage").text("The Right Answer Was: " + questionSelected.rightAnswer);
            $("#fact").text(questionSelected.fact);
        }
    }
}

// Function - Sets The Transition Timer When Called
function transTimer(){
    
    // Clears Any Prior Intervals
    clearInterval(transInterval);
    transitionTime = 10;
    $("#countDown").text(transitionTime);
    
    // Sets Countdown Timer Using The Nested Fuction Below
    transInterval = setInterval(function(){transTimer()}, 1000);
    
    // Advances To Next Question At End Of Timer
    transTimeout = setTimeout( nextQuestion, 10000);

    // Transition Screen Timer Countdown
    function transTimer(){
        transitionTime--;
        $("#countDown").text(transitionTime);
    }
}

// Function - Sets The Guess Timer When Called
function guessTimer(){
    
    // Clears Any Prior Intervals
    clearInterval(guessInterval);
    clearTimeout(guessTimeout);
    guessTime = 30;
    $("#guessTimer").text(guessTime);
    
    // Sets Countdown Timer Using The Nested Fuction Below
    guessInterval = setInterval(function(){guessTimer()}, 1000);
    
    // Advances To Check Answer At End Of Timer
    guessTimeout = setTimeout(checkAnswer, 30000);

    // Transition Screen Timer Countdown
    function guessTimer(){
        guessTime--;
        // Adds Updated Counter To Screen
        $("#guessTimer").text(guessTime);
    }
}

// On Click For Starting Game
$("#playButton").on("click", startGame);
$("#playAgain").on("click", startGame);

// On Click For Guesses
$(".answerBtn").on("click", checkAnswer);



// Display Welcome Screen - include message, counters for questions right vs. wrong, start button, instructions.  lets do a message at top with four big buttons to click on. lets go retro cartoons.

// Display radom question and multiple choice answers - maybe use an object to reflect the right q & a pair while putting all objects into an array to drop in random options

// have a timer start with game start that transitions to next screen if not answered in time

// Let user log a guess and transition to tnext screen if answered - log if answer is right or wrong

// Show transition screen after guess - have a function for transitions that shows messages for if right or wrong maybe with a variable that stores if last question was right 

// initiate function that advances question - change the html with transition screen then have timer to show new information from array and reset timer

// after a set number of questions end the game, show score, and ask to play again

// Functions
// Check Answer - add object key to each div via property value and look for if button val === object 
 
});