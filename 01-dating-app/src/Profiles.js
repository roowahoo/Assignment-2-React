import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class Profiles extends React.Component {
    state = {
        profiles: [],
        name: 'John',
        age: '30',
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
                    <p>About: {eachProfile.introduction}</p>
                    <p>Interests: {eachProfile.interests}</p>
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
                    <div className='d-flex justify-content-center'>
                        <div className='col-md-4 m-3 text-left '>
                            <label className='form-label'>Name</label>
                            <input className="form-control" type="text" name='name' value={this.state.name} onChange={this.updateFormFields} />
                        </div>
                        <div className='col-md-1 m-3 text-left'>
                            <label className='form-label'>Age</label>
                            <input className="form-control" type="text" name='age' value={this.state.age} onChange={this.updateFormFields} />
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
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
                </div>

                <button onClick={this.createProfile}>Submit</button>
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

    updateInterests=event=>{
        if(this.state.interests.includes(event.target.value)===false){
            let clonedArray=[...this.state.interests]
            clonedArray.push(event.target.value)
            this.setState({
                interests:clonedArray
            })
        }else{
            let clonedArray=[...this.state.interests]
            clonedArray=clonedArray.filter(item=>item!==event.target.value)
            this.setState({
                interests:clonedArray
            })
        }

    }

    createProfile = async event => {
        let newProfile = {
            name: this.state.name,
            age: this.state.age,
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
    }

}