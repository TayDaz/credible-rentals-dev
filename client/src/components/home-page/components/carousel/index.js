import { useState } from "react";
import Image1 from "./assets/images/image_7.jpg";
import Image2 from "./assets/images/image_8.jpg";
import Image3 from "./assets/images/image_9.jpg";
import Image4 from "./assets/images/image_10.jpg";
import Image5 from "./assets/images/image_11.jpg";
import Image6 from "./assets/images/image_12.jpg";

import "./styles.scss";

const Carousel = (props) => {
  const [translateCounter, setTranslateCounter] = useState({
    counter: 0,
    translateX: { transform: `translateX(0vw)` },
  });
  // const [counter, setCounter] = useState(1);
  // const [translateX, setTranslateX] = useState("0vw");
  const images = [
    Image5,
    Image6,
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image1,
    Image2,
  ];

  const next = () => {
    // setCounter(counter + 1);
    calculateTranslateX(-1);
  };

  const prev = () => {
    // setCounter(counter - 1);
    calculateTranslateX(1);
  };

  // console.log("height" + window.innerWidth);

  const calculateTranslateX = (identifier) => {
    let translate = 0;
    const width = window.innerWidth;
    const { counter, translateX } = translateCounter;

    if (width <= 600) {
      translate = 100;
    } else if (width > 600 && width <= 768) {
      translate = 50;
    } else if (width > 768 && width <= 992) {
      translate = 33.33;
    } else if (width > 992) {
      translate = 25;
    }

    if (identifier < 0) {
      setTranslateCounter({
        counter: translateCounter.counter - identifier,
        translateX: {
          transform: `translateX(${
            -(translateCounter.counter - identifier) * translate
          }vw)`,
        },
      });
    } else {
      setTranslateCounter({
        counter: translateCounter.counter - identifier,
        translateX: {
          transform: `translateX(${
            -(translateCounter.counter - identifier) * translate
          }vw)`,
        },
      });
    }

    // setTranslateX((translate * counter * identifier) + "vw");
    // return translateX;
  };

  return (
    <>
      <div className='p-d-flex carousel__container'>
        <div
          className='p-d-flex images_container'
          style={translateCounter.translateX}>
          <div className='image__container'>
            <img src={Image1} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image2} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image3} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image4} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image5} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image6} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image1} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image2} alt='' />
          </div>
          <div className='image__container'>
            <img src={Image3} alt='' />
          </div>
        </div>
        <button
          onClick={prev}
          className='nav-button previous-button'
          disabled={translateCounter.counter === 0}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='currentColor'
            className='bi bi-chevron-left'
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
            />
          </svg>
        </button>
        <button
          onClick={next}
          className='nav-button next-button'
          disabled={translateCounter.counter === 5}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='currentColor'
            className='bi bi-chevron-right'
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Carousel;
