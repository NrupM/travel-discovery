import React from 'react';
import { textVariants } from '../config/textVariants';

const FeaturedLocations = ({ featuredLocations }) => {
  return (
    <div className='featuredLocations'>
      <h4 className='header'>{textVariants['featuredHeader']}</h4>
      <div className='featuredLocationsContainer'>
        {featuredLocations &&
          featuredLocations.map(location => (
            <div className='featuredItem' key={location.title}>
              <img alt={`${location.title}`} src={`${location.img}`} />
              <div>
                {location.title}
                <div>{location.location}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedLocations;
