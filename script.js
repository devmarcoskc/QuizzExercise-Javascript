//Initial data:
let currentQuestion = 0;
let anwsersRight = [];
let answersWrong = [];
let currentBar = questions.length;


//Functions:
function showQuestions() {
    let q = questions[currentQuestion];
    if(questions[currentQuestion]) {
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;
        
        let optionsHtml = '';
        for(let i in q.options) {
            let parse = parseInt(i)+1;
            optionsHtml += `<div data-op="${i}" class="option"><span>${parse}</span>${q.options[i]}</div>` 
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {

            item.addEventListener('click', (e) =>{
                let itemKey = e.target.getAttribute('data-op');
                let key = parseInt(itemKey);
                if(key === q.answer) {
                    anwsersRight.push(key);
                    if (currentQuestion < questions.length) {
                    currentQuestion ++;
                    console.log(anwsersRight)
                    showQuestions();
                    attCurrentBar()
                    } else {
                        showResults();
                    }
                } else {
                    answersWrong.push(key);
                    if (currentQuestion < questions.length) {
                    currentQuestion ++;
                    console.log(answersWrong)
                    showQuestions();
                    attCurrentBar()
                    } else {
                        showResults();
                    }
                }
                    
            });
        })
    }

}

function showResults() {
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';

    let awnsersRightNum = anwsersRight.length;
    let answersWrongNum = answersWrong.length;
    let calcResult = (awnsersRightNum/questions.length)*100;

    if(calcResult > 60) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').innerHTML = `Acertou ${calcResult}%`;
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${awnsersRightNum}`;
    } else {
        let atention = document.querySelector('.scoreText1');
        atention.style.color = 'red';
        atention.innerHTML = 'Atenção! Estude mais!'
        let atentionPct = document.querySelector('.scorePct');
        atentionPct.style.color = 'red';
        atentionPct.innerHTML = `Acertou ${calcResult}%`;
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${awnsersRightNum}`;
    }

    document.querySelector('.scoreArea button').addEventListener('click', () => {
        currentQuestion = 0;
        answersWrong = [];
        anwsersRight = [];
        document.querySelector('.scoreArea').style.display = 'none';
        showQuestions();
        attCurrentBar();
    })
}

function attCurrentBar() {
    let attBar = document.querySelector('.progress--bar');
    let calcCurrent = (currentQuestion/currentBar) * 100;
    attBar.style.width = `${calcCurrent}%`;
}

showQuestions();
attCurrentBar();
