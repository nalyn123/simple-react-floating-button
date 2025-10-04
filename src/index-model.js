import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { CommonUtils } from './utils/index'

export const useFloatingModel = ({ buttons, sections }) => {
  const [sizes, setSizes] = useState([])
  const [renderButtons, setButtons] = useState([])
  const ref = useRef(null)
  const mainRef = useRef(null)

  useLayoutEffect(() => {
    if (ref.current) {
      const button = ref.current.querySelector('button')
      if (button) {
        button.style.height = ref?.current?.offsetHeight + 'px'
      }
    }
  }, [ref])

  useEffect(() => {
    init()
  }, [sections])

  useEffect(() => {
    window.addEventListener('scroll', createButtons)
    window.addEventListener('load', createButtons)

    return () => {
      window.removeEventListener('scroll', createButtons)
      window.removeEventListener('load', createButtons)
    }
  }, [sizes])

  const init = () => {
    const newHeights = []
    sections?.forEach((value) => {
      const { ref: myRef, theme } = value
      const ref = myRef?.current ?? myRef
      if (!ref) return

      const top = ref?.offsetTop
      const bottom = top + ref?.offsetHeight

      const style = window.getComputedStyle(ref)
      newHeights.push({
        top,
        bottom,
        theme: theme ?? CommonUtils.getTheme(style.backgroundColor) ?? ''
      })
    })

    setSizes(newHeights)
  }

  const createButtons = (e) => {
    if (!mainRef?.current) return
    const { scrollTop } = document.documentElement
    const button = mainRef?.current
    const top = button.offsetTop

    const height = button.offsetHeight
    const currentTop = scrollTop + top
    const currentBottom = currentTop + height

    const allSizes = sizes.filter((size, index) =>
      CommonUtils.rangesOverlap(
        size.top,
        size.bottom,
        currentTop,
        currentBottom
      )
    )

    const newButtons = []
    allSizes.forEach((value, index) => {
      const t = value?.top - currentTop
      const newTop = t < 0 ? 0 : Math.abs(t)
      const height = allSizes[index + 1]
        ? allSizes[index + 1]?.top - currentTop + 'px'
        : 'auto'

      newButtons.push({
        button: buttons?.[value?.theme],
        theme: value?.theme,
        style: {
          wrap: {
            top: newTop + 'px',
            height: height
          },
          btn: {
            transform: `translateY(${newTop * -1}px)`,
            height: ref?.current?.offsetHeight + 'px'
          }
        }
      })
    })

    setButtons(newButtons)
  }

  return { mainRef, ref, renderButtons }
}
