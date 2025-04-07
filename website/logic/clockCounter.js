document.addEventListener('DOMContentLoaded', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark', isDarkMode);
  document.getElementById('darkMode').checked = isDarkMode;
  document.getElementById('modeLabel').textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';

  document.getElementById('darkMode').addEventListener('change', () => {
    const isDarkMode = document.getElementById('darkMode').checked;
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

  const countDisplay = document.getElementById('count');
  let count = 0;

  document.getElementById('increment').addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
  });

  document.getElementById('decrement').addEventListener('click', () => {
    count--;
    countDisplay.textContent = count;
  });

  document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    countDisplay.textContent = count;
  });

  const timezoneDropdown = document.getElementById('timezoneDropdown');
  const timezones = Intl.supportedValuesOf('timeZone');
  timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz;
    option.textContent = tz;
    timezoneDropdown.appendChild(option);
  });

  timezoneDropdown.value = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function updateClock() {
    const now = new Date();
    const timezone = timezoneDropdown.value;
    const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    document.getElementById('clockTime').textContent = timeString;
  }

  setInterval(updateClock, 1000);

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