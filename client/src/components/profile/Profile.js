
import React,{useEffect,Fragment} from 'react'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getProfileById} from '../../actions/profile'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import auth from '../../reducers/auth';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
const Profile = props => {
    const {getProfileById,profile:{profile,loading},match,auth} = props;
    console.log(match)
    useEffect(()=>{
        getProfileById(match.params.id);

    },[]);
    return (
        <div>
           {profile===null||loading?<Spinner/>:
           <Fragment>
           <Link to="/getAllProfiles" className='ui button light'>
               Back to Profiles
           </Link>
           {auth.isAuthenticated && auth.loading===false&&  auth.user._id===profile.user._id&&
           (<Link to="/edit-profile" className="ui button orange">Edit Profile</Link>)}
           <div className="profile-grid my-1">
                <ProfileTop profile={profile}></ProfileTop>
                <ProfileAbout profile={profile}/>
                <ProfileExperience profile={profile}/>
                <ProfileEducation profile={profile}/>
                <ProfileGithub profile={profile}/>
           </div>
           </Fragment>}
        </div>
    )
}

// profile.propTypes = {

//     getProfileById:PropTypes.func.isRequired,
//     profile.
// }

const mapStateToProps= state =>(
    {
        profile:state.profile,
        auth:state.auth
    }
)
export default connect(mapStateToProps,{getProfileById})(Profile);
