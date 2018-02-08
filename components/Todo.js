import React from 'react';
import { Text } from "react-native";
import {
    Body,
    CheckBox,
    ListItem,
} from 'native-base';

export default function Todo({ todo, handleCheckUncheck, handleDeleteTodo }) {
    const { title, isComplete } = todo;
    const labelStyle = isComplete ? styles.complete : '';
    return (
        <ListItem>
            <CheckBox 
                onPress={() => handleCheckUncheck(todo, isComplete)}
                checked={isComplete} />
            <Body>
                <Text
                    onPress={() => handleCheckUncheck(todo, isComplete)}
                    style={[styles.textStyle, labelStyle]}>
                    {title}
                </Text>
            </Body>
        </ListItem>
    );
}

const styles = {
    textStyle: {
        left: 10
    },
    pending: {
        color: '#000'
    },
    complete: {
        textDecorationLine: 'line-through',
        color: '#d8d8d8'
    }
};