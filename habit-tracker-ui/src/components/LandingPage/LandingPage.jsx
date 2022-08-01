import "./LandingPage.css";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};

ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));



export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero">
        <h1>Our App</h1>
        <h3>Importance of Habits Research Quotes</h3>
      </div>  
      <div className="user-stories">

      </div>
    </div>
  )
}
