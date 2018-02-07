import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Todo from './components/Todo';
import { fetchTodos } from './services/TodosService';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            isLoading: true
        };
        this.renderTodos = this.renderTodos.bind(this);
    }

    componentDidMount = () => {
        fetchTodos().then(todos => {
            this.setState({
                todos,
                isLoading: false
            });
        })
    }

    renderTodos() {
        if (this.state.isLoading) return <ActivityIndicator />;


        return this.state.todos.map((todo, index) => (
            <Todo 
                key={index}
                title={todo.title}
                isComplete={todo.isComplete}/>
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTodos()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 20,
        padding:20
    },
    text: {
        color: '#fff'        
    }
});
