var squares = document.querySelectorAll('.block')
var turn = 'white';
var selectedPiece;
var selectedBlock;
var side;
var attack;

function availablePawnMoves(selectedSquare){
    let boardPins = selectedSquare.id.split('-')//refers to where the selected sqaure is
    removePlayableSquares();
    if(selectedSquare.childNodes[1].dataset.side == 'white'){
        let lw = document.getElementById((Number(boardPins[0]) - 1) +'-'+(Number(boardPins[1]) - 1));
        let cf = document.getElementById((Number(boardPins[0]) - 1) +'-'+(Number(boardPins[1]) - 0));
        let cf2 = Number(boardPins[0]) == 6 ? document.getElementById((Number(boardPins[0]) - 2) +'-'+(Number(boardPins[1]) - 0)) : '';
        let rw = document.getElementById((Number(boardPins[0]) - 1) +'-'+(Number(boardPins[1]) + 1));
        playablePawnMoves(lw,cf,cf2,rw)
    }else{
        let lw = document.getElementById((Number(boardPins[0]) + 1) +'-'+(Number(boardPins[1]) - 1));
        let cf = document.getElementById((Number(boardPins[0]) + 1) +'-'+(Number(boardPins[1]) - 0));
        let cf2 = Number(boardPins[0]) == 1 ? document.getElementById((Number(boardPins[0]) + 2) +'-'+(Number(boardPins[1]) - 0)) : '';
        let rw = document.getElementById((Number(boardPins[0]) + 1) +'-'+(Number(boardPins[1]) + 1));
        playablePawnMoves(lw,cf,cf2,rw)
    }
}

function playablePawnMoves(lw,cf,cf2,rw){
    // console.log(lw,cf,cf2,rw)
    if(lw != null){//lw refers to the spot left-wide of the selectedSquare, we check if is not null
        if(lw.childNodes.length > 1 && lw.childNodes[1].dataset.side != turn){
            lw.classList.add('playable')
        }
    }
    if(cf.childNodes.length == 1){
        cf.classList.add('playable')
    }
    if(cf2 != ''){
        cf2.classList.add('playable')
    }
    if(rw != null){//lw refers to the spot left-wide of the selectedSquare, we check if is not null
        if(rw.childNodes.length > 1 && rw.childNodes[1].dataset.side != turn){
            rw.classList.add('playable')
        }
    }
    selectedPiece = undefined;
}

for(const square of squares){
    square.addEventListener('click',() => {
        if(square.classList.contains('playable')){
            // console.log('playable')
            let src = selectedBlock.childNodes[1];
            if(square.childNodes.length > 1){
                square.childNodes[1].remove()
            }
            square.append(src)
            removePlayableSquares()
            turn = turn == 'white' ? 'black' : 'white'
            //this will execute when a piece can be moved here
        }else{//we are selecting a piece to move
            //if the clicked square has a piece to be moved
            // console.log('new move')
            if(square.childNodes.length > 1){
                selectedBlock = square;
                selectedPiece = square.childNodes[1].dataset.piece;
            }
            if(square.childNodes[1].dataset.side == turn){
                switch (selectedPiece) {
                    case 'pawn':
                        availablePawnMoves(square)
                        break;
                    case 'knight':
                        console.log('f')
                        availableKnightMoves(selectedPiece)
                        break;
                    default:
                        break;
                }
            }
        }
    })
}

function removePlayableSquares(){
    let playables = document.querySelectorAll('.playable');
    for (let i = 0; i < playables.length; i++) {
        playables[i].classList.remove('playable')
    }
}