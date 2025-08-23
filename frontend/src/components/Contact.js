import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Sending...', type: '' });
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData);
      setStatus({ message: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
    }
  };

  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group"><label htmlFor="name">Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /></div>
        <div className="form-group"><label htmlFor="email">Email</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /></div>
        <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea></div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
      {status.message && <p className={`status-message ${status.type}`}>{status.message}</p>}
    </section>
  );
};

export default Contact;