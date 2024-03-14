import { memo, useState, useEffect } from 'react'
import { IoCheckmark } from 'react-icons/io5'
import { getColorLevel, mainColor, mainGradientColor, whiteColor } from '../../variables'
import './radio.css'

const Radio = ({
    width = 'fit-content',
    height = 'fit-content',
    checkSize = 13,
    checkBoxSize = 16,
    textSize = 16,
    label = 'Radio',
    id,
    name,
    value,
    checked = false,
    className,
    onChange,
}) => {

    const [bubble, setBubble] = useState(false)

    useEffect(() => {
        const bubbleTimeout = setTimeout(() => setBubble(false), 400)
        return () => clearTimeout(bubbleTimeout)
    })

    const handleChange = (event) => {
      const newValue = event.target.value
      setBubble(true)
      onChange && onChange(newValue)
    }

    const radioClassName = `_radio__container ${className || ''}`.trim()

    return (
        <div 
            className={radioClassName}
            style={{
                width: width,
                height: height 
            }}
        >
            <input
                type='radio'
                id={id}
                name={name}
                checked={checked}
                value={value}
                onChange={handleChange}
            />
            <label 
                htmlFor={id} 
                style={{ 
                    fontSize: textSize,
                }}
            >
                <div
                    className={'_check'}
                    style={{ 
                        width: checkBoxSize,
                        height: checkBoxSize,
                        fontSize: checkSize,
                        background: checked ? mainGradientColor : whiteColor,
                        border: `1px solid ${checked ? getColorLevel(mainColor, 5) : mainColor}`,
                    }}
                >
                    {checked && <IoCheckmark />}
                    {bubble && <span className={'_bubble'}></span>}
                </div>
                {label}
            </label>
        </div>
    )
}

export default memo(Radio)