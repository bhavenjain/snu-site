import React from "react";

const Loader = ({ register }) => {
  return (
    <div className="loader_page">
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
      {register ? (
        <div style={{marginTop: "20px"}}>
          <p>Registered Successfully.</p>
          <p>Redirecting you to login.</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Loader;
