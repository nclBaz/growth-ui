import React, { useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { deletePost } from "../../recoilState/api";
import "./styles.scss";

const BlogPost = ({ blog }) => {
  const blogpost = useRef();

  const removePost = async () => {
    blogpost.current.remove();
    await deletePost(blog._id);
  };

  return (
    <div className="blog_post" id={blog._id} ref={blogpost}>
      <div className="blog_post_header">
        <div
          className="client_img"
          style={{
            backgroundImage: `url("${blog.author.image}")`,
          }}
        />
        <div>
          <span>{blog.author.name}</span> <span>{blog.author.surname}</span>
        </div>
        <AiOutlineDelete
          size="1.4em"
          onClick={() => removePost()}
          color="#00A86B"
        />
      </div>
      <div className="blog_post_body">
        <div className="blog_post_body_head">
          <h6>{blog.title}</h6>
          <span>23/08/2020</span>
        </div>
        <div className="blog_post_body_body">
          <p className="">{blog.text}</p>
          {blog.image ? (
            <img
              src={blog.image}
              alt=""
              className="img-fluid img-thumbnail mx-auto"
            />
          ) : null}
        </div>
      </div>
      <div className="blog_post_footer"></div>
    </div>
  );
};
export default BlogPost;
