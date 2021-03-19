import React from 'react'
import axios from 'axios'
import CreateProfiles from './CreateProfiles'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class Conversations extends React.Component {
    state = {
        validate: true,
        username: this.props.username,
        user_id: this.props.user_id,
        name: this.props.name,

        conversations: [],
        conversationId: '',
        message: '',
        isLoggedIn: this.props.isLoggedIn,
        editing: false,
        messageId: '',
        editedMessage: ''
    }

    componentDidMount = async () => {
        if (this.state.isLoggedIn === true) {
            let user = {
                user_id: this.state.user_id
            }

            let foundConversations = await axios.post(baseURL + '/findConversations', user)
            console.log(foundConversations.data)
            this.setState({
                conversations: foundConversations.data
            })
            console.log(foundConversations)

        }
    }

    renderMessages = (messages) => {
        return (
            <React.Fragment>
                {messages.map(item => (

                    <div className='d-flex justify-content-between edit_message'>
                        <p><span className='chat_name'>{item.name}:</span> {item.message}</p>
                        <a className='cursor' name={item._id} onClick={this.editMessage}>&#9998;</a>
                    </div>

                ))}
            </React.Fragment>
        )

    }

    renderChatName = (item) => {
        if (this.state.name !== item.user_name) {
            return item.user_name
        } else {
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
                                <div className="card-text">{this.renderMessages(item.messages)}</div>
                                <div style={{ display: this.state.editing ? 'block' : 'none' }} >
                                    <div className='d-flex mb-2 edit_ok'>
                                        <input className='form-control' type='text' name='editedMessage' onChange={this.updateFormFields}></input>
                                        <a name={item._id} className='cursor' onClick={this.confirmEdit}>&#9745;</a>
                                    </div>
                                </div>
                                <div style={{ display: this.state.editing ? 'none' : 'block' }}>
                                    <div className='d-flex'>
                                        <input className='form-control' type='text' name='message' onChange={this.updateFormFields}></input>
                                        <button className='btn mx-3 pinkBtn' name={item._id} onClick={this.send}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        if (this.state.isLoggedIn === true) {
            return (
                <React.Fragment>
                    {this.renderConversations()}

                </React.Fragment>)
        } else {
            return (
                <CreateProfiles />
            )
        }

    }

    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    send = async event => {
        let newMessage = {
            conversationId: event.target.name,
            message: this.state.message,
            name: this.state.name
        }
        await axios.put(baseURL + '/conversations', { ...newMessage })
        window.location = '/'
    }

    editMessage = event => {
        this.setState({
            editing: true,
            messageId: event.target.name
        })
    }

    confirmEdit = async event => {
        let editedMessage = {
            messageId: this.state.messageId,
            message: this.state.editedMessage
        }
        await axios.post(baseURL + '/conversations/editmessage', { ...editedMessage })

    }



}