import React from 'react'

export default class NavBar extends React.Component {
    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}