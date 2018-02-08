import React from 'react';
import firebase from 'firebase'
import { 
    Alert, 
    StyleSheet, 
    View, 
    TextInput, 
    ActivityIndicator, 
    Platform 
} from 'react-native';
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
var config = {
    apiKey: "AIzaSyBj7IFF3FfPcTBX_XtTNnT0eBeCTLHN8XQ",
    authDomain: "react-native-todo-dc2c6.firebaseapp.com",
    databaseURL: "https://react-native-todo-dc2c6.firebaseio.com",
    projectId: "react-native-todo-dc2c6",
    storageBucket: "react-native-todo-dc2c6.appspot.com",
    messagingSenderId: "314408015539"
};
firebase.initializeApp(config);

export const firebase_ref = firebase;
export const database = firebase.database();

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

        database.ref('todos').on('value', snapShot => {
            const dbSnapShot = snapShot.val();
            const keys = Object.keys(dbSnapShot);
            const todos = keys.map(k => {
                return {
                    ...dbSnapShot[k],
                    _id: k
                };
            });
            this.setTodos(todos);
        });
    }

    setTodos(todos, clearNewTodoText) {
        this.setState(prevState => ({
            ...prevState,
            todos,
            text: clearNewTodoText ? '' : this.state.text,
            isLoading: false
        }));
    }

    handleCheckUncheck(todo, checked) {
        const updatedTodo = {
            ...todo,
            isComplete: !checked
        };
        const todos = updateTodos(updatedTodo);
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
            .map(todo => (
                <Todo 
                    key={todo._id}
                    todo={todo}
                    handleCheckUncheck={this.handleCheckUncheck}
                    handleDeleteTodo={this.handleDeleteTodo}
                />
            ))
            .reverse();
    }

    handleAddTodo() {
        if (!this.state.text.trim().length) return;
        const newTodo = {
            title: this.state.text,
            isComplete: false
        };
        this.setState(prevState => ({
            ...prevState,
            text: ''
        }), () => addTodo(newTodo));
    }

    handleDeleteTodo(todo) {
        Alert.alert(
            'Deleting Todo',
            todo.title,
            [
                { text: 'Confirm?', onPress: () => deleteTodo(todo) },
                { text: 'Cancel', onPress: () => console.log(todo.title), style: 'cancel' }
            ]
        );
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
