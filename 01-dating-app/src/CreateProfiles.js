import React from 'react'
import axios from 'axios'
import { Label, Input } from 'reactstrap';
import FindProfiles from './FindProfiles'

const baseURL = 'https://matchmade-assignment2.herokuapp.com'


export default class CreateProfiles extends React.Component {
    state = {
        profiles: [],
        name: '',
        username: '',
        age: '',
        dob: '',
        gender: '',
        country: '',
        interests: [],
        introduction: '',
        image_url: '',
        errorMessage: false,
        isLoggedIn: this.props.isLoggedIn,
        createProfiles: true,
        findProfiles: false

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
                <div key={eachProfile._id} className='profiles'>
                    <img alt='' src={eachProfile.image} />
                    <h5>{eachProfile.name}, {eachProfile.age}</h5>
                    <p>Interests: {eachProfile.interests}</p>
                    <p>About: {eachProfile.introduction}</p>
                </div>
            )
        }
        return acc
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: this.state.createProfiles ? 'block' : 'none' }}>
                    <h1 id='create_heading'>No Profile? Create One Now!</h1>
                    <div id='signup'>
                        <div className='m-3 text-left'>
                            <label className='form-label'>Name</label>
                            <input className="form-control" type="text" name='name' value={this.state.name} onChange={this.updateFormFields} />
                        </div>

                        <div className='m-3 text-left'>
                            <label className='form-label'>Username</label>
                            <div className='input-group text-left'>
                                <span className="input-group-text">@</span>
                                <input className="form-control" type="text" name='username' value={this.state.username} onChange={this.updateFormFields} />
                                <div id='username'>Your username is confidential and must be more than 4 characters long and include at least 1 special character.</div>
                                <span style={{ display: this.showError() ? 'none' : 'block' }} className='error'>Please enter a valid username</span>
                                <span style={{ display: this.state.errorMessage ? 'block' : 'none' }} className='error'>Username has been taken</span>
                            </div>
                        </div>

                        <div className='m-3 text-left'>
                            <label className='form-label'>Gender</label>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' value='male' name='gender' onChange={this.updateFormFields} checked={this.state.gender === 'male'} />
                                <label className='form-check-label'>Male</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' value='female' name='gender' onChange={this.updateFormFields} checked={this.state.gender === 'female'} />
                                <label className='form-check-label'>Female</label>
                            </div>
                        </div>

                        <div className='m-3 text-left'>
                            <label className='form-label'>DOB</label>
                            <input className="form-control" type="date" name='dob' value={this.state.dob} onChange={this.updateFormFields} />
                        </div>

                        <div className='m-3 text-left'>
                            <Label for="exampleSelect">Country of Residence</Label>
                            <Input type="select" name="country" onChange={this.updateFormFields}>
                                <option name='country' value='' >--Select--</option>
                                <option name='country' value='Australia' >Australia</option>
                                <option name='country' value='Hong Kong' >Hong Kong</option>
                                <option name='country' value='Singapore' >Singapore</option>
                                <option name='country' value='United Kingdom' >United Kingdom</option>
                                <option name='country' value='United States of America' >United States of America</option>
                            </Input>
                        </div>

                        <div className='m-3'>
                            <label className='form-label'>I Enjoy...</label>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' name='interests' value='sports' onChange={this.updateInterests} checked={this.state.interests.includes('sports')} />
                                <label className='form-check-label'>Sports</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' name='interests' value='arts' onChange={this.updateInterests} checked={this.state.interests.includes('arts')} />
                                <label className='form-check-label'>Arts</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' name='interests' value='food' onChange={this.updateInterests} checked={this.state.interests.includes('food')} />
                                <label className='form-check-label'>Food</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' name='interests' value='travel' onChange={this.updateInterests} checked={this.state.interests.includes('travel')} />
                                <label className='form-check-label'>Travel</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type='checkbox' name='interests' value='education' onChange={this.updateInterests} checked={this.state.interests.includes('education')} />
                                <label className='form-check-label'>Education</label>
                            </div>
                        </div>

                        <div className='m-3 text-left'>
                            <label className='form-label'>About Me</label>
                            <textarea className="form-control" type="text" name='introduction' value={this.state.introduction} onChange={this.updateFormFields}></textarea>
                        </div>
                        <div className='m-3 text-left'>
                            <label className='form-label'>Photo</label>
                            <input className="form-control" type="text" name='image_url' value={this.state.image_url} onChange={this.updateFormFields} placeholder='Insert image URL here' ></input>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn m-3 px-5 pinkBtn' onClick={this.createProfile}>Submit</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.findProfiles ? 'block' : 'none' }}>
                    <FindProfiles />
                </div>

            </React.Fragment>
        )
    }
    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }


    showError = () => {
        let char = ['!', '@', '#', '$', '%', '^', '&', '*']
        for (let x of char) {
            if (this.state.username.includes(x) && this.state.username.length > 4) {
                return true
            } else {
                continue
            }

        }

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

    getAge = (date) => {
        let dob = new Date(date)
        let diff = Date.now() - dob.getTime()
        let dateDiff = new Date(diff)
        let year = dateDiff.getUTCFullYear()
        let age = Math.abs(year - 1970)
        return age

    }

    createProfile = async event => {

        // console.log(this.getAge(this.state.dob))
        let newProfile = {
            name: this.state.name,
            gender: this.state.gender,
            age: this.getAge(this.state.dob),
            dob: this.state.dob,
            country: this.state.country,
            interests: this.state.interests,
            introduction: this.state.introduction,
            image_url: this.state.image_url
        }


        let profileId;
        try {
            if (this.showError() === true && this.state.name !== '' && this.state.dob !== '' && this.state.gender !== '' && this.state.interests.length > 0 && this.state.introduction !== '' && this.state.username !== '') {
                let response = await axios.post(baseURL + '/profiles', newProfile)
                profileId = response.data.insertedId
                let clonedArray = [...this.state.profiles]
                clonedArray.push(newProfile)
                this.setState({
                    profiles: clonedArray
                })

            } else {
                alert('Please ensure all fields are filled in and valid')
                this.setState({
                    errorMessage: false
                })

            }
            let newUsername = {
                username: this.state.username,
                user_id: profileId,
                name: this.state.name
            }

            if (this.showError() === true && this.state.name !== '' && this.state.dob !== '' && this.state.gender !== '' && this.state.interests.length > 0 && this.state.introduction !== '') {
                await axios.post(baseURL + '/usernames', newUsername)
            }
            this.setState({
                findProfiles: true,
                createProfiles: false
            })

        } catch (e) {
            this.setState({
                errorMessage: true
            })
        }

    }

}
