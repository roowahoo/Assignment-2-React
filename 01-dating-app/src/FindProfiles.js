import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'



export default class FindProfiles extends React.Component {
    state = {
        profiles: [],
        gender: '',
        age: '',
        interests: [],
        conversations: false,
        display: true,
        user_id: '',
        user2_id: '',
        user2_name: '',
        validate: false,
        username: '',
        conversationId: '',
        message: '',
        dropdownOpen: false,
    }

    toggle = event => {
        if (this.state.dropdownOpen === false) {
            this.setState({
                dropdownOpen: true
            })
        } else {
            this.setState({
                dropdownOpen: false
            })

        }
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
                <div id='search'>
                    <div className='row pb-2' >
                        <div className='col-3'>
                            <Label for="exampleSelect">Gender</Label>
                            <Input onChange={this.updateFormFields} type="select" name="gender" id="exampleSelect">
                                <option value='' name=''>--Select--</option>
                                <option value='male' name='gender'>Male</option>
                                <option value='female' name='gender'>Female</option>
                            </Input>
                        </div>
                        <div className='col-3'>

                            <Label for="exampleSelect">Age Range</Label>
                            <Input onChange={this.updateFormFields} type="select" name="age" id="exampleSelect">
                                <option value='' name=''>--Select--</option>
                                <option value='20' name='age'>20s</option>
                                <option value='30' name='age'>30s</option>
                            </Input>
                        </div>

                    </div>

                    <Label>Interests</Label>
                    <div className='d-flex'>

                        <div className='mx-5'>
                            <Label check>
                                <Input type='checkbox' name='interests' value='sports' onChange={this.updateInterests} />Sports</Label>
                        </div>

                        <div className='mx-5'>
                            <Label check>
                                <Input type='checkbox' name='interests' value='arts' onChange={this.updateInterests} />Arts</Label>
                        </div>

                        <div className='mx-5'>
                            <Label check>
                                <Input type='checkbox' name='interests' value='food' onChange={this.updateInterests} />Food</Label>
                        </div>

                        <div className='mx-5'>
                            <Label check >
                                <Input type='checkbox' name='interests' value='travel' onChange={this.updateInterests} />Travel</Label>
                        </div>

                        <div className='mx-5'>
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

                <div id='popup' style={{ display: this.state.validate ? 'block' : 'none' }}>
                    <label className='form-label'>Username:</label>
                    <input className='form-text' type='text' name='username' value={this.state.username} onChange={this.updateFormFields}></input>
                    <button className='btn btn-primary' onClick={this.validate}>Submit</button>
                </div>


                <div style={{ display: this.state.conversations ? 'block' : 'none' }}>
                    {/* <Conversations conversationId={this.state.conversationId} message={this.state.message} /> */}
                    <input type='text' name='message' value={this.state.message} onChange={this.updateFormFields}></input>
                    <button className='btn btn-primary' onClick={this.send}>Send</button>
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

        if (this.state.interests.length === 0 && this.state.age === '' && this.state.gender!='') {
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

        if (this.state.gender === '' && this.state.interests.length === 0 && this.state.age !== '' ) {
            let response = await axios.post(baseURL + '/searchbyage', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })
        }
        if(this.state.gender !== '' && this.state.interests.length !== 0 && this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbyall', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }

        if(this.state.gender !== '' && this.state.interests.length === 0 && this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbygenderage', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }

        if(this.state.gender !== '' && this.state.interests.length !== 0 && this.state.age === '') {
            let response = await axios.post(baseURL + '/searchbygenderinterests', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }

        if(this.state.gender === '' && this.state.interests.length !== 0 && this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbyageinterests', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }



    }

    connect = event => {
        this.setState({
            validate: true,
            user2_id: event.target.name,
            user2_name: event.target.value
        })
    }

    validate = async event => {
        let searchUserName = {
            username: this.state.username
        }

        let conversationId;
        let ifUserExists = await axios.post(baseURL + '/searchUsernames', searchUserName);
        if (ifUserExists.data !== 'no username found') {
            console.log(ifUserExists.data)

            this.setState({
                conversations: true,
                display: false,
                user_id: ifUserExists.data.user_id,
                user_name: ifUserExists.data.name
            })

            let conversationUsers = {
                user_id: this.state.user_id,
                user_name: this.state.user_name,
                user2_id: this.state.user2_id,
                user2_name: this.state.user2_name

            }

            let response = await axios.post(baseURL + '/conversations', conversationUsers)
            console.log(response)
            conversationId = response.data.insertedId
            this.setState({
                conversationId: conversationId
            })



        } else {
            console.log(ifUserExists.data)
            alert('user not found')
        }
    }

    send = async event => {
        let newMessage = {
            conversationId: this.state.conversationId,
            message: this.state.message
        }
        await axios.put(baseURL + '/conversations', { ...newMessage })
    }

}