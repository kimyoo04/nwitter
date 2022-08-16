import AppRouter from "components/Router";
import {useState, useEffect} from "react";
import {onAuthStateChanged, updateCurrentUser} from "firebase/auth";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user); // 로그인 했을 때 리랜더링, 유저 데이터 활용 역할
      } else {
        setUserObj(null); // 로그아웃 했을 때 리랜더링 역할
      }
      setInit(true);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}
export default App;
