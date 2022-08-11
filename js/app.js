//here is where all the game play logic will be
const allSquares = document.querySelectorAll('.block');
for(const currentSquare of allSquares){
    currentSquare.addEventListener('click',function(){
        if(currentSquare.classList.contains('playable')){
            let src = selectedPiece;
            selectedPiece.remove();
            removeClassPlayable()
            currentSquare.append(src);
        }
    })
}
const allPieces = document.querySelectorAll('.piece');
var selectedPiece;
for(const currentPiece of allPieces){
    currentPiece.addEventListener('click',function(){
        removeClassPlayable()
        let piece = this.dataset.piece;
        let side = this.dataset.side;
        let point = this.parentElement.id;
        selectedPiece = this;
        switch (piece) {
            case 'pawn':
                pawnAvailableMoves(side,point)
                break;
            case 'knight':
                knighAvailableMoves(side,point)
                break;
            default:
                break;
        }
    })
}


function pawnAvailableMoves(side, point){

    const points = point.split('-');
    /* lw == left-wide, cf == center-forward, rw == right-wide */
    var lw;
    var cf;
    var cf2;//applicable to first move since the pawn can jump 2 squares at the beginning
    var rw;
    var attack;
    if(side == 'white'){
        attack = 'black';
        lw = document.getElementById((Number(points[0]) - 1) + '-' + (Number(points[1]) - 1));
        cf = document.getElementById((Number(points[0]) - 1) + '-' + (Number(points[1]) - 0));
        if(Number(point[0]) == 6){
            cf2 = document.getElementById((Number(points[0]) - 2) + '-' + (Number(points[1]) - 0));
        }
        rw = document.getElementById((Number(points[0]) - 1) + '-' + (Number(points[1]) + 1));
    }else if(side == 'black'){
        attack = 'white';
        lw = document.getElementById((Number(points[0]) + 1) + '-' + (Number(points[1]) - 1));
        cf = document.getElementById((Number(points[0]) + 1) + '-' + (Number(points[1]) - 0));
        if(Number(point[0]) == 1){
            cf2 = document.getElementById((Number(points[0]) + 2) + '-' + (Number(points[1]) - 0));
        }
        rw = document.getElementById((Number(points[0]) + 1) + '-' + (Number(points[1]) + 1));
    }
    // check if advanceable squares are empty by testing if they exist or don't have 
    if(cf != null && cf.childNodes.length == 1){
        cf.classList.add('playable');
    }
    if(cf2 != null && cf2.childNodes.length == 1){
        cf2.classList.add('playable');
    }
    if(lw != null && lw.childNodes.length > 1){
        if(lw.childNodes[1].dataset.side == attack){
            lw.classList.add('playable')
        }
    }
    if(rw != null && rw.childNodes.length > 1){
        if(rw.childNodes[1].dataset.side == attack){
            rw.classList.add('playable')
        }
    }
}

function removeClassPlayable(){
    const playables = document.querySelectorAll('.playable');
    for (let i = 0; i < playables.length; i++) {
        playables[i].classList.remove('playable')
    }
    return;
}