import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { CopyToClipboard } from 'react-copy-to-clipboard'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const Code = () => {
    const codeString = `
    import React, { useEffect, useState } from 'react'
    import { Badge, Button, Card, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap'
    import { PiArrowsLeftRight } from 'react-icons/pi'
    import currency from 'currency.js'
    import axios from 'axios'

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
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title className='fs-3'>CHUYỂN ĐỔI TIỀN TỆ</Card.Title>
                        <Badge bg="dark">
                            Tỉ lệ: {currency(1).toString()} {inputName} = {currency(outputRate / inputRate).toString()} {outputName}
                        </Badge>
                    </Card.Header>
                    <Card.Body>
                        <Row xs={12} md={12} lg={12} className='row-gap-2'>
                            <Col xs={12} md={12} lg={5}>
                                <InputGroup>
                                    <Form.Control
                                        inputMode='decimal'
                                        min={0}
                                        value={isNaN(inputValue) ? 0 : inputValue}
                                        onChange={handleInputChange}
                                    />
                                    <InputGroup.Text className='p-1'>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark">{inputName}</Dropdown.Toggle>
                                            <Dropdown.Menu className='p-2 overflow-y-scroll' style={{ height: 250 }}>
                                                <Form.Control
                                                    placeholder='Tìm kiếm tiền tệ'
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                                {newRates.map(item => (
                                                    <Dropdown.Item
                                                        key={item.name}
                                                        onClick={() => handleInputSelect(item.name, item.rate)}
                                                    >
                                                        {item.name}
                                                    </Dropdown.Item>
                                                ))}
                                                {newRates.length === 0 && <Dropdown.Item>Không tìm thấy tiền tệ</Dropdown.Item>}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col xs={12} md={12} lg={2} className='text-center'>
                                <Button variant="light fs-5" onClick={handleRateChange}>
                                    <PiArrowsLeftRight />
                                </Button>
                            </Col>
                            <Col xs={12} md={12} lg={5}>
                                <InputGroup>
                                    <Form.Control
                                        inputMode='decimal'
                                        min={0}
                                        value={isNaN(outputValue) ? 0 : outputValue}
                                        onChange={handleOutputChange}
                                    />
                                    <InputGroup.Text className='p-1'>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark">{outputName}</Dropdown.Toggle>
                                            <Dropdown.Menu className='p-2 overflow-y-scroll' style={{ height: 250 }}>
                                                <Form.Control
                                                    placeholder='Tìm kiếm tiền tệ'
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                                {newRates.map(item => (
                                                    <Dropdown.Item
                                                        key={item.name}
                                                        className='dropdown-item'
                                                        onClick={() => handleOutputSelect(item.name, item.rate)}
                                                    >
                                                        {item.name}
                                                    </Dropdown.Item>
                                                ))}
                                                {newRates.length === 0 && <Dropdown.Item>Không tìm thấy tiền tệ</Dropdown.Item>}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>Tỉ lệ chuyển đổi được cập nhật vào ngày {currencies.date}</Card.Footer>
                </Card>
            </Container>
        )
    }

    export default App
    `
    const [copied, setCopied] = useState(false)

    return (
        <>
            <button type="button" className="btn btn-dark mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
                                    className="btn btn-dark ms-5"
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