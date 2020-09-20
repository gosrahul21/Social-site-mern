import React,{Fragment, useEffect} from 'react';
import {getAllProfiles} from '../../actions/profile';
import {connect} from 'react-redux';
import profile from '../../reducers/profile';
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
const Profiles = (props) => {

    const {getAllProfiles,profile:{profiles,loading}} =props;
    useEffect(()=>{
        getAllProfiles();
    },[]);
    
    return <Fragment>
      {loading?<Spinner/>:<Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i>Browse and connect with Developers
        </p>
        <div className="profiles">
          {profiles.length>0?(profiles.map((profile)=>{
            if(profile.user)
            return <ProfileItem key={profile._id} profile={profile}/>
          })):<Fragment>NO Profiles</Fragment>}
        </div>
        </Fragment>}
    </Fragment>
}

const mapStateToProps = (state) => {
    console.log(state.profile.profiles)
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps,{getAllProfiles})(Profiles);