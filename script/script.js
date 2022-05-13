
/*
This script runs behind an html page in order to implement a "quiz" in which
n-number of questions can be asked (presented on the webpage along with n-number
	of multiple-choice answers). The quiz-taker starts the quiz with a button push,
	which presents the first question and starts a count-down clock.
	
	Answers are submitted by clicking on the desired answer. If the answer is correct,
	a subsequent question and its associated answer choices are presented. If the
	answer is incorrect, the participant is shown an "incorrect" message and the time
	remaining on the clock is reduced by a defined number of seconds as a penalty
	for submitting an incorrect answer. The participant is not shown another question
	until s/he has answered the current one correctly.
	
	The quiz ends upon either of the following conditions:
  • All questions have been answered correctly
  • The count-down clock reaches zero
  
	The count-down clock is stopped when the quiz ends, and the time remaining is shown.
  
	Upon quiz conclusion, the participant is asked for his/her name, and that name, 
	along with the time remaining, are stored in the browser's local storage.
  */
 
 //define the questions, their answer choices, and the number of the correct answer
 //	• "questions" is an array of question objects, with each object containing a question,
 //	  the multiple-choice answers for the question, and the identity of the correct answer
 //
 //	• each question object is structured as:
 //Property q		string	          The question text
 //				 a		array of strings  Each answer text
 //				 c		integer			  Number of correct answer




 // var messages = 
 // [
 //   {
 //     a: "That is the incorrect answer! You have lost 10 seconds!", 
 //     b: "Correct answer!",
 //     c: "You have run out of time and lost the game!  Please try again"
 
 //   }
 // ]
 var questions = 
 [
   {  
     q: "What is the most common coding language used on the web today?",
     a: ["1. HTML", "2. CSS", "3. JavaScript", "4. English"],
     c: 3
   },
    
   {
    q: "When changing the display property, what language will you use to define it?",
    a: ["1. JavaScript", "2. CSS", "3. English", "4. C++"],
    c: 2
   },
    
   {
    q: "This is question 3. The correct answer is #3.",
    a: ["Answer 1","Answer 2","Answer 3","Answer 4"],
    c: 3
   },
    
   {
    q: "This is question 4. The correct answer is #2.",
    a: ["Answer 1","Answer 2","Answer 3","Answer 4"],
    c: 2
   }

]


	//create references to webpage objects/elements
	var incorrectAnswer = document.getElementById("errMsg");
  var correctAnswer = document.getElementById("correct");
	var timer = document.getElementById("timer");
	var youLose = document.getElementById("youLose");
	var questionsDiv = document.getElementById("questions");
	var answersList = document.getElementById("answersHolder");
	var startButton = document.getElementById("start");

	//set up configuration values
	var timeleftShow = 75;		//max allowed time in seconds for the quiz
	var penaltyTime = 10;		//time deducted from remaining time upon incorrect answer

	//global variable to hold the current question number
	var qnum = 0;

	//initialze on-page display of time remaining
	timer.textContent = "Time remaining: " + timeleftShow;

	//install an event handler on the answers list element
	//	• set the handler on the UL; determine which answer was clicked in the handler
	answersList.addEventListener("click",function(e){
		ProcessAnswer(e);
		});

	//install click event handler on "start" button
	startButton.addEventListener("click", function ()
		{
		startButton.style.display="none";	//remove the button

		//start the count-down clock; period of 1 second
		var t1 = setInterval(function()
			{
			//decrement the time remaining
			timeleftShow--;
      if(timeleftShow < 1)
      {
        clearInterval(t1);
        youLose.style.display = "block"
        setTimeout(function(){
        youLose.style.display = "none"
        timeleftShow = 75;
        timer.textContent = "Time remaining: " + timeleftShow ;
        startButton.style.display = "block";
        answersList.style.display = "none";
        questionsDiv.style.display = "none";
        }, 3000);
        // timeleftShow = 75;
      }
			timer.textContent = "Time remaining: " + timeleftShow;	//show the time remaining
			}, 1000);

		//show first question
		displayQuestion();

		});


