import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class Conversations extends React.Component {
    state = {
        validate: true,
        username: '',
        user_id:'',
        user_name:'',
        conversations: [],
        conversationId: '',
        message: ''
    }

    validate = async event => {
        let searchUserName = {
            username: this.state.username
        }

        let ifUserExists = await axios.post(baseURL + '/searchUsernames', searchUserName);
        if (ifUserExists.data !== 'no username found') {
            console.log(ifUserExists.data)

            this.setState({
                validate: false,
                user_id: ifUserExists.data.user_id,
                user_name:ifUserExists.data.name
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
    renderMessages = (messages) => {
        return (
            <React.Fragment>
                {messages.map(item => (
                    <p>{item}</p>
                ))}
            </React.Fragment>
        )
    }

    renderChatName=(item)=>{
        if(this.state.user_name!==item.user_name){
            return item.user_name
        }else{
            return item.user2_name
        }
    }

    renderConversations = () => {
        return (
            <div>
                {this.state.conversations.map(item => (
                    <div>
                        <div className="card messages">
                            <div className="card-body">
                                <h5 className="card-title name_heading" >{this.renderChatName(item)}</h5>
                                <p className="card-text">{this.renderMessages(item.messages)}</p>
                                <input type='text' name='message' onChange={this.updateFormFields}></input>
                                <button className='btn m-3 pinkBtn' name={item._id} onClick={this.send}>Send</button>
                            </div>
                        </div>
                    </div>
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
                    {this.renderConversations()}
                </div>

            </React.Fragment>
        )

    }

    updateFormFields = event => {
        this.setState({
            [event.target.name]:event.target.value
        })

    }



    send = async event => {
        let newMessage = {
            conversationId: event.target.name,
            message: this.state.message
        }
        await axios.put(baseURL + '/conversations', { ...newMessage })
        window.location.reload()
    }



}