// AppNativeBase
import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Title, 
    Content, 
    Footer, 
    FooterTab, 
    Button, 
    Left, 
    Right, 
    Body, 
    Icon,
    Form, 
    Item, 
    Input, 
    CheckBox,
    ListItem,
    Label, 
    Text 
} from 'native-base';
export default class AppNativeBase extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Enter a todo</Label>
                            <Input />
                        </Item>
                    </Form>
                    <ListItem>
                        <CheckBox checked={true} />
                        <Body>
                            <Text>Daily Stand Up</Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <CheckBox checked={false} />
                        <Body>
                            <Text>Discussion with Client</Text>
                        </Body>
                    </ListItem>

                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}