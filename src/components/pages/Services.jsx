import React from "react"
import { Heading } from "../common/Heading"
import { services } from "../data/dummydata"

export const Services = () => {
  return (
    <>
      <section className='services section-block' id='services'>
        <div className='container'>
          <Heading title='Services' />
          <div className='content grid2'>
            {services.map((item) => (
              <div className='box service-card' data-aos='flip-left' key={item.title}>
                <i>{item.icon}</i>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
