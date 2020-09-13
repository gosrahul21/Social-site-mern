import React from 'react'
import {Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
// import propTypes from 'prop-Types';
import {login} from '../../actions/auth';
const Login= ({login,isAuth}) => {

    const [LoginformData,setLoginFormData] =useState({
        email:'',
        password:''
    });
    const [viewPassword,setViewPassword] = useState("password");
    const {email,password} = LoginformData
    const onSubmitForm = async(e)=>{
        e.preventDefault();
        login(email,password);
        
            
            
    };

    //redirect if login
   if(isAuth){
       return <Redirect to="/dashboard"></Redirect>
   }

    const onChangeData=(e)=>{
        setLoginFormData({...LoginformData,[e.target.name]:e.target.value})
        console.log(e.target.value);
    }
   
    return (
        <Fragment>
            <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i></p>
      <form className="form" action="create-profile.html" onSubmit={onSubmitForm}>

        <div className="form-group">
          <input type="email" placeholder="Email Address" onChange={onChangeData} name="email" required/>
          
          
        </div>
        <div className="form-group">
          <input
            type={viewPassword}
            placeholder="Password"
            name="password"
            onChange={onChangeData}
            minLength="6"
          />
          <input type="checkbox" onChange={()=>{
              if(viewPassword==="password")
              {
                  setViewPassword("text");
              }
              else
              setViewPassword("password")
          }} autoComplete="off" />
          <label>   View password</label>
        </div>
        
        {/* <input type="submit" className="btn btn-primary" value="" /> */}
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </section>
        </Fragment>
    )
}

//proptypes

const mapStateToProps=(state)=>{
   return {
    isAuth:state.auth.isAuthenticated
   }
}

export default connect(mapStateToProps,{login})(Login);