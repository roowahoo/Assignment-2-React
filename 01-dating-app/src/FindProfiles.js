import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'


export default class FindProfiles extends React.Component {
    state = {
        profiles: [],
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
                    <div className='m-3 text-left'>
                        <input className="form-control" type="text" name='name' value={this.state.name} onChange={this.updateFormFields} />
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
    updateFormFields = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    searchProfile=event=>{
        


    }
    
}