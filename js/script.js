document.addEventListener('DOMContentLoaded', function() {
    
    /*OUR GLOBAL FUNCTION*/ 
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = basicElement;
        
        Mustache.parse(template);
        element.innerHTML += Mustache.render(template, data);
      
        return element;
      }

    /*MAIN CLASS FOR APP, OUR BOARD*/
    class KanbanManager {

        constructor(selector) {
            this.selector = selector
            generateTemplate('board-template', null, this.selector);
            this.addListeners()
        }

        addListeners() {
            document.querySelector('.create-column').addEventListener('click', (e) => {
                e.preventDefault();
                let name = document.querySelector('#column-name');
            
                if(name.value == '') {
                    name.classList.add('error');
                } else {
                    name.classList.remove('error');
                    let column = new Column(name.value, randomString());
                    name.value = '';                    
                }
            });

            const columnContainer = document.querySelector('.column-container');
            
            columnContainer.addEventListener('click', (e) => {
                if(e.target.classList.contains('btn-delete')){
                    e.target.parentElement.remove();
                }
            });

            document.querySelector('.column-container').addEventListener('click', (e) => {
                if(e.target.classList.contains('add-card')){                   
                    let table = e.target.parentElement.querySelector('.column-card-list');
                    let nameCard = prompt('Podaj nazwę zadania');
                    if (nameCard != null && nameCard != '') {
                        const card = new Card(nameCard, randomString(), table);
                      } else {
                          alert('Nie podałeś nazwy!');
                      }                    
                }
            });

        }    
    }

    /*CLASS FOR CONSTRUCT NEW COLUMN*/
    class Column {
        constructor(name, id) {
            this.name = name 
            this.id = id
            this.index = 1  
            generateTemplate('column-template', { name: this.name, id: this.id},  document.querySelector('.column-container'));
            this.addBcColor()
            this.addSort()
            
        }

        /*FUNTION ADD COLOR FOR COLUMN*/
        addBcColor() {
            let column = document.querySelectorAll('.column');
        
            for(let i = 0; i<column.length; i++) {

                if(this.index === 1) {
                    column[i].classList.add('color-first');
                    this.index++;
                } else if (this.index === 2) {
                    column[i].classList.add('color-second');
                    this.index++;
                } else {
                    column[i].classList.add('color-third');
                    this.index++;
                }
                
                if(this.index > 3) {
                    this.index = 1;
                }
            }
        }

        /*FUNCTION FOR ADD SORTABLE PLUGIN*/ 
        addSort() {
            let columns = document.querySelectorAll('.column-card-list');
            for(let i = 0; i<columns.length; i++) {
                this.initSortable(columns[i].id);
            }
        }

        initSortable(id) {
            var el = document.getElementById(id);
            var sortable = Sortable.create(el, {
              group: 'kanban',
              sort: true
            });
        }
    }

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


    const app = new KanbanManager(document.querySelector('#app'));

    const toDo = new Column('To Do', randomString());
    const doing = new Column('Doing', randomString());
    const done = new Column('Done', randomString());

    const newTask1 = new Card('Nauk React', randomString(), document.getElementById(toDo.id));
    const newTask2 = new Card('Nauka JS', randomString(), document.getElementById(doing.id));
    const newTask3 = new Card('Nauka HTML', randomString(), document.getElementById(done.id));
    
});