import './styles.css'
import html from "./index.html";
import{Todo, TodoList} from './class'
import { crearTodoHtml } from './js/funciones';


export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));

console.log('todos',todoList.todos);

// localStorage.setItem('miKey','abc1234');
// setTimeout(() => {
//     localStorage.removeItem('miKey')
// }, 1500);
