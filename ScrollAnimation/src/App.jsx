import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/styleGlobals.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const containerBody2 = useRef(null);
  const containerBody3 = useRef(null);
  const containerPresentation = useRef(null);
  const containerPresentation2 = useRef(null);
  const especText1 = useRef(null);
  const especTextList = useRef(null);
  const carimg1 = useRef(null);

  const trigger1 = useRef(null);
  const trigger2 = useRef(null);
  const trigger3 = useRef(null);
  const trigger4 = useRef(null);

  const imageRef2 = useRef(null);
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  // Preload frames
  useEffect(() => {
    const frameCount = 82;
    const loadedImages = [];
    const loadedImages2 = [];
    const frameCount2 = 118;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, "0");
      img.src = `/img/hero1/ezgif-frame-${frameNumber}.png`;
      loadedImages.push(img);
    }
    for (let i = 83; i <= frameCount2; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, "0");
      img.src = `/img/hero2/ezgif-frame-${frameNumber}.png`;
      loadedImages2.push(img);
    }

    setImages(loadedImages);
    setImages2(loadedImages2);
  }, []);

  useEffect(() => {
    const element = document.querySelector("#imageRef2");

    const trigger = element.offsetTop;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log(scrollY, trigger);
      if (scrollY >= trigger) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const obj = { frame: 0 };
    const obj2 = { frame: 0 };

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

    gsap.to(obj2, {
      frame: images2.length - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerBody3.current,
        start: "top top",
        end: "bottom bottom",

        scrub: 1,
      },
      onUpdate: () => {
        const img = images2[obj2.frame];
        if (img && imageRef2.current) {
          imageRef2.current.src = img.src;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [images, images2]);

  useGSAP(() => {
    gsap.fromTo(
      containerBody2.current,
      { opacity: 0 },
      {
        opacity: 2,
        duration: 5,
        scrollTrigger: {
          trigger: containerBody2.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      containerPresentation.current,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 5,
        scrollTrigger: {
          trigger: trigger1.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      containerPresentation2.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: trigger2.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      especText1.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 10,
        scrollTrigger: {
          trigger: trigger3.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      especTextList.current,
      { opacity: 0, width: "0%" },
      {
        opacity: 1,
        width: "95%",

        duration: 10,
        scrollTrigger: {
          trigger: trigger4.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      carimg1.current,
      { opacity: 0, top: "5em" },
      {
        opacity: 1,
        top: "0em",
        duration: 0.5,
        scrollTrigger: {
          trigger: carimg1.current,
          start: "top 65%",

          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="containerBody1"
        style={{ height: "400vh", position: "relative" }}
      >
        <div className="containerPresentation" ref={containerPresentation}>
          <h1 className="text1Tittle">Domina el camino. Redefine el lujo.</h1>
        </div>
        <div className="containerPresentation2" ref={containerPresentation2}>
          <h1 className="textModelCar">Elan One</h1>
          <p className="textModelCar2">
            Con líneas sofisticadas, tecnología de vanguardia y un diseño
            moderno que impone presencia en cada detalle.{" "}
            <strong>El futuro tiene motor. Y es elegante.</strong>
          </p>
        </div>
        <div className="trigger1" ref={trigger1}></div>
        <div className="trigger2" ref={trigger2}></div>

        <img
          ref={imageRef}
          src="/img/hero1/ezgif-frame-001.png"
          style={{
            margin: 0,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            position: "fixed",
            zIndex: -1,
          }}
        />
      </div>

      <div className="containerBody2" ref={containerBody2}>
        <div className="trigger3" ref={trigger3}></div>
        <div className="trigger4" ref={trigger4}></div>

        <div className="containerAbout">
          <div className="containerImg">
            <div className="carimg1" ref={carimg1}></div>
          </div>
          <div className="containerText">
            <div className="containerListEspec1">
              <h1 className="especText1" ref={especText1}>
                Tecnología sin límites
              </h1>
              <ol className="especTextList" ref={especTextList}>
                <li>
                  <i className="fa-brands fa-hashnode"></i>
                  <strong>Motorización:</strong>{" "}
                  <h2>Motor eléctrico cuántico de alto rendimiento</h2>
                </li>
                <li>
                  <i className="fa-brands fa-hashnode"></i>
                  <strong>Autonomía:</strong>{" "}
                  <h2>Hasta 1.200 km con una sola carga</h2>
                </li>
                <li>
                  <i className="fa-brands fa-hashnode"></i>
                  <strong>Aceleración:</strong>{" "}
                  <h2> 0 a 100 km/h en 2.3 segundos</h2>
                </li>
                <li>
                  <i className="fa-brands fa-hashnode"></i>
                  <strong>Velocidad máxima:</strong> <h2>320 km/h </h2>
                </li>
                <li>
                  <i className="fa-brands fa-hashnode"></i>
                  <strong>Tracción:</strong>{" "}
                  <h2>Total inteligente con distribución dinámica</h2>
                </li>
                <li>
                  <i className="fa-brands fa-hashnode"></i>
                  <strong>Batería:</strong>{" "}
                  <h2>
                    Celdas de grafeno autorreparables con carga ultrarrápida
                  </h2>
                </li>
                <li>
                  <i className="fa-brands fa-hashnode"></i>
                  <strong>Suspensión:</strong>{" "}
                  <h2>Adaptativa con sistema de flotación magnética</h2>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div
        className="containerBody3"
        style={{ height: "130vh" }}
        ref={containerBody3}
        position="relative"
      >
        <div className="elementAboutShadow"></div>
        <img
          ref={imageRef2}
          id="imageRef2"
          src="/img/hero2/ezgif-frame-083.png"
          style={{
            position: isFixed ? "fixed" : "relative",

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
    </>
  );
}

export default App;
