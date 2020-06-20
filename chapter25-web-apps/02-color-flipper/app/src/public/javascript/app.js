'use strict';

const nonNavArea=document.querySelector('#nonNavArea');
let currentColorIndex = -1;
const colors = [ '#f15025', 'green', 'red', 'rgba(133, 122, 200)', 'hsl(205, 78%, 60%)' ];
const colorName = document.querySelector('#colorName');
const btn = document.querySelector('#changeColorBtn');


btn.addEventListener('click', () => {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  nonNavArea.style.background = colors[currentColorIndex];
  colorName.textContent = colors[currentColorIndex];
});
