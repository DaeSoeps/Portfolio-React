import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import post, { LOAD_POST_REQUEST } from '../reducers/post';
import Helmet from 'react-helmet';
const Post = ({ id }) =>{
    const { singlePost } = useSelector(state => state.post);
    return (
        <>
            <Helmet
                title={`${singlePost.User.nickname}님의 글`}
                description={singlePost.content}
                meta={[{
                    name:'description', content: singlePost.content,
                },{
                    property:'og:title', content: `${singlePost.User.nickname}님의 게시글`,
                },{
                    property:'og:description', content: `${singlePost.User.nickname}님의 게시글`,
                },{
                    property:'og:image', content: singlePost.Images[0] && `http://localhost:3065/${post.Images[0].src}`,
                },{
                    property:'og:url', content: `http://localhost:3060/post/${id}`,
                }
                ]}
            >
                <div>{ singlePost.content}</div>
                <div>{ singlePost.User.nickname}</div>
                <div>
                    { singlePost.Images[0] && <img src={`http://localhost:3065/${singlePost.Images[0].src}`} />}
                </div>
            </Helmet>
        </>
    )
}
Post.getInitialProps = async (context)=>{
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id,
    });
    return { id: parseInt(context.query.id, 10)};
}
Post.propTypes = {
    id: PropTypes.number.isRequired,
};
export default Post;