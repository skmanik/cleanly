import React, { Component } from 'react';

const SlideThree= (props) => {

  let background = {
    backgroundImage: 'url(images/resto3.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return <div style={background} className="slide"></div>
}

export default SlideThree;