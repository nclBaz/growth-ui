import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { useRecoilState } from "recoil";
import { client as ClientAtom } from "../../recoilState/atoms";
import { AiOutlineSetting } from "react-icons/ai";
import ProfileModal from "../../components/ProfileModal";
import ProfilePicModal from "../../components/ProfilePicModal";
import { updateProfileImage } from "../../recoilState/api";

const Profile = () => {
  const [client, setClient] = useRecoilState(ClientAtom);
  const profileImage = useRef(null);
  const [showModal, setModal] = useState(false),
    [imageFile, setImage] = useState(null),
    [imageUrl, setUrl] = useState(client.login ? client.client.image : ""),
    [imgModal, setImgModal] = useState(null);

  const handleImage = (e) => {
    if (!e.target.files.length) return;
    setUrl(URL.createObjectURL(e.target.files[0]));
    const fd = new FormData();
    fd.append("profile", e.target.files[0]);
    setImage(fd);
    setImgModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="profile container">
        <div className="row mt-5">
          <div className="col d-flex flex-column align-items-center">
            <div
              className="client_img"
              style={{
                width: "200px",
                height: "200px",
                backgroundImage: `url("${imageUrl}")`,
              }}
              onClick={() => profileImage.current.click()}
            />
            <div className="profile_info">
              {client.login ? (
                <>
                  <h3>{client.client.name + " " + client.client.surname}</h3>
                  <h4>{client.client.email}</h4>{" "}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="devices">
              <h4>{client.login ? client.client.device : "Not Logged In"}</h4>
            </div>
            <AiOutlineSetting
              color="rgb(10,31,32)"
              size="3em"
              onClick={() => setModal(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      {client.login ? (
        <ProfileModal
          show={showModal}
          client={client.client}
          handleShow={() => setModal(!showModal)}
        />
      ) : (
        ""
      )}
      <ProfilePicModal
        show={imgModal}
        url={imageUrl}
        handleModal={() => setImgModal(!imgModal)}
        update={async () => {
          const url = await updateProfileImage(client.client._id, imageFile);
          setClient({ ...client, image: url });
        }}
      />
      <input
        type="file"
        ref={profileImage}
        className="d-none"
        onChange={(e) => handleImage(e)}
      />
    </>
  );
};
export default Profile;
