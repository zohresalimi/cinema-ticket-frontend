import React from "react";
import TopBar from "../../components/TopBar";

function OrderPage({ children }) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}

export default OrderPage;
