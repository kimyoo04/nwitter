import React from "react";
import {useNavigate} from "react-router-dom";
import {authService} from "fbase";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/"); // useNavigate 혹은 Navigate 컴포넌트 사용할 것 react-router-dom v6
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
