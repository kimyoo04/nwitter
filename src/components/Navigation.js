import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({userObj}) => {
  // 이메일로 가입했을 경우 displayName이 null 이기 때문에 undefined를 할당한다.
  if (userObj.displayName === null) {
    userObj.displayName = undefined;
  }
  return (
    <nav>
      <ul style={{display: "flex", justifyContent: "center", marginTop: 50}}>
        <li>
          <Link to="/" style={{marginRight: 10}}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{marginTop: 10}}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
