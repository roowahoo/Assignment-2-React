import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class MyProfile extends React.Component {
    state = {
        username: '',
        validate: true,
        user_id: '',
        profile: '',
        editedName: '',
        editedUsername: '',
        editedGender: '',
        editedAge: '',
        editedDob: '',
        editedInterests: [],
        editedIntroduction: ''

    }
    render() {
        return (
            <React.Fragment>
                <div style={{ display: this.state.validate ? 'block' : 'none' }}>
                    <label className='form-label'>Username:</label>
                    <input className='form-text' type='text' name='username' value={this.state.username} onChange={this.updateFormFields}></input>
                    <button className='btn btn-primary' onClick={this.validate}>Submit</button>
                </div>

                <div id='signup' style={{ display: this.state.validate ? 'none' : 'block' }}>
                    <div className='m-3 text-left'>
                        <label className='form-label'>Name</label>
                        <input className="form-control" type="text" name='editedName' value={this.state.editedName} onChange={this.updateFormFields} />
                    </div>

                    {/* <div className='m-3 text-left'>
                        <label className='form-label'>Username</label>
                        <div className='input-group text-left'>
                            <span className="input-group-text">@</span>
                            <input className="form-control" type="text" name='username' value={this.state.username}/>
                            <div id='username'>Username cannot be changed</div>
                            <span style={{ display: this.showError() ? 'none' : 'block' }} className='error'>Please enter a valid username</span>
                            <span style={{ display: this.state.errorMessage ? 'block' : 'none' }} className='error'>Username has been taken</span>
                        </div>
                    </div> */}

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
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary m-3 px-5' onClick={this.editProfile}>Confirm</button>
                        <button className='btn btn-danger m-3 px-5' onClick={this.deleteProfile}>Delete</button>
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

    getAge = (date) => {
        let dob = new Date(date)
        let diff = Date.now() - dob.getTime()
        let dateDiff = new Date(diff)
        let year = dateDiff.getUTCFullYear()
        let age = Math.abs(year - 1970)
        return age

    }

    validate = async event => {
        let searchUserName = {
            username: this.state.username
        }

        let ifUserExists = await axios.post(baseURL + '/searchUsernames', searchUserName);
        if (ifUserExists.data !== null) {
            console.log(ifUserExists.data)

            this.setState({
                user_id: ifUserExists.data
            })

            let foundUser = {
                user_id: this.state.user_id

            }

            let userProfile = await axios.post(baseURL + '/findProfile', foundUser)
            this.setState({
                profile: userProfile.data,
                editedName: userProfile.data.name,
                editedUsername: userProfile.data.username,
                editedGender: userProfile.data.gender,
                // editedAge:userProfile.data.age,
                editedDob: userProfile.data.dob,
                editedInterests: userProfile.data.interests,
                editedIntroduction: userProfile.data.introduction,
                validate: false
            })

        } else {
            console.log(ifUserExists)
            alert('user not found')
        }
    }

    // showError = () => {
    //     let char = ['!', '@', '#', '$', '%', '^', '&', '*']
    //     for (let x of char) {
    //         if (this.state.username.includes(x) && this.state.username.length > 4) {
    //             return true
    //         } else {
    //             continue
    //         }

    //     }

    // }

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
            interests: this.state.editedInterests,
            introduction: this.state.editedIntroduction,
        }

        axios.put(baseURL + '/editProfile', { ...newProfile })
        alert('Profile updated')

        // let newUsername = {
        //     user_id: this.state.user_id,
        //     username: this.state.username
        // }
        // axios.put(baseURL + '/editUsername', { ...newUsername })


    }

    deleteProfile=event=>{
        let profileToDelete={
            user_id:this.state.user_id,
        }

        axios.delete(baseURL+'/deleteProfile',profileToDelete)
        axios.delete(baseURL+'/deleteUsername',profileToDelete)

    }
}