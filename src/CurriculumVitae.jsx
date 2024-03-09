import { useRef, useState } from 'react'
import './CurriculumVitae.css'
import { useReactToPrint } from 'react-to-print'
import pages from './data'

function CurriculumVitae() {
    const printRef = useRef()

    const [environment, setEnvironment] = useState('edit')

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'so-yeu-ly-lich-vien-chuc',
        onBeforeGetContent: async () => await setEnvironment('print'),
        onAfterPrint: () => setEnvironment('edit'),
    })

    const [imageUrl, setImageUrl] = useState('')

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = event => setImageUrl(event.target.result)
        reader.readAsDataURL(file)
    }

    return (
        <div className='main'>
            <button className='btn btn-dark' onClick={handlePrint}>Print</button>
            <div className='pages' ref={printRef} style={{ rowGap: environment === 'edit' ? '15px' : '0' }}>
                {pages.map((page, pageIndex) => (
                    <div className='page' key={pageIndex}>
                        {page.components.map((component, componentIndex) => (
                            <div className='page-component' key={componentIndex}>
                                {component.title && <h2 className='component-title'>{component.title}</h2>}
                                <div className='component-content'>
                                    {component.image && component.image.enable && (
                                        <label htmlFor={component.image.id} className='content-image' style={{ border: imageUrl ? 'none' : ' 2px solid black' }}>
                                            <input type='file' accept='image/*' value='' id={component.image.id} onChange={handleFileChange}/>
                                            {imageUrl && <img src={imageUrl} alt={component.image.label} />}
                                            {!imageUrl && component.image.label}
                                        </label>
                                    )}
                                    <div className='content-rows'>
                                        {component.rows && component.rows.map((row, rowIndex) => (
                                            <div className='content-row' key={rowIndex}>
                                                {row.cells && row.cells.length > 0 && row.cells.map((cell, cellIndex) => (
                                                    <div className='content-cell' key={cellIndex}>
                                                        <div className='cell-inputs'>
                                                            {cell.inputs && cell.inputs.length > 0 && cell.inputs.map((cellInput, cellInputIndex) => (
                                                                <div className='cell-input' key={cellInputIndex}>
                                                                    {cellInput.inputItems && cellInput.inputItems.length > 0 && cellInput.inputItems.map((cellInputItem, cellInputItemIndex) => (
                                                                        <div className='cell-input-item' key={cellInputItemIndex} >
                                                                            {cellInputItem.label && <label>{cellInputItem.label}</label>}
                                                                            {cellInputItem.input && cellInputItem.input.enable && (
                                                                                <input 
                                                                                    type='text' 
                                                                                    // value={cellInputItem.input.value}
                                                                                    onChange={() => {}}
                                                                                    style={{
                                                                                        borderBottom: environment === 'edit' ? '1px dotted black' : 'none'
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            {cellInputItem.remark && environment === 'edit' && <span>{cellInputItem.remark}</span>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className='cell-tables'>
                                                            {cell.tables && cell.tables.length > 0 && cell.tables.map((cellTable, cellTableIndex) => (
                                                                <div className='cell-table' key={cellTableIndex}>
                                                                    {cellTable.label && <label>{cellTable.label}</label>}
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                {cellTable.rows[0].map((tableHead, headIndex) => (
                                                                                    <th key={headIndex}>{tableHead}</th>
                                                                                ))}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {cellTable.rows.slice(1).map((tableRow, tableRowIndex) => (
                                                                                <tr key={tableRowIndex}>
                                                                                    {tableRow.map((tableRowItem, tableRowItemIndex) => (
                                                                                        <td key={tableRowItemIndex}>
                                                                                            <textarea 
                                                                                                // value={tableRowItem} 
                                                                                                onChange={() => {}} 
                                                                                            />
                                                                                        </td>
                                                                                    ))}
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                    {cellTable.remark && <span>{cellTable.remark}</span>}
                                                                    {cellTable.note && <strong>{cellTable.note}</strong>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CurriculumVitae