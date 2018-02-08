import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {
    Body,
    CheckBox,
    ListItem,
    Text
} from 'native-base';
// import CheckBox from 'react-native-checkbox';

function ___Todo({ todo, handleCheckUncheck, handleDeleteTodo }) {
    const { title, isComplete } = todo;
    const labelStyle = isComplete ? styles.complete : styles.pending;
    return (
        <View style={styles.listItemCont}>
            <CheckBox
                style={labelStyle}
                label={title}
                checked={isComplete}
                labelStyle={labelStyle}
                onChange={checked => handleCheckUncheck(todo, checked)}
            />
            <Button title="X" onPress={() => handleDeleteTodo(todo)} />
        </View>
    );
}

export default function Todo({ todo, handleCheckUncheck, handleDeleteTodo }) {
    const { title, isComplete } = todo;
    const labelStyle = isComplete ? styles.complete : styles.pending;
    return (
        <ListItem>
            <CheckBox 
                onPress={() => handleCheckUncheck(todo, isComplete)}
                checked={isComplete} />
            <Body>
                <Text style={labelStyle}>
                    {title}
                </Text>
            </Body>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#000'
    },
    pending: {
        color: '#000'
    },
    complete: {
        textDecorationLine: 'line-through',
        color: '#d8d8d8'
    },
    listItemCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});