const translator = {
  row01: 0,
  row02: 1,
  row03: 2,
  column01: 0,
  column02: 1,
  column03: 2
};
let matrix = [
  ['t', 'i', 'c'],
  ['t', 'a', 'c'],
  ['t', 'o', 'e']
];

function itWonHorizontally([parentId, playerLetter]){
  const itIsRowRepeating = matrix[translator[parentId]].every(column => column === playerLetter);
  return itIsRowRepeating ? true : false;
}

function itWonVertically([className, playerLetter]){
  let colMatrix = matrix.map(row => {
    return row[translator[className]];
  });
  let itIsColumnRepeating = colMatrix.every(row => row === playerLetter);
  return itIsColumnRepeating ? true : false;
}

function itWonDiagonally([parentId, className, playerLetter]){
  let row = translator[parentId],
      column = translator[className],
      actualDiagonal = [];
  
  const secondaryDiagonal = matrix.map((row, index) => {
    return matrix[index][3 - index - 1];
  });
  const primaryDiagonal = matrix.map((row, index) => {
    return matrix[index][index];
  });
  
  if(row === (3-column-1)){
    actualDiagonal = secondaryDiagonal;
  }else if(row === column){
    actualDiagonal = primaryDiagonal;
  }else if(row === 1 && column === 1){
    const isPrimaryRepeating = primaryDiagonal.every(row => row === playerLetter);
    const isSecondaryRepeating = secondaryDiagonal.every(row => row === playerLetter);
    
    return (isPrimaryRepeating || isSecondaryRepeating) ? playerLetter+" wins" : "none winner yet";
  }
  const itIsDiagonalRepeating = actualDiagonal.every(item => item === playerLetter);
  return itIsDiagonalRepeating ? true : false;
}

function itIsInAnDiagonal([parentId, className]){
  let row = translator[parentId],
    column = translator[className];
  
  return ((row + column) % 2 === 0) ? true : false;
}

export function sendToMatrix([element, playerLetter]) {
  const parentId = element.parentNode.id;
  const className = element.classList[1];
  matrix[translator[parentId]][translator[className]] = playerLetter;
}

export function doesPlayerWon([element, playerLetter]){
  let parentID = element.parentNode.id;
  let className = element.classList[1];
  
  if(itWonHorizontally([parentID, playerLetter])){
    result.textContent = "Resultado: "+playerLetter+" venceu!";
    return true;
  }else if(itWonVertically([className, playerLetter])){
    result.textContent = "Resultado: "+playerLetter+" venceu!";
    return true;
  }else if(itIsInAnDiagonal([parentID, className])){
    if(itWonDiagonally([parentID, className, playerLetter])){
      result.textContent = "Resultado: "+playerLetter+" venceu!";
      return true;
    }
  }
  return false;
}