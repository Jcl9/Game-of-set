
const INIT_DEAL_SIZE = 12;
var currentDeal = [];
var computerEnabled = false;
var humanScores = [];
var compScore = -1;
var currentPlayer = -1;
var compStartTimeMillis = -1;
var compEndTimeMillis = -1;
var computerTimeToBeat = Math.random() * (20-15) + 15; //Computer is given between 10 and 15 seconds to find a set

/* card positions    NOT array index */
var pos1 = -1;
var pos2 = -1;
var pos3 = -1;

var Card = {
    count: [1,2,3],
    shape:["sqr", "tri", "cir" ],
    color:["red", "green", "blue"],
    fill: ["solid", "empty","strip"]
};

/**
 * Constructor Function for a single card
 */
function get_card(cardCount, cardShape, cardColor, cardFill){

    this.count = cardCount;
    this.shape = cardShape;
    this.color = cardColor;
    this.fill = cardFill;
    this.str = this.count + " " + this.shape + " " + this.fill;

}

/**
 * Creates the 81-card deck
 */
function get_deck () {

    this.cardDeck = [];

    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            for (var c = 0; c < 3; c++) {
                for (var d = 0; d < 3; d++) {
                    this.cardDeck.push(new get_card(Card.count[a], Card.shape[b], Card.color[c], Card.fill[d]));
                }
            }
        }
    }

    /**
     * Shuffles the deck
     */
    this.shuffle = function(){
        // Used Fisher–Yates shuffle, start from end of the deck and swap it with randomly chosen one
        for (var currentIndex = this.cardDeck.length-1; currentIndex>=0; currentIndex--) {
            var rndIndex = Math.floor(Math.random() * (currentIndex + 1));
            var currentCard = this.cardDeck[currentIndex];
            this.cardDeck[currentIndex]=this.cardDeck[rndIndex];
            this.cardDeck[rndIndex] = currentCard;
        }
    };

    this.get_size = function(){
        return this.cardDeck.length; //returns the number of cards remaining in the deck
    };

    this.draw_Card = function(){
        return this.cardDeck.pop(); // removes one card from the deck
    }

}

/**
 * checks that the three Card objects form a set
 * Returns false if NOT a set, true if a set
 */
function verifySet(card1, card2, card3){
    /* checks counts are all same or all different */
    if(card1.count == card2.count && card1.count != card3.count ||
        card1.count == card3.count && card1.count != card2.count ||
        card3.count == card2.count && card1.count != card3.count){
        return false;
    }
    /* checks shapes are all same or all different */
    if(card1.shape == card2.shape && card1.shape != card3.shape ||
        card1.shape == card3.shape && card1.shape != card2.shape ||
        card3.shape == card2.shape && card1.shape != card3.shape){
        return false;
    }
    /* checks colors are all same or all different */
    if(card1.color == card2.color && card1.color != card3.color ||
        card1.color == card3.color && card1.color != card2.color ||
        card3.color == card2.color && card1.color != card3.color){
        return false;
    }
    /* checks fills are all same or all different */
    if(card1.fill == card2.fill && card1.fill != card3.fill ||
        card1.fill == card3.fill && card1.fill != card2.fill ||
        card3.fill == card2.fill && card1.fill != card3.fill){
        return false;
    }
    return true; // if all conditions are satisfied
}

/**
 * Returns an array of index positions in currentDeal if currentDeal has a set; returns false otherwise
 */
function find_set(){
    for(var i = 0; i < current_deal_size(); i++){
        for(var j = 0; j < current_deal_size(); j++){
            for(var k = 0; k < current_deal_size(); k++){
                let card1 = currentDeal[i];
                let card2 = currentDeal[j];
                let card3 = currentDeal[k];
                if(i != j && j != k && i != k){
                    let isSet = verifySet(card1, card2, card3);
                    if(isSet){
                        return [i, j, k] //returns an array of index positions in currentDeal
                    }
                }
            }
        }
    }
    return false; // no set found in currentDeal
}

//returns the number of cards currently in play
function current_deal_size(){
    return currentDeal.length;
}

