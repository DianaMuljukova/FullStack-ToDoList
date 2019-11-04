import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from "./users";
import UserCreate from "./users/UserCreate";
import {Switch, Route, NavLink as RouterLink} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';


function App() {
    return (
        <div className="App">
            <h1>Todo APP</h1>
            <Navbar color="light" light expand="md">
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink>
                            <RouterLink to="/users">Пользователи</RouterLink>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>
                            <RouterLink to="/users/create">Добавить пользователя</RouterLink>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>


            <Switch>
                <Route exact path="/users" component={UserList}/>
                <Route path="/users/create" component={UserCreate}/>
            </Switch>
        </div>
    );
}

export default App;
