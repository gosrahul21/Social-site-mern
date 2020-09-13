import React from 'react'
import {Fragment,useState} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {Link,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types'
import {register} from '../../actions/auth'

import axios from 'axios';
const Register= (props) => {

    const [formData,setFormData] =useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const {name,email,password,password2} = formData
    const onSubmitForm = async(e)=>{
        e.preventDefault();
        if(e.target.password.value!==e.target.password2.value){
            props.setAlert("Password do not match!!!","danger");
        }
        else{
          props.register({name,email,password})
            
        //     const newUser ={
        //         name,
        //         email,
        //         password
        //     }
        //     console.log(newUser)

        //     try{
        //         const config = {
        //             headers:{
        //                 'Content-Type': 'application/json'
        //             }
        //         }

        //         const body = JSON.stringify(newUser);
        //         const response = await axios.post('/api/users',body,config)
        //         console.log(response.data);

        //     }catch(err){
        //         console.log({error:err.response.data})
        //     }
        //
       }
    }
    const onChangeData=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        console.log(e.target.value);
    }
   

    if(props.isAuth)
    {
      return <Redirect to="/dashboard"></Redirect>
    }


    return (
        <Fragment>
            <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={onSubmitForm}>
        <div className="form-group">
          <input type="text" 
          placeholder="Name" 
          autoComplete="off"
          name="name" 
          onChange={onChangeData}
          required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" onChange={onChangeData} name="email" required/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeData}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={onChangeData}
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
        </Fragment>
    )
}

{/* Register.PropTypes={  
  setAlert:PropTypes.func.isRequired
} */}


const mapStateToProps =(state) =>{
 return {
  isAuth:state.auth.isAuthenticated
 }
}

export default connect(mapStateToProps,{setAlert,register})(Register);