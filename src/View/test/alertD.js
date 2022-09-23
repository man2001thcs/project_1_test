import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import link from '../../config/const';

const images = [
  link.image_link + "3.jpg",
  link.image_link + "4.jpg",
  link.image_link + "5.jpg",
];

function Slideshow() {
    return (
      <div className="slide-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
          }
        </Zoom>
      </div>
    )  
}

export default Slideshow;
