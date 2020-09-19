import React from 'react';
import {Link} from 'react-router-dom';

const DashboardAction = () => {

    return (
        <div class="dash-buttons">
        <Link to="/edit-profile" class="ui button light"
          ><i class="user icon blue "></i> Edit Profile</Link>
        <Link to="/add-experience" class="ui button light"
          ><i class="trophy  icon blue"></i> Add Experience</Link>
        <Link to="/add-education" class="ui button"
          ><i class="graduation cap icon blue"></i> Add Education</Link>
      </div>
    )
}

export default DashboardAction;