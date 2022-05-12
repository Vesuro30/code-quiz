//
//
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
  }
]

var incorrectAnswer = document.getElementById("errMsg");
var timer = document.getElementById("timer");
var youLose = document.getElementById("youLose");
var timeleftShow = 75;


timer.textContent = "Time remaining: " + timeleftShow;

document.getElementById("start").addEventListener("click", function (){
  var qnum = 0;
  document.getElementById("start").style.display="none";
  var t1 = setInterval(function(){
    timeleftShow--;
    timer.textContent = "Time remaining: " + timeleftShow;
  }, 1000);
  
    displayQuestion(qnum);
    

  
  
  
  
  function displayQuestion(qnum)
  {
    var answers = "<ul>";
    for (let i = 0; i < questions[qnum].a.length; i++) {
      answers += "<li class=\"choice\" data-a=\"" + i + "\">" + questions[qnum].a[i] + "</li>"; 
    }
    answers += "</ul>";
    
    



    
    
    document.getElementById("questions").innerHTML = "<p>" + questions[qnum].q + "</p>" + answers;
    

    var answerClass = document.getElementsByClassName("choice");
    for (let i = 0; i < answerClass.length; i++) {
      answerClass[i].addEventListener("click", function(){
        if(this.getAttribute("data-a") == questions[qnum].c-1)
          {
            // Correct answer

          if(qnum == questions.length - 1)
            {
            alert("done!");
            clearInterval(t1);
            }
            else
              {
            qnum++;
            displayQuestion(qnum);
              }  
          
          }
          else
            {
              //Wrong Answer
            timeleftShow = timeleftShow - 10;
            timer.textContent = "Time remaining: " + timeleftShow;
            incorrectAnswer.style.display = "block";
            setTimeout(function(){
              incorrectAnswer.style.display = "none";
            }, 1000);
            if(timeleftShow < 1)
            {
              timer.style.display = "none";
              youLose.style.display = "block";
              setTimeout(function(){
              youLose.style.display = "none";
              }, 3000);
              clearInterval(t1);
              setTimeout(function()
              {
              document.getElementById("start").style.display="block";
              }, 3000);
            }
            }
        
       
      });
      
    }


  }
  
});

