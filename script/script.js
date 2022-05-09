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



document.getElementById("start").addEventListener("click", function (){
  var qnum = 0;
  
  do
  {
    displayQuestion(qnum);
    qnum++;
  }
  while(qnum < questions.length)
  
  
  function displayQuestion(qnum)
  {
    var answers = "<ul>";
    for (let i = 0; i < questions[qnum].a.length; i++) {
      answers += "<li class=\"choice\">" + questions[qnum].a[i] + "</li>"; 
    }
    answers += "</ul>";
    
    



    
    
    document.getElementById("questions").innerHTML = "<p>" + questions[qnum].q + "</p>" + answers;
    
    document.querySelector(".choice").addEventListener("click", function(){
      alert("hello!");
      });
  }
  
});

