import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            file: null
        }
    }

    createUser = async (e) => {
        const {name, email} = this.state;
        let response = await fetch('http://localhost:3000/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email})
        });
        let result = await response.json();
        let userId = result.id;
        let data = new FormData();
        data.append('file', this.state.file);
        response = await fetch('http://localhost:3000/users/file/upload/' + userId, {
            method: 'POST',
            body: data
        })
    };

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    inputFile = e => {
        this.setState({
            file: e.target.files[0]
        })
    };

    render() {
        console.log(this.state.file);
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
                    <Input placeholder="file" type="file" onChange={this.inputFile} />
                </Form>
            </div>
        )
    }
}

export default UserCreate;