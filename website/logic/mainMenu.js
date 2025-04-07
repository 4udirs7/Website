document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', isDarkMode);
  document.getElementById('darkMode').checked = isDarkMode;
  document.getElementById('modeLabel').textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';

  document.getElementById('numberGuesser').addEventListener('click', () => {
    window.location.href = '../website/numberGuesser.html';
  });

  document.getElementById('calculator').addEventListener('click', () => {
    window.location.href = '../website/calculator.html';
  });

  document.getElementById('clockCounter').addEventListener('click', () => {
    window.location.href = '../website/clockCounter.html';
  });

  const tiltContainer = document.getElementById('tiltContainer');
  const githubLogo = document.getElementById('githubLogo');
  const clickSound = document.getElementById('clickSound');
  const wooshSound = document.getElementById('wooshSound');
  const themeToggle = document.getElementById('themeToggle');
  const popupContent = document.getElementById('popupContent');
  const popup = document.getElementById('popup');

  document.getElementById('darkMode').addEventListener('change', () => {
    const isDarkMode = document.getElementById('darkMode').checked;
    document.body.classList.toggle('dark', isDarkMode);
    document.getElementById('modeLabel').textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('darkMode', isDarkMode);
  });

  document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });

  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    tiltContainer.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;

    githubLogo.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;

    popupContent.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;

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

  const enablePopupDelay = false;

  const popupMessage = document.getElementById('popupMessage');
  const popupClose = document.getElementById('popupClose');
  const lastPopupTime = localStorage.getItem('lastPopupTime');
  const now = Date.now();

  if (!enablePopupDelay || !lastPopupTime || now - parseInt(lastPopupTime, 10) > 600000) {
    popup.classList.remove('hidden');
  }

  async function countLinesAndFiles() {
    const files = [
      'logic/mainMenu.js',
      'style/style.css',
      'index.html',  
      'logic/numberGuesser.js',
      'logic/clockCounter.js',
      'logic/calculator.js',
      'numberGuesser.html', 
      'clockCounter.html',
      'calculator.html'
    ];
    let totalLines = 0;
    let fileCount = 0;

    for (const file of files) {
      try {
        const response = await fetch(file);
        if (response.ok) {
          const content = await response.text();
          totalLines += content.split('\n').length;
          fileCount++;
        }
      } catch (error) {
        console.error(`Failed to fetch ${file}:`, error);
      }
    }

    return { totalLines, fileCount };
  }

  countLinesAndFiles().then(({ totalLines, fileCount }) => {
    const messageText = [
      "> I'm Audi. A developer learning Python and JavaScript. This website is open-source so feel free to check out my GitHub page to take a look at the code.",
      `> This website contains ${totalLines} lines of code across ${fileCount} files.`
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    popupMessage.innerHTML = '';
    const textContainer = document.createElement('div');
    popupMessage.appendChild(textContainer);

    function typeMessage() {
      if (!isTyping) return;
      if (lineIndex < messageText.length) {
        if (charIndex < messageText[lineIndex].length) {
          const textNode = document.createTextNode(messageText[lineIndex][charIndex]);
          textContainer.appendChild(textNode);
          charIndex++;
          setTimeout(typeMessage, 30);
        } else {
          const lineBreak = document.createElement('br');
          textContainer.appendChild(lineBreak);
          charIndex = 0;
          lineIndex++;
          setTimeout(typeMessage, 200);
        }
      }
    }

    typeMessage();

    popupClose.addEventListener('click', () => {
      isTyping = false;
      const popupTitle = document.getElementById('popupTitle');
      popupTitle.textContent = 'Take care';

      const waveEmoji = document.createElement('span');
      waveEmoji.textContent = '👋';
      waveEmoji.classList.add('wave-emoji');
      popupTitle.appendChild(waveEmoji);

      setTimeout(() => {
        let removalIndex = textContainer.childNodes.length - 1;
        function removeMessage() {
          if (removalIndex >= 0) {
            const node = textContainer.childNodes[removalIndex];
            textContainer.removeChild(node);
            removalIndex--;
            setTimeout(removeMessage, 15);
          } else {
            popup.classList.add('hidden');
            localStorage.setItem('lastPopupTime', Date.now().toString());
          }
        }
        removeMessage();
      }, 1000);
    });
  });
});