import React from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator, Platform } from 'react-native';
import { 
    Container, 
    Spinner,
    Header, 
    Title, 
    Content, 
    Body, 
    Form, 
    Item, 
    Input, 
    ListItem,
    Label, 
    Text 
} from 'native-base';
import Todo from './components/Todo';
import Footer from './components/TodoAppFooter';
import AppNativeBase from './AppNativeBase';
import { fetchTodos, updateTodos, addTodo, deleteTodo } from './services/TodosService';

const isAndroid = Platform.OS == "android";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            isLoading: true,
            filter: 'all'
        };
        this.renderTodos = this.renderTodos.bind(this);
        this.setTodos = this.setTodos.bind(this);
        this.handleCheckUncheck = this.handleCheckUncheck.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

    async componentDidMount() {
        const todos = await fetchTodos();
        await this.setTodos(todos);
    }

    setTodos(todos, clearNewTodoText) {
        this.setState({
            todos,
            text: clearNewTodoText ? '' : this.state.text,
            isLoading: false
        });
    }

    async handleCheckUncheck(todo, checked) {
        const updatedTodo = {
            ...todo,
            isComplete: !checked
        };
        const todos = await updateTodos(updatedTodo);
        await this.setTodos(todos);
    }

    applyFilter(filter='all') {
        this.setState({filter});
    }

    renderTodos() {
        return this.state.todos
            .filter(todo => {
                if (this.state.filter === 'complete') {
                    return todo.isComplete;
                } 
                else if (this.state.filter === 'pending') {
                    return !todo.isComplete;
                } 
                return todo;
            })
            .map((todo, index) => (
                <Todo 
                    key={index}
                    todo={todo}
                    handleCheckUncheck={this.handleCheckUncheck}
                    handleDeleteTodo={this.handleDeleteTodo}
                />
            ))
            .reverse();
    }

    async handleAddTodo() {
        if (!this.state.text.trim().length) return;
        const newTodo = {
            _id: Math.random() * 100,
            title: this.state.text,
            isComplete: false
        };

        const todos = await addTodo(newTodo);
        await this.setState(prevState => {
            return {
                ...prevState,
                todos: this.state.todos.concat(newTodo),
                text: ''
            };
        });
    }

    async handleDeleteTodo(todo) {
        const todos = await deleteTodo(todo);
        await this.setTodos(todos);
    }

    onChangeTextHandler(text) {
        this.setState(prevState => ({...prevState, text }));
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Todo App</Title>
                    </Body>
                </Header>

                {this.state.isLoading && 
                    <Spinner />
                }
                
                {!this.state.isLoading && 
                    <React.Fragment>
                        <Content>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Enter a todo</Label>
                                    <Input
                                        value={this.state.text}
                                        onChangeText={this.onChangeTextHandler}
                                        onSubmitEditing={this.handleAddTodo}
                                        returnKeyType="done"
                                        autoCorrect={false} />
                                </Item>
                            </Form>
                            {this.renderTodos()}
                        </Content>
                        <Footer
                            filter={this.state.filter}
                            applyFilter={this.applyFilter}/>
                    </React.Fragment>
                }
                
            </Container>
        )
    }
}
