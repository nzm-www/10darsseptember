import React from "react";
import Header from "../components/Header";

function MainLoyaut({ children }) {
  return (
    <div className="flex">

      <div className="flex-grow">
        <Header />
        <main className="">{children}</main>
      </div>
    </div>
  );
}

export default MainLoyaut;
