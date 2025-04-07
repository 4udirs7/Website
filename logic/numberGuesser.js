document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkMode');
  const modeLabel = document.getElementById('modeLabel');
  const tiltContainer = document.getElementById('tiltContainer');
  const githubLogo = document.getElementById('githubLogo');

  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', isDarkMode);
  darkModeToggle.checked = isDarkMode;
  modeLabel.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';

  darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;
    document.body.classList.toggle('dark', isDarkMode);
    modeLabel.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('darkMode', isDarkMode);
  });

  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    tiltContainer.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    githubLogo.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });

  document.addEventListener('mousemove', (e) => {
    const number = document.createElement('div');
    number.textContent = Math.floor(Math.random() * 10);
    number.classList.add('number-follow');
    number.style.left = `${e.pageX}px`;
    number.style.top = `${e.pageY}px`;

    document.body.appendChild(number);

    number.addEventListener('animationend', () => {
      number.remove();
    });
  });

  let target, min, max, firstTry = true;

  document.getElementById('startGame').addEventListener('click', () => {
    const minInput = document.getElementById('min').value.trim();
    const maxInput = document.getElementById('max').value.trim();
    min = Number(minInput);
    max = Number(maxInput);

    if (!minInput || !maxInput) {
      showMessage("Both minimum and maximum values are required.", "error");
      return;
    }

    if (isNaN(min) || isNaN(max)) {
      showMessage("Please enter valid numbers for both minimum and maximum.", "error");
      return;
    }

    if (min >= max) {
      showMessage("The minimum value must be less than the maximum value.", "error");
      return;
    }

    if (max - min > 100) {
      showMessage("The range between minimum and maximum must not exceed 100.", "error");
      return;
    }

    target = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    const messageElement = document.getElementById('message');
    messageElement.textContent = `Guess a number between ${min} and ${max}!`;
    messageElement.style.color = 'black';

    displayNumberRange(min, max);
    firstTry = true;
  });

  document.getElementById('submitGuess').addEventListener('click', () => {
    const guess = Number(document.getElementById('guess').value);

    if (isNaN(guess) || guess < min || guess > max) {
      showMessage(`Invalid input. Please enter a number between ${min} and ${max}.`, "error");
      return;
    }

    if (guess === target) {
      showMessage(firstTry ? "Correct! You guessed it on your first try!" : "Correct! You win!", "success");
      greyOutNumbers(guess, true);
      setTimeout(() => location.reload(), 3000);
      return;
    }

    showMessage(guess < target ? "Too low! Try again." : "Too high! Try again.", "info");
    greyOutNumbers(guess);
    firstTry = false;
  });

  document.getElementById('giveUp').addEventListener('click', () => {
    showMessage(`You gave up! The correct number was ${target}.`, "error");
    setTimeout(() => location.reload(), 3000);
  });

  function displayNumberRange(min, max) {
    const numberRange = document.getElementById('numberRange');
    numberRange.innerHTML = '';
    for (let i = min; i <= max; i++) {
      const numberElement = document.createElement('span');
      numberElement.textContent = i;
      numberElement.className = 'number';
      numberElement.id = `number-${i}`;
      numberElement.style.color = 'black';
      numberRange.appendChild(numberElement);
    }
  }

  function greyOutNumbers(guess, isCorrect = false) {
    for (let i = min; i <= max; i++) {
      const numberElement = document.getElementById(`number-${i}`);
      if (numberElement) {
        if (isCorrect && i === guess) {
          numberElement.style.backgroundColor = 'gold';
          numberElement.style.color = 'black';
          numberElement.style.fontWeight = 'bold';
        } else if (!isCorrect && ((guess < target && i <= guess) || (guess > target && i >= guess))) {
          numberElement.classList.add('shattered');
        }
      }
    }
  }

  function showMessage(message, type) {
    const result = document.getElementById('result');
    if (!result) return;
    result.textContent = message;
    result.style.display = 'block';
    result.className = type;
    setTimeout(() => {
      result.style.display = 'none';
    }, 3000);
  }

  document.getElementById('goBack').addEventListener('click', () => {
    const goBackButton = document.getElementById('goBack');
    goBackButton.classList.add('spin');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  const clickSound = document.getElementById('clickSound');
  const wooshSound = document.getElementById('wooshSound');

  document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });

  githubLogo.addEventListener('click', (e) => {
    e.preventDefault();
    setTimeout(() => {
      wooshSound.currentTime = 0;
      wooshSound.play();
    }, 500);
    githubLogo.classList.add('launch');
    setTimeout(() => {
      window.open('https://github.com/4udirs7', '_blank');
      githubLogo.classList.remove('launch');
      githubLogo.classList.add('reappear');
      setTimeout(() => {
        githubLogo.classList.remove('reappear');
      }, 500);
    }, 2000);
  });
});