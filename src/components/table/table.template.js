const CODES = {
  A: 65,
  Z: 90
}

function toColumn(col, index) {
  return `
    <div class="column" data-column-index="${index}" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>`;
}

function toCell(el, index) {
  return `<div class="cell" data-column-index="${index}" contenteditable=""></div>`;
}

function createRow(index, content) {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');

  const cells = new Array(colsCount)
    .fill('')
    .map(toCell)
    .join('');

  rows.push(createRow('', cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}