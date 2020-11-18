let points = 0;
const mil = 1000000;
const quizQuestions = JSON.parse(localStorage.getItem('questions'));
const question = document.querySelector('.question');
const variants = document.querySelector('.variants-controller');
const totalPrize = document.querySelector('.total-prize');
const currentPrize = document.querySelector('.current-prize');
const quizContainer = document.querySelector('.quiz-container');
const skipButton = document.querySelector('.skipButton');
const startButton = document.querySelector('.startButton');

skipButton.hidden = true;
totalPrize.textContent = `${points}`;
currentPrize.textContent = '100';
quizContainer.hidden = true;
function quizQuestion() {
  let randomIndex = Math.floor(Math.random() * quizQuestions.length);
  if (randomIndex > quizQuestions.length) {
    randomIndex = Math.floor(Math.random() * quizQuestions.length);
  }
  let curQuestion = quizQuestions.find((item, index) => index === randomIndex);
  question.textContent = `${curQuestion.question}`;
  curQuestion.content.forEach((item, index) => {
    let div = document.createElement('div');
    div.className = 'variants-card';
    div.setAttribute('id', `${index}`);
    div.innerHTML = `${item}`;
    variants.append(div);
  });
  variants.onclick = function (e) {
    if (e.target.className !== 'variants-card') {
      return;
    }
    if (+e.target.id === curQuestion.correct) {
      points += +currentPrize.textContent;
      currentPrize.textContent *= 2;
      totalPrize.innerHTML = `${points}`;
      if (points >= mil) {
        skipButton.hidden = true;
        question.innerHTML = 'Congratulations! You won 1000000';
        variants.innerHTML = '';
        quizContainer.hidden = true;
        return;
      }
      variants.innerHTML = '';
      quizQuestion();
    } else {
      variants.innerHTML = '';
      quizContainer.hidden = true;
      skipButton.hidden = true;
      question.innerHTML = `Game over. Your prize is: ${points}`;
    }
  };
}

startButton.onclick = function () {
  skipButton.hidden = false;
  skipButton.disabled = false;
  quizContainer.hidden = false;
  points = 0;
  currentPrize.textContent = '100';
  totalPrize.textContent = `${points}`;
  quizQuestion();
};

skipButton.onclick = function () {
  variants.innerHTML = '';
  quizQuestion();
  skipButton.disabled = true;
};