// draws three cards from the deck and adds them to currentDeal
function addThreeCards(){
    if(this.deck.get_size() > 0){
        for(var i = 0; i < 3; i++){
            currentDeal.push(this.deck.draw_Card());
        }
    }
}

/**
 * called when initializing a deal at the start of the game
 */
function initialDeal(){
    for(var i = 0; i < INIT_DEAL_SIZE; i++){
        currentDeal.push(this.deck.draw_Card());
    }
    while(find_set() == false){ //if no Set, add cards
        console.log("adding 3 cards");
        addThreeCards();
    }
}

/**
 * Called when (Start Game) is pressed. Sets up all necessary variables and updates UI
 */
function create_game(){
    if(current_deal_size() > 0){ // game already started
        return 0;
    }

    currentDeal = [];
    computerEnabled = false;
    humanPLayers = [];
    humanScores = [];
    compScore = 0;

    this.deck = new get_deck();
    this.deck.shuffle();
    this.deck.shuffle();

    initialDeal();

    //set UI up properly
    computerEnabled = document.getElementById("tc").innerHTML == "Computer Enabled"; // boolean

    if(computerEnabled){ //create Computer object
        compScore = 0;
    }

    //create Human Players
    let temp1 = Number(document.getElementById("tp").innerHTML.charAt(15).toString()); //String will always be 15 characters long

    for(i = 0; i < temp1; i++){
        humanScores[i] = 0; //initialize human scores
        document.getElementById("blank" + (i+5)).innerHTML = "Player " + (i+1); //id="blank5"...blank8
    }

    document.getElementById("tc").innerHTML = "";
    document.getElementById("tp").innerHTML = "View Scores";
    document.getElementById("start").innerHTML = "Start Game (Disabled)";


    //set cards up properly
    for(var i = 0; i < current_deal_size(); i++){ //cards in deck
        var element = document.getElementById("c" + (i+1));
        element.innerHTML = currentDeal[i].str;
        element.style.color = currentDeal[i].color;
        element.disable = false;
    }
    for(var i = current_deal_size(); i < 21; i++){ //remaining card slots
        var element = document.getElementById("c" + (i+1));
        element.innerHTML = "";
        element.disable = true;
    }

    //start computer Timer
    compStartTimeMillis = new Date().getTime(); // ADD end time to verify and check
}

/**
 * Updates the button corespoding to the card that was pressed
 * @param pos:  the position of the card in currentDeal that was selected
 * @param remove: true if card is to be unselected
 */
function updateSelectedCardPos(pos, remove) {
    if (remove == true) {
        if (pos1 == -1) {
            pos1 = pos;
        } else if (pos2 == -1) {
            pos2 = pos;
        } else if (pos3 == -1) {
            pos3 = pos;
        } else {
            document.getElementById("c" + pos).style.backgroundColor = "LightGray";
            window.alert("3 cards have already been selected. Deselect a card in order to choose another one.");
        }
    } else {
        if (pos1 == pos) {
            pos1 = -1;
        } else if (pos2 == pos) {
            pos2 = -1;
        } else if (pos3 == pos) {
            pos3 = -1;
        }
    }
    document.getElementById("b10").innerHTML = pos1 + " " + pos2 + " " + pos3;
}

/**
 * Updates the computer toggler button when pressed
 */
function toggle_comp(){
    if(current_deal_size() == 0){
        let html = document.getElementById("tc").innerHTML;
        if(html == "Computer Disabled"){
            document.getElementById("tc").innerHTML = "Computer Enabled";
        }else{
            document.getElementById("tc").innerHTML = "Computer Disabled";
        }
    }
}

/**
 * Updates the player toggler button when pressed
 */
function toggle_player(){
    if(current_deal_size() == 0){
        let html = document.getElementById("tp").innerHTML;
        if(html == "Human Players: 1"){
            document.getElementById("tp").innerHTML = "Human Players: 2";
        }else if(html == "Human Players: 2"){
            document.getElementById("tp").innerHTML = "Human Players: 3";
        }else if(html == "Human Players: 3"){
            document.getElementById("tp").innerHTML = "Human Players: 4";
        }else if(html == "Human Players: 4"){
            document.getElementById("tp").innerHTML = "Human Players: 1";
        }
    }else{ // where this is now the "Report Scores" Button (button is multipurpose)
        reportScores("");
    }
}

