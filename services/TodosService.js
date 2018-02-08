import { database } from '../App';

let todos = [
    {
        _id: 1,
        title: 'Buy Groceries',
        isComplete: false
    },
    {
        _id: 2,
        title: 'Do Laundry',
        isComplete: true
    },
    {
        _id: 3,
        title: 'Cook Dinner',
        isComplete: false
    }
];

export function updateTodos(updatedTodo) {
    const updatedTodos = todos.map(todo => {
        if (todo._id === updatedTodo._id) return updatedTodo;
        return todo;
    });
    const referenceToTodo = database.ref(`todos/${updatedTodo._id}`);
    
    referenceToTodo.set({
        title: updatedTodo.title,
        isComplete: updatedTodo.isComplete
    });
}

export function addTodo(newTodo) {
    const updatedTodos = [...todos, newTodo];
    todos = updatedTodos;
    
    const todoListRef = database.ref('todos');
    const newTodoRef = todoListRef.push();
    
    return newTodoRef.set({
        ...newTodo
    });

}

export function deleteTodo(todoToDelete) {
    const referenceToTodo = database.ref(`todos/${todoToDelete._id}`);

    return referenceToTodo.remove();
}