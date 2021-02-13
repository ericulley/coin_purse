import React from 'react'
import {Redirect} from 'react-router-dom'

class UnAuthUser extends React.Component {
    render = () => {
        return (
            <Redirect to="/signup" />
        )
    }
}

export default UnAuthUser
