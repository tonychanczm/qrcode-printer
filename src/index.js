import QRCode from 'qrcode';

document.getElementById('generate-btn').addEventListener('click', () => {
  const title = document.getElementById('title-input').value;
  const text = document.getElementById('text-input').value;

  if (title && text) {
    addQRCode(title, text);
    document.getElementById('title-input').value = '';
    document.getElementById('text-input').value = '';
  } else {
    alert('Please enter both title and text.');
  }
});

document.getElementById('delete-all-btn').addEventListener('click', () => {
  const printArea = document.getElementById('print-area');
  while (printArea.firstChild) {
    printArea.removeChild(printArea.firstChild);
  }
});

document.getElementById('text-input').addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    const input = event.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = input.value.substring(0, start) + '\t' + input.value.substring(end);
    input.selectionStart = input.selectionEnd = start + 1;
  }
});

function addQRCode(title, text) {
  const card = document.createElement('div');
  card.className = 'card';

  const canvas = document.createElement('canvas');
  const cardTitle = document.createElement('div');
  cardTitle.className = 'card-title';
  cardTitle.textContent = title;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'x';
  deleteBtn.addEventListener('click', () => {
    card.remove();
  });

  card.appendChild(deleteBtn);
  card.appendChild(canvas);
  card.appendChild(cardTitle);

  document.getElementById('print-area').appendChild(card);

  QRCode.toCanvas(canvas, text, { errorCorrectionLevel: 'H' }, (error) => {
    if (error) console.error(error);
    console.log('QR code generated!');
  });
}

