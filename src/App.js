import { useEffect, useState } from 'react'
import axios from 'axios'
import Code from './Code'

const App = () => {

  const currencyFormatter = (value) => new Intl.NumberFormat({ style: 'currency' }).format(value.toFixed(4))
  const convertToNumber = (currencyString) => parseFloat(currencyString.toString().replace(/\./g, '').replace(',', '.'))

  const [currencies, setCurrencies] = useState({
    date: '',
    rates: [{ name: 'AED', rate: 3.97866 }, { name: 'AFN', rate: 79.812886 } ]
  })

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await axios.post('https://asia-southeast1-annular-splice-412115.cloudfunctions.net/mpt-function')
        setCurrencies(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getCurrencies()
  }, [])

  const [inputName, setInputName] = useState(currencies.rates[0].name)
  const [inputRate, setInputRate] = useState(currencies.rates[0].rate)
  const [inputValue, setInputValue] = useState(1)

  const [outputName, setOutputName] = useState(currencies.rates[1].name)
  const [outputRate, setOutputRate] = useState(currencies.rates[1].rate)
  const [outputValue, setOutputValue] = useState(currencyFormatter(outputRate / inputRate * inputValue))

  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (e) => {
    const newInputValue = parseFloat(e.target.value)
    const newOutputValue = outputRate / inputRate * parseFloat(e.target.value)
    setInputValue(newInputValue)
    setOutputValue(newInputValue ? currencyFormatter(newOutputValue) : 0)
  }

  const handleOutputChange = (e) => {
    const newOutputValue = parseFloat(e.target.value)
    const newInputValue = inputRate / outputRate * parseFloat(e.target.value)
    setOutputValue(newOutputValue)
    setInputValue(newOutputValue ? currencyFormatter(newInputValue) : 0)
  }

  const handleInputSelect = (name, rate) => {
    setInputName(name)
    setInputRate(rate)
    const newOutputValue = (outputRate / rate) * convertToNumber(inputValue)
    setOutputValue(currencyFormatter(newOutputValue))
  }

  const handleOutputSelect = (name, rate) => {
    setOutputName(name)
    setOutputRate(rate)
    const newInputValue = (inputRate / rate) * convertToNumber(outputValue)
    setInputValue(currencyFormatter(newInputValue))
  }

  const handleRateChange = () => {
    setInputRate(outputRate)
    setOutputRate(inputRate)
    setInputName(outputName)
    setOutputName(inputName)
    setOutputValue(currencyFormatter(inputRate / outputRate * inputValue))
  }

  const handleSearchChange = (e) => setSearchQuery(e.target.value.trim().toUpperCase())

  const newRates = currencies.rates.filter(item => item.name.includes(searchQuery))

  return (
    <div className='d-flex flex-column align-items-center'>
      <h1 className='mb-5 fs-2'>CHUYỂN ĐỔI TIỀN TỆ</h1>
      <strong className='mb-5 fs-4 mt-2 text-center fw-normal'>
        1 {inputName} = {(outputRate / inputRate * 1).toFixed(4)} {outputName}
      </strong>
      <div className='d-flex justify-content-between align-items-baseline w-100'>
        <div className='input-group'>
          <input
            inputMode='decimal'
            min={0}
            value={inputValue || 0}
            className='form-control rounded-0'
            placeholder='Nhập số tiền'
            onChange={handleInputChange}
          />
          <button
            className='btn btn-dark dropdown-toggle rounded-0'
            data-bs-toggle='dropdown'
            onClick={() => setSearchQuery('')}
          >
            {inputName}
          </button>
          <div className='dropdown'>
            <div className='dropdown-menu rounded-0'>
              <div className='input-group p-2'>
                <input
                  type='text'
                  className='form-control rounded-0'
                  placeholder='Tìm kiếm tiền tệ'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <ul className='overflow-y-scroll m-2 p-0' style={{ width: '200px', height: '190px' }}>
                {newRates.length > 0 ? (
                  newRates.map(item => (
                    <li
                      key={item.name}
                      className='dropdown-item'
                      onClick={() => handleInputSelect(item.name, item.rate)}
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li>Không tìm thấy tiền tệ</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <button 
          className='btn btn-outline-light rounded-0 text-dark ms-3 me-3'
          onClick={handleRateChange}
        >
          <i className='bi bi-arrow-left-right' />
        </button>
        <div className='input-group'>
          <input
            inputMode='decimal'
            min={0}
            value={outputValue || 0}
            className='form-control rounded-0'
            placeholder='Nhập số tiền'
            onChange={handleOutputChange}
          />
          <button
            className='btn btn-dark dropdown-toggle rounded-0'
            data-bs-toggle='dropdown'
            onClick={() => setSearchQuery('')}
          >
            {outputName}
          </button>
          <div className='dropdown'>
            <div className='dropdown-menu rounded-0'>
              <div className='input-group p-2'>
                <input
                  type='text'
                  className='form-control rounded-0'
                  placeholder='Tìm kiếm tiền tệ'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <ul className='overflow-y-scroll m-2 p-0' style={{ width: '200px', height: '190px' }}>
                {newRates.length > 0 ? (
                  newRates.map(item => (
                    <li
                      key={item.name}
                      className='dropdown-item'
                      onClick={() => handleOutputSelect(item.name, item.rate)}
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li>Không tìm thấy tiền tệ</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className='mt-5 text-center'>Tỉ lệ chuyển đổi được cập nhật vào ngày {currencies.date}</p>
      <Code />
    </div>
  )
}

export default App
