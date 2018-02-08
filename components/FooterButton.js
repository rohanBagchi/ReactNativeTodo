import React from 'react';
import PropTypes from "prop-types";
import { Button, Text } from 'native-base';

export default function FooterButton({ isActive, type, applyFilter, children }) {
    return (
        <Button 
            active = {isActive}
            onPress={() => applyFilter(type)}>
            {children}
        </Button>    
    );
}

FooterButton.propTypes = {
    type: PropTypes.oneOf([
        'all',
        'pending',
        'complete'
    ]).isRequired,
    isActive: PropTypes.bool.isRequired,
};