import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class Conversations extends React.Component {
    state = {
        validate: true,
        username: '',
        conversations: []
    }

    validate = async event => {
        let searchUserName = {
            username: this.state.username
        }

        let ifUserExists = await axios.post(baseURL + '/searchUsernames', searchUserName);
        if (ifUserExists.data !== 'no username found') {
            console.log(ifUserExists.data)

            this.setState({
                conversations: true,
                validate: false,
                user_id: ifUserExists.data
            })

            let user = {
                user_id: this.state.user_id

            }

            let foundConversations = await axios.post(baseURL + '/findConversations', user)
            this.setState({
                conversations: foundConversations.data
            })
            console.log(foundConversations.data)

        } else {
            alert('user not found')
        }
    }

    renderConversations = () => {
        return (
            <div>
                {this.state.conversations.map(item=>(
                <li>{item._id}</li>
        ))}
            </div>
        )
    }


    render() {
        return (
            <React.Fragment>
                <div style={{ display: this.state.validate ? 'block' : 'none' }}>
                    <label className='form-label'>Username:</label>
                    <input className='form-text' type='text' name='username' value={this.state.username} onChange={this.updateFormFields}></input>
                    <button className='btn btn-primary' onClick={this.validate}>Submit</button>
                </div>
                <div style={{ display: this.state.validate ? 'none' : 'block' }}>
                    <h1>Conversations</h1>
                    {console.log(this.state.conversations)}
                    {/* {this.renderConversations()} */}
                </div>

            </React.Fragment>
        )

    }

    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }



    send = async event => {
        let newMessage = {
            conversationId: event.target.name,
            message: this.state.message
        }
        await axios.put(baseURL + '/conversations', { ...newMessage })
    }



}