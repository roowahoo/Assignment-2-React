import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'


export default class FindProfiles extends React.Component {
    state = {
        profiles: [],
        gender: '',
        interests: [],
        byGender:false,
        byAge:false
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
                    <button className='btn btn-primary'>Connect</button>
                </div>
            )
        }
        return acc
    }

    render() {
        return (
            <React.Fragment>
                <button className='btn btn-secondary' onClick={this.byGender}>Gender</button>
                <button className='btn btn-secondary m-1' style={{display:this.state.byGender?'block':'none'}} value='male' name='gender' onClick={this.updateFormFields}>Male</button>
                <button className='btn btn-secondary m-1' style={{display:this.state.byGender?'block':'none'}} value='female' name='gender' onClick={this.updateFormFields}>Female</button>
                <button className='btn btn-secondary m-1' onClick={this.byAge}>Age</button>
                <div>
                    <div className='m-3 text-left'>
                        <div className='m-3'>
                            <label className='form-label'>Interests</label>
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

                        <button className='btn btn-primary m-3 px-5' onClick={this.searchProfile}>Search</button>
                    </div>
                </div>

                <div id='profiles' className='m-3'>
                    <h1>Profiles</h1>
                    {this.renderProfiles()}
                </div>

            </React.Fragment>
        )
    }

    byGender=event=>{
        this.setState({
            byGender:true,
            byAge:false
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
            interests: this.state.interests

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


    }


}