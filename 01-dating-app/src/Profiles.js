import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class Profiles extends React.Component {
    state = {
        profiles: [],
        name: 'John',
        age: '30',
        interests: [],
        contact: '',
        introduction: '',
        // likes:[],

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
                <div key={eachProfile._id}>
                    {eachProfile.name}
                    {eachProfile.age}
                </div>
            )  
        }
        return acc
    }

    render() {
        return (
            <React.Fragment>
                <h1>Profiles</h1>
                {this.renderProfiles()}

            </React.Fragment>
        )
    }

}