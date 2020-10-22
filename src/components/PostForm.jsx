import React, { useState, useRef } from "react";
import {
  AiOutlineDelete,
  AiOutlinePicture,
  AiOutlineSend,
} from "react-icons/ai";
import { createPost } from "../recoilState/api";

const PostForm = ({ client }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setUrl] = useState(null);
  const [postInfo, setInfo] = useState({});

  const titleForm = useRef(null),
    textForm = useRef(null),
    imageForm = useRef(null);

  const handleClear = () => {
    textForm.current.value = "";
    titleForm.current.value = "";
    setUrl(null);
  };
  const handlePost = async () => {
    const newpost = await createPost(postInfo, image);
    handleClear();
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else console.log("err");
  };
  return (
    <div className="blog_form">
      <div className="blog_form_header">
        <div
          className="client_img"
          style={{
            backgroundImage: `url('${
              client
                ? client.image
                : "https://cdn.shopify.com/s/files/1/3098/9156/products/20200103223455_1200x1200.png?v=1578090899"
            }')`,
          }}
        />
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setInfo({ ...postInfo, title: e.target.value })}
          ref={titleForm}
        />
      </div>
      <div className="blog_form_body">
        <textarea
          placeholder="Whats on your mind?"
          ref={textForm}
          onChange={(e) => setInfo({ ...postInfo, text: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => handleImage(e)}
          ref={imageForm}
          className="d-none"
        />
        {imageUrl ? (
          <img src={imageUrl} alt="" className="img-fluid img-thumbnail" />
        ) : null}
      </div>
      <div className="blog_form_footer">
        <AiOutlinePicture
          onClick={() => imageForm.current.click()}
          size="1.3em"
          color="#42816E"
        />
        <AiOutlineDelete
          onClick={() => handleClear()}
          size="1.3em"
          color="#00A86B"
        />
        <AiOutlineSend
          size="1.5em"
          color="rgb(10,31,32)"
          className="ml-auto"
          onClick={() => handlePost()}
        />
      </div>
    </div>
  );
};
export default PostForm;
