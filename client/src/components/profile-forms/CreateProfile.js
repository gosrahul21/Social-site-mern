import React,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';
import {Link,withRouter} from 'react-router-dom'



const CreateProfile = props => {
    
    const {createProfile,history}=props;
    
    const [formData,setFormData] =useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    });

    const [dislaySocialInput,toggleSocialInput] = useState(false);

    const {company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
} = formData;

    const onChange =(e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        console.log(formData)
        createProfile(formData,history);
    }

    return (
        <div className="ui form">
              <h1 class="large text-primary">
        Create Your Profile
      </h1>
      <p class="lead">
        <i class="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small class="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div class="form-group">
          <input type="text" placeholder="Company" name="company"  value={company} onChange={onChange}/>
          <small class="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div class="form-group">
          <input type="text" placeholder="Website" name="website"  value={website} onChange={onChange}/>
          <small class="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location"  value={location} onChange={onChange} />
          <small class="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Skills" name="skills"  value={skills} onChange={onChange}/>
          <small class="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"  value={githubusername} onChange={onChange}
          />
          <small class="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div class="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"  value={bio} onChange={onChange}></textarea>
          <small class="form-text">Tell us a little about yourself</small>
        </div>

        <div class="my-2">
          <button type="button" onClick={()=>toggleSocialInput(!dislaySocialInput)} class="ui inverted orange button">
          
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {dislaySocialInput&&(<Fragment><div class="form-group social-input">
        <i class="twitter large icon blue"></i>
          <input type="text" placeholder="Twitter URL" name="twitter"  value={twitter} onChange={onChange} />
        </div>

        <div class="form-group social-input">
          <i class="facebook large icon blue"></i>
          <input type="text" placeholder="Facebook URL" name="facebook"  value={facebook} onChange={onChange}/>
        </div>

        <div class="form-group social-input">
          <i class="youtube large icon red"></i>
          <input type="text" placeholder="YouTube URL" name="youtube"  value={youtube} onChange={onChange}/>
        </div>

        <div class="form-group social-input">
          <i class="linkedin large icon blue"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin"  value={linkedin} onChange={onChange}/>
        </div>

        <div class="form-group social-input">
          <i class="instagram large icon red"></i>
          <input type="text" placeholder="Instagram URL" name="instagram"  value={instagram} onChange={onChange}/>
        </div></Fragment>)}
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="/dashboard">Go Back</a>
      </form>
        </div>
    )
}


export default connect(null,{createProfile})(withRouter(CreateProfile));
