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


    /*CREATE BASIC BOARD, COLUMNS, CARDS*/
    const app = new KanbanManager(document.querySelector('#app'));

    const toDo = new Column('To Do', randomString());
    const doing = new Column('Doing', randomString());
    const done = new Column('Done', randomString());

    const newTask1 = new Card('Nauk React', randomString(), document.getElementById(toDo.id));
    const newTask2 = new Card('Nauka JS', randomString(), document.getElementById(doing.id));
    const newTask3 = new Card('Nauka HTML', randomString(), document.getElementById(done.id));
    