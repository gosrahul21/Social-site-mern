import React,{useState} from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth';

 const Register = (props) => {

    const {setAlert,isAuthenticated} =props;

    const [p_type1,set_ptype1]=useState("password");
    const [p_type2,set_ptype2]=useState("password");

    const [ formData,setFormData ]= useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const {name,email,password,password2} = formData;
    const onChange=(e)=>{
        e.preventDefault();
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(password!==password2)
        {
            setAlert("password do not match",'danger');
        }
        else{
            const newUser={
                name,
                email,
                password
            }

            props.register(newUser);
            
        }
        
    }


    if(isAuthenticated)
    {
      return <Redirect to="/dashboard"/>
    }




    return (
        <div>
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={onSubmit} action="create-profile.html">
        <div className="form-group">
          <input type="text" value={name} onChange={onChange} placeholder="Name" name="name" required />
        </div>
        <div className="form-group">
          <input type="email"  value={email} onChange={onChange} placeholder="Email Address" name="email" />
          
        </div>
        <div className="form-group">
          <input
            type={p_type2}
            placeholder="Password"
            value={password}
            onChange={onChange}
            name="password"
            minLength="6"
          />
           <input type="checkbox" name="togglepassword" onChange={()=>(p_type2)==="password"?set_ptype2("text"):set_ptype2("password")}/>
         <label for="togglepassword"><span> view password</span></label>
        </div>
        <div className="form-group">
          <input
            type={p_type1}
            
            placeholder="Confirm Password"
            value={password2}
            onChange={onChange}
            name="password2"
            minLength="6"
          />
           <input type="checkbox" onChange={()=>(p_type1)==="password"?set_ptype1("text"):set_ptype1("password")}/>
           <label for="togglepassword"><span> view password</span></label>
        </div>
        <input type="submit"  className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
        </div>
    )
}

const mapStateToProps= (state) => (
  {
    isAuthenticated:state.auth.isAuthenticated
  }
)
export default connect(mapStateToProps,{setAlert,register})(Register);