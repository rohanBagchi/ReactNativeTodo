import React from 'react';
import { Text } from "react-native";
import {
    Icon,
    Body,
    CheckBox,
    Button,
    ListItem
} from 'native-base';

export default function Todo({ todo, handleCheckUncheck, handleDeleteTodo }) {
    const { title, isComplete } = todo;
    const labelStyle = isComplete ? styles.complete : '';
    return (
        <ListItem>
            <CheckBox 
                onPress={() => handleCheckUncheck(todo, isComplete)}
                checked={isComplete} />
            <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                    onPress={() => handleCheckUncheck(todo, isComplete)}
                    style={[styles.textStyle, labelStyle]}>
                    {title}
                </Text>
                <Button 
                    onPress={() => handleDeleteTodo(todo)}
                    transparent warning>
                    <Icon name='trash' />
                </Button>
            </Body>
        </ListItem>
    );
}

const styles = {
    textStyle: {
        left: 10,
        alignSelf: 'center'
    },
    pending: {
        color: '#000'
    },
    complete: {
        textDecorationLine: 'line-through',
        color: '#d8d8d8'
    }
};