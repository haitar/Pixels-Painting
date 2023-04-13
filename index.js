// width = grid-template-columns: repeat(width,1fr);
// height = grid-template-columns: repeat(height,1fr);
// number of "cubes" = width * height
'use strict';

const width = document.querySelector('.width-input');
const height = document.querySelector('.height-input');
const gridContainer = document.querySelector('.grid-container');
const createGridBtn = document.querySelector('.create-grid');
const clearGridBtn = document.querySelector('.clear-grid');
const paint = document.querySelector('.paint');
const erase = document.querySelector('.erase');
const color = document.querySelector('[type="color"]');

let draw = false;
createGridBtn.addEventListener('click', createPaintPaper);
clearGridBtn.addEventListener('click', clearPaintPaper);
paint.addEventListener('click', () => paintAndErasePaper(color.value));
erase.addEventListener('click', () => paintAndErasePaper('white'));

function paintAndErasePaper(color) {
  const cube = document.querySelectorAll('.cube');
  cube.forEach((box) => {
    box.addEventListener('mouseover', () => {
      const colorValue = color;
      if (!draw) return;
      box.style.backgroundColor = colorValue;
    });
    box.addEventListener('mousedown', () => {
      const colorValue = color;
      draw = true;
      box.style.backgroundColor = colorValue;
    });
  });
}
window.addEventListener('mousedown', () => {
  draw = true;
});
window.addEventListener('mouseup', () => {
  draw = false;
});
function clearPaintPaper() {
  gridContainer.innerHTML = '';
  width.value = '';
  height.value = '';
}
function createPaintPaper() {
  gridContainer.innerHTML = '';
  let widthValue = width.value;
  let heightValue = height.value;
  if (!widthValue) {
    erreurMsg('width');
  }
  if (!heightValue) {
    erreurMsg('height');
  } else {
    // limit the valu to 200 to dont let the desktop freeze
    if (widthValue > 200) widthValue = 200;
    if (heightValue > 200) heightValue = 200;
    if (widthValue < 0) widthValue = 0;
    if (heightValue < 0) heightValue = 0;

    gridContainer.style.gridTemplateColumns = `repeat(${widthValue},1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${heightValue},1fr)`;
    // create cubes
    for (let i = 0; i < widthValue * heightValue; i++) {
      let div = document.createElement('div');
      div.classList.add('cube');
      gridContainer.appendChild(div);
      width.value = '';
      height.value = '';
    }
  }
}

// Ereur messages
function erreurMsg(msg) {
  gridContainer.style.display = 'flex';
  gridContainer.style.justifyContent = 'center';
  gridContainer.style.color = 'red';
  gridContainer.textContent = `Please insert a ${msg} value...`;
}
