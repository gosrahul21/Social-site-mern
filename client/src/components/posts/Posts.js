import React,{useState,useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts} from '../../actions/post';
import PostItem from "./PostItem";
const Posts = props => {
    const {
        post:{
            posts,
            loading
        },
        getPosts
    } = props;

    useEffect(()=>{
        getPosts();
    },[getPosts]);


    return loading?<Spinner/>:(<Fragment>
        <h1 className="large text-primary">
            Posts
        </h1>
        <p className="posts">
            {posts.map(post=>{
                return <PostItem key={post._id} post ={post}/>
            })}
        </p>
    </Fragment>)
}

const mapStateToProps = (state) => {
    return {
        post:state.post
    }
}

export default connect(mapStateToProps,{getPosts})(Posts)
