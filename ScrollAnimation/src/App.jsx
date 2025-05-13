import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <img
        ref={imageRef}
        src=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
    </div>
  );
}

export default App;
