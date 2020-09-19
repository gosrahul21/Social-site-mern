import React,{useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {addExperience} from '../../actions/profile'



const AddExperience = (props) => {

    const [formData,setFormData] = useState({
        title:null,
        company:null,
        location:null,
        from:null,
        to:null,
        current:false,
        description:null
      });

    const onChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = formData;

    const onSubmit=(e)=>{
        e.preventDefault();
        props.addExperience(formData,props.history);
       
    }

    return (
        <div>
            <section className="container">
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text"
           placeholder="* Company"
            name="company"
            value={company} onChange={onChange} 
            required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" value={location} onChange={onChange} name="location" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" onChange={()=>setFormData({...formData,current:!current})} 
          value={current} /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" onChange={onChange} value={to}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            onChange ={onChange}
            value ={description}
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
        </div>
    )
}


export default connect(null,{addExperience})(withRouter(AddExperience));





