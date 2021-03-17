import React from 'react'
import axios from 'axios'
import CreateProfiles from './CreateProfiles'

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
    }

    componentDidMount= async()=> {
         if (this.state.isLoggedIn === true) {
            let user = {
                user_id: this.state.user_id
            }

            let foundConversations = await axios.post(baseURL + '/findConversations', user)
            console.log(foundConversations.data)
            this.setState({
                conversations: foundConversations.data
            })

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
        if(this.state.isLoggedIn===true){
            return(
                <React.Fragment>
                    {/* {this.showProfileOrConversations()} */}
                    {this.renderConversations()}

                </React.Fragment>)
        }else{
            return(
                    <CreateProfiles/>
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
            message: this.state.message
        }
        await axios.put(baseURL + '/conversations', { ...newMessage })
        window.location.reload()
    }



}