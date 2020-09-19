import React from 'react'
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

const PrivateRoute = props => {
    
    const {component:Component,auth:{isAuthenticated,loading},...rest}= props;
    return (
        <Route {...rest} 
        render ={props=> 
            !isAuthenticated&&!loading?
            (<Redirect to="/login"/>):
            (<Component {...props}/>)
    }/>
    )
}


const mapStateToProps = (state) => ({
    auth:state.auth
})
export default connect(mapStateToProps)(PrivateRoute)
