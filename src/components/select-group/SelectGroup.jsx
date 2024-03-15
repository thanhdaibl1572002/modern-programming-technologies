import React from 'react'
import Select from '../select/Select'
import './select-group.css'
import { useState } from 'react'
import { mainColor, whiteColor } from '../../variables'
import TextField from '../textfield/TextField'

const SelectGroup = ({
    width = '100%',
    height = 'fit-content',
    selectWidth = 200,
    selectHeight = 40,
    selectTextSize = 14,
    selects,
    onChange,
    groupName,
    errorMessage,
    label,
    values,
    textField,
    labelBackground = whiteColor,
    labelColor = mainColor,
    labelIcon,
    labelIconColor = mainColor,
}) => {

    const [selectedOptions, setSelectedOptions] = useState({ groupName: groupName, isMissing: true, values: values })

    // console.log(selectedOptions)

    const handleSelectChange = (selectedOption) => {
        setSelectedOptions(() => {
            const updateSelectedValues = selectedOptions.values.map(
                value => value.name === selectedOption.name 
                ? {...value, label: selectedOption.label, value: selectedOption.value, id: selectedOption.id }
                : value
            )
            const newIsMissing = updateSelectedValues.some(value => value.value.trim() === '')
            const updateSelectedOptions = { groupName: groupName, isMissing: newIsMissing, values: updateSelectedValues }
            onChange && onChange(updateSelectedOptions)
            return updateSelectedOptions
        })
    }

    const handleTextFieldChange = (event) => {
        const inputValue = event.target.value
        const inputName = event.target.name
        setSelectedOptions(() => {
            const updateSelectedValues = selectedOptions.values.map(
                value => value.name === inputName
                ? {...value, label: textField.label, value: inputValue }
                : value
            )
            const newIsMissing = updateSelectedValues.some(value => value.value.trim() === '')
            const updateSelectedOptions = { groupName: groupName, isMissing: newIsMissing, values: updateSelectedValues }
            onChange && onChange(updateSelectedOptions)
            return updateSelectedOptions
        })
    }

    return (
        <div
            className='_select__group__container'
            style={{
                width: width,
                height: height,
            }}
        >
            <div className='_selects'>
                {label && 
                    <label 
                        style={{
                            background: labelBackground,
                            color: labelColor,
                        }}
                    >
                        {labelIcon && <span style={{ color: labelIconColor }}>{labelIcon}</span>}{label}
                    </label>
                }
                <div className='_items'>
                    {textField && (
                        <div style={{ width: '100%', marginBottom: -10, marginTop: 10 }}>
                            <TextField
                                width='100%'
                                inputHeight={47}
                                borderRadius={5}
                                placeholder={textField.placeholder}
                                label={textField.label}
                                type={textField.type}
                                onChange={handleTextFieldChange}
                                name={values[0].name}
                                value={values[0].value}
                            />
                        </div>
                    )}
                    {selects && selects.length > 0 && selects.map((select, selectIndex) => (
                        <Select
                            key={selectIndex}
                            options={select}
                            width={selectWidth}
                            height={selectHeight}
                            label={values[textField ? selectIndex + 1 : selectIndex].label}
                            value={values[textField ? selectIndex + 1 : selectIndex].value}
                            name={values[textField ? selectIndex + 1 : selectIndex].name}
                            selectTextSize={selectTextSize}
                            onChange={handleSelectChange}
                        />
                    ))}
                </div>
            </div>
            <span className='_error'>{errorMessage && errorMessage}</span>
        </div>
    )
}

export default SelectGroup