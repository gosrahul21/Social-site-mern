import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCurrentProfile } from "../../actions/profile";
import { loadUser } from '../../actions/auth';
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education'

const Dashboard = props => {
    const {getCurrentProfile,auth,profile} = props;
    
    
    useEffect(()=>{
        
        getCurrentProfile();
    },[])
    
    console.log(profile)
    
    return (
        <div>
           {profile.loading&&profile.profile===null?<div className="ui container"><Spinner/></div>:
           (
               <Fragment>
                   <h1 className="large text-primary">DashBoard</h1>
                   <p className="lead">
                       <i className="user large icon"></i> WELCOME {auth.user&&auth.user.name}
                   </p>{profile.profile!==null?(<Fragment><DashboardAction/>
                   
                   <Experience experience ={profile.profile.experience}/>
                   <Education education={profile.profile.education}/></Fragment>):
                   (
                       <Fragment>
                           <p>You have not yet setup a profile</p>
                           <Link to="/create-profile" className="btn btn-primary my-1">create profile</Link>
                       </Fragment>
                   )}
               </Fragment>
           )
            }
        </div>
    )
    
}

const mapStateToProps =(state) => {
    return {
        profile:state.profile,
        auth:state.auth
    }
}

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard)
