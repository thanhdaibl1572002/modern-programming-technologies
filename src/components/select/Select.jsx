import React, { memo, useEffect, useRef, useState } from 'react'
import './select.css'
import Button from '../button/Button'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'
import { blackColor, getColorLevel, mainBorder, mainColor, whiteGradientColor } from '../../variables'

const Select = ({
    width = 'fit-content',
    height = 'fit-content',
    options,
    onChange,
    value,
    name,
    label = 'Chọn',
    optionTextSize = 14,
    selectTextSize = 15.5,
    iconColor = blackColor,
    background = whiteGradientColor,
    textColor = blackColor,
    border = mainBorder,
    boxShadow = 'none',
    bubbleColor = getColorLevel(mainColor, 30),
    optionWidth = '100%',
}) => {

    const [selectedOption, setSelectedOption] = useState({ label: label, value: value })
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null)

    const handleClick = (event) => {
        const option = JSON.parse(event.target.getAttribute('data-value'))
        setSelectedOption({ name: name, ...option })
        onChange && onChange({ name: name, ...option })
        setIsOpen(false)
    }

    const handleToggle = () => setIsOpen(!isOpen)

    useEffect(() => {
        const handleClickOutside = (event) => selectRef.current && !selectRef.current.contains(event.target) && setIsOpen(false)
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    return (
        <div
            className='_select__container'
            ref={selectRef}
            style={{
                width: width,
                height: height,
            }}
        >
            <Button
                text={selectedOption ? selectedOption.label : label}
                textSize={selectTextSize}
                textWeight={400}
                onClick={handleToggle}
                icon={isOpen ? <PiCaretUp /> : <PiCaretDown />}
                iconSize={14}
                iconPosition={'right'}
                iconColor={iconColor}
                background={background}
                textColor={textColor}
                border={border}
                boxShadow={boxShadow}
                bubbleColor={bubbleColor}
            />
            {isOpen && options && options.length > 0 && (
                <ul className='_select__list' style={{ fontSize: optionTextSize, width: optionWidth }}>
                    {options.map((option, optionIndex) => (
                        <li key={optionIndex} data-value={JSON.stringify({ label: option.label, value: option.value })} onClick={handleClick}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default memo(Select)