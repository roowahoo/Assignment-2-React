import React from 'react'
import axios from 'axios'

const baseURL = 'https://3001-white-impala-sa4c1pjn.ws-us03.gitpod.io'

export default function MessageDisplay(props){


    
        return(
            <React.Fragment>
                <input type='text' name={props.message} value={props.message} onChange={props.updateForm}></input>
                
            </React.Fragment>
        )

    
}