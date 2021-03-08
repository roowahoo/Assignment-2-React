import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class Profiles extends React.Component {
    state = {
        profiles: [],
        name: '',
        age: '',
        dob:'',
        gender: '',
        interests: [],
        introduction: '',

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
                <div>
                    <h1>Sign Up</h1>
                    <div className='col-md-9 m-3 text-left'>
                        <label className='form-label'>Name</label>
                        <input className="form-control" type="text" name='name' value={this.state.name} onChange={this.updateFormFields} />
                    </div>

                    <div className='col-md-9 m-3 text-left'>
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


                    <div className='col-md-9 m-3 text-left'>
                        <label className='form-label'>DOB</label>
                        <div className='d-flex'>
                            <input className="form-control col-md-3" type="date" name='dob' value={this.state.dob} onChange={this.updateFormFields} />
                        </div>
                    </div>

                    <div className='d-flex flex-column'>
                        <label className='form-label'>I Enjoy...</label>
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

                    <div className='col-md-9 m-3 text-left'>
                        <label className='form-label'>About Me</label>
                        <textarea className="form-control" type="text" name='introduction' value={this.state.introduction} onChange={this.updateFormFields}></textarea>
                    </div>
                </div>

                <button className='btn btn-primary' onClick={this.createProfile}>Submit</button>
                <div className='m-3'>
                    <h1>Profiles</h1>
                    {this.renderProfiles()}
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

    getAge = (date) => {
        let dob = new Date(date)
        let diff = Date.now() - dob.getTime()
        let dateDiff = new Date(diff)
        let year = dateDiff.getUTCFullYear()
        let age = Math.abs(year - 1970)
        return age

    }

    createProfile = async event => {

        console.log(this.getAge(this.state.dob))
        let newProfile = {
            name: this.state.name,
            gender: this.state.gender,
            age: this.getAge(this.state.dob),
            interests: this.state.interests.join(', '),
            introduction: this.state.introduction
        }

        let response = await axios.post(baseURL + '/profiles', newProfile)
        newProfile._id = response.data._id
        let clonedArray = [...this.state.profiles]
        clonedArray.push(newProfile)
        this.setState({
            profiles: clonedArray
        })
        window.location.reload()
    }

}