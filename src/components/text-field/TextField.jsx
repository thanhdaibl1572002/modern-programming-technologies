import { memo, useState, useRef } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { getColorLevel, mainColor, whiteColor } from '../../variables'
import './text-field.css'

const TextField= ({
  width = 'fit-content',
  height = 'fit-content',
  inputWidth = '100%',
  inputHeight = 45,
  inputBackground,
  textSize = 15,
  textColor,
  label,
  labelBackground = whiteColor,
  labelColor = mainColor,
  labelIcon,
  labelIconColor = mainColor,
  type = 'text',
  id,
  name,
  placeholder,
  defaultValue,
  errorMessage,
  errorMessageIcon,
  toggleShowPassword = false,
  togglePasswordIconSize = 20,
  className,
  border,
  borderRadius,
  ...rest
}) => {

  const textFieldClassName = `_textfield__container ${className || ''}`.trim()

  const [isShowPassword, setIsShowPassword] = useState(false)

  const inputRef = useRef(null)

  return (
    <div 
      className={textFieldClassName} 
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
      <div className={'_input'}>
        <input
          type={type === 'password' && isShowPassword ? 'text' : type}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref = {inputRef}
          onFocus={() => {
            if (inputRef.current) 
              inputRef.current.style.border = `1px solid ${mainColor}`
          }}
          onBlur={() => {
            if (inputRef.current) 
              inputRef.current.style.border = `1px solid ${getColorLevel(mainColor, 20)}`
          }}
          style={{
            background: inputBackground,
            width: inputWidth,
            height: inputHeight,
            borderRadius: borderRadius,
            border: border,
            fontSize: textSize,
            color: textColor,
          }}
          {...rest}
        />
        {toggleShowPassword && type === 'password' && (
          <div 
            className={'_show__password'}
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <IoEyeOutline style={{ fontSize: togglePasswordIconSize }}/> : <IoEyeOffOutline style={{ fontSize: togglePasswordIconSize }}/>}
          </div>
        )}
      </div>
      <span className='_error'>{errorMessageIcon}{errorMessage}</span>
    </div>
  )
}

export default memo(TextField)