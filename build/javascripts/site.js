
const INIT_DEAL_SIZE = 12

var Card = {
    count: [1,2,3],
    shape:["sqr", "tri", "cir" ],
    color:["red", "green", "blue"],
    fill: ["solid", "empty","strip"]
}

function get_card(cardCount, cardShape, cardColor, cardFill){

    this.count = cardCount;
    this.shape = cardShape;
    this.color = cardColor;
    this.fill = cardFill;

}

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

    this.shuffle = function(){

// Used Fisher–Yates shuffle, start from end of the deck and swap it with randomly chosen one

        for (var currentIndex = this.cardDeck.length-1; currentIndex>=0; currentIndex--) {
            var rndIndex = Math.floor(Math.random() * (currentIndex + 1));
            var currentCard = this.cardDeck[currentIndex];
            this.cardDeck[currentIndex]=this.cardDeck[rndIndex];
            this.cardDeck[rndIndex] = currentCard;
        }
    }

    this.get_size = function(){
        return this.cardDeck.length;
    }

    this.draw_Card = function(){
        return this.cardDeck.pop();
    }

}

//TODO:
function has_set(currentDeal){

}


function create_game(){

    function find_set(){
        for(var i = 0; i < current_deal_size(); i++){
            for(var j = 0; j < current_deal_size(); j++){
                for(var k = 0; k < current_deal_size(); k++){
                    let card1 = this.currentDeal[i];
                    let card2 = this.currentDeal[j];
                    let card3 = this.currentDeal[k];
                    if(i != j && j != k && i != k){
                        //TODO: uncomment once Rules are done
                        //let isSet = Rules.verifySet();
                        //if(isSet){
                        // return [card1, card2, card3]
                        //}
                    }
                }
            }
        }
        return null; // no set found in currentDeal
    }

    function initialDeal(){
        for(var i = 0; i < INIT_DEAL_SIZE; i++){
            this.currentDeal.push(this.deck.draw_Card());
        }
        //TODO: uncomment once find_set() is complete
        /*while(find_set() == null){ //if no Set, add cards
          addThreeCards();
        }*/
    }

    function addThreeCards(){
        for(var i = 0; i < 3; i++){
            this.currentDeal.push(this.deck.draw_Card());
        }
    }

    function current_deal_size(){
        return this.currentDeal.length;
    }
    this.deck = new get_deck();
    this.playerScore = []
    this.computerScore = 0;
    this.deck.shuffle();

    //depending on what buttons the user clicks that will be the game settings
    // need a menu for number of human players
    // Radio Button for Computer Player
    // when Computer radio Button is enabled, a dropdown menu for Computer difficulty will appear
    // create a new Player object for each player (update score display to show for each player)



    //test deck
    this.currentDeal = [];
    initialDeal();


    console.log(this.currentDeal);

    console.log(this.deck.get_size())
    //console.log(this.deck);
}

// test deck



//create_game();
function toggle_comp(){
    let html = document.getElementById("tc").innerHTML;
    if(html == "Computer Disabled"){
        document.getElementById("tc").innerHTML = "Computer Enabled";
    }else{
        document.getElementById("tc").innerHTML = "Computer Disabled";
    }
}

function toggle_player(){
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
}

var x = document.getElementById("tc");
x.addEventListener("click", toggle_comp);
x = document.getElementById("tp");
x.addEventListener("click", toggle_player);