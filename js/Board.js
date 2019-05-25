 /*MAIN CLASS FOR APP, OUR BOARD*/
 class KanbanManager {

    constructor(selector) {
        this.selector = selector
        generateTemplate('board-template', null, this.selector);
        this.addListeners()
        
    }

    addListeners() {
        /*CREATE NEW COLUMN*/
        document.querySelector('.create-column').addEventListener('click', (e) => {
            e.preventDefault();
            let name = document.querySelector('#column-name');
            if(name.value == '') {
                name.classList.add('error');
            } else {
                name.classList.remove('error');

                let data = new FormData();
                data.append('name', name.value);

                fetch(prefix + baseUrl + '/column', {
                    method: 'POST',
                    headers: myHeaders,
                    body: data,
                  })
                    .then(function(resp) {
                        return resp.json();
                    })
                    .then(function(resp) {   
                        let column = new Column(name.value, resp.id);
                        name.value = '';   
                    });                    
            }
        });

        const columnContainer = document.querySelector('.column-container');
        
        /*FUNCTION FOR DRAG AND DROP CARS*/
        columnContainer.addEventListener('drop', (e) => {
            
                let id = e.target.id;
                let column_id = e.target.parentElement.id;
                let name = e.target.parentElement.querySelector('.description').innerHTML;

                var data = {
                    'name': name,
                    'bootcamp_kanban_column_id': column_id,
                }

                fetch(prefix + baseUrl + '/card/' + id, {
                    method: 'PUT',
                    headers: {
                        'X-Client-Id': '4018',
                        'X-Auth-Token': '44ff47e0eb798038805be6d0ef8ad1f1',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(function(res) {
                    return res.json();
                })
                .then(function(resp) {
                   console.log('i już');
                }); 
        })
        
        /*FUNCTION FOR EDIT COLUMN NAME*/
        columnContainer.addEventListener('click', (e) => {
            
            if(e.target.classList.contains('edit-column-name')) {
                let name = prompt('Podaj nazwę kolumny');
        
                if(name === '') {
                    alert('Nie podałeś nazwy!');
                } else {    
                    let id = e.target.parentElement.querySelector('.column-card-list').id;  
                    var data = {'name': name}
                   
                
                    fetch(prefix + baseUrl + '/column/' + id, {
                        method: 'PUT',
                        headers: {
                            'X-Client-Id': '4018',
                            'X-Auth-Token': '44ff47e0eb798038805be6d0ef8ad1f1',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(resp) {
                        let columnName = document.getElementById(resp.id).parentElement.querySelector('.column-title');
                        columnName.innerHTML = name;
                    }); 
                }       
            }

            /*FUNCTION FOR EDIT CARD NAME*/
            if(e.target.classList.contains('edit-card-name')) {
                let name = prompt('Podaj nazwę Zadania');
        
                if(name === '' || name === null) {
                    alert('Nie podałeś nazwy!');
                } else { 
                    let id = e.target.parentElement.id;
                    let column_id = e.target.parentElement.parentElement.id; 

                    var data = {
                        'name': name,
                        'bootcamp_kanban_column_id': column_id,
                    }

                    fetch(prefix + baseUrl + '/card/' + id, {
                        method: 'PUT',
                        headers: {
                            'X-Client-Id': '4018',
                            'X-Auth-Token': '44ff47e0eb798038805be6d0ef8ad1f1',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(resp) {
                    e.target.parentElement.querySelector('.description').innerHTML = name;
                    }); 
                }
            }

            /*FUCNTIONS FOR DELETE COLUMN AND CARD*/
            if(e.target.classList.contains('btn-delete')){
                let id = e.target.parentElement.querySelector('.column-card-list').id;

                fetch(prefix + baseUrl + '/column/' + id, { method: 'DELETE', headers: myHeaders })
                    .then(function(resp) {
                        return resp.json();
                    })
                    .then(function(resp) {
                        e.target.parentElement.remove();
                    });
            }

            if(e.target.classList.contains('delete-card')) {
                let id = e.target.parentElement.id;
                
                fetch(prefix + baseUrl + '/card/' + id, { method: 'DELETE', headers: myHeaders })
                    .then(function(resp) {
                        return resp.json();
                    })
                    .then(function(resp) {
                        e.target.parentElement.remove();
                    })
            }
        });

        /* FUNCTION ADD CARD */
        document.querySelector('.column-container').addEventListener('click', (e) => {
            if(e.target.classList.contains('add-card')){                   
                let table = e.target.parentElement.querySelector('.column-card-list');
                let nameCard = prompt('Podaj nazwę zadania');

                if (nameCard != null && nameCard != '') {
                    var data = new FormData();
                    data.append('name', nameCard);
                    data.append('bootcamp_kanban_column_id', table.id);

                    fetch(prefix + baseUrl + '/card', {
                        method: 'POST',
                        headers: myHeaders,
                        body: data,
                    })
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(resp) {
                        let card = new Card(nameCard, resp.id, table); 
                    });
                } else {
                    alert('Nie podałeś nazwy!');
                }                    
            }
        });
       
       
    }    
}