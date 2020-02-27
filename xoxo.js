var currentPlayer = "O";
var currentType = "Noughts";
var currentAction = "picking";
const coordList = ["0_0", "1_0", "2_0", "0_1", "1_1", "2_1", "0_2", "1_2", "2_2"];
var noughts = ["O", "O+","O-", "O÷", "O*"];
var crosses = ["X", "X+", "X-", "X÷", "X*"];
var done = 1;


function place(box) {
    //Verifies the box is empty
    if(box.innerText !== "") return;
    
    //insert object current object into box
    box.innerText = currentPlayer.substring(0,1);
    
    //Game Play Rules
    
    //+ Battle Rule
    if(currentPlayer.substring(1,2) == "+") {
        plusBattle(box.id);  
    }
    
    //- Remove Rule
    if(currentPlayer.substring(1,2) == "-") {
        minRemove(box.id);
    }
    
    //÷ Trade Places Rule
    if(currentPlayer.substring(1,2) == "÷") {
        divideTrade(box.id);
    }
    
    //* Dupicate Rule
    if(currentPlayer.substring(1,2) == "*") {
        multiDupe(box.id)
    }

    //Flips and prepares for next player
    currentType == "Noughts" ? currentType = "Crosses": currentType = "Noughts";
    currentType == "Crosses" ? document.getElementById("PlayerChoise").innerHTML = '<input type="button" value="Ready Player Two? (X)" id="PlayerOne" onclick="showOptions()">':
    document.getElementById("PlayerChoise").innerHTML = '<input type="button" value="Ready Player One? (O)" id="PlayerOne" onclick="showOptions()">';

   
    //Check for Winning Conditions
    winningCondition(box.id);
    
    //Allow for Next Player Action
    currentAction = "picking";
}
function plusBattle(id) {
    var adjacents = checkAdjecent("full", id);
    var attackOpt = [];
    var fullPlus
    
    for(fullPlus = 0; fullPlus < adjacents.length; fullPlus++) {
        if(document.getElementById(adjacents[fullPlus]).innerText !== currentPlayer.substring(0,1)) {
            attackOpt.push(adjacents[fullPlus]);
        }
    }
    
    var fightingNumber = Math.floor(Math.random() * 6) + 1;
    
    if(attackOpt.length){
        var opponentBox = attackOpt[Math.floor(Math.random() * attackOpt.length)];
        if(fightingNumber >= 4){
            document.getElementById(opponentBox).innerText = document.getElementById(id).innerText;
        }
        else {
            document.getElementById(id).innerText = document.getElementById(opponentBox).innerHTML;
        }  
        winningCondition(opponentBox) 
    }
}

function minRemove(id) {
    var delOpt = checkAdjecent("full", id);
        if(delOpt.length != 0){
            var delBox = delOpt[Math.floor(Math.random() * delOpt.length)];
            document.getElementById(delBox).innerText = "";
     
        }
}

function divideTrade(id) {
    var adjacents = checkAdjecent("full", id);
    var tradeOpt =[];
    var fullTrade

    for(fullTrade=0; fullTrade<adjacents.length; fullTrade++) {
        if(document.getElementById(adjacents[fullTrade]).innerText != currentPlayer.substring(0,1)
        && document.getElementById(adjacents[fullTrade]).innerText != "") {
            tradeOpt.push(adjacents[fullTrade]);
        }
    }

    if(tradeOpt.length){
        var tradeBox = tradeOpt[Math.floor(Math.random() * tradeOpt.length)];
        var contents = document.getElementById(tradeBox).innerText;
        document.getElementById(tradeBox).innerText = document.getElementById(id).innerText ;
        document.getElementById(id).innerText  = contents;
        winningCondition(tradeBox);
    
    }
}

function multiDupe(id) {
    var cloneOpt = checkAdjecent("empty", id);
    if(cloneOpt.length){
        var cloneBox = cloneOpt[Math.floor(Math.random() * cloneOpt.length)];
        document.getElementById(cloneBox).innerText = document.getElementById(id).innerText;
        winningCondition(cloneBox);
    }
}

