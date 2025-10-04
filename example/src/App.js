import React, { useRef, useEffect, useState, useMemo } from 'react'

import FloatingButton from 'simple-react-floating-button'
import 'simple-react-floating-button/dist/index.css'
import './index.css'
import ArrowYellow from './arrow-yellow.png'
import ArrowOrange from './arrow-orange.png'

const App = () => {
  const buttons = {
    light: <Button />,
    dark: <Button />
  }
  const buttons2 = {
    light: <img src={ArrowOrange} />,
    dark: <img src={ArrowYellow} />
  }
  const buttons3 = {
    light: <div className='basketball'></div>,
    dark: <div className='soccer'></div>
  }

  const [refs, setRefs] = useState([])
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const ref5 = useRef(null)

  useEffect(() => {
    setRefs([
      {
        ref: document.querySelector('.section-1')
      },
      {
        ref: ref2
      },
      {
        ref: ref3.current
      },
      {
        ref: ref4.current,
        theme: 'dark'
      },
      {
        ref: ref5.current,
        theme: 'light'
      }
    ])
  }, [ref1, ref2, ref3, ref4, ref5])

  return (
    <>
      <div ref={ref1} className='section section-1'>
        <h1>Floating Button Animation</h1>
        <p>(scroll to preview)</p>
      </div>
      <div
        ref={ref2}
        className='section section--dark'
        style={{ height: '10px' }}
      ></div>
      <div ref={ref3} className='section' style={{ height: '10px' }}></div>
      <div
        ref={ref4}
        className='section section--dark'
        style={{ height: '200px' }}
      ></div>
      <div ref={ref5} className='section'></div>

      <FloatingButton
        buttons={buttons}
        sections={refs}
        onClick={() => alert('button 3')}
      />

      <FloatingButton
        buttons={buttons2}
        sections={refs}
        className='button2'
        onClick={() => alert('button 2')}
      />

      <FloatingButton
        buttons={buttons3}
        sections={refs}
        className='button1'
        onClick={() => alert('button 1')}
      />
    </>
  )
}

const Button = () => <div>Button</div>

export default App
