import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class MyProfile extends React.Component {
    state={
        username:'',
        
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <label className='form-label'>Username:</label>
                    <input className='form-text' type='text' name='username' value={this.state.username} onChange={this.updateFormFields}></input>
                    <button className='btn btn-primary' onClick={this.validate}>Submit</button>
                </div>
            </React.Fragment>
        )
    }
}