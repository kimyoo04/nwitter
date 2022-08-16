import React, {useState} from "react";
import {dbService, storageService} from "fbase";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {deleteObject, ref} from "firebase/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`); // 삭제, 수정할 객체 할당
  const desertRef = ref(storageService, nweetObj.attachmentUrl); // 삭제할 이미지

  // nweet 삭제 기능
  const onDeleteClick = async () => {
    try {
      // 삭제를 재확인 받았을 때 삭제 기능 시작
      const ok = window.confirm("Are you sure you want to delete this nweet?");
      if (ok) {
        await deleteDoc(NweetTextRef);

        // attachmentUrl 이 있을 때만 deleteObject 하도록 한다.
        if (nweetObj.attachmentUrl !== "") {
          await deleteObject(desertRef);
        }
      }
    } catch (error) {
      window.alert("트윗을 삭제하는 데 실패했습니다!");
    }
  };

  // 수정 / 취소 화면 토글 기능
  const toggleEditing = () => setEditing((prev) => !prev);

  // 수정 (update) 적용 기능
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  // input 값 받기
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewNweet(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt="uploadedImage" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
