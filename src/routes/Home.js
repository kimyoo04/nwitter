import {dbService} from "fbase";
import React, {useEffect, useState} from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  // 직접 read 하는 방법 (실시간 아님)
  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     console.log(document.id, " => ", document.data());
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
