import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import Code from './Code'

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
      if (isRunning) {
        let elapsedTime = 0
      
        intervalId = setInterval(() => {
          setResult(getRandomNum(start, end))
          elapsedTime += 0.1
          if (elapsedTime >= time) {
            clearInterval(intervalId)
            setIsRunning(false)
          }
        }, 100)
      } 
    }

    run()

    return () => {
      intervalId && clearInterval(intervalId)
    }

  }, [isRunning, start, end, time])

  const handleRandom = () => setResult(Math.floor(Math.random() * (end - start + 1)) + start)

  const handleReset = () => {
    setStart(0)
    setEnd(10)
    setTime(1)
    setResult(0)
    setIsRunning(false)
  }

  return (
    <Container>
      <Card>
        <Card.Header>
          <Card.Title className='fs-3'>BL RANDOM</Card.Title>
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
                  <div className='d-flex gap-3 mt-3 mb-3'>
                    <InputGroup>
                      <InputGroup.Text>T.Gian (s)</InputGroup.Text>
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
              <Button variant='primary mt-3' onClick={handleRandom}>Lấy Số Ngẫu Nhiên ({start || 0} - {end || 0})</Button>
              <Button variant='danger mt-3 ms-3' onClick={handleReset}>Đặt Lại</Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>© 2024 - Các Công Nghệ Lập Trình Hiện Đại</Card.Footer>
      </Card>
      <Code />
    </Container>
  )
}

export default Random