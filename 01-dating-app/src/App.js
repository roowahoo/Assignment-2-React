import React from 'react'
import './App.css';
import CreateProfiles from './CreateProfiles'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar'
import FindProfiles from './FindProfiles'

export default class App extends React.Component {
    state = {
        createProfiles: true,
        findProfiles: false
    }

    // changePage = () => {
    //     if (this.state.createProfiles === true) {
    //         this.setState({
    //             createProfiles: false,
    //             findProfiles: true
    //         })
    //     } else {
    //         this.setState({
    //             createProfiles: true,
    //             findProfiles: false
    //         })
    //     }
    // }

    findLink = () => {
        this.setState({
            createProfiles: false,
            findProfiles: true
        })
        window.scrollTo(0,0);
    }

    createLink = () => {
        this.setState({
            createProfiles: true,
            findProfiles: false
        })
         window.scrollTo(0,0);
    }
    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" onClick={this.createLink}>Create Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={this.findLink} >Find Profiles</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">Conversations</a>
                                </li>
                            </ul>
                        
                    </div>
                </nav>
                    {this.state.createProfiles && <CreateProfiles />}
                    {this.state.findProfiles && <FindProfiles />}
                </div>
                
            </React.Fragment>
        );
    }
}

// export default App;
