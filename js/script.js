document.addEventListener('DOMContentLoaded', function() {
    
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }


    function initSortable(id) {
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {
          group: 'kanban',
          sort: true
        });
      }
    
    class KanbanManager {

        constructor(selector) {
            this.selector = selector
            this.render()
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
                    const card = new Card('Nowe Zadanie', randomString(), table);
                }
            });

        }

        render() {
            this.selector.innerHTML = `            
            <div id="board" class="board">
                <h1>Kanban board</h1>
                    <form>
                        <input id="column-name" class="column-name" type="text" placeholder="Nazwa Kolumny">
                        <button class="create-column">Add a column</button>
                    </form>
                <div class="column-container"></div>
            </div>`;
        }       
    }

    class Column {
        constructor(name, id) {
            this.name = name 
            this.id = id
            this.addColumn()
            
        }

        addColumn() {
            document.querySelector('.column-container').innerHTML += `
                <div class="column">
                    <h2 class="column-title">${this.name}</h2>
                    <ul id=${this.id} class="column-card-list"></ul>
                    <button class="btn-delete">X</button>
                    <button class="add-card">Add a card</button>
                </div>
            `; 
            initSortable(this.id);     
        }
    }

    class Card {
        constructor(name,id,table) {
            this.name = name
            this.id = id 
            this.table = table
            this.addCard()
        }

        addCard() {
            this.table.innerHTML += `
            <li id="${this.id}" class="card">
                ${this.name}
                <button class="delete-card btn-delete" id="delete-card">X</button>
            </li>
            `;
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