import React from 'react'
import axios from 'axios'
import Conversations from './Conversations'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'


export default class FindProfiles extends React.Component {
    state = {
        profiles: [],
        gender: '',
        age: '',
        interests: [],
        byGender: false,
        byAge: false,
        byInterests: false,
        conversations: false,
        display: true,
        user_id: '',
        user2_id: '',
        validate: false,
        username: '',
        conversationId: '',
        message: ''
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
                        <h5 className="card-title">{eachProfile.name}, {eachProfile.age}</h5>
                        <p>Interests: {eachProfile.interests.join(', ')}</p>
                        <p className="card-text">{eachProfile.introduction}</p>
                        <button name={eachProfile._id} className='btn btn-primary' onClick={this.connect}>Connect</button>
                    </div>
                </div>
            )
        }
        return acc
    }
    // <div key={eachProfile._id} className='profiles'>
    //     <img src={eachProfile.image}/>
    //     <h5>{eachProfile.name}, {eachProfile.age}</h5>
    //     <p>Interests: {eachProfile.interests.join(', ')}</p>
    //     <p>About: {eachProfile.introduction}</p>
    //     <button name={eachProfile._id} className='btn btn-primary' onClick={this.connect}>Connect</button>
    // </div>

    render() {
        return (
            <React.Fragment>
                <div style={{ display: this.state.display ? 'block' : 'none' }}>
                    {/* <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                        <DropdownToggle caret color="primary">
                            Text
  </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown> */}
                    <div className='row'>
                        <div className='col-3'>
                            <button className='btn btn-secondary' onClick={this.byGender}>Gender</button>
                            <button className='btn btn-secondary m-1' style={{ display: this.state.byGender ? 'block' : 'none' }} value='male' name='gender' onClick={this.updateFormFields}>Male</button>
                            <button className='btn btn-secondary m-1' style={{ display: this.state.byGender ? 'block' : 'none' }} value='female' name='gender' onClick={this.updateFormFields}>Female</button>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-secondary m-1' onClick={this.byAge}>Age</button>
                            <button className='btn btn-secondary m-1' style={{ display: this.state.byAge ? 'block' : 'none' }} value='20' name='age' onClick={this.updateFormFields}>20s</button>
                            <button className='btn btn-secondary m-1' style={{ display: this.state.byAge ? 'block' : 'none' }} value='30' name='age' onClick={this.updateFormFields}>30s</button>

                        </div>

                        <div className='row'>
                            {/* <div className='m-3 text-left'> */}
                            <div className='col-3'>
                                <button className='btn btn-secondary' onClick={this.byInterest}>Interests</button>
                                <div style={{ display: this.state.byInterest ? 'block' : 'none' }}>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' name='interests' value='sports' onChange={this.updateInterests} />
                                        <label className='form-check-label'>Sports</label>
                                    </div>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' name='interests' value='arts' onChange={this.updateInterests} />
                                        <label className='form-check-label'>Arts</label>
                                    </div>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' name='interests' value='food' onChange={this.updateInterests} />
                                        <label className='form-check-label'>Food</label>
                                    </div>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' name='interests' value='travel' onChange={this.updateInterests} />
                                        <label className='form-check-label'>Travel</label>
                                    </div>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' name='interests' value='education' onChange={this.updateInterests} />
                                        <label className='form-check-label'>Education</label>
                                    </div>
                                </div>
                            </div>

                            {/* </div> */}

                        </div>

                    </div>
                    <button className='btn btn-primary m-3 px-5' onClick={this.searchProfile}>Search</button>

                    <div id='profiles'>
                        {this.renderProfiles()}
                    </div>

                    <div id='popup' style={{ display: this.state.validate ? 'block' : 'none' }}>
                        <label className='form-label'>Username:</label>
                        <input className='form-text' type='text' name='username' value={this.state.username} onChange={this.updateFormFields}></input>
                        <button className='btn btn-primary' onClick={this.validate}>Submit</button>
                    </div>
                </div>

                <div style={{ display: this.state.conversations ? 'block' : 'none' }}>
                    {/* <Conversations conversationId={this.state.conversationId} message={this.state.message} /> */}
                    <input type='text' name='message' value={this.state.message} onChange={this.updateFormFields}></input>
                    <button className='btn btn-primary' onClick={this.send}>Send</button>

                </div>

            </React.Fragment>
        )
    }

    byGender = event => {
        this.setState({
            byGender: true,
            byAge: false,
            byInterest: false
        })
    }

    byAge = event => {
        this.setState({
            byAge: true,
            byGender: false,
            byInterest: false
        })
    }

    byInterest = event => {
        this.setState({
            byInterest: true,
            byAge: false,
            byGender: false
        })
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
        if (this.state.interests.length === 0) {

            let response = await axios.post(baseURL + '/searchbygender', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })

        }
        if (this.state.gender === '') {
            let response = await axios.post(baseURL + '/searchbyinterests', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })
        }
        if (this.state.age !== '') {
            let response = await axios.post(baseURL + '/searchbyage', searchValue)
            console.log(response)
            this.setState({
                profiles: response.data
            })
        }


    }

    connect = event => {
        this.setState({
            validate: true,
            user2_id: event.target.name
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
                user_id: ifUserExists.data
            })

            let conversationUsers = {
                user_id: this.state.user_id,
                user2_id: this.state.user2_id

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