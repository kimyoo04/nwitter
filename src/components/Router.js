import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import EditProfile from "../routes/EditProfile";

const AppRouter = (isLoggedIn) => {
  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      ) : (
        ""
      )}
    </Router>
  );
};

export default AppRouter;
