import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profile'


const Experience = props => {
    console.log(props.deleteExperience)
    console.log(props.experiences) 
    const {experience} = props;
    const experiences = experience.map((exp)=>(
        <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
            {exp.to===null?(
                'Now'
            ):(<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
        </td>
        <td>
            {console.log(exp._id)}
            <button onClick={()=>props.deleteExperience(exp._id)} className="ui button red">Delete</button>
        </td>
        </tr>
    ));

    return (
        <div>
            <h2 className="my-2">Experience credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th/>
                    
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </div>
    )
}




export default connect(null,{deleteExperience})(Experience);