/**
 * Sends a window alert with the scores of all current players
 *
 * @param prefix: Anything that will be on the top line in the alert message
 */
function reportScores(prefix){
    let scores = prefix + "\n\nCurrent Scores:\n\n";
    if(computerEnabled){
        scores += "Computer: " + compScore + "\n";
    }
    for(i = 0; i < humanScores.length; i++){
        scores += "Player " + (i+1) + ": " + humanScores[i] + "\n";
    }
    window.alert(scores);
}

/**
 * verifies that the selected cards form a set
 * @returns {number}
 */
function verifyButton(){
    compEndTimeMillis = new Date().getTime();
    if(current_deal_size() == 0){ //disabled when no cards are in play  ie. before (Start Game) is pressed
        return 0;
    }

    if(currentPlayer < 1) {
        window.alert("Select a player who found the set");
    }else if(pos1 === -1 || pos2 === -1 || pos3 === -1 ){ //less than 3 cards are currently selected
        window.alert("A set consists of 3 cards. Please select 3 cards");
    }else{
        let card1 = currentDeal[pos1 - 1]; //subtract 1 because array indices start with 0
        let card2 = currentDeal[pos2 - 1];
        let card3 = currentDeal[pos3 - 1];


        if(verifySet(card1, card2, card3)){ //once the player has entered a correct Set of cards
            if(computerEnabled &&(compEndTimeMillis - compStartTimeMillis)/1000.0 > computerTimeToBeat){ //computer found it first
                compScore++;

                let set = find_set();
                if(set !== false){
                    currentDeal[set[0]] = null;
                    currentDeal[set[1]] = null;
                    currentDeal[set[2]] = null;
                    reportScores("Computer found a set first")
                }

                compStartTimeMillis = new Date().getTime();
                //remove a set from the deck and update UI

            }else{ // human found a set first
                humanScores[currentPlayer - 1]++;

                reportScores("This is a Set!!");

                currentDeal[pos1 - 1] = null; //removed cards in found set
                currentDeal[pos2 - 1] = null;
                currentDeal[pos3 - 1] = null;
            }
        /* collapse the current Deal */
            currentDeal = currentDeal.filter(function f(e){
                return e != null;
            });
            // add cards to current deal
            if(current_deal_size() < INIT_DEAL_SIZE || find_set() === false){
                addThreeCards();
            }
            while(this.deck.get_size() > 0 && find_set() === false){
                addThreeCards()
            }
            if(find_set() === false){ // no more cards in deck and deal has no more SETS
                reportScores("GAME OVER");
            }else{
                //update UI
                for(var i = 0; i < current_deal_size(); i++){
                    var element = document.getElementById("c" + (i+1));
                    element.innerHTML = currentDeal[i].str;
                    element.style.color = currentDeal[i].color;
                    element.disable = false;
                }
                for(var i = current_deal_size(); i < 21; i++){
                    element = document.getElementById("c" + (i+1));
                    element.innerHTML = "";
                    element.disable = true;
                }
            }

            // update scores
        }else{
            window.alert("Invalid Set");
        }

        //deselect the cards in the view:
        // set pos1...pos3 to -1
        setAllLightGray();
        pos1 = -1;
        pos2 = -1;
        pos3 = -1;
    }
    // deselect current Player (if player screws up the set then everone has a chanve to select it again
    document.getElementById("blank" + (currentPlayer+4)).style.backgroundColor = "LightGray";
    currentPlayer = -1;
}

/**
 * resets the global variables to their default states and updates UI to how it was when the page was first loaded
 */
