import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/campus.jpg'
              text='The CIT-University Campus'
              label='Campus'
              path='/services'
            />
            <CardItem
              src='images/buildings.jpg'
              text='CIT-U Building Locator'
              label='Lacator'
              path='/products'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
                mapEmbed="https://www.google.com/maps/embed?pb=!4v1744299229214!6m8!1m7!1sk4AuTi_BYzixty7FhjXnPQ!2m2!1d10.29417856131463!2d123.8814520209186!3f332.245335617139!4f-7.345249444599034!5f0.7820865974627469" // Add mapEmbed here
                text="Map of the CIT Main Entrance"
                label="Map"
                path="/map"
            />
            <CardItem
                mapEmbed="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1962.7956552017768!2d123.881134!3d10.294476!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99c015a4bf233%3A0x95d783198f4634f8!2sCebu%20Institute%20of%20Technology%20-%20University!5e0!3m2!1sen!2sus!4v1744302646093!5m2!1sen!2sus" // Second map
                text="Map of CIT University"
                label="Map 2"
                path="/map2"
            />

            <CardItem
                mapEmbed="https://www.google.com/maps/embed?pb=!4v1744302913976!6m8!1m7!1sXvMRFtSev1c2KOfd-G8Ldw!2m2!1d10.29760222160201!2d123.8800596503467!3f170.37381178992445!4f-9.27699990069182!5f0.5970117501821992" // Third map
                text="Map of the CIT Back Gate"
                label="Back Gate Map"
                path="/back-gate-map"
            />

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
