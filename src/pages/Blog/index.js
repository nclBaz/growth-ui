import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  blogPosts as Allposts,
  client as Client,
} from "../../recoilState/atoms";
import PostForm from "../../components/PostForm";
import BlogPost from "../../components/BlogPost";
import Navbar from "../../components/Navbar";
import { Spinner } from "react-bootstrap";
import { allBlogPosts } from "../../recoilState/api";

const Blog = () => {
  const [blogPosts, setPosts] = useRecoilState(Allposts);
  const client = useRecoilValue(Client);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    let posts = await allBlogPosts();
    setPosts(posts);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 justify-content-center d-flex flex-column offset-lg-3 mt-5">
            <PostForm client={client.client} />
            {blogPosts ? (
              blogPosts.map((e) => {
                return <BlogPost key={e._id} blog={e} />;
              })
            ) : (
              <Spinner
                animation="border"
                role="status"
                className="mx-auto mt-5"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
