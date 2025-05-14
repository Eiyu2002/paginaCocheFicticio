import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/styleGlobals.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);
  const text5 = useRef(null);

  const [images, setImages] = useState([]);

  // Preload frames
  useEffect(() => {
    const frameCount = 100;
    const loadedImages = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, "0");
      img.src = `/img/ezgif-frame-${frameNumber}.jpg`;
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const obj = { frame: 0 };

    gsap.to(obj, {
      frame: images.length - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      onUpdate: () => {
        const img = images[obj.frame];
        if (img && imageRef.current) {
          imageRef.current.src = img.src;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [images]);

  useGSAP(() => {
    gsap.fromTo(
      text3.current,
      {
        opacity: 0,
        scale: 3,
      },
      {
        opacity: 1,
        scale: 1,
        ease: "power1.inOut",
        duration: 1,
        scrollTrigger: {
          trigger: text3.current,
          start: "top 80%", // cuando el top del texto llegue al 80% de la pantalla
          toggleActions: "play none none none", // solo se anima una vez
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} style={{ height: "400vh", position: "relative" }}>
      <h1 className="text1">Scroll-triggered Video Animation</h1>
      <h1 className="text2">POR JOEL MAXIMILIANO ETCHEGARAY</h1>
      <h1 className="text3" ref={text3}>
        USANDO...
      </h1>
      <h1 className="text4" ref={text4}>
        GSAP
      </h1>
      <h1 className="text6"> Y </h1>
      <h1 className="text5" ref={text5}>
        REACT
      </h1>
      <img
        ref={imageRef}
        src="/img/ezgif-frame-001.jpg"
        style={{
          position: "fixed",
          margin: 0,
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
