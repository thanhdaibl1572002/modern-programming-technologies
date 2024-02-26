import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import  {CopyToClipboard } from 'react-copy-to-clipboard'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const Code = () => {
    const codeString = `
    import { useEffect, useState } from 'react'
    import axios from 'axios'
    import currency from 'currency.js'

    const App = () => {

        const [currencies, setCurrencies] = useState({
            date: '',
            rates: [
                { name: 'AED', rate: 3.97866 }, 
                { name: 'AFN', rate: 79.812886 } 
            ]
        })

        useEffect(() => {
            const API = 'https://asia-southeast1-annular-splice-412115.cloudfunctions.net/mpt-function'
            const getCurrencies = async () => {
              const response = await axios.post(API)
              setCurrencies(response.data)
            }
            getCurrencies().catch(e => console.error(e))
        }, [])

        const [inputName, setInputName] = useState(currencies.rates[0].name)
        const [inputRate, setInputRate] = useState(currencies.rates[0].rate)
        const [inputValue, setInputValue] = useState(currency(1))

        const [outputName, setOutputName] = useState(currencies.rates[1].name)
        const [outputRate, setOutputRate] = useState(currencies.rates[1].rate)
        const [outputValue, setOutputValue] = useState(currency(outputRate / inputRate * inputValue))

        const [searchQuery, setSearchQuery] = useState('')

        const handleInputChange = (e) => {
            const newInputValue = parseFloat(e.target.value)
            const newOutputValue = outputRate / inputRate * newInputValue
            setInputValue(newInputValue)
            setOutputValue(currency(newOutputValue))
        }
        
        const handleOutputChange = (e) => {
            const newOutputValue = parseFloat(e.target.value)
            const newInputValue = inputRate / outputRate * newOutputValue
            setOutputValue(newOutputValue)
            setInputValue(currency(newInputValue))
        }
        
        const handleInputSelect = (name, rate) => {
            setInputName(name)
            setInputRate(rate)
            const newOutputValue = (outputRate / rate) * inputValue
            setOutputValue(currency(newOutputValue))
        }
        
        const handleOutputSelect = (name, rate) => {
            setOutputName(name)
            setOutputRate(rate)
            const newInputValue = (inputRate / rate) * outputValue
            setInputValue(currency(newInputValue))
        }
        
        const handleRateChange = () => {
            setInputRate(outputRate)
            setOutputRate(inputRate)
            setInputName(outputName)
            setOutputName(inputName)
            const newOutputValue = inputRate / outputRate * inputValue
            setOutputValue(currency(newOutputValue))
        }

        const handleSearchChange = (e) => setSearchQuery(e.target.value.trim().toUpperCase())

        const newRates = currencies.rates.filter(item => item.name.includes(searchQuery))

        return (
            <div className='d-flex flex-column align-items-center'>
                <h1 className='mb-5 fs-2'>CHUYỂN ĐỔI TIỀN TỆ</h1>
                <strong className='mb-5 fs-4 mt-2 text-center fw-normal'>
                    {currency(1).toString()} {inputName} = {currency(outputRate / inputRate).toString()} {outputName}
                </strong>
                <div className='d-flex justify-content-between align-items-baseline w-100'>
                    <div className='input-group'>
                        <input
                            inputMode='decimal'
                            min={0}
                            value={isNaN(inputValue) ? 0 : inputValue}
                            className='form-control'
                            placeholder='Nhập số tiền'
                            onChange={handleInputChange}
                        />
                        <button
                            className='btn btn-dark dropdown-toggle'
                            data-bs-toggle='dropdown'
                            onClick={() => setSearchQuery('')}
                        >
                            {inputName}
                        </button>
                        <div className='dropdown'>
                            <div className='dropdown-menu'>
                                <div className='input-group p-2'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Tìm kiếm tiền tệ'
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <ul className='overflow-y-scroll m-2 p-0' style={{ width: '200px', height: '190px' }}>
                                    {newRates.map(item => (
                                        <li
                                            key={item.name}
                                            className='dropdown-item'
                                            onClick={() => handleInputSelect(item.name, item.rate)}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                    {newRates.length === 0 && <li>Không tìm thấy tiền tệ</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button 
                        className='btn btn-outline-light text-dark ms-3 me-3'
                        onClick={handleRateChange}
                    >
                        <i className='bi bi-arrow-left-right' />
                    </button>
                    <div className='input-group'>
                        <input
                            inputMode='decimal'
                            min={0}
                            value={isNaN(outputValue) ? 0 : outputValue}
                            className='form-control'
                            placeholder='Nhập số tiền'
                            onChange={handleOutputChange}
                        />
                        <button
                            className='btn btn-dark dropdown-toggle'
                            data-bs-toggle='dropdown'
                            onClick={() => setSearchQuery('')}
                        >
                            {outputName}
                        </button>
                        <div className='dropdown'>
                            <div className='dropdown-menu'>
                                <div className='input-group p-2'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Tìm kiếm tiền tệ'
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <ul className='overflow-y-scroll m-2 p-0' style={{ width: '200px', height: '190px' }}>
                                    {newRates.map(item => (
                                        <li
                                            key={item.name}
                                            className='dropdown-item'
                                            onClick={() => handleOutputSelect(item.name, item.rate)}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                    {newRates.length === 0 && <li>Không tìm thấy tiền tệ</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='mt-5 text-center'>Tỉ lệ chuyển đổi được cập nhật vào ngày {currencies.date}</p>
            </div>
        )
    }

    export default App
    `
    const [copied, setCopied] = useState(false)
    
    return (
        <>
            <button type="button" className="btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                XEM CODE
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Full Code</h1>
                            <CopyToClipboard text={codeString}>
                                <button 
                                    type="button" 
                                    className="btn btn-primary ms-5"
                                    onClick={() => {
                                        setCopied(true)
                                        setTimeout(() => setCopied(false), 1000)
                                    }}
                                >
                                    {copied ? 'Đã sao chép' : 'Sao chép'}
                                </button>
                            </CopyToClipboard>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <SyntaxHighlighter language={jsx} style={tomorrow}>
                                {codeString}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Code