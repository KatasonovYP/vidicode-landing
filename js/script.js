const checked = false;
const header = document.querySelector('.header');
const gamburger = document.querySelector('.gamburger');
const agiles = document.querySelectorAll('.agile');
const headerPanel = document.querySelector('.header-panel');
let collapsed = true;

function onCollapse() {
  collapsed = !collapsed;
  for (item of agiles) {
    if (collapsed) {
      item.classList.add('hide');
      item.classList.remove('roll');
      header.classList.remove('header-roll');
      gamburger.classList.remove('hide');
    } else {
      header.classList.add('header-roll');
      item.classList.add('roll');
      item.classList.remove('hide');
    }
  }
}

function onResize() {
  collapsed = true;
  for (item of agiles) {
    if (header.clientWidth < 850) {
      item.classList.add('hide');
      gamburger.classList.remove('hide');
      headerPanel.classList.add('gamburger-active');
    } else {
      item.classList.remove('hide');
      gamburger.classList.add('hide');
      item.classList.remove('roll');
      header.classList.remove('header-roll');
      headerPanel.classList.remove('gamburger-active');
    }
  }
}

window.addEventListener('resize', onResize);
gamburger.addEventListener('click', onCollapse);
onResize();

async function createRandomSvg() {
  const svgs = ['lock.svg', 'circle.svg', 'line.svg', 'triangle.svg']; // Add your SVG filenames here
  const randomSvgName = svgs[Math.floor(Math.random() * svgs.length)];
  const svg = document.createElement('img');
  const size = Math.floor(Math.random() * 48 + 16);
  svg.setAttribute('height', size);
  svg.src = `../assets/background/${randomSvgName}`;
  svg.classList.add('fly');
  document.body.appendChild(svg);
  svg.style.transition = `rotate${Math.random() > 0.5 ? 'Left' : 'Right'} 2s infinite linear, left 1s, top 1s`;
  setTimeout(() => {
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * document.body.clientHeight;

    svg.style.left = endX + 'px';
    svg.style.top = endY + 'px';
  }, 1000);

  return svg;
}

function createSvgs(n) {
  for (let i = 0; i < n; ++i) {
    createRandomSvg();
  }
}

// createSvgs(50);
