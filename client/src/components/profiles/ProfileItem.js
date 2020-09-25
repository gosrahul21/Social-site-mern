import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileItem = props => {
    const {profile:{
        user:{_id,name,avatar},
        status,
        company,
        location,
        skills
    }}=props

    const  arrayBufferToBase64=(buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
   // let base64String = btoa(String.fromCharCode(...new Uint8Array(avatar.data)));
    //console.log(arrayBufferToBase64(avatar.data))
    return (
        <div className="profile bg-light ">
         {/* <img src={base64String} className="round-img"/> */}
            <img  src={`data:image/jpeg;base64,${arrayBufferToBase64(avatar.data)}`}  className="round-img"/> 
            <div>
            <h2>{name}</h2>
            <p>{status}</p>
            <p className="my-1">{location&&<span>{location}</span>}</p>
         <Link to={`profile/${_id}`} className="btn btn-primary">
         View Profile
         </Link>

        </div>
        <ul>
            {skills.slice(0,4).map((skill,index) => {
                return <li key={index} className="text-primary">
                    <i className="fas fa-check"></i>{skills}
                </li>
            })}
        </ul>
        </div>
    );
}



export default ProfileItem
