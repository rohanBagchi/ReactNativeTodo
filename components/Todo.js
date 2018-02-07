import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from 'react-native-checkbox';

export default function Todo({title, isComplete}) {
    return (
        <CheckBox
            style={styles.text}
            label={title}
            checked={isComplete}
            onChange={(checked) => console.log('I am checked', checked)}
        />
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
});