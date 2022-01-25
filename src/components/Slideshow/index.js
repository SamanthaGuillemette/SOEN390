import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "bootstrap/dist/css/bootstrap.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./slideshow.css";

class Slideshow extends Component {
  onChange = (event) => {
    console.log(event);
  };
  render() {
    return (
      <div className="contentBox">
        <Carousel autoPlay="true" onChange={this.onChange} showThumbs = {false} showIndicators={false}>
          <div>
            <img
              className="card-img-top"
              src="https://avatars.githubusercontent.com/u/59709752?v=4"
              alt="Ali"
            />
            <div className="card-title">
            <p className="name">Mohammad Ali Zahir</p>
          </div>
          </div>
          <div>
            <img
              className="card-img-top"
              src="https://avatars.githubusercontent.com/u/68137308?v=4"
              alt="Saleha"
            />
            <div className="card-title">
            <p className="name">Saleha Tariq</p>
          </div>
          </div>
          <div>
            <img className="card-img-top"
              src="https://avatars.githubusercontent.com/u/72108980?v=4"
              alt="Hoda"
            />
            <div className="card-title">
            <p className="name">Hoda Nourbakhsh</p>
          </div>
          </div>
          <div>
            <img className="card-img-top"
              src="https://avatars.githubusercontent.com/u/71287263?v=4"
              alt="Marwa"
            />
            <div className="card-title">
            <p className="name">Marwa Khalid</p>
          </div>
          </div>
          <div>
            <img className="card-img-top"
              src="https://avatars.githubusercontent.com/u/45958117?v=4"
              alt="Sam"
            />
            <div className="card-title">
            <p className="name">Samantha Guillemette</p>
          </div>
          </div>
          <div>
            <img className="card-img-top"
              src="https://avatars.githubusercontent.com/u/70773705?v=4"
              alt="Laila"
            />
            <div className="card-title">
            <p className="name">Laila Alhalabi</p>
          </div>
          </div>
          <div>
          <img className="card-img-top"
            src="https://avatars.githubusercontent.com/u/45047536?v=4"
            alt="Quang"
          />
          <div className="card-title">
          <p className="name">Quang Tran</p>
        </div>
        </div>
        <div>
        <img className="card-img-top"
          src="https://avatars.githubusercontent.com/u/58268852?v=4"
          alt="Tushar"
        />
        <div className="card-title">
        <p className="name">Tushar Raval</p>
      </div>
      </div>
      <div>
      <img className="card-img-top"
        src="https://avatars.githubusercontent.com/u/48603412?v=4"
        alt="Steven"
      />
      <div className="card-title">
      <p className="name">Steven Markandu</p>
    </div>
    </div>
        </Carousel>
      </div>
    );
  }
}
export default Slideshow;