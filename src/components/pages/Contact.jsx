import React from "react"
import { Heading } from "../common/Heading"
import { contact } from "../data/dummydata"

export const Contact = () => {
  return (
    <>
      <div className='contact section-block' id='contact'>
        <div className='container'>
          <Heading title='Keep In Touch' color="#ffffff"/>
          <div className='content flexsb'>
            <div className='right'>
              <form>
                <div className='flex'>
                  <input type='text' placeholder='Name' data-aos='flip-left' className='input-field' />
                  <input type='email' placeholder='Email' data-aos='flip-right' className='input-field' />
                </div>
                <input type='email' placeholder='Subject' data-aos='flip-up' className='input-field' />
                <textarea name='' id='' cols='30' rows='10' data-aos='flip-down' className='input-field'></textarea>
                <button data-aos='zoom-in-up' className='submit-btn'>Submit</button>
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
  )
}
