import React, {useState, useEffect} from 'react'
import axios from 'axios'

// New User Sign Up
const Profile = (props) => {
    const [userProfile, setProfile] = useState({
        name: 'user',
        email: 'email',
        bio: 'bio'
    })
    useEffect(() => {
        axios.get('https://mysterious-atoll-88793.herokuapp.com/clients/' + props.parentState.userID)
            .then((res) => {
                console.log(res.data)
                setProfile((prevProfile) => {
                    return {
                        name: res.data.name,
                        email: res.data.email,
                        bio: res.data.bio
                    }
                })
            })
    }, [props.parentState.userID])
    const deleteClient = (event) => {
        axios.delete('https://mysterious-atoll-88793.herokuapp.com/clients/' + props.parentState.userID)
        .then((res) => {
            props.logOut()
        })
    }
    return (
        <div id="profile-cont">
            <img className="logo" src="/logos/ICON.svg" alt="coinpurse-logo"/>
            <h2>Profile</h2>
            <div id="profile-details">
                <label>User Name</label>
                <p>{userProfile.name[0].toUpperCase() + userProfile.name.substring(1)}</p>
                <label>Email</label>
                <p>{userProfile.email}</p>
                <label>Bio</label>
                <p>{userProfile.bio}</p>
                <button onClick={deleteClient}>Delete</button>
            </div>
        </div>
    )

}

export default Profile
