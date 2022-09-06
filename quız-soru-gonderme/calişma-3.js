function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer =  answer;
}

Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

function Quiz(questions){
    this.questions = questions;
    this.scrore = 0;
    this.questionIndex = 0
}

Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex ;
}

Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.scrore++;
    }
    this.questionIndex++;
}

var q1 = new Question("En çok kullandığın programlama dili hangisi ?",["C#","Javascript","Java","Python"],"Javascript");
var q2 = new Question("Hangi üniversitede okuyorsun ?",["Marmara Üniversitesi","İstanbul Üniversitesi","İstanbul Teknik Üniversitesi","Bahçeşehir Üniversitesi"],"Marmara Üniversitesi");
var q3 = new Question("Türkiye'nin en güzel oyuncusu kimdir ?",["Hande Erçel","Bensu Soral","Özge Gürel","Melisa Döngel"],"Melisa Döngel");

var questions =[q1,q2,q3];

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
        showScore()
    }else{
        var question = quiz.getQuestion();
        var choices = question.choices;
        document.querySelector("#question").textContent = question.text;

        for(var i=0;i<choices.length;i++){
            var element = document.querySelector("#choice"+i);
            element.innerHTML = choices[i];
            guess("btn"+i,choices[i]);
        }
        showProgress();
    }
}

function guess(id,guess){
    var btn = document.getElementById(id);
    
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}

function  showScore(){
    var html = `<h2> score </h2><h4>${quiz.scrore}</h4>`;
    document.querySelector(".card-body").innerHTML = html;

}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    document.querySelector("#progress").innerHTML = "Questions " + questionNumber + " of "+totalQuestion;
}