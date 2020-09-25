import React,{Fragment} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { logout} from '../../actions/auth';


const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLinks =() => {
    return (
    <ul>
       
      <li>
        <Link  to='/getAllProfiles'>
        <i class="users large icon green"></i>Developers
        </Link>
        </li>
        <li>
        <Link  to='/post'>
        <i class="users large icon green"></i>Posts
        </Link>
        </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
         <span className="hide-sm"> DashBoard</span></Link>
      </li>

      <li>
        <Link onClick={logout} to='/login'>
        
        <i className="fas fa-sign-out-alt"/>{' '}
        <span className="hide-sm"><i class="power off icon"></i>Logout</span>
        
        
        </Link>
        </li>

    </ul>)
  }

  const guestLinks =() =>{
    return (<ul>
        <li>
        <Link  to='/getAllProfiles'>
        <i class="users large blue icon"></i>Developers
        </Link>
        </li>
        <li><Link to="/register"><i className="user icon">{' '}</i>Register</Link></li>
        <li><Link to="/login"><i class="user icon">{' '}</i>Login</Link></li>
      </ul>)
  }
    return (
        <div>
             <Fragment>
            <nav className="navbar bg-dark">
      <h1>
        <Link to="/index"><i className="fas fa-code"></i><i className="laptop icon"></i> DCorner</Link>
      </h1>
      
      {!loading&&(<div>{isAuthenticated?authLinks():guestLinks()}</div>)}


    </nav>
        </Fragment>
        </div>
    )
}

const mapStateTOProps = (state) => ({
auth:state.auth,

});

export default connect(mapStateTOProps,{logout})(Navbar)
