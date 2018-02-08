import React from 'react';
import {
    Footer,
    FooterTab,
    Text
} from 'native-base';
import FooterButton from './FooterButton';

export default function TodoAppFooter(props) {
    const { filter, applyFilter } = props;
    return (
        <Footer>
            <FooterTab>
                <FooterButton
                    isActive={filter === 'complete' ? true : false}
                    applyFilter={applyFilter}
                    type='complete'>
                    <Text>Complete</Text>
                </FooterButton>
                <FooterButton
                    isActive={filter === 'all' ? true : false}
                    applyFilter={applyFilter}
                    type='all'>
                    <Text>All</Text>
                </FooterButton>
                <FooterButton
                    isActive={filter === 'pending' ? true : false}
                    applyFilter={applyFilter}
                    type='pending'>
                    <Text>Pending</Text>
                </FooterButton>
            </FooterTab>
        </Footer>
    )
}