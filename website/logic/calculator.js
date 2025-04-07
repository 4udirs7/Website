const display = document.getElementById('calcDisplay');
const buttons = document.querySelectorAll('#calcButtons button');
let currentInput = '';
let operator = null;
let previousInput = '';
const maxDecimals = 10; 

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+':
      return (a + b).toFixed(maxDecimals);
    case '-':
      return (a - b).toFixed(maxDecimals);
    case '*':
      return (a * b).toFixed(maxDecimals);
    case '/':
      if (b === 0) return 'Error'; 
      return (a / b).toFixed(maxDecimals);
    default:
      return 'Error';
  }
}

function updateDisplay(value) {
  display.value = value.length > 15 ? value.slice(0, 15) + '...' : value; 
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'Clear') {
      currentInput = '';
      operator = null;
      previousInput = '';
      updateDisplay('');
    } else if (value === '=') {
      if (operator && previousInput) {
        currentInput = calculate(previousInput, currentInput, operator);
        if (currentInput === 'Error') {
          updateDisplay('Error');
          currentInput = '';
          operator = null;
          previousInput = '';
        } else {
          updateDisplay(currentInput);
          operator = null;
          previousInput = '';
        }
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        if (operator && previousInput) {
          currentInput = calculate(previousInput, currentInput, operator);
          if (currentInput === 'Error') {
            updateDisplay('Error');
            currentInput = '';
            operator = null;
            previousInput = '';
            return;
          }
          updateDisplay(currentInput);
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
      }
    } else {
      if (value === '.' && currentInput.includes('.')) return; 
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

document.addEventListener('mousemove', (e) => {
  const tiltContainer = document.getElementById('tiltContainer');
  const githubLogo = document.getElementById('githubLogo');

  const x = (window.innerWidth / 2 - e.clientX) / 50;
  const y = (window.innerHeight / 2 - e.clientY) / 50;

  tiltContainer.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;

  githubLogo.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;

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

document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', isDarkMode);
  document.getElementById('darkMode').checked = isDarkMode;
  document.getElementById('modeLabel').textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';

  const darkModeToggle = document.getElementById('darkMode');
  darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;
    document.body.classList.toggle('dark', isDarkMode);
    document.getElementById('modeLabel').textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('darkMode', isDarkMode); 
  });

  document.getElementById('goBack').addEventListener('click', () => {
    const goBackButton = document.getElementById('goBack');
    goBackButton.classList.add('spin');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  const tiltContainer = document.getElementById('tiltContainer');
  const githubLogo = document.getElementById('githubLogo');
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