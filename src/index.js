import React from 'react'
import { useFloatingModel } from './index-model'

const FloatingButton = ({
  buttons,
  sections,
  className,
  buttonClassName,
  onClick
}) => {
  const { mainRef, ref, renderButtons } = useFloatingModel({
    buttons,
    sections
  })

  const Button = ({ button }) => (
    <div
      className={`floating-button__btn-${button?.theme}`}
      style={button?.style?.wrap}
    >
      <button
        className={`btn btn-${button?.theme} ${buttonClassName}`}
        style={button?.style?.btn}
      >
        {button?.button}
      </button>
    </div>
  )

  return (
    <div ref={mainRef} className={`floating-button ${className || ''}`}>
      <div ref={ref} className={`floating-button__btn-default`}>
        <button className={`btn btn-light`} onClick={onClick}>
          {buttons?.light}
        </button>
      </div>

      {renderButtons.map((button, index) => (
        <Button button={button} key={index} />
      ))}
    </div>
  )
}

export default FloatingButton
