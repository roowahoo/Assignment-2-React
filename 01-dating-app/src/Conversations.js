import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default class Conversations extends React.Component{
    state={
        user1_id:'',
        user2_id:''
    }


    render(){
        return(
            <React.Fragment>
                <h1>You made it</h1>
            </React.Fragment>
        )

    }
}