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
        editedDob: '',
        editedInterests: '',
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

                    <div className='m-3 text-left'>
                        <label className='form-label'>Username</label>
                        <div className='input-group text-left'>
                            <span className="input-group-text">@</span>
                            <input className="form-control" type="text" name='editedUsername' value={this.state.editedUsername} onChange={this.updateFormFields} />
                            <div id='username'>Your username is confidential and must be more than 4 characters long and include at least 1 special character.</div>
                            <span style={{ display: this.showError() ? 'none' : 'block' }} className='error'>Please enter a valid username</span>
                            {/* <span style={{ display: this.state.errorMessage ? 'block' : 'none' }} className='error'>Username has been taken</span> */}
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
                        <textarea className="form-control" type="text" name='introduction' value={this.state.profile.introduction} onChange={this.updateFormFields}></textarea>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary m-3 px-5' onClick={this.EditProfile}>Edit</button>
                    </div>
                </div>

                <div id='profiles' className='m-3'>

                </div>
            </React.Fragment>
        )
    }

    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

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

    // renderProfile=()=>{
    //     let acc = []
    //         acc.push(
    //             <div key={this.state.profile._id} className='profiles'>
    //                 <h5>{this.state.profile.name}, {this.state.profile.age}</h5>
    //                 <p>Interests: {this.state.profile.interests.join(', ')}</p>
    //                 <p>About: {this.state.profile.introduction}</p>
    //                 <button name={this.state.profile._id} className='btn btn-primary' onClick={this.connect}>Connect</button>
    //             </div>
    //         )

    //     return acc
    // }
}