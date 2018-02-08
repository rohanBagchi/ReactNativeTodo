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

export function fetchTodos() {
    return Promise.resolve(todos);
}

export function updateTodos(updatedTodo) {
    const updatedTodos = todos.map(todo => {
        if (todo._id === updatedTodo._id) return updatedTodo;
        return todo;
    });
    todos = updatedTodos;

    return Promise.resolve(todos)
}

export function addTodo(newTodo) {
    const updatedTodos = [...todos, newTodo];
    todos = updatedTodos;

    return Promise.resolve(todos)
}

export function deleteTodo(todoToDelete) {
    const updatedTodos = todos.filter(todo => todo._id !== todoToDelete._id);
    todos = updatedTodos;

    return Promise.resolve(todos)
}