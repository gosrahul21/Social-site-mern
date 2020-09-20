import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profile'


const Education = props => {
    console.log(props.educations) 
    const {education} = props;

    const educations = education.map((edu)=>(
        <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
            <Moment format="YYYY/MM/DD">{edu.years}</Moment> -{' '}
            {edu.to===null?(
                'Now'
            ):(<Moment format='YYYY/MM/DD'>{edu.years}</Moment>)}
        </td>
        <td>
            <button onClick={()=>props.deleteEducation(edu._id)} className="ui button red">Delete</button>
        </td>
        </tr>
    ));

    return (
        <div>
            <h2 className="my-2">Education credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="hide-sm">School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th/>
                    
                    </tr>
                </thead>

                <tbody>{educations}</tbody>
            </table>
        </div>
    )
}




export default connect(null,{deleteEducation})(Education);
