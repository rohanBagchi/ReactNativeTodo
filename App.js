import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Platform } from 'react-native';
import Todo from './components/Todo';
import { fetchTodos, updateTodos, addTodo, deleteTodo } from './services/TodosService';

const isAndroid = Platform.OS == "android";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            isLoading: true
        };
        this.renderTodos = this.renderTodos.bind(this);
        this.setTodos = this.setTodos.bind(this);
        this.handleCheckUncheck = this.handleCheckUncheck.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    }

    componentDidMount() {
        fetchTodos().then(todos => this.setTodos(todos))
    }

    setTodos(todos, clearNewTodoText) {
        this.setState({
            todos,
            text: clearNewTodoText ? '' : this.state.text,
            isLoading: false
        });
    }

    handleCheckUncheck(todo, checked) {
        const updatedTodo = {
            ...todo,
            isComplete: !checked
        };
        updateTodos(updatedTodo).then(todos =>  this.setTodos(todos));
    }

    renderTodos() {
        if (this.state.isLoading) return <ActivityIndicator />;

        return this.state.todos.map((todo, index) => (
            <Todo 
                key={index}
                todo={todo}
                handleCheckUncheck={this.handleCheckUncheck}
                handleDeleteTodo={this.handleDeleteTodo}
            />
        )).reverse();
    }

    handleAddTodo() {
        if (!this.state.text.trim().length) return;
        const newTodo = {
            _id: Math.random() * 100,
            title: this.state.text,
            isComplete: false
        };

        addTodo(newTodo).then(todos => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    todos: this.state.todos.concat(newTodo),
                    text: ''
                };
            })
        });
    }

    handleDeleteTodo(todo) {
        deleteTodo(todo).then(todos => this.setTodos(todos));
    }

    onChangeTextHandler(text) {
        this.setState(prevState => ({...prevState, text }));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.fullWidth, isAndroid ? styles.border : '']}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter a new todo"
                        value={this.state.text}
                        onChangeText={this.onChangeTextHandler}
                        onSubmitEditing={this.handleAddTodo}
                        returnKeyType="done"
                        autoCorrect={false}
                        returnKeyLabel="Add Todo"
                    />
                </View>
                        
                <View style={{marginTop: 10, flex: 1}}>
                    {this.renderTodos()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 20,
        padding:20
    },
    text: {
        color: '#fff'        
    },
    fullWidth: {
        width: '100%'
    },
    border: {
        borderTopColor: '#000',
        borderRightColor: '#000',
        borderBottomColor: '#000',
        borderLeftColor: '#000',

        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
    },
    textInput: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        borderColor: "gray",
        borderWidth: isAndroid ? 0 : 1,
        width: "100%"
    }
});
