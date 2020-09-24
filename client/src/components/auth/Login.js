import React,{useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import {login} from '../../actions/auth'
import {connect} from 'react-redux'

 const Login = (props) => {

    const [formData,setFormData] =useState({
        email:'',
        password:''
    });
    const [p_type,set_ptype] = useState("password");
    const {email,password} =formData

    const onChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

    }

    const onSubmit = async(e) =>{
        e.preventDefault();
        props.login(formData)
        
    }

    if(props.isAuthenticated)
    {
      return <Redirect to='/dashboard'></Redirect>
    }


    return (
        <div>
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={onSubmit} action="create-profile.html">
        
        <div className="form-group">
          <input type="email"  value={email} onChange={onChange} placeholder="Email Address" name="email" />

        </div>
        <div className="form-group">
          <input
            type={p_type}
            placeholder="Password"
            value={password}
            onChange={onChange}
            name="password"
            minLength="6"
          />
          <input type="checkbox" name="togglepassword" onChange={()=>(p_type)==="password"?set_ptype("text"):set_ptype("password")}/>
          <label for="togglepassword"><span> view password</span></label>
        </div>
        
        <input type="submit"  className="btn btn-primary" value="Log In" />
      </form>
      <p className="my-1">
       Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
        </div>
    )
    
}

const mapStateToProps=(state)=>(
  {
    isAuthenticated: state.auth.isAuthenticated
  }
)

export default connect(mapStateToProps,{login})(Login);