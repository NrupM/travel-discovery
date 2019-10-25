import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { textVariants } from '../config/textVariants';

const PopularLocations = ({ filteredPopularLocations }) => {
  return (
    <div>
      <h4 className='header'>{textVariants['popularHeader']}</h4>
      {filteredPopularLocations && (
        <Carousel>
          {filteredPopularLocations.map(location => (
            <div key={location.title}>
              <img alt={`${location.title}`} src={`${location.img}`} />
              <div className='popularCard legend'>
                {location.title}
                <div>{location.location}</div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PopularLocations;
