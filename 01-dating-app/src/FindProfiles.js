import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CreateProfiles from './CreateProfiles'
import Conversations from './Conversations';

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'



export default class FindProfiles extends React.Component {
    state = {
        profiles: [],
        gender: '',
        age: '',
        interests: [],
        sendMsg: false,
        display: true,
        user_id: this.props.user_id,
        name: this.props.name,
        user2_id: '',
        user2_name: '',
        conversationId: '',
        message: [],
        isLoggedIn: this.props.isLoggedIn,
        username: this.props.username
    }


    async componentDidMount() {
        let response = await axios.get(baseURL + '/profiles')
        this.setState({
            profiles: response.data
        })
    }

    renderProfiles = () => {
        let acc = []
        for (let eachProfile of this.state.profiles) {
            acc.push(
                <div key={eachProfile._id} className="card">
                    <img src={eachProfile.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title" >{eachProfile.name}, {eachProfile.age}</h5>
                        <p>Interests: {eachProfile.interests.join(', ')}</p>
                        <p>About me:</p>
                        <p className="card-text">{eachProfile.introduction}</p>
                        <div className='d-flex justify-content-end'>
                            <button value={eachProfile.name} name={eachProfile._id} className='btn pinkBtn' onClick={this.connect}>Connect</button>
                        </div>
                    </div>
                </div>
            )
        }
        return acc
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: this.state.display ? 'block' : 'none' }}>
                    <div id='search' className='container'>
                        <div className='row pb-2' >
                            <div className='col-6'>
                                <Label for="exampleSelect">Gender</Label>
                                <Input onChange={this.updateFormFields} type="select" name="gender" id="exampleSelect">
                                    <option value='' name=''>--Select--</option>
                                    <option value='male' name='gender'>Male</option>
                                    <option value='female' name='gender'>Female</option>
                                </Input>
                            </div>
                            <div className='col-6'>

                                <Label for="exampleSelect">Age Range</Label>
                                <Input onChange={this.updateFormFields} type="select" name="age" id="exampleSelect">
                                    <option value='' name=''>--Select--</option>
                                    <option value='20' name='age'>20s</option>
                                    <option value='30' name='age'>30s</option>
                                </Input>
                            </div>

                        </div>

                        <Label>Interests</Label>
                        <div className='d-flex interests row'>

                            <div className='col-2'>
                                <Label check>
                                    <Input type='checkbox' name='interests' value='sports' onChange={this.updateInterests} />Sports</Label>
                            </div>

                            <div className='col-2'>
                                <Label check>
                                    <Input type='checkbox' name='interests' value='arts' onChange={this.updateInterests} />Arts</Label>
                            </div>

                            <div className='col-2'>
                                <Label check>
                                    <Input type='checkbox' name='interests' value='food' onChange={this.updateInterests} />Food</Label>
                            </div>

                            <div className='col-2'>
                                <Label check >
                                    <Input type='checkbox' name='interests' value='travel' onChange={this.updateInterests} />Travel</Label>
                            </div>

                            <div className='col-2'>
                                <Label check>
                                    <Input type='checkbox' name='interests' value='education' onChange={this.updateInterests} />Education</Label>
                            </div>
                        </div>

                        <div className='d-flex justify-content-end'>
                            <button className='btn pinkBtn mt-2' onClick={this.searchProfile}>Search</button>
                        </div>

                    </div>

                    <div id='profiles'>
                        {this.renderProfiles()}
                    </div>

                </div>


                <div style={{ display: this.state.sendMsg ? 'block' : 'none' }} id='sendMsg' >
                    <div className='d-flex'>
                        <input className='form-control' type='text' name='message' value={this.state.message} onChange={this.updateFormFields}placeholder='Send a message'></input>
                        <button className='btn pinkBtn' onClick={this.send}>Send</button>
                    </div>
                </div>

            </React.Fragment>
        )
    }


    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    updateInterests = event => {
        if (this.state.interests.includes(event.target.value) === false) {
            let clonedArray = [...this.state.interests]
            clonedArray.push(event.target.value)
            this.setState({
                interests: clonedArray
            })
        } else {
            let clonedArray = [...this.state.interests]
            clonedArray = clonedArray.filter(item => item !== event.target.value)
            this.setState({
                interests: clonedArray
            })
        }

    }

    searchProfile = async event => {

        let searchValue = {
            gender: this.state.gender,
            interests: this.state.interests,
            age: this.state.age

        }
        console.log(searchValue)

        if (this.state.interests.length === 0 && this.state.age === '' && this.state.gender != '') {
            console.log(searchValue)
            let response = await axios.post(baseURL + '/searchbygender', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }
        if (this.state.gender === '' && this.state.age === '' && this.state.interests.length !== 0) {
            let response = await axios.post(baseURL + '/searchbyinterests', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })
        }

        if (this.state.gender === '' && this.state.interests.length === 0 && this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbyage', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })
        }
        if (this.state.gender !== '' && this.state.interests.length !== 0 && this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbyall', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }

        if (this.state.gender !== '' && this.state.interests.length === 0 && this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbygenderage', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }

        if (this.state.gender !== '' && this.state.interests.length !== 0 && this.state.age === '') {
            let response = await axios.post(baseURL + '/searchbygenderinterests', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }

        if (this.state.gender === '' && this.state.interests.length !== 0 && this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbyageinterests', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }

    }

    connect = async event => {
        if (this.state.isLoggedIn === true) {
            this.setState({
                user2_id: event.target.name,
                user2_name: event.target.value,
                sendMsg: true,
                display: false
            })
            window.scrollTo(0,0)

        } else {
            alert('Please login')
        }


    }


    send = async event => {

        let conversationUsers = {
            user_id: this.state.user_id,
            user_name: this.state.name,
            user2_id: this.state.user2_id,
            user2_name: this.state.user2_name,
            message: this.state.message,
            name:this.state.name

        }

        console.log(conversationUsers)

        let response = await axios.post(baseURL + '/conversations', conversationUsers)
        console.log(response)
        alert('Message sent!')

    }

}