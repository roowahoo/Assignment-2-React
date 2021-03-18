import React from 'react'
import axios from 'axios'
import './App.css';
import CreateProfiles from './CreateProfiles'
import 'bootstrap/dist/css/bootstrap.min.css'
import FindProfiles from './FindProfiles'
import Conversations from './Conversations'
import MyProfile from './MyProfile'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class App extends React.Component {
    state = {
        createProfiles: true,
        findProfiles: false,
        conversations: false,
        myProfile: false,
        isLoggedIn: false,
        username: '',
        name: '',
        user_id: ''
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
                findProfiles:true,
                createProfiles:false
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


    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link cursor" onClick={this.createLink}>Create Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link cursor" onClick={this.findLink} >Find Profiles</a>
                                </li>
                                <li class="nav-item">
                                    <a className="nav-link cursor" onClick={this.conversationsLink}>Conversations</a>
                                </li>
                                <li class="nav-item">
                                    <a className="nav-link cursor" onClick={this.myProfileLink}>My Profile</a>
                                </li>
                            </ul>

                            <div className='d-flex'>
                                <input className='form-control mx-3' type='text' name='username' value={this.state.username} onChange={this.updateFormFields} placeholder='  Username'></input>
                                <button className='btn pinkBtn' onClick={this.validate}>Login</button>
                            </div>
                        </div>

                    </nav>

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

// export default App;
