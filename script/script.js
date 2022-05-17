
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
  
 
 define the questions, their answer choices, and the number of the correct answer
 	• "questions" is an array of question objects, with each object containing a question,
 	  the multiple-choice answers for the question, and the identity of the correct answer
 
 	• each question object is structured as:
 Property q		string	          The question text
 				 a		array of strings  Each answer text
 				 c		integer			  Number of correct answer
*/



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
    q: "Which of the Following Events is Used To Check if an Eement has Lost Focus",
    a: ["1. Onclick()","2. OnFocus()","3. onBlur()","4. None of These"],
    c: 3
   },
    
   {
    q: "A JavaScript File Has An Extension of:",
    a: ["1. .java","2. .js","3. .javascript","4. .xml"],
    c: 2
   },

   {
     q:"What does HTML stand for?",
     a: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
     c: 3
   },

   {
     q:"Given x = new Date(), how do you represent x as a String in universal time (time zone +0000)?",
     a: ["1. X.toUTCString();", "2. X.getUTCDate();", "3. X.getUTC();", "4. None of these"],
     c: 1

   },

   {
    q:"Inside which HTML element do we put the JavaScript?",
    a: ["1. Js", "2. JavaScript", "3. Script", "4. Sripting"],
    c: 3
   },

   {
    q:"What does JSON stand for?",
    a: ["1.  JavaScript Object Notation", "2. JavaScript Oriented Notation", "3. JavaScript Online Notation", "4. JavaScript On Node"],
    c: 1
   },

   {
    q:"You have to change the background color of the page programmatically, which of the following instructions is correct?",
    a: ["1. document.body.background = 'red'", "2. document.body.color = 'red'", "3. document.body.style.background = 'red'", "4. document.body.style.color = 'red'"],
    c: 3
   },

   {
    q:'What is the value of the variable a? var a = "cat".length * 2;',
    a: ["1. 3", "2. 1", "3. 0", "4. 6"],
    c: 4
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
  var youWon = document.getElementById("youWon");
  var initials = document.getElementById("initials");
  var initialEl = document.getElementById("initialError");
  var userHighScores = document.getElementById("userHighScores");
  var restart = document.getElementById("restart");
  var resetHighScores = document.getElementById("resetHighScores");
  var onHighScoreReset = document.getElementById("onHighScoreReset")
  var t1;



	//set up configuration values
	var timeleftShow = 90;		//max allowed time in seconds for the quiz
	var penaltyTime = 10;		//time deducted from remaining time upon incorrect answer
  var maximumSavedScores = 10;  // Maximum number of retained scores



	//global variable to hold the current question number
	var qnum = 0;
  //global variable to see if there are current high scores in the scores array
  var initialized = false;
  //global variable initializing the empty scores array (to hold the high scores)
  var scores = [];







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
		startButton.style.display = "none";	//remove the button
    youWon.style.display = "none"; 
    restart.style.display = "none";
    userHighScores.style.display = "none"; 
    timeleftShow = 90;  
		//start the count-down clock; period of 1  second
		t1 = setInterval(function() 
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
	//	 each answer will be constructed as a list item in an unordered list
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
		e		  object		The current event object
	
	On EXIT
		The function returns TRUE if the answer is correct; FALSE otherwise
*/
	{
	//get the number of the submitted answer
	//	 note that the submitted answer is "0-based" while the correct answers are "1-based"
	var submittedAnswer = e.target.getAttribute('data-a') * 1 + 1; //add 1 to correlate the bases
	
	//correct answer?
	if (submittedAnswer == questions[qnum].c)
		{
		//yes
    qnum++;
    if(qnum == questions.length)
    {
      clearInterval(t1);
      youWon.style.display = "block";
      initials.focus();
      qnum = 0;
    }
    else
      {
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
		}
		else
			{
			//no
			//	 show the "incorrect" message
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
  //  Add event listener to the reset high scores button
  document.getElementById("resetHighScores").addEventListener("click", function()
  {
    localStorage.clear();
    userHighScores.style.display = "none";
    restart.style.display = "none";
    // youWon.style.display = "none";
    onHighScoreReset.style.display = "block";

  });
  
  
  // Add event listener to save button
  document.getElementById("btnSave").addEventListener("click", function()
  {
    // Get users initials from the initials input
    var userInitials = initials.value.trim();
    
    youWon.style.display = "none";
    initials.value = "";
    restart.style.display = "block"
    startButton.style.display = "block";
    resetHighScores.style.display = "block";
    
    // If there are no initials entered, display an error message.
    // Initials MUST be entered here to proceed.
    if(!userInitials)
    {
      initialEl.style.display = "block";
      setTimeout(function()
      {
        initialEl.style.display = "none";
      }, 2000)
    }

    var local = localStorage.getItem("highScores");
    // Checking to see if there are scores stored in localStorage
    if(local === null)
    {   
      // If there are no scores on the list, add the first score to the list.
      scores[0] = userInitials + ":" + timeleftShow;
    }
    else
      {
        // Convert string to an array
        scores = JSON.parse(local);
      }


      // Check to see if there are scores on the list (in localStorage)
    if(initialized)
    {
      var lowScore = scores[0].split(":")[1];

      console.log(lowScore);

    // If the users score is higher than the lowest saved score OR
    // we have not reached the maximum saved scores we save the users score

     if((timeleftShow > lowScore) || (scores.length < maximumSavedScores))
      {
        // Add this new score to the list of high scores
        scores.push(userInitials + ":" + timeleftShow);

        // Sort the scores
        arraySort(scores);

        // Are there more than the maximum number of scores on the list
        if(scores.length > maximumSavedScores)
          {
          //  Yes;  Remove the lowest score from the list
          scores.shift();

          }
      }

    
    }
      // Set initialized to true indicating that there are already scores in localStorage
      initialized = true;
      localStorage.setItem("highScores", JSON.stringify(scores));
      console.log(scores);

      scores.reverse();
      
      userHighScores.innerHTML = "";

      for (let i = 0; i < scores.length; i++) 
      {
        // Display the high scores list
        userHighScores.style.display = "block";
        userHighScores.innerHTML += "<li>" + scores[i] + "</li>";
         
      }


  });


  //  Function to sort and swap the high scores (scores array)
  function swap(arr, xp, yp)
  {
      var temp = arr[xp];
      arr[xp] = arr[yp];
      arr[yp] = temp;
  }
  
  // Function to sort and swap the high scores (scores array)
  function arraySort(arr)
  {
  var i, j, v1, v2, temp;
  var n = arr.length;
  for (i = 0; i < n-1; i++)
    {
      for (j = 0; j < n-i-1; j++)
        {
          temp = arr[j].split(":");
          v1 = temp[1];
          temp = arr[j+1].split(":");
          v2 = temp[1];
          

          if (v1 > v2)
            {
            swap(arr,j,j+1);
            }
       }
  
    }
  }



