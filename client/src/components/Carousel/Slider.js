import React, { Component } from 'react';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
import SlideThree from './SlideThree';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideCount: 1
    }

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  render() {

    return (
      <div className="slider">

        {/* Slides go here */}
        { this.state.slideCount === 1 ? <SlideOne /> : null }
        { this.state.slideCount === 2 ? <SlideTwo /> : null }
        { this.state.slideCount === 3 ? <SlideThree /> : null }

        {/* Arrow Functionality */}
        <RightArrow nextSlide={this.nextSlide} />
        <LeftArrow previousSlide={this.previousSlide} />

      </div>
    );
  }
 
	// I have ocd sometimes and put my functions below the JSX. You can put them above if you'd like.
  nextSlide() {
      this.setState({ slideCount: this.state.slideCount + 1 })
  }

  previousSlide() {
      this.setState({ slideCount: this.state.slideCount - 1 })
  }
}