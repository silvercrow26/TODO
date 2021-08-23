

export class Todo{
    //Cuando vea unos parentesis y llaves, significa que debo mandar un objeto y hacemos la destructuracion de argumentos para obtener los que me interesan.
    static fromJson({id, tarea, completado, creado}){ 

        const tempTodo = new Todo(tarea);

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;
    }

    constructor(tarea){ //creo una nueva tarea siempre esta sin completar.

        this.tarea = tarea;
        
        this.id = new Date().getTime(); //213123 => me sirve para manejarlo como una id
        this.completado = false;
        this.creado = new Date();

    }

    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}