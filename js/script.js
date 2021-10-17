var state = false;
var winningComb = '';
const winningCombinations = [
    '012',
    '036',
    '048',
    '147',
    '258',
    '246',
    '345',
    '678'
]

function setCellState (clickedElement){
    if (clickedElement.target.innerHTML === '')
    {
        state = !state;
        clickedElement.target.innerHTML = state ? '<span>X</span>' : '<span>O</span>';
        if(checkWinner(state ? '<span>X</span>' : '<span>O</span>')){ 
            colorWinningBlocks();
        }
    } else { return }
}

function colorWinningBlocks(){
    document.querySelectorAll('.cell').forEach((item, i) => {
        winningComb.split('').forEach(w => {
            if(w == i){
                item.style.backgroundColor = 'yellow'
            }
        });
    });
}

function checkWinner(sign) {
    var win = false;
    var indexArray = Array.prototype.slice.call(document.querySelectorAll('.cell')).map((item, i) => {return item.innerHTML === sign ? i : ''}).filter(i => i!=='').join('');
    indexArray.length > 2 ? winningCombinations.forEach(comb => { 
        if(comb.split('').every(c => indexArray.indexOf(c) !== -1)){
            win=true;
            winningComb = comb;
        }
    }) : null;
    return win;
}

function resetColor(){
    document.querySelectorAll('.cell').forEach((item, i) => {
        winningComb.split('').forEach(w => {
            if(w == i){
                item.style.backgroundColor = 'white'
            }
        });
    });
}

function resetGame() {
    state = false;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    resetColor();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', (e) => { setCellState (e) }));
document.querySelector('.restart').addEventListener('click', resetGame);