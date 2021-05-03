import React from 'react'
import axios from 'axios'
import './App.css';
import CreateProfiles from './CreateProfiles'
import 'bootstrap/dist/css/bootstrap.min.css'
import FindProfiles from './FindProfiles'
import Conversations from './Conversations'
import MyProfile from './MyProfile'
import Logo from './images/Logo.png'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

const baseURL = 'https://matchmade-assignment2.herokuapp.com'

export default class App extends React.Component {
    state = {
        createProfiles: true,
        findProfiles: false,
        conversations: false,
        myProfile: false,
        isLoggedIn: false,
        username: '',
        name: '',
        user_id: '',
        isOpen: false
    }

    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    validate = async event => {
        let searchUserName = {
            username: this.state.username
        }

        let ifUserExists = await axios.post(baseURL + '/searchUsernames', searchUserName);
        if (ifUserExists.data !== 'no username found') {
            console.log(ifUserExists.data)

            this.setState({
                isLoggedIn: true,
                user_id: ifUserExists.data.user_id,
                name: ifUserExists.data.name

            })
            alert('Login successful')
            this.setState({
                findProfiles: true,
                createProfiles: false
            })

        } else {
            alert('User not found')
        }
    }

    findLink = () => {
        this.setState({
            findProfiles: true,
            createProfiles: false,
            conversations: false,
            myProfile: false
        })
        window.scrollTo(0, 0);
    }

    createLink = () => {
        this.setState({
            createProfiles: true,
            findProfiles: false,
            conversations: false,
            myProfile: false
        })
        window.scrollTo(0, 0);
    }

    conversationsLink = () => {
        this.setState({
            conversations: true,
            createProfiles: false,
            findProfiles: false,
            myProfile: false
        })
    }

    myProfileLink = () => {
        this.setState({
            myProfile: true,
            conversations: false,
            createProfiles: false,
            findProfiles: false

        })
    }

    toggle = event => {
        if (this.state.isOpen === false) {
            this.setState({
                isOpen: true
            })

        } else {
            this.setState({
                isOpen: false
            })
        }


    }


    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <div>
                        <Navbar color="light" light expand="md" fixed='top' className='mb-2'>
                            <NavbarBrand href="/"><img src={Logo} id='logo' alt='' /></NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse style={{ display: this.state.isOpen ? 'block' : 'none' }} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink className='cursor' onClick={this.createLink} >Create Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='cursor' onClick={this.findLink} >Find Profiles</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='cursor' onClick={this.conversationsLink} >Conversations</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='cursor' onClick={this.myProfileLink} >My Profile</NavLink>
                                    </NavItem>
                                </Nav>
                                <NavbarText>
                                    <div className='d-flex' style={{display:this.state.isLoggedIn ? 'none' :'block'}}>
                                        <input className='form-control mx-3' type='text' name='username' value={this.state.username} onChange={this.updateFormFields} placeholder='  Username'></input>
                                        <button className='btn pinkBtn' onClick={this.validate}>Login</button>
                                    </div>
                                </NavbarText>
                            </Collapse>
                        </Navbar>
                    </div>

                    {this.state.createProfiles && <CreateProfiles isLoggedIn={this.state.isLoggedIn} />}
                    {this.state.findProfiles && <FindProfiles isLoggedIn={this.state.isLoggedIn} name={this.state.name} user_id={this.state.user_id} username={this.state.username} />}
                    {this.state.conversations && <Conversations isLoggedIn={this.state.isLoggedIn} username={this.state.username}
                        name={this.state.name} user_id={this.state.user_id} />}
                    {this.state.myProfile && <MyProfile isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id} username={this.state.username} />}
                </div>

            </React.Fragment>
        );
    }
}
