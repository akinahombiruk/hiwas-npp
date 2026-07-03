import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { Heading } from "../common/Heading";
import { contact } from "../data/dummydata";

export const Contact = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // State for loading and status
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // 🔑 REPLACE WITH YOUR EMAILJS KEYS
  const EMAILJS_SERVICE_ID = "service_yybvxco";
  const EMAILJS_TEMPLATE_ID = "template_zmnpuwb";
  const EMAILJS_PUBLIC_KEY = "X9lnN1noNnSIZCoth";

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setStatus({ 
          type: "success", 
          message: "✅ Message sent successfully! We'll get back to you soon." 
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ 
        type: "error", 
        message: "❌ Failed to send message. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='contact section-block' id='contact'>
        <div className='container'>
          <Heading title='Keep In Touch' color="#ffffff"/>
          
          {/* Status Message - Same UI style as your existing design */}
          {status.message && (
            <div className={`alert alert-${status.type}`} style={{ 
              padding: "15px 20px", 
              marginBottom: "25px", 
              borderRadius: "8px", 
              textAlign: "center",
              fontWeight: "500",
              backgroundColor: status.type === "success" ? "#d4edda" : "#f8d7da",
              color: status.type === "success" ? "#155724" : "#721c24",
              border: status.type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb"
            }}>
              {status.message}
            </div>
          )}

          <div className='content flexsb'>
            <div className='right'>
              <form onSubmit={handleSubmit}>
                <div className='flex'>
                  <input 
                    type='text' 
                    placeholder='Name' 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-aos='flip-left' 
                    className='input-field' 
                  />
                  <input 
                    type='email' 
                    placeholder='Email' 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-aos='flip-right' 
                    className='input-field' 
                  />
                </div>
                <input 
                  type='text' 
                  placeholder='Subject' 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  data-aos='flip-up' 
                  className='input-field' 
                />
                <textarea 
                  name='message'
                  cols='30' 
                  rows='10' 
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  data-aos='flip-down' 
                  className='input-field'
                ></textarea>
                <button 
                  type="submit"
                  disabled={isLoading}
                  data-aos='zoom-in-up' 
                  className='submit-btn'
                  style={isLoading ? { opacity: "0.6", cursor: "not-allowed" } : {}}
                >
                  {isLoading ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
            <div className='left'>
              {contact.map((item) => (
                <div className='box contact-card' data-aos='zoom-in' key={item.text1}>
                  <i>{item.icon}</i>
                  <p>{item.text1}</p>
                  <p>{item.text2}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};