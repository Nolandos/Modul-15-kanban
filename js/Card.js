/*CLASS FOR CONSTRUCT NEW CARD*/
class Card {
    constructor(name,id,table) {
        this.name = name
        this.id = id 
        this.table = table
        generateTemplate('card-template', { name: this.name, id: this.id},  this.table);
        this.randomBeltColor()
        
    }
    
    /*FUNCTION RANDOMIZING BELT COLOR*/ 
    randomBeltColor () {
        let result = Math.round(Math.random()*3 +1);
        let card = document.getElementById(this.id);

        if (result === 1) {
            card.querySelector('.belt').classList.add('color-first');
        } else if(result === 2) {
            card.querySelector('.belt').classList.add('color-second');
        } else if(result== 3) {
            card.querySelector('.belt').classList.add('color-third');
        } else {
            card.querySelector('.belt').classList.add('color-fourth');
        }
    }
}