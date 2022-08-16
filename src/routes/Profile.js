import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {dbService, authService} from "fbase";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {updateProfile} from "firebase/auth";

//1. 로그인한 유저 정보 prop으로 받기
const Profile = ({refreshUser, userObj}) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName || ""
  );
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/"); // useNavigate 혹은 Navigate 컴포넌트 사용할 것 react-router-dom v6
  };

  //2. 내 nweets 얻는 function 생성
  const getMyNweets = async () => {
    //3. 트윗 불러오기
    //3-1. dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );

    //3-2. getDocs()메서드로 쿼리 결과 값 가져오기
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  //4. 내 nweets 얻는 function 호출
  useEffect(() => {
    getMyNweets();
  }, []);

  // 새로운 이름을 newDisplayName에 할당
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  };

  // 기존 이름과 바뀐 것이 있을 때만 update를 적용
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });

      // App.js에 정의 되어있는 함수로 rerendering이 되도록 firebase에서만 update된 user를 리엑트 상의 UserObj에 할당한다.
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
