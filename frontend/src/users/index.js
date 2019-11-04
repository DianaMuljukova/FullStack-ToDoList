import React, {Component} from 'react';
import { Table, Button } from 'reactstrap';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async() => {
        let response = await fetch('http://localhost:3000/users/list');
        let result = await response.json();
        this.setState({
            users: result
        })
    }

    deleteUser = async (id) => {
       let response = await fetch('http://localhost:3000/users/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        if (response.status === 204) {
            this.getUsers();
        }
    }

    render() {
        return (
            <div>
                <h1>Список пользователей</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(item => {
                        return <tr>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                <Button onClick={this.deleteUser.bind(this, item.id)} color="danger">Удалить</Button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default UserList;