function resetGame(){
    currentDeal = [];
    computerEnabled = false;
    humanScores = [];
    compScore = -1;
    currentPlayer = -1;
    compStartTimeMillis = -1;
    compEndTimeMillis = -1;
    computerTimeToBeat = Math.random() * (20-15) + 15;

    var pos1 = -1;
    var pos2 = -1;
    var pos3 = -1;

    document.getElementById("tc").innerHTML = "Computer Disabled";
    document.getElementById("tp").innerHTML = "Human Players: 1";
    document.getElementById("start").innerHTML = "Start Game";

    for(let i = 1; i <= 21; i++){
        document.getElementById("c" + i).innerHTML = "";
    }
    for(let i = 1; i <= 8; i++){ // 10 blank ID's
        document.getElementById("blank" + i).innerHTML = "";
    }

}

/**
 * sends a window alert with the locations of the cards in a set
 *
 * displays a grid where the X's mark the locations of the cards in the set
 */
function hint(){
    if(current_deal_size() > 0){
        var hint = find_set();
        if(hint === false){
            window.alert("There are no sets in the current Deal");
        }else{
            let str = "X's mark the locations of cards in a set on the grid\n\n";
            for(var i = 0; i < current_deal_size(); i++){
                if(i == hint[0] || i == hint[1] || i == hint[2]){
                    str = str + " X ";
                }else{
                    str = str + " ~ ";
                }
                if((i+1)%3 == 0){
                    str = str + "\n";
                }
            }
            window.alert(str);
        }
    }
}

/**
 * Selects which player found the set (once a player is selected PlayerSelected cannot change until verifySet() is executed)
 * @param p
 */
function selectPlayer(p){
    if(current_deal_size() >= 0 && p <= humanScores.length && currentPlayer == -1){
        // +5 bacause elements blank5 ~ blank8 are used for player numbers
        for(i = 0; i < humanScores.length; i++){
            if(i + 1 == p){
                document.getElementById("blank" + (i+5)).style.backgroundColor = "grey";
                currentPlayer = p;
            }else{
                document.getElementById("blank" + (i+5)).style.backgroundColor = "LightGray";
            }
        }
    }
}

/**
 * sets all card buttons to the lightGray background color
 */
function setAllLightGray(){
    document.getElementById("c1").style.backgroundColor = "LightGray";
    document.getElementById("c2").style.backgroundColor = "LightGray";
    document.getElementById("c3").style.backgroundColor = "LightGray";
    document.getElementById("c4").style.backgroundColor = "LightGray";
    document.getElementById("c5").style.backgroundColor = "LightGray";
    document.getElementById("c6").style.backgroundColor = "LightGray";
    document.getElementById("c7").style.backgroundColor = "LightGray";
    document.getElementById("c8").style.backgroundColor = "LightGray";
    document.getElementById("c9").style.backgroundColor = "LightGray";
    document.getElementById("c10").style.backgroundColor = "LightGray";
    document.getElementById("c11").style.backgroundColor = "LightGray";
    document.getElementById("c12").style.backgroundColor = "LightGray";
    document.getElementById("c13").style.backgroundColor = "LightGray";
    document.getElementById("c14").style.backgroundColor = "LightGray";
    document.getElementById("c15").style.backgroundColor = "LightGray";
    document.getElementById("c16").style.backgroundColor = "LightGray";
    document.getElementById("c17").style.backgroundColor = "LightGray";
    document.getElementById("c18").style.backgroundColor = "LightGray";
    document.getElementById("c19").style.backgroundColor = "LightGray";
    document.getElementById("c20").style.backgroundColor = "LightGray";
    document.getElementById("c21").style.backgroundColor = "LightGray";
}

/**
 * Updates the background of the selected button and updates the selected cards variables
 * @param n: the number of the card selected
 * @param lim: how many cards must be in the currentDeal for this button to become enabled
 */
function selectCard1(n, lim){
    if(current_deal_size() >= lim && currentPlayer > 0){
        if(document.getElementById("c" + n).style.backgroundColor == "grey"){
            document.getElementById("c" + n).style.backgroundColor = "LightGray";
            updateSelectedCardPos(n, false);
        }else{
            document.getElementById("c" + n).style.backgroundColor = "grey";
            updateSelectedCardPos(n, true);
        }
    }
}
