import React from "react"

export const Heading = ({ title }) => {
  return (
    <>
      <div className='heading-wrap' data-aos='zoom-in-down'>
        <h2 className='heading'>{title}</h2>
        <span className='heading-line' />
      </div>
    </>
  )
}
