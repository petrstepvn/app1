const grid = document.querySelector('.grid');

const sizeDOM = document.getElementById('size-select');
let size = parseInt(sizeDOM.value);
let cells;
let Numbers = [];
let randomNumber;

sizeDOM.addEventListener('change', () => start());

grid.addEventListener('click', function (e) {
  let ID = parseInt(e.target.getAttribute('id'));
  let currentCellText = parseInt(e.target.textContent);
  if (cells[ID + 1] && cells[ID + 1].textContent === '') {
    Numbers.splice(ID, 1, '');
    Numbers.splice(ID + 1, 1, currentCellText);
  } else if (cells[ID - 1] && cells[ID - 1].textContent === '') {
    Numbers.splice(ID, 1, '');
    Numbers.splice(ID - 1, 1, currentCellText);
  } else if (cells[ID + size] && cells[ID + size].textContent === '') {
    Numbers.splice(ID, 1, '');
    Numbers.splice(ID + size, 1, currentCellText);
  } else if (cells[ID - size] && cells[ID - size].textContent === '') {
    Numbers.splice(ID, 1, '');
    Numbers.splice(ID - size, 1, currentCellText);
  }

  updateUI();
  console.log(Numbers);
});

// FUNCTIONS

function start() {
  size = parseInt(sizeDOM.value);
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.innerHTML = '';
  for (let i = 0; i < size * size; i++) {
    const newCell = document.createElement('div');
    newCell.className = 'cell';
    grid.appendChild(newCell);
  }
  cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    cell.setAttribute('id', i);
  });
  generateNumbers();
  console.log('started');
}
start();

function generateNumbers() {
  // Clear Numbers array
  Numbers = [];
  // Fill Numbers with unique numbers - last 1
  for (let i = 1; i <= cells.length; i++) {
    randomNumber = Math.ceil(Math.random() * cells.length);
    while (Numbers.find((n) => n === randomNumber)) {
      randomNumber = Math.ceil(Math.random() * cells.length);
    }
    Numbers.push(randomNumber);
  }
  Numbers.splice(Numbers.indexOf(size * size), 1, '');
  updateUI();
}

function updateUI() {
  cells.forEach((cell, i) => {
    cell.textContent = Numbers[i];
  });
  // Win check
  if (Numbers.slice(1).every((item, i) => Numbers[i] <= item)) {
    alert('congratz nerd');
  }
  // Vibe check
  console.log('stay lit fam');
}
