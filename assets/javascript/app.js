

var i = 0;

var selectedAnswer;

var right = 0;
var wrong = 0;
var unans = 0;

var imgArray = ["../images/g1.gif", "../images/g2.gif"];

var questionList = [
	{Question: "Which of these was not one of Darth Sidious' Sith apprentices?", Choices: ["Darth Vader", "Darth Tyranus", "Darth Plagueis", "Darth Maul"], Answer: "Darth Plagueis"},
	{Question: "\'It's a trap!\' Who said it?", Choices: ["Nien Nunb", "Obi-Wan Kenobi", "Boba Fett", "Admiral Ackbar"], Answer: "Admiral Ackbar"},
	{Question: "What monster did Luke fight in the cave on Hoth?", Choices: ["Tauntaun", "Wampa", "Womp Rat", "Gundark"], Answer: "Wampa"},
	{Question: "What fatal flaw did the rebels exploit to destroy the first Death Star?", Choices: ["An unstable reactor core", "Incomplete structural support", "An incomplete superlaser", "An exposed thermal exhaust port"], Answer: "An exposed thermal exhaust port"},
	{Question: "What location stood in for Tatooine in the first 1977 'Star Wars' movie?", Choices: ["Death Valley", "The Syrian Desert", "The Tunisian Desert", "The Arizona Desert"], Answer: "The Tunisian Desert"},
	{Question: "What were the two opposing organizations in the Clone Wars?", Choices: ["The Galactic Republic and the Separatist Alliance", "The Rebel Alliance and the Galactic Empire", "The Jedi and the Sith", "The Gungan Grand Army and the Tusken Raiders"], Answer: "The Galactic Republic and the Separatist Alliance"},
	{Question: "Who adopted Leia at birth?", Choices: ["Bail Antilles and Ona Antilles", "Bail Organa and Breha Organa", "Owen Lars and Beru Lars", "Obi-Wan Kenobi"], Answer: "Bail Organa and Breha Organa"},
	{Question: "How did George Lucas first meet Harrison Ford?", Choices: ["Harrison drove George home after drinking too much", "Harrison was Carrie Fisher's real-life boyfriend", "George cast Harrison in American Graffiti", "George hired Harrison to build cabinets"], Answer: "George hired Harrison to build cabinets"}
];

var timer;
var clockRunning = false;
var intervalId;
var timeView = 10;


function qTimer (){
	timer = setTimeout(function(){
		timeExpire();
	}, 10000);
}

function aTimer (){
	timer = setTimeout(function(){
	i++
	questionDisplay();
	}, 4000);
}

function questionDisplay(){
	$("#imgspot").html("");
	$("#a1").html("");
	$(".timer").show();

	$("#o1").show();
	$("#o2").show();
	$("#o3").show();
	$("#o4").show();

	$("#q1").html(questionList[i].Question);

	$("#o1").html(questionList[i].Choices[0]);
	$("#o2").html(questionList[i].Choices[1]);
	$("#o3").html(questionList[i].Choices[2]);
	$("#o4").html(questionList[i].Choices[3]);

	$("#o1").attr("name", questionList[i].Choices[0]);
	$("#o2").attr("name", questionList[i].Choices[1]);
	$("#o3").attr("name", questionList[i].Choices[2]);
	$("#o4").attr("name", questionList[i].Choices[3]);

		if (!clockRunning){
			timeView = 10;
			intervalId = setInterval(count, 1000);
			clockRunning = true;
		}
	qTimer();


}

function count(){
	timeView--;
	$(".timer").html("Time Remaining: " + timeView);
	if (timeView == 0){
		clearInterval(intervalId);
		clockRunning = false;
	}
}

function scoreCheck(){
	if (i == questionList.length - 1) {
	scoreScreen();	
	}

	else {
		aTimer();
	}
}

function rightAnswer(){
	qClear();
	right++;
	$("#o1").hide();
	$("#o2").hide();
	$("#o3").hide();
	$("#o4").hide();
	$("#q1").html("CORRECT!");
	$("#imgspot").html("<img src=" + imgArray[i] + " width='400px'>");
	$(".timer").hide();
	scoreCheck();

}

function wrongAnswer(){
	qClear();
	wrong++;
	$("#o1").hide();
	$("#o2").hide();
	$("#o3").hide();
	$("#o4").hide();
	$(".timer").hide();
	$("#q1").html("WRONG! The correct answer was " + questionList[i].Answer + ".");
	scoreCheck();
}

function timeExpire(){
	qClear();
	unans++;
	$("#o1").hide();
	$("#o2").hide();
	$("#o3").hide();
	$("#o4").hide();
	$(".timer").hide();
	$("#q1").html("You ran outta time! The correct answer was " + questionList[i].Answer + ".");
	scoreCheck();
}

function scoreScreen(){
	$("#q1").html("<h1>YOUR SCORE!</h1>");
	$("#a1").html("<p>Correct Answers: " + right + "</p>");
	$("#a1").append("<p>WRONG Answers: " + wrong + "</p>");
	$("#a1").append("<p>Unanswered: " + unans + "</p>");
	$("#a1").append('<button id=restart>Replay?</button>');
	$(".timer").hide();
	replay();
}

function replay(){

	$("#restart").click(function(){

		i = 0;

		selectedAnswer;

		right = 0;
		wrong = 0;
		unans = 0;
		questionDisplay();
	})
}

function qClear(){
	clearTimeout(timer);
}

function playerChoice(){
		qClear();
		var selectedAnswer = $(this).attr("name");


		if (selectedAnswer != questionList[i].Answer) {
			wrongAnswer();
		}

		else if (selectedAnswer == questionList[i].Answer) {
			rightAnswer();
		}

	}

$("#o1").click(playerChoice);
$("#o2").click(playerChoice);
$("#o3").click(playerChoice);
$("#o4").click(playerChoice);


questionDisplay();