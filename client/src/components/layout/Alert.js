import React from 'react';
import {connect} from 'react-redux';
import {setAlert,removeAlert} from '../../actions/alert'
const Alert =({alerts}) =>{
    
    let list = null
    if(alerts!==null && alerts.length>0)
    {
         list = alerts.map((alert) => 
            {
               
               return (<div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>)
            }
        )

        
    }





    return list;

}

const mapStateToProps =(state) => {
    return {
        alerts:state.alert
    }
}
export default connect(mapStateToProps)(Alert);