 /*GLOBAL FUNCTIONS*/ 

function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = basicElement;
    
    Mustache.parse(template);
    element.innerHTML += Mustache.render(template, data);
  
    return element;
  }

    var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
    var prefix = "https://cors-anywhere.herokuapp.com/";
    var myHeaders = {
        'X-Client-Id': '4018',
        'X-Auth-Token': '44ff47e0eb798038805be6d0ef8ad1f1'
    };

    console.log(myHeaders);

    /*DOWNLOADS DATA FROM REST API*/
    fetch(prefix + baseUrl + '/board', { headers: myHeaders})
        .then(function(resp) {
        return resp.json();
    })
    .then(function(resp) {
        console.log(resp.columns);
        setupColumns(resp.columns);
    });

    function setupColumns(columns) {
        columns.forEach(function(column) {
            let col = new Column(column.name, column.id);
            setupCards(col, column.cards);
        });
    }

    function setupCards(col, cards) {
        cards.forEach(function (card) {
        let cardObj = new Card(card.name, card.id, document.getElementById(col.id));
        });
    }

    /*CREATE BASIC BOARD*/
    const app = new KanbanManager(document.querySelector('#app'));
   