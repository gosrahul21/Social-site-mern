import React,{useState} from 'react'
import {connect} from 'react-redux';
import {Link,withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {addEducation} from '../../actions/profile';

const AddEducation = props => {

    const [formData,setFormData] = useState({
        school:null,
    degree:null,
    fieldofstudy:null,
    from:null,
    to:null,
    current:false,
    description:null

    });
    console.log(props.history)

    const onChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const {
        school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
    }=formData;
    const onSubmit=(e)=>{
        e.preventDefault();
        props.addEducation(formData,props.history)
    }
    return (
        <div>
             <section className="container">
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={school}
            onChange={onChange}
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={degree}
            onChange={onChange}
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study"
          value={fieldofstudy}
          onChange={onChange}
          name="fieldofstudy" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date"
          value={from}
          onChange={onChange}
           name="from" />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value={current} onChange={()=>setFormData({...formData,current:!current})}/> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"
          value={to}
          onChange={onChange} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
        </div>
    )
}

AddEducation.propTypes = {

}

export default connect(null,{addEducation})(withRouter(AddEducation));