function displayQuestion()
/*
	This function retrieves a question object from the "questions" array and
	displays the question and its associated multiple-choice answers.
	
	After the display is complete, click event handlers are set on each of
	the answers.
	
	On ENTRY
		qnum	global integer		Number of question to display
		
	On EXIT
		The question text and all of its possible multiple-choice answers
		have been installed in a div on the webpage. Click event handlers
		have been installed on each answer element.
*/
	{
	//construct the "answers" part of the question
	//	• each answer will be constructed as a list item in an unordered list
    var answers = '';	//start the list
	
	//get and append each answer; install the answer number in a data attribute
    for (let i = 0; i < questions[qnum].a.length; i++) {
      answers += "<li class=\"choice\" data-a=\"" + i + "\">" + questions[qnum].a[i] + "</li>"; 
    }
    questionsDiv.style.display = "block";
    answersList.style.display = "block";
	//install the question
    questionsDiv.innerHTML = "<p>" + questions[qnum].q + "</p>";
	
	//install the answers
	answersList.innerHTML = answers;
	}

function ProcessAnswer(e)
/*
	This function retrieves the number of the submitted answer for a question and
	compares that to the number of the correct answer.
	
	On ENTRY
		qnum	integer		The question number
		e		object		The current event object
	
	On EXIT
		The function returns TRUE if the answer is correct; FALSE otherwise
*/
	{
	//get the number of the submitted answer
	//	• note that the submitted answer is "0-based" while the correct answers are "1-based"
	var submittedAnswer = e.target.getAttribute('data-a') * 1 + 1; //add 1 to correlate the bases
	
	//correct answer?
	if (submittedAnswer == questions[qnum].c)
		{
		//yes
		qnum++;
    // immediately remove the incorrect answer message on correct answer
    incorrectAnswer.style.display = "none";
    // show correct answer div
    correctAnswer.style.display = "block";
    // set timer to remove the correct answer div
    setTimeout(function(){
    correctAnswer.style.display = "none";  
    }, 1000);
		displayQuestion();
		}
		else
			{
			//no
			//	• show the "incorrect" message
			incorrectAnswer.style.display = "block";
			//set up timer to remove the message
			setTimeout(function(){
              incorrectAnswer.style.display = "none";
              }, 1000);
			
			//deduct the penalty from the time remaining and show the new value
			timeleftShow = timeleftShow - penaltyTime;
			timer.textContent = "Time remaining: " + timeleftShow;
			
			//return 'false' to indicate an incorrect answer
			return false;
			}
	}





// var incorrectAnswer = document.getElementById("errMsg");
// var timer = document.getElementById("timer");
// var youLose = document.getElementById("youLose");
// var timeleftShow = 75;


// timer.textContent = "Time remaining: " + timeleftShow;

// document.getElementById("start").addEventListener("click", function (){
//   var qnum = 0;
//   document.getElementById("start").style.display="none";
//   var t1 = setInterval(function(){
//     timeleftShow--;
//     timer.textContent = "Time remaining: " + timeleftShow;
//   }, 1000);
  
//     displayQuestion(qnum);
    

  
  
//   function displayQuestion(qnum)
//   {
//     var answers = "<ul>";
//     for (let i = 0; i < questions[qnum].a.length; i++) {
//       answers += "<li class=\"choice\" data-a=\"" + i + "\">" + questions[qnum].a[i] + "</li>"; 
//     }
//     answers += "</ul>";
    
    



    
    
//     document.getElementById("questions").innerHTML = "<p>" + questions[qnum].q + "</p>" + answers;
    

//     var answerClass = document.getElementsByClassName("choice");
//     for (let i = 0; i < answerClass.length; i++) {
//       answerClass[i].addEventListener("click", function(){
//         if(this.getAttribute("data-a") == questions[qnum].c-1)
//           {
//             // Correct answer

//           if(qnum == questions.length - 1)
//             {
//             alert("done!");
//             clearInterval(t1);
//             }
//             else
//               {
//             qnum++;
//             displayQuestion(qnum);
//               }  
          
//           }
//           else
//             {
//               //Wrong Answer
//             timeleftShow = timeleftShow - 10;
//             timer.textContent = "Time remaining: " + timeleftShow;
//             incorrectAnswer.style.display = "block";
//             setTimeout(function(){
//               incorrectAnswer.style.display = "none";
//             }, 1000);
//             if(timeleftShow < 1)
//             {
//               timer.style.display = "none";
//               youLose.style.display = "block";
//               setTimeout(function(){
//               youLose.style.display = "none";
//               }, 3000);
//               clearInterval(t1);
//               setTimeout(function()
//               {
//               document.getElementById("start").style.display="block";
//               }, 3000);
//             }
//             }
        
       
//       });
      
//     }


//   }
  
// });

