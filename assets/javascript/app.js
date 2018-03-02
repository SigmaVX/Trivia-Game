$( document ).ready(function(){

// Hides Screens Until Ready
$("#questionScreen").hide();
$("#resultsScreen").hide();
     
// Create Array Of Objects For Questions
var questions = [
   
    questionOne = {
        question: "What was the first Disney animated character to feature in their own series?",
        rightAnswer: "Oswald",
        wrongAnswerOne: "Goofy",
        wrongAnswerTwo: "Mickey",
        wrongAnswerThree: "Chester",
        fact: "Disney lost the rights to Oswald to NBC in 1928, which prompted Disney to create Mickey Mouse.  In 2006, Disney got the rights back by letting Al Michaels be the announcer for NBC Sunday Night Football."},
    
    questionTwo = {
        question: "In What Year Was Cuphead (the animated video seen in the background) Produced?",
        rightAnswer: "2017",
        wrongAnswerOne: "1933",
        wrongAnswerTwo: "1980",
        wrongAnswerThree: "1975",
        fact: "Cuphead is a hand drawn video game and took seven years to produce.  The creators were inspired by the famed cartoonist Max Fleischer, who drew classics like Betty Boop and Popey."},

    questionThree = {
        question: "Mark Hamill of Star Wars fame has voiced all the following characters EXCEPT…",
        rightAnswer: "Gumball",
        wrongAnswerOne: "The Joker",
        wrongAnswerTwo: "Solomon Grundy",
        wrongAnswerThree: "Hobgoblin",
        fact: "As of 2018, Mark Hamill’s voice has been used in 330 roles from in 154 titles."},

    questionFour = {
        question: "What Is The Highest Grossing Animated Movie Of All Time (as of 2018)?",
        rightAnswer: "Finding Dory",
        wrongAnswerOne: "Despicable Me 2",
        wrongAnswerTwo: "Frozen",
        wrongAnswerThree: "Shrek 2",
        fact: "Finding Dory grossed $486 million in the US and beat Shrek 2, which grossed $441 million.  However, Shrek 2 sold more tickets and would have grossed over $650 million after adjusting for ticket price inflation."},

    questionFive = {
        question: "What Was Disney's first full feature animated movie?",
        rightAnswer: "Snow White",
        wrongAnswerOne: "Dumbo",
        wrongAnswerTwo: "Pinocchio",
        wrongAnswerThree: "Bambi",
        fact: "Snow White came grossed $66 million when it was released in 1937.  That would amount to a staggering $711 million using current ticket prices."},

    questionSix = {
        question: "What Disney Princess Makes A Quick Cameo Appearance In The Film Frozen?",
        rightAnswer: "Rapunzel",
        wrongAnswerOne: "Ariel",
        wrongAnswerTwo: "Sleeping Beauty",
        wrongAnswerThree: "Snow White",
        fact: "Rapunzel and Flynn from Tangled can be seen entering the wedding of queen Elsa.  Disney had similar quick cameo's in The Little Mermaid where Micky, Goofy, and Donald Duck appear in various scenes."},

    questionSeven = {
        question: "As of 2018, What Is The Most Expensive Animated Film Ever Produced?",
        rightAnswer: "Tangled",
        wrongAnswerOne: "Zootopia",
        wrongAnswerTwo: "Shrek 2",
        wrongAnswerThree: "The LEGO Movie",
        fact: "Tangled cost an estimated $260 million to produce in 2010.  This means it cost more to produce than groundbreaking SFX film Avatar."},

    questionEight = {
        question: "How Long Did It Take To Develop Disney’s Wreck It Ralph?",
        rightAnswer: "15 Years",
        wrongAnswerOne: "5 Years",
        wrongAnswerTwo: "10 Years",
        wrongAnswerThree: "3 Years",
        fact: "Disney struggled with the concept of the film for 15 years before it was finally greenlit and produced.  Disney shot down two prior versions of the film called High Score and Joe Jump."},

    questionNine = {
        question: "Which TV series was the first to use all computer-generated animation?",
        rightAnswer: "Reboot",
        wrongAnswerOne: "Jimmy Neutron",
        wrongAnswerTwo: "TMNT",
        wrongAnswerThree: "Transformers",
        fact: "Reboot aired in Canada from 1994 to 2001 and was produced by the same people behind the 1985 CGI rendered Dire Straits music video 'Money For Nothing'."},

    questionTen = {
        question: "How many animated movies have been released between 1980 and 2017?",
        rightAnswer: "458",
        wrongAnswerOne: "145",
        wrongAnswerTwo: "332",
        wrongAnswerThree: "266",
        fact: "The 458 animated films released during this time have grossed almost $26 billion."},
    ];

// Stores Objects That Are Picked To Prevent Duplicate Q&A 
var alreadyPickedQ = [];
var answerPosition = [0,1,2,3];

// The Array Position For The Question
var pick;

// Question Corresponding To The Picked Array Position
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
    $("#playAgain").hide();
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
    
    // Assigns The Question To The HTML and Check Attribute With Randomized Array
    $('#' + answerPositions[0]).text(questionSelected.rightAnswer);
    $('#' + answerPositions[0]).attr("check", "right");
        
    $('#' + answerPositions[1]).text(questionSelected.wrongAnswerOne);
    $('#' + answerPositions[1]).attr("check", "wrong");
    
    $('#' + answerPositions[2]).text(questionSelected.wrongAnswerTwo);
    $('#' + answerPositions[2]).attr("check", "wrong");
    
    $('#' + answerPositions[3]).text(questionSelected.wrongAnswerThree);
    $('#' + answerPositions[3]).attr("check", "wrong");
    
}

// Function - Checks Guess
function checkAnswer(){
    $("#startScreen").hide();
    $("#resultsScreen").show();
    $("#questionScreen").hide();
    questionsRemaining--;
    console.log("Questions Remaining: " + questionsRemaining);
    $("#questionsLeft").text(questionsRemaining);
    
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


        // Game End Check
        if(questionsRemaining === 0){
            $("#countDownHeader").hide();
            $("#countDown").text("Game Over!");
            $("#playAgain").show();

            clearInterval(transInterval);
            clearInterval(guessInterval);
            clearTimeout(guessTimeout);  
        
        } else{    
        
            // Resets The Guess Timer So Its Ready When Called Next
            clearInterval(guessInterval);
            clearTimeout(guessTimeout);
            guessTime=30;
            $("#guessTimer").text(guessTime);

            // Initiates Transition Timer
            transTimer();
        }
    }

// Function - Sets The Transition Timer When Called
function transTimer(){
    
    // Clears Any Prior Intervals
    clearInterval(transInterval);
    transitionTime = 10;
    $("#countDown").text(transitionTime);
    
    // Sets Countdown Timer Using The Nested Function Below
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
    
    // Sets Countdown Timer Using The Nested Function Below
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

});