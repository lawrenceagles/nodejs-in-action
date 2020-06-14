'use strict';

const nonNavArea=document.querySelector('#nonNavArea');
let currentColorIndex = -1;
const colors = [ 'violet', 'green', 'red', 'blue' ];
const colorName = document.querySelector('#colorName');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  nonNavArea.style.background = colors[currentColorIndex];
  colorName.textContent = colors[currentColorIndex];
});



/* prev work
window.addEventListener('click', evt => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.style.left = `${ evt.pageX - 4 }px`;
  dot.style.top = `${ evt.pageY - 4 }px`;
  document.body.appendChild(dot);
});

window.addEventListener('keydown', evt => {
  console.log('keydown');
  if (evt.key == 'v') {
    document.body.style.background = 'violet';
  }
});

window.addEventListener('keyup', evt => {
  console.log('keyup');
  if (evt.key == 'v') {
    document.body.style.background = '';
  }
});

*/