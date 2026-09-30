const questions=[
 {q:"Which keyword is used to create an object in Java?",o:["class","new","this","object"],a:1,d:"Easy"},
 {q:"Which collection does not allow duplicate elements?",o:["ArrayList","LinkedList","HashSet","Vector"],a:2,d:"Easy"},
 {q:"What does the Stream API help with?",o:["Database creation","Processing collections of data","Creating classes","Compiling Java"],a:1,d:"Medium"},
 {q:"Which concept allows the same method name with different parameters?",o:["Inheritance","Encapsulation","Method Overloading","Abstraction"],a:2,d:"Medium"},
 {q:"Which operation is represented by the ^ operator in Java?",o:["AND","OR","XOR","NOT"],a:2,d:"Hard"}
];
let current=0, selected=null, correct=0, answers=0, student={};

function showPage(id){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 window.scrollTo({top:0,behavior:"smooth"});
}
function startRegistration(){showPage("registration");}
function registerStudent(){
 const name=document.getElementById("studentName").value.trim();
 const id=document.getElementById("studentId").value.trim();
 if(!name||!id){document.getElementById("regError").textContent="Please enter both name and student ID.";return;}
 student={name,id,department:document.getElementById("department").value};
 current=0;correct=0;answers=0;selected=null;
 document.getElementById("studentChip").textContent=student.name+" • "+student.id;
 showPage("quiz");renderQuestion();
}
function renderQuestion(){
 const q=questions[current];
 document.getElementById("questionNo").textContent=`QUESTION ${current+1} OF ${questions.length}`;
 document.getElementById("difficulty").textContent=q.d;
 document.getElementById("questionText").textContent=q.q;
 document.getElementById("progressBar").style.width=((current+1)/questions.length*100)+"%";
 document.getElementById("options").innerHTML=q.o.map((x,i)=>`
   <label class="option" onclick="selectOption(${i},this)">
     <input type="radio" name="option"> ${String.fromCharCode(65+i)}. ${x}
   </label>`).join("");
 document.getElementById("nextBtn").textContent=current===questions.length-1?"Finish Quiz":"Next Question";
 selected=null;
 document.getElementById("quizError").textContent="";
}
function selectOption(i,el){
 selected=i;
 document.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));
 el.classList.add("selected");
}
function nextQuestion(){
 if(selected===null){document.getElementById("quizError").textContent="Please select an answer.";return;}
 answers++;
 if(selected===questions[current].a)correct++;
 if(current<questions.length-1){current++;renderQuestion();}else finishQuiz();
}
function finishQuiz(){
 const score=Math.round(correct/questions.length*100);
 let cls=score>=90?"Excellent":score>=75?"Very Good":score>=60?"Good":"Needs Improvement";
 document.getElementById("score").textContent=score;
 document.getElementById("resultClass").textContent=cls;
 document.getElementById("resultMessage").textContent=`${student.name}, you answered ${correct} out of ${questions.length} questions correctly.`;
 document.getElementById("correctCount").textContent=correct;
 document.getElementById("wrongCount").textContent=questions.length-correct;
 document.getElementById("answeredCount").textContent=answers;
 showPage("result");
 prepareAnalysis(score,cls);
}
function prepareAnalysis(score,cls){
 document.getElementById("aName").textContent=student.name;
 document.getElementById("aScore").textContent=score+"/100";
 document.getElementById("aClass").textContent=cls;
 document.getElementById("aDifficulty").textContent=score>=80?"Hard":"Medium";
 document.getElementById("scoreBar").style.width=score+"%";
 document.getElementById("barValue").textContent=score+"%";
 document.getElementById("analysisText").textContent=
  score>=90?"Excellent performance. The adaptive engine reached the hard-level question and the result module classified the performance as Excellent.":
  score>=75?"Very good performance. The student handled the quiz well and reached medium/higher difficulty questions.":
  "The analysis shows areas for improvement. More practice can help the student progress to higher difficulty levels.";
}
