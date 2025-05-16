import React from "react";
import { PropagateLoader} from "react-spinners";

function Loader() {
  console.log("🌀 Loader rendered");

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "200px" 
    }}>
      <PropagateLoader
  color="#5d6d5d"
  loading={true}
  size={40}
  speedMultiplier={1}
/>

    </div>
  );
}

export default Loader;
