import React, { useState } from 'react'
import Radio from '../radio/Radio'
import { mainColor, whiteColor } from '../../variables'
import './radio-group.css'

const RadioGroup = ({
    width = '100%',
    height = 'fit-content',
    label,
    labelBackground = whiteColor,
    labelColor = mainColor,
    groupName,
    value,
    radios,
    onChange,
    errorMessage,
}) => {

    const [selectedValue, setSelectedValue] = useState(value)

    const handleChange = (value) => {
        setSelectedValue(value)
        onChange && onChange({ groupName: groupName, value: value })
    }

    return (
        <div className='_radio__group__container' style={{ width: width }}>
            {label && <span className='_label' style={{ background: labelBackground, color: labelColor }}>{label}</span>}
            <div 
                className='_radio__content'
                style={{
                    height: height
                }}
            >
                {radios && radios.length > 0 && radios.map((radio, radioIndex) => (
                    <Radio
                        key={radioIndex}
                        checkSize={12}
                        textSize={14}
                        checkBoxSize={14.5}
                        label={radio.label}
                        id={radio.name}
                        name={groupName}
                        value={radio.value}
                        checked={radio.value === selectedValue}
                        onChange={handleChange}
                    />
                ))}
            </div>
            <span className='_error'>{errorMessage && errorMessage}</span>
        </div>
    )
}

export default RadioGroup