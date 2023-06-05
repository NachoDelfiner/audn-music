import React from "react";
import '../style/notfound.css'
import not from '../icons/notfound.png'
import { useState, useEffect } from "react";

const Notfound = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="notfound" >
      <img src={not} />
      <h4>404 - Not found</h4>
    </div>
  );
};

export default Notfound;
