import { Todo } from "./todo.class";

export class TodoList {

    constructor(){
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){ 
        this.todos.push(todo); //Push agrega elementos al final del array
        this.guardarLocalStorage();
    }

    //Callback, estoy barriendo todo el array y preguntare si el todo.id es diferente de la id filtrada, si es así
    //se irán agregando los elementos a un nuevo array, el cual reempalzaré por el original pero sin el elemento que tenía la id seleccionada.
    eliminarTodo(id){
       
        this.todos = this.todos.filter(todo => todo.id != id);  
        this.guardarLocalStorage(); //Cuando hacemos una modificacion se ejecuta el guardar.
    }

    todoComplete(id){
        
        for ( const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado; //Si es true, la negacion es false, y si es false la negacion es true
                this.guardarLocalStorage();
                break;
            }
        }
    }
    
    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado); 
        this.guardarLocalStorage();
    }

    //Un localstorage esta dedicado a un dominio, en nuestro caso al localhost
    guardarLocalStorage(){
        //stringify transforma los objetos a string, ya que setitem solo recibe dos string
        localStorage.setItem('todo', JSON.stringify(this.todos)); 

    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo'))? JSON.parse( localStorage.getItem('todo') ) : [];

        this.todos = this.todos.map(Todo.fromJson); //Barre los elementos que estan dentro del array y retorna un nuevo un nuevo arreglo con los elem mutados.
    //  this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}