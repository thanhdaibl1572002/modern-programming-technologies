import { memo, useRef } from 'react'
import { getColorLevel, mainColor, whiteColor } from '../../variables'
import './text-area.css'

const TextArea= ({
  width = 'fit-content',
  height = 'fit-content',
  textAreaWidth = '100%',
  textAreaHeight = 45,
  textAreaBackground,
  textSize = 15,
  textColor,
  label,
  labelBackground = whiteColor,
  labelColor = mainColor,
  labelIcon,
  labelIconColor = mainColor,
  id,
  name,
  placeholder,
  defaultValue,
  errorMessage,
  errorMessageIcon,
  className,
  border,
  borderRadius,
  ...rest
}) => {

  const textAreaClassName = `_textarea__container ${className || ''}`.trim()

  const textAreaRef = useRef(null)

  return (
    <div 
      className={textAreaClassName} 
      style={{
        width: width,
        height: height,
      }}
    >
      {label && 
      <label 
        htmlFor={id}
        style={{
          background: labelBackground,
          color: labelColor,
        }}
        >
          {labelIcon && <span style={{ color: labelIconColor }}>{labelIcon}</span>}{label}
        </label>
      }
      <div className={'_textarea'} 
        style={{
          width: width,
          height: height,
        }}
      >
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref = {textAreaRef}
          onFocus={() => {
            if (textAreaRef.current) 
              textAreaRef.current.style.border = `1px solid ${mainColor}`
          }}
          onBlur={() => {
            if (textAreaRef.current) 
              textAreaRef.current.style.border = `1px solid ${getColorLevel(mainColor, 20)}`
          }}
          style={{
            background: textAreaBackground,
            width: textAreaWidth,
            height: textAreaHeight,
            borderRadius: borderRadius,
            border: border,
            fontSize: textSize,
            color: textColor,
          }}
          {...rest}
        />
      </div>
      <span className='_error'>{errorMessageIcon}{errorMessage}</span>
    </div>
  )
}

export default memo(TextArea)