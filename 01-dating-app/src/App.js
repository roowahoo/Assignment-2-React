import React from 'react'
import './App.css';
import CreateProfiles from './CreateProfiles'
import 'bootstrap/dist/css/bootstrap.min.css'
import FindProfiles from './FindProfiles'
import Conversations from './Conversations'
import MyProfile from './MyProfile'

export default class App extends React.Component {
    state = {
        createProfiles: true,
        findProfiles: false,
        conversations:false,
        myProfile:false
    }

    findLink = () => {
        this.setState({
            findProfiles: true,
            createProfiles: false,
            conversations:false,
            myProfile:false
        })
        window.scrollTo(0, 0);
    }

    createLink = () => {
        this.setState({
            createProfiles: true,
            findProfiles: false,
            conversations:false,
            myProfile:false
        })
        window.scrollTo(0, 0);
    }

    conversationsLink=()=>{
        this.setState({
            conversations:true,
            createProfiles: false,
            findProfiles: false,
            myProfile:false
        })
    }

    myProfileLink=()=>{
        this.setState({
            myProfile:true,
            conversations:false,
            createProfiles: false,
            findProfiles: false

        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a className="nav-link cursor" onClick={this.createLink}>Create Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a className="nav-link cursor" onClick={this.findLink} >Find Profiles</a>
                                </li>
                                <li class="nav-item">
                                    <a className="nav-link cursor" onClick={this.conversationsLink}>Conversations</a>
                                </li>
                                <li class="nav-item">
                                    <a className="nav-link cursor" onClick={this.myProfileLink}>My Profile</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {this.state.createProfiles && <CreateProfiles />}
                    {this.state.findProfiles && <FindProfiles />}
                    {this.state.conversations && <Conversations/>}
                    {this.state.myProfile && <MyProfile/>}
                </div>

            </React.Fragment>
        );
    }
}

// export default App;
