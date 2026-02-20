let currentQuestions=[], currentIndex=0, score=0, answers=[], lastMode="exam";

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

function showScreen(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active")}

function goHome(){showScreen("screen-home")}

function startQuiz(mode){
  lastMode=mode;
  currentQuestions=mode==="random"?shuffle([...QUESTIONS]):[...QUESTIONS];
  currentIndex=0;score=0;answers=[];
  document.getElementById("score-live").textContent="0";
  showScreen("screen-quiz");
  renderQuestion();
}

function renderQuestion(){
  const q=currentQuestions[currentIndex];
  const total=currentQuestions.length;
  document.getElementById("q-number").textContent="Q"+q.id;
  document.getElementById("q-text").textContent=q.text;
  document.getElementById("q-counter").textContent=(currentIndex+1)+" / "+total;
  document.getElementById("progress-bar").style.width=((currentIndex+1)/total*100)+"%";

  const ol=document.getElementById("options");ol.innerHTML="";
  q.options.forEach((opt,i)=>{
    const letter=opt.charAt(0);
    const li=document.createElement("li");
    const btn=document.createElement("button");
    btn.className="option-btn";
    btn.innerHTML='<span class="opt-letter">'+letter+'</span><span>'+opt.substring(3)+'</span>';
    btn.onclick=()=>selectAnswer(letter,q,btn);
    li.appendChild(btn);ol.appendChild(li);
  });

  const fb=document.getElementById("feedback");fb.className="feedback hidden";fb.textContent="";
  document.getElementById("btn-next").classList.add("hidden");
  document.getElementById("question-card").style.animation="none";
  void document.getElementById("question-card").offsetHeight;
  document.getElementById("question-card").style.animation="fadeIn .3s ease";
}

function selectAnswer(letter,q,clicked){
  const btns=document.querySelectorAll(".option-btn");
  btns.forEach(b=>b.disabled=true);

  const isCorrect=letter===q.correct;
  answers.push({qId:q.id,selected:letter,correct:q.correct,isCorrect});

  if(isCorrect){score++;document.getElementById("score-live").textContent=score}

  btns.forEach(b=>{
    const l=b.querySelector(".opt-letter").textContent;
    if(l===q.correct)b.classList.add("correct");
    if(l===letter&&!isCorrect)b.classList.add("wrong");
  });

  const fb=document.getElementById("feedback");
  fb.classList.remove("hidden","correct-fb","wrong-fb","study-fb");

  if(lastMode==="review"){
    fb.classList.add("study-fb");
    fb.innerHTML=(isCorrect?"✅ <strong>Correto!</strong> ":"❌ <strong>Incorreto.</strong> Resposta: <strong>"+q.correct+"</strong><br>")+q.explanation;
  } else if(isCorrect){
    fb.classList.add("correct-fb");
    fb.innerHTML="✅ <strong>Correto!</strong>";
  } else {
    fb.classList.add("wrong-fb");
    fb.innerHTML="❌ <strong>Incorreto.</strong> Resposta correta: <strong>"+q.correct+"</strong>";
  }

  const btn=document.getElementById("btn-next");
  btn.classList.remove("hidden");
  btn.textContent=currentIndex<currentQuestions.length-1?"Próxima →":"Ver Resultados";
}

function nextQuestion(){
  if(currentIndex<currentQuestions.length-1){currentIndex++;renderQuestion()}
  else showResults();
}

function showResults(){
  const total=currentQuestions.length;
  const pct=Math.round(score/total*100);
  document.getElementById("final-score-pct").textContent=pct+"%";
  document.getElementById("final-score-frac").textContent=score+" / "+total;

  let emoji,title,msg;
  if(pct>=80){emoji="🏆";title="Excelente!";msg="Estás muito bem preparada para o exame!"}
  else if(pct>=60){emoji="👏";title="Bom trabalho!";msg="Quase lá! Revê as questões erradas e tenta de novo."}
  else if(pct>=40){emoji="📖";title="Continua a estudar!";msg="Ainda há tópicos para consolidar. Foco nas questões erradas!"}
  else{emoji="💪";title="Não desistas!";msg="Revê os conceitos e tenta novamente. Cada tentativa é progresso!"}

  document.getElementById("result-emoji").textContent=emoji;
  document.getElementById("result-title").textContent=title;
  document.getElementById("result-msg").textContent=msg+" (Nota de aprovação: 70%)";
  showScreen("screen-results");
}

function showReview(){
  const list=document.getElementById("review-list");list.innerHTML="";
  answers.forEach(a=>{
    const q=QUESTIONS.find(x=>x.id===a.qId);
    const div=document.createElement("div");
    div.className="review-item "+(a.isCorrect?"ri-correct":"ri-wrong");

    let opts="";
    q.options.forEach(o=>{
      const l=o.charAt(0);
      let cls="ro-neutral";
      if(l===q.correct)cls="ro-correct";
      else if(l===a.selected&&!a.isCorrect)cls="ro-wrong";
      opts+='<div class="review-opt '+cls+'"><span class="ro-letter">'+l+'</span><span>'+o.substring(3)+'</span></div>';
    });

    div.innerHTML='<div class="review-header"><span class="q-number">Q'+q.id+'</span><span class="review-badge '+(a.isCorrect?"correct":"wrong")+'">'+(a.isCorrect?"Correto":"Errado — "+q.correct)+'</span></div><p class="review-qtext">'+q.text.split("\n")[0]+'</p><div class="review-options">'+opts+'</div><div class="feedback study-fb" style="margin-top:10px">'+q.explanation+'</div>';
    list.appendChild(div);
  });
  showScreen("screen-review");
}

function backToResults(){showScreen("screen-results")}
