import React,{Fragment} from 'react'
import { connect } from 'react-redux';
import { Link,Redirect} from "react-router-dom";

const Landing = (props) => {
  if(props.isAuthenticated)
  {
    return <Redirect to="/dashboard"/>
  }
    return (
       <Fragment>
           <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
        
          <h1 className="x-large"><i className="laptop icon"></i>Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
       </Fragment>
    )
}

const mapStateToProps = (state) => (
  {
    isAuthenticated:state.auth.isAuthenticated
  }
)

export default connect(mapStateToProps)(Landing)