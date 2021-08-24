import { Todo, TodoList } from "../class";
import {todoList} from '../index'

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list'); //El punto hace referencia a las clases
const txtInput = document.querySelector('.new-todo');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const anchorfiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) =>{

    const htmlTodo = `
    <li class="${ (todo.completado)? 'completed':''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado)? 'checked':''}>
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild); //frist element child retorna al primer hijo de este elemento, osea despues del div, retorno el hijo, el cual es el li
    return div.firstElementChild;
}

//Events
txtInput.addEventListener('keyup', (event) => { //Keyup cuando suelto la tecla se dispara el evento

    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        todoList.todoPendientes();
        txtInput.value = '';
    }
}); 

divTodoList.addEventListener('click',(event)=>{
    
   const nombreElemento = event.target.localName;
   const todoElemento = event.target.parentElement.parentElement;
   const todoId = todoElemento.getAttribute('data-id');


   if(nombreElemento.includes('input')){ //click en el check
    todoList.todoComplete(todoId); //Lista de to-do marcar completado el todo que tena la id.
    todoElemento.classList.toggle('completed');  //Para hacer referencia a todas las clases, si existe la clase la quita y si no la pone.
    todoList.todoPendientes();
   }else if(nombreElemento.includes('button')){ //click en el check
    
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento); //sabemos el elemento, por lo que usamos para remover al elemento child del dom, el cual ya tenemos capturado.
    todoList.todoPendientes();
   }

});

btnEliminarCompletados.addEventListener('click',() => {

    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
            todoList.todoPendientes();
        }
    }
});

ulFiltros.addEventListener('click',(event)=>{

    const filtro = event.target.text
    if( !filtro ){return;}
    anchorfiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
    

       switch( filtro ){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
                break; 
        }

    }
});



