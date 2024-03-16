import React, { useState } from 'react'
import './table.css'
import Button from '../button/Button'
import { PiMinus, PiPlus } from 'react-icons/pi'
import { blackGradientColor, blueGradientColor, mainColor, whiteColor } from '../../variables'

const Table = ({
    label,
    labelBackground = whiteColor,
    labelColor = mainColor,
    tableName,
    columns,
    rows,
    onChange,
    errorMessage,
}) => {

    const [tableRows, setTableRows] = useState(rows)

    const handleAddRow = () => {
        setTableRows(() => {
            const newTableRows = [...tableRows, Array(columns.length).fill('')]
            let isMissing = false
            newTableRows.forEach(row => row.forEach(cell => cell.trim() === '' && (isMissing = true)))
            onChange && onChange({
                isMissing: isMissing,
                tableName: tableName,
                values: newTableRows
            })
            return newTableRows
        })
    }

    const handleRemoveRow = () => {
        if (tableRows.length > 1) {
            setTableRows(() => {
                const newTableRows = tableRows.slice(0, -1)
                let isMissing = false
                newTableRows.forEach(row => row.forEach(cell => cell.trim() === '' && (isMissing = true)))
                onChange && onChange({
                    isMissing: isMissing,
                    tableName: tableName,
                    values: newTableRows
                })
                return newTableRows
            })
        }
    }

    const handleChange = (newValue, rowIndex, cellIndex) => {
        setTableRows(() => {
            const newTableRows = [...tableRows]
            newTableRows[rowIndex][cellIndex] = newValue
            let isMissing = false
            newTableRows.forEach(row => row.forEach(cell => cell.trim() === '' && (isMissing = true)))
            onChange && onChange({
                isMissing: isMissing,
                tableName: tableName,
                values: newTableRows
            })
            return newTableRows
        })
    }

    return (
        <div className='_table__container'>
            {label && <label style={{ background: labelBackground, color: labelColor }}>{label}</label>}
            <div className='_table__content'>
                <div className='_table'>
                    <table>
                        <thead>
                            <tr>
                                {columns && columns.length > 0 && columns.map((column, columnIndex) => (
                                    <th key={columnIndex}>{column.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cel, cellIndex) => (
                                        <td key={cellIndex}>
                                            <input
                                                type={columns[cellIndex].type ?? 'text'}
                                                min={columns[cellIndex].type === 'number' && columns[cellIndex].min ? columns[cellIndex].min : undefined}
                                                max={columns[cellIndex].type === 'number' && columns[cellIndex].max ? columns[cellIndex].max : undefined}
                                                step={columns[cellIndex].type === 'number' && columns[cellIndex].step ? columns[cellIndex].step : undefined}
                                                pattern={columns[cellIndex].pattern ?? undefined}
                                                value={cel}
                                                placeholder={rowIndex === 0 ? columns[cellIndex].placeholder : ''}
                                                onChange={(e) => handleChange(e.target.value, rowIndex, cellIndex)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className='_table__tool'>
                        {tableRows.length > 1 && (
                            <Button
                                width={25}
                                height={25}
                                borderRadius={3}
                                animateDuration={200}
                                icon={<PiMinus />}
                                iconSize={15}
                                background={blackGradientColor}
                                onClick={handleRemoveRow}
                            />
                        )}
                        <Button
                            width={25}
                            height={25}
                            borderRadius={3}
                            animateDuration={200}
                            icon={<PiPlus />}
                            iconSize={15}
                            background={blueGradientColor}
                            onClick={handleAddRow}
                        />
                    </div>
                    <span className='_error'>{errorMessage && errorMessage}</span>
                </div>
            </div>
        </div>
    )
}

export default Table