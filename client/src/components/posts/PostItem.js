import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {addLike} from '../../actions/post'
const PostItem = props => {

    const {auth,post:{_id,text,name,avatar,user,likes,comments,date}} = props;

    let liked=false;
   likes.forEach((like)=> {
       if(like.user===auth.user._id)
       {
          liked= true;
          return;
       }
   })
    console.log(liked)

    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
                {!avatar&&<img className="round-img" src="https://www.gravatar.com/avatar/HASH?d=mp"/>}
              <img
                class="round-img"
                src={`http://localhost:4000/api/profile/image/${user}`}
                alt=""
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
             {text}
            </p>
             <p class="post-date">
   <Moment format={'DD/MM/YYYY'}>{date}</Moment>
            </p>
            <button type="button" class="btn btn-light" onClick={(e)=>props.addLike(_id)}>
              <i class={`thumbs up icon ${liked?"blue":""} `}></i>
              <span>{likes.length}</span>
            </button>
            {/* <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button> */}
            <Link to={"/post/"+_id} class="btn btn-primary">
              Discussion <span class='comment-count'>{comments.length}</span>
            </Link>
           {!auth.loading&&user===auth.user._id&& <button      
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>}
          </div>
          </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        auth:state.auth
    }
}


export default connect(mapStateToProps,{addLike})(PostItem);
