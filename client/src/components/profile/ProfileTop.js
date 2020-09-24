import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = props => {

    return (
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={`http://localhost:4000/api/profile/image/${props.profile.user._id}`}
            alt=""
          />
          {console.log(props.profile.user.avatar)}
          <h1 className="large">{props.profile.user.name}</h1>
          <p className="lead">{props.profile.status} {props.profile.company && <span>at {props.profile.company}</span>}</p>
          <p>{props.profile.location}</p>
          <div className="icons my-1">
           {props.profile.website?( <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>):null}
           {props.profile.social.twitter? <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>:null}
            {props.profile.social.facebook?<a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>:null}
            {props.profile.social.linkedin?<a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>:null}
             {props.profile.social.youtube?<a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>:null}
            {props.profile.social.instagram?<a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x "></i>
            </a>:null}
          </div>
        </div>
    )
}



export default ProfileTop
