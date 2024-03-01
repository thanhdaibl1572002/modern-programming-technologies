import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { CopyToClipboard } from 'react-copy-to-clipboard'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const Code = () => {
    const codeString = `
    import React, { useState, useEffect } from 'react'
    import { Container, Card, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
    
    const Random = () => {
      
      const [start, setStart] = useState(0)
      const [end, setEnd] = useState(10)
      const [time, setTime] = useState(1)
      const [result, setResult] = useState(0)
      const [isRunning, setIsRunning] = useState(false)
    
      const getRandomNum = (start, end) => Math.floor(Math.random() * (end - start + 1)) + start
    
      const handleRun = () => {
        isNaN(start) && setStart(0)
        isNaN(end) && setEnd(0)
        start >= end || isNaN(end) ? alert("Giá trị start/end không hợp lệ") : setIsRunning(true)
      }
      
      const handleStop = () => setIsRunning(false)
    
      useEffect(() => {
        let intervalId
    
        const run = () => {
          let elapsedTime = 0
          
          intervalId = setInterval(() => {
            setResult(getRandomNum(start, end))
            elapsedTime += 0.1
            elapsedTime >= time && clearInterval(intervalId) && setIsRunning(false)
          }, 100)
        }
    
        isRunning ? run() : clearInterval(intervalId)
    
        return () => clearInterval(intervalId)
    
      }, [isRunning, start, end, time])
      
      const handleRandom = () => setResult(Math.floor(Math.random() * (end - start + 1)) + start)
    
      return (
        <Container>
          <Card>
            <Card.Header>
              <Card.Title className='fs-3'>RANDOM</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row xs={12} md={12} lg={12}>
                <Col xs={12} md={12} lg={6} className='text-center'>
                  <strong style={{ fontSize: 150 }}>{result}</strong>
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <Card>
                    <Card.Body>
                      <div className='d-flex gap-3 mt-3'>
                        <InputGroup>
                          <InputGroup.Text>Từ</InputGroup.Text>
                          <Form.Control 
                            inputMode='decimal'
                            min={0} 
                            value={start || 0}
                            onChange={(e) => setStart(parseInt(e.target.value))} 
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Text>Đến</InputGroup.Text>
                          <Form.Control 
                            min={1} 
                            inputMode='decimal'
                            value={end || 0}
                            onChange={(e) => setEnd(parseInt(e.target.value))} 
                          />
                        </InputGroup>
                      </div>
                      <div className='d-flex gap-3 mt-3'>
                        <InputGroup>
                          <InputGroup.Text>Thời Gian (s)</InputGroup.Text>
                          <Form.Control 
                            min={0} 
                            inputMode='decimal'
                            defaultValue={time} 
                            onChange={(e) => setTime(parseInt(e.target.value))} 
                          />
                        </InputGroup>
                        <Button variant='primary' onClick={handleRun}>Chạy</Button>
                        <Button variant='danger' onClick={handleStop}>Dừng</Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Button variant='warning mt-3' onClick={handleRandom}>Lấy Số Ngẫu Nhiên ({start || 0} - {end || 0})</Button>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>© 2024 - Các Công Nghệ Lập Trình Hiện Đại</Card.Footer>
          </Card>
        </Container>
      )
    }
    
    export default Random
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