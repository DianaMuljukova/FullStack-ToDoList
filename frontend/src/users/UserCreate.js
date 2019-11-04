import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
        }
    }

    createUser = async (e) => {
        const {name, email} = this.state;
        await fetch('http://localhost:3000/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email})
        })
    };

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        return (
            <div>
                <h1>Добавить пользователя</h1>
                <Form action="">
                    <FormGroup>
                        <Label for="exampleName">Name</Label>
                        <Input onChange={this.inputChange} type="text" name="name" id="exampleName" placeholder="Name" value={this.state.name} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input onChange={this.inputChange} type="email" name="email" id="exampleEmail" placeholder="Email" value={this.state.email} />
                    </FormGroup>
                    <Button onClick={this.createUser}>Создать</Button>
                </Form>
            </div>
        )
    }
}

export default UserCreate;