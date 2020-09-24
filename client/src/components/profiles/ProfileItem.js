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
    return (
        <div className="profile bg-light">
            {console.log(avatar.data)}
          <img src={`http://localhost:4000/api/profile/image/${_id}`} alt="" className="round-img"/>
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
