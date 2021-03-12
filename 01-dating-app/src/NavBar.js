import React from 'react'

export default class NavBar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href='#' >Create Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href='#' >Find Profiles</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">Conversations</a>
                                </li>
                            </ul>
                        
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}