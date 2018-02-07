export function fetchTodos() {
    return Promise.resolve([
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
    ])
}