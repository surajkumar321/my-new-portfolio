import React from "react";
import { Typewriter } from "react-simple-typewriter";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-content">
        {/* Left Side Content */}
        <div className="home-text">
          <h1>
            Hi, It's <span className="highlight">Suraj</span>
          </h1>
          <h2>
            I'm a{" "}
            <span className="typing">
              <Typewriter
                words={["UI/UX Designer", "Web Developer", "Coder"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h2>
          <p>
            Passionate Web Developer skilled in creating responsive, user-friendly
            websites. Proficient in front-end and back-end technologies, with a
            strong focus on UI/UX design and optimized web performance.
          </p>

          {/* Social Links */}
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/suraj-kumar-a30bb6257/"><FaLinkedin /></a>
            <a href="#"><FaFacebook /></a>
            <a href="https://www.instagram.com/surajkumar14886/"><FaInstagram /></a>
            <a href="https://x.com/Suraj18771324"><FaTwitter /></a>
            <a href="https://wa.me/919198829569"><FaWhatsapp /></a>
          </div>

          {/* Buttons */}
          <div className="home-buttons">
            <a href="#contact" className="btn hire">Hire</a>
            <a href="#contact" className="btn contact">Contact</a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="home-image">
          <img src="/images/suraj.jpg" alt="Dharmraj" />
        </div>
      </div>
    </section>
  );
};

export default Home;
