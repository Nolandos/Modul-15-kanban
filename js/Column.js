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