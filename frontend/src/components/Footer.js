import React from 'react';
// import './Footer.css';
import { FaLinkedin, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Contact Info */}
        <div className="footer-contact">
          <div>
            <h4>WhatsApp</h4>
            <p>+91 9198829569</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>kumardharmraj703@gmail.com</p>
          </div>
          <div>
            <h4>Location</h4>
            <p>gurugram</p>
          </div>
          <div>
            <h4>Website</h4>
            <p>www.Domain.com</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <a href="#faq">FAQ</a>
          <a href="#services">Services</a>
          <a href="#about">About Me</a>
          <a href="#contact">Contact</a>
          <a href="#testimonials">Testimonials</a>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="https://in.linkedin.com/"><FaLinkedin /></a>
          <a href="https://www.facebook.com/"><FaFacebookF /></a>
          <a href="https://www.instagram.com/"><FaInstagram /></a>
          <a href="https://x.com/"><FaTwitter /></a>
          <a href="https://www.youtube.com/"><FaYoutube /></a>
          <a href="https://web.whatsapp.com/"><FaWhatsapp /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>@ SURAJ | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;