function checkAdjecent(status, currentBox) {
    var item
    var x
    var y
    adjecentEmpty = [];
    adjecentFull = [];
    currentX = parseInt(currentBox.substring(0,1));
    currentY = parseInt(currentBox.substring(2,3));
    
    if(currentX == 0) {
        currentXOptions = [currentX, currentX + 1];
    }
    if(currentX == 1) {
        currentXOptions = [currentX, currentX + 1, currentX -1];
    }
    if(currentX == 2) {
        currentXOptions = [currentX, currentX - 1];
    }
    
    if(currentY == 0) {
        currentYOptions = [currentY, currentY + 1];
    }
    if(currentY == 1) {
        currentYOptions = [currentY, currentY + 1, currentY -1];
    }
    if(currentY == 2) {
        currentYOptions = [currentY, currentY - 1];
    }
    
    adjacentTiles = [];
    for(x=0; x<currentXOptions.length; x++){
        for(y=0; y<currentYOptions.length; y++){
            adjacentTiles.push(currentXOptions[x] + "_" + currentYOptions[y]);
        }
    }
   
    for(item=0; item<adjacentTiles.length; item++){
        if(adjacentTiles[item] != currentBox) {
            if(document.getElementById(adjacentTiles[item]).innerText != ""){
                adjecentFull.push(adjacentTiles[item])
            }
            else {
                adjecentEmpty.push(adjacentTiles[item])
            }
        }

    }
    if(status == "full"){
        return adjecentFull;
    }
    else {
        return adjecentEmpty;
    }
}

function winningCondition(boxID){
    //Box 1
    if(boxID == "0_0"){
        checkGameBoard("0_0","1_0","2_0");
        checkGameBoard("0_0","1_1","2_2");
        checkGameBoard("0_0","0_1","0_2");
    }
    //Box 2
    if(boxID == "1_0"){
        checkGameBoard("0_0","1_0","2_0");
        checkGameBoard("1_0","1_1","1_2");
    }
    //Box 3
    if(boxID == "2_0"){
        checkGameBoard("0_0","1_0","2_0");
        checkGameBoard("2_0","1_1","0_2");
        checkGameBoard("2_0","2_1","2_2");
    }
    //Box 4
    if(boxID == "0_1"){
        checkGameBoard("0_1","1_1","2_1");
        checkGameBoard("0_0","0_1","0_2");
    }
    //Box 5
    if(boxID == "1_1"){
        checkGameBoard("0_0","1_1","2_2");
        checkGameBoard("1_0","1_1","1_2");
        checkGameBoard("2_0","1_1","0_2");
        checkGameBoard("0_1","1_1","2_1");
    }
     //Box 6
     if(boxID == "2_1"){
        checkGameBoard("0_1","1_1","2_1");
        checkGameBoard("2_0","2_1","2_2");
    }
    //Box 7
    if(boxID == "0_2"){
        checkGameBoard("0_0","0_1","0_2");
        checkGameBoard("0_2","1_1","2_0");
        checkGameBoard("0_2","1_2","2_2");
    }
    //Box 8
    if(boxID == "1_2"){
        checkGameBoard("0_2","1_2","2_2");
        checkGameBoard("1_0","1_1","1_2");
    }
    //Box 9
    if(boxID == "2_2"){
        checkGameBoard("0_2","1_2","2_2");
        checkGameBoard("2_2","1_1","0_0");
        checkGameBoard("2_0","2_1","2_2");
    }
}

function checkGameBoard(firstCoord,secondCoord,thirdCoord) {
    var first = document.getElementById(firstCoord).innerText;
    var second = document.getElementById(secondCoord).innerText;
    var thrid = document.getElementById(thirdCoord).innerText;
    var thisCoord
    if(first == "") return;
        if(first == second && first == thrid && done == 1){
            
            for(thisCoord = 0; thisCoord<coordList.length; thisCoord++) {
                document.getElementById(coordList[thisCoord]).innerText = currentPlayer.substring(0,1);
            }
            
            document.getElementById('PlayerChoise').innerHTML = '<input class="StupidButton" type="button" value="Start Over?" id="PlayerOne" onclick="resetGame()"></input>'
            
            done = 0;

            declareWinner();
        }
        
}
function declareWinner() {

    alert(currentPlayer.substring(0,1) + " is the winner")

}

function showOptions() { 
    if(currentType == "Noughts") {
        document.getElementById("PlayerChoise").innerHTML = "";
        for(i=0; i<noughts.length; i++) {
            document.getElementById('PlayerChoise').innerHTML += '<input class="StupidButton" type="button" value="'+ noughts[i] + '" onclick="chooseThis(\'' + noughts[i] + '\')">';
        }
    }
    else {
        document.getElementById("PlayerChoise").innerHTML = "";
        for(i=0; i<crosses.length; i++) {
            document.getElementById('PlayerChoise').innerHTML += '<input class="StupidButton" type="button" value="'+ crosses[i] + '" onclick="chooseThis(\'' + crosses[i] + '\')">';
        }
    
    }
}

function chooseThis(item) {
    if(currentAction == "picking") {    
        currentPlayer = item;
        if(currentType == "Noughts") {
            for(index=0; index<noughts.length; index++){
                if(noughts[index]== item){
                    noughts.splice(index,1);
                }
            }    
        }
        
        else { 
            for(index=0; index<crosses.length; index++){
                if(crosses[index]== item){
                    crosses.splice(index,1);
                }
            }
        }
        
        showOptions();
        currentAction = "playing";
    }
 }

 function resetGame() {
    location.reload()
 }
