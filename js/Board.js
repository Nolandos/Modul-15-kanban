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