import React from "react";
import {Link} from "react-router-dom";

const Navigation = ({userObj}) => {
  // 이메일로 가입했을 경우 displayName이 null 이기 때문에 undefined를 할당한다.
  if (userObj.displayName === null) {
    userObj.displayName = undefined;
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName ?? "User"}'s Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
