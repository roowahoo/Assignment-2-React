import React from 'react'
import axios from 'axios'
import CreateProfiles from './CreateProfiles'
import { Label, Input } from 'reactstrap'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class MyProfile extends React.Component {
    state = {
        username: this.props.username,
        user_id: this.props.user_id,
        profile: '',
        editedName: '',
        editedUsername: '',
        editedGender: '',
        editedAge: '',
        editedDob: '',
        editedCountry:'',
        editedInterests: [],
        editedIntroduction: '',
        editedImage: '',
        isLoggedIn: this.props.isLoggedIn

    }
    render() {
        if (this.state.isLoggedIn === true) {
            return (
                <React.Fragment>
                    <div id='searchedit_padding'>
                        <div id='edit_profile'>
                            <div className='m-3 text-left'>
                                <label className='form-label'>Name</label>
                                <input className="form-control" type="text" name='editedName' value={this.state.editedName} onChange={this.updateFormFields} />
                            </div>

                            <div className='m-3 text-left'>
                                <label className='form-label'>Username</label>
                                <div className='input-group text-left'>
                                    <span className="input-group-text">@</span>
                                    <input className="form-control" type="text" name='username' value={this.state.username} disabled />
                                </div>
                            </div>

                            <div className='m-3 text-left'>
                                <label className='form-label'>Gender</label>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' value='male' name='editedGender' onChange={this.updateFormFields} checked={this.state.editedGender === 'male'} />
                                    <label className='form-check-label'>Male</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' value='female' name='editedGender' onChange={this.updateFormFields} checked={this.state.editedGender === 'female'} />
                                    <label className='form-check-label'>Female</label>
                                </div>
                            </div>

                            <div className='m-3 text-left'>
                                <label className='form-label'>DOB</label>
                                <input className="form-control" type="date" name='editedDob' value={this.state.editedDob} onChange={this.updateFormFields} />
                            </div>

                            <div className='m-3 text-left'>
                                <Label for="exampleSelect">Country of Residence</Label>
                                <Input type="select" value={this.state.editedCountry} name="editedCountry" onChange={this.updateFormFields}>
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
                                    <input className='form-check-input' type='checkbox' name='editedInterests' value='sports' onChange={this.updateInterests} checked={this.state.editedInterests.includes('sports')} />
                                    <label className='form-check-label'>Sports</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' name='editedInterests' value='arts' onChange={this.updateInterests} checked={this.state.editedInterests.includes('arts')} />
                                    <label className='form-check-label'>Arts</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' name='editedInterests' value='food' onChange={this.updateInterests} checked={this.state.editedInterests.includes('food')} />
                                    <label className='form-check-label'>Food</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' name='editedInterests' value='travel' onChange={this.updateInterests} checked={this.state.editedInterests.includes('travel')} />
                                    <label className='form-check-label'>Travel</label>
                                </div>
                                <div className='form-check'>
                                    <input className='form-check-input' type='checkbox' name='editedInterests' value='education' onChange={this.updateInterests} checked={this.state.editedInterests.includes('education')} />
                                    <label className='form-check-label'>Education</label>
                                </div>
                            </div>

                            <div className='m-3 text-left'>
                                <label className='form-label'>About Me</label>
                                <textarea className="form-control" type="text" name='editedIntroduction' value={this.state.editedIntroduction} onChange={this.updateFormFields}></textarea>
                            </div>
                            <div className='m-3 text-left'>
                                <label className='form-label'>Photo</label>
                                <input className="form-control" type="text" name='editedImage' value={this.state.editedImage} onChange={this.updateFormFields} placeholder='Insert image URL here' ></input>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <button className='btn pinkBtn m-3 px-5' onClick={this.editProfile}>Update</button>
                                <button className='btn delBtn m-3 px-5' onClick={this.deleteProfile}>Delete</button>
                            </div>

                        </div>
                    </div>

                </React.Fragment>

            )
        } else {
            return (<CreateProfiles />)
        }
    }

    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    getAge = (date) => {
        let dob = new Date(date)
        let diff = Date.now() - dob.getTime()
        let dateDiff = new Date(diff)
        let year = dateDiff.getUTCFullYear()
        let age = Math.abs(year - 1970)
        return age

    }

    async componentDidMount() {
        if (this.state.isLoggedIn === true) {
            let foundUser = {
                user_id: this.state.user_id

            }

            let userProfile = await axios.post(baseURL + '/findProfile', foundUser)
            this.setState({
                profile: userProfile.data,
                editedName: userProfile.data.name,
                editedUsername: userProfile.data.username,
                editedGender: userProfile.data.gender,
                editedDob: userProfile.data.dob,
                editedCountry:userProfile.data.country,
                editedInterests: userProfile.data.interests,
                editedIntroduction: userProfile.data.introduction,
                editedImage: userProfile.data.image,
                validate: false
            })

        }
    }

    updateInterests = event => {
        if (this.state.editedInterests.includes(event.target.value) === false) {
            let clonedArray = [...this.state.editedInterests]
            clonedArray.push(event.target.value)
            this.setState({
                editedInterests: clonedArray
            })
        } else {
            let clonedArray = [...this.state.editedInterests]
            clonedArray = clonedArray.filter(item => item !== event.target.value)
            this.setState({
                editedInterests: clonedArray
            })
        }

    }

    editProfile = event => {
        let newProfile = {
            user_id: this.state.user_id,
            name: this.state.editedName,
            gender: this.state.editedGender,
            age: this.getAge(this.state.editedDob),
            dob: this.state.editedDob,
            country:this.state.editedCountry,
            interests: this.state.editedInterests,
            introduction: this.state.editedIntroduction,
        }

        axios.put(baseURL + '/editProfile', { ...newProfile })
        alert('Profile updated')

    }

    deleteProfile = event => {
        if (window.confirm('Are you sure?')) {
            let response = axios.delete(baseURL + '/deleteProfile/' + this.state.user_id)
            console.log(response)
            axios.delete(baseURL + '/deleteUsername/' + this.state.user_id)
            window.location = '/'

        }
    }
}