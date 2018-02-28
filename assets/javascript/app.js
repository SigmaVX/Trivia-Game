$( document ).ready(function(){

// Hides Screens Until Ready
$("#questionScreen").hide();
$("#resultsScreen").hide();
     

// Create Array Of Objects For Questions
var questions = [
   
    questionOne = {
        question: "What Time Is 10pm?",
        rightAnswer: "10pm",
        wrongAnswerOne: "12pm",
        wrongAnswerTwo: "8pm",
        wrongAnswerThree: "3pm"},
    
    questionTwo = {
        question: "Whats up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionThree = {
        question: "Wadfzsds up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionFour = {
        question: "asdfjk;as up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionFive = {
        question: "Wasdkfad;slkj;s up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionSix = {
        question: "Wasdfas up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionSeven = {
        question: "Wkjasdfs up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionEight = {
        question: "Weraeer up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionNine = {
        question: "yep up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},

    questionTen = {
        question: "adlkj up?",
        rightAnswer: "yes",
        wrongAnswerOne: "no",
        wrongAnswerTwo: "not",
        wrongAnswerThree: "nope"},
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

console.log(questionOne.question);
console.log(questions[0].question);
console.log(questions[0][1]);




// Fuction For Picking Questions
// math random on array
// display that question



function startGame(){
    $("#startScreen").hide();
    $("#questionScreen").show();
    alreadyPickedQ = [];
    correctCount = 0;
    wrongCount = 0;
    nextQuestion();   
}

function nextQuestion(){
    pickQuestion();
    answerShuffle();
    questionCount++;
}



// Randomly Picks Question Array Spot & Verifies Only Asked Once
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


// Randomly Shuffles Answers 
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
    
    $("#answerOne").text(questionSelected.rightAnswer);
    $("#answerOne").attr("check", "right");
    $("#answerTwo").text(questionSelected.wrongAnswerOne);
    $("#answerTwo").attr("check", "wrong");
    $("#answerThree").text(questionSelected.wrongAnswerTwo);
    $("#answerThree").attr("check", "wrong");
    $("#answerFour").text(questionSelected.wrongAnswerThree);
    $("#answerFour").attr("check", "wrong");
    
}

// Check Guesses
function checkAnswer(){
    $("#questionScreen").hide();
    $("#resultsScreen").show();
    
    // Put Check Parameter Of The Selected Div In A Var
    userGuess = $(this).attr("check");
    console.log("this is: " +userGuess);

    if(userGuess === "right"){
        correctCount++;
        $("#correctCount").text(correctCount);
        $("#resultsMessage").text("Correct!");
        $("#correctMessage").text("The Right Answer Was: " + questionSelected.rightAnswer);

    }
    
    else {
        wrongCount++;
        $("#wrongCount").text(wrongCount);
        $("#resultsMessage").text("Incorrect!");
        $("#correctMessage").text("The Right Answer Was: " + questionSelected.rightAnswer);
    }

    teststuff();
    
    if(transitionTime === 0){
        nextQuestion();
    }
}

function teststuff(){
    var transInterval = setInterval(function(){transTimer()}, 1000);

    // Transition Screen Timer Countdown
    function transTimer(){
        transitionTime = 100;
        transitionTime--;
        $("#countDown").text(transitionTime);
    }
}
         


// On Click For Starting Game
$("#playButton").on("click", startGame);

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