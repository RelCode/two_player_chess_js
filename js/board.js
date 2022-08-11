//chess board layout starts here
const navbarHeight = document.querySelector('header').clientHeight;
const maxHeight = navbarHeight * 2;
document.querySelector('.container').style.height = 'calc(100% - '+maxHeight+'px)'
document.querySelector('.container').style.top = navbarHeight+'px'
const squareHeight = document.querySelector('.squares').clientHeight / 8;
const squareWidth = document.querySelector('.squares').clientWidth / 8;
const rows = ['a','b','c','d','e','f','g','h'];
const columns = ['8','7','6','5','4','3','2','1'];
const pieces = ['rook','knight','bishop','queen','king','bishop','knight','rook'];
var row = '';
for (let i = 0; i < 8; i++) {
    var className = i % 2 == 0 ? 'black' : 'white';
    var placePiece = 0;
    for (let j = 0; j < 8; j++) {
        if(className == 'white'){
            className = 'black';
        }else{
            className = 'white'
        }
        var piece = '';
        if(i == 0 && j < 8 || i == 7 && j < 8){
            let side = i === 0 ? 'black' : 'white';
            piece = '<img class="piece" src="./chess pieces/'+side+'/' + pieces[placePiece] + '.png" alt="'+pieces[placePiece]+'" title="'+pieces[placePiece]+'" data-side="'+className+'" data-piece="'+side+'"/>';
            placePiece = placePiece + 1;
        }
        if(i == 1 && j < 8 || i == 6 && j < 8){
            let side = i === 1 ? 'black' : 'white';
            piece = '<img class="piece" src="./chess pieces/'+side+'/pawn.png" alt="pawn" title="pawn" data-side="'+side+'" data-piece="pawn"/>';
            placePiece = placePiece + 1;
        }
        row += '<div class="block '+className+'" id="'+i+'-'+j+'" style="width:'+squareWidth+'px;height:'+squareHeight+'px;">'+columns[i]+''+rows[j]+''+piece+'</div>';
    }
}
document.querySelector('.squares').innerHTML = row;
//chess board layout ends here