import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import {Link} from 'react-router';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import './bootstrap.css';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'>Hello World</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav navbar>
                            {this.props.userSignedIn && (
                                <LinkContainer to='/time'>
                                    <NavItem>Время</NavItem>
                                </LinkContainer>
                            )}
                            <LinkContainer to='/counters'>
                                <NavItem>Счетчики</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

export default App;
