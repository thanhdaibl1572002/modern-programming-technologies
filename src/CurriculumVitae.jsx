import React, { useEffect, useState } from 'react'
import './CurriculumVitae.css'
import { PiArrowFatLeft, PiArrowFatRight, PiCheckFatLight, PiListChecks } from 'react-icons/pi'
import { GoShield, GoShieldCheck } from 'react-icons/go'
import { blackGradientColor, blueGradientColor, redGradientColor } from './variables'
import TextField from './components/textfield/TextField'
import Table from './components/table/Table'
import TextArea from './components/text-area/TextArea'
import SelectGroup from './components/select-group/SelectGroup'
import Button from './components/button/Button'
import Image from './components/image/Image'
import RadioGroup from './components/radio-group/RadioGroup'
import useMediaScreen from './hooks/useMediaScreen'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import provinces from './data/provinces'
import forms from './data/forms'

const CurriculumVitae = () => {

    const [currentForm, setCurrentForm] = useState(0)
    const [formData, setFormData] = useState(forms)

    const [isValidate, setIsValidate] = useState(true)

    // const [birthPlaceProvince, setBirthPlaceProvince] = useState(undefined)
    // const [birthPlacedistrict, setBirthPlacedistrict] = useState('')
    // const [birthPlaceWards, setBirthPlaceWards] = useState([])

    const screenSize = useMediaScreen()

    const validateCurrentForm = () => {
        const updatedCurrentForm = formData[currentForm].map(
            field => {
                switch (field.type) {
                    case 'text':
                        let textFieldStatus = true
                        if (!field.regex.test(field.value) || !field.value) textFieldStatus = false
                        return { ...field, status: textFieldStatus }
                    case 'text-area':
                        let textAreaStatus = true
                        if (!field.regex.test(field.value) || !field.value) textAreaStatus = false
                        return { ...field, status: textAreaStatus }
                    case 'image':
                        let imageStatus = true
                        if (!field.value) imageStatus = false
                        return { ...field, status: imageStatus }
                    case 'date':
                        let dateFieldStatus = true
                        if (!field.regex.test(field.value) || !field.value) dateFieldStatus = false
                        return { ...field, status: dateFieldStatus }
                    case 'select-group':
                        return { ...field, status: field.values.every(value => value.value !== '') }
                    case 'table':
                        return { ...field, status: field.values.every(value => value.every(elm => elm !== '')) }
                    default:
                        return field
                }
            }
        )
        return updatedCurrentForm
    }

    // const handleTextFieldChange = (event) => {
    //     const { name, value } = event.target
    //     const updatedForms = formData.map(
    //         form => form.map(
    //             field => field.name === name
    //                 && (field.type === 'text' || field.type === 'date' || field.type === 'month' || field.type === 'number')
    //                 ? { ...field, value: value, status: field.regex.test(value) }
    //                 : field
    //         )
    //     )
    //     setFormData(updatedForms)
    // }

    const handleTextFieldChange = (event) => {
        const { name, value } = event.target
    
        const fieldIndex = formData.findIndex(form =>
            form.some(field => field.name === name &&
                (field.type === 'text' || field.type === 'date' || field.type === 'month' || field.type === 'number'))
        )
    
        if (fieldIndex !== -1) {
            setFormData(prevFormData => {
                const updatedForms = [...prevFormData]
                updatedForms[fieldIndex] = updatedForms[fieldIndex].map(field => {
                    if (field.name === name &&
                        (field.type === 'text' || field.type === 'date' || field.type === 'month' || field.type === 'number')) {
                        return { ...field, value: value, status: field.regex.test(value) }
                    }
                    return field
                })
                return updatedForms
            })
        }
    }
    

    // const handleTextAreaChange = (event) => {
    //     const { name, value } = event.target
    //     const updatedForms = formData.map(
    //         form => form.map(
    //             field => field.name === name && field.type === 'text-area'
    //                 ? { ...field, value: value, status: field.regex.test(value) }
    //                 : field
    //         )
    //     )
    //     setFormData(updatedForms)
    // }

    const handleTextAreaChange = (event) => {
        const { name, value } = event.target
    
        const fieldIndex = formData.findIndex(form =>
            form.some(field => field.name === name && field.type === 'text-area')
        )
    
        if (fieldIndex !== -1) {
            setFormData(prevFormData => {
                const updatedForms = [...prevFormData]
                updatedForms[fieldIndex] = updatedForms[fieldIndex].map(field => {
                    if (field.name === name && field.type === 'text-area') {
                        return { ...field, value: value, status: field.regex.test(value) }
                    }
                    return field
                })
                return updatedForms
            })
        }
    }
    

    // const handleSelectGroupChange = (selectData) => {
    //     const { groupName, isMissing, values } = selectData

    //     const updatedForms = formData.map(
    //         fields => fields.map(
    //             field => field.name === groupName && field.type === 'select-group'
    //                 ? { ...field, values: [...values], status: !isMissing }
    //                 : field
    //         )
    //     )

    //     setFormData(updatedForms)
    // }

    const handleSelectGroupChange = (selectData) => {
        const { groupName, isMissing, values } = selectData
    
        const groupIndex = formData.findIndex(fields =>
            fields.some(field => field.name === groupName && field.type === 'select-group')
        )
    
        if (groupIndex !== -1) {
            setFormData(prevFormData => {
                const updatedForms = [...prevFormData]
                updatedForms[groupIndex] = updatedForms[groupIndex].map(field => {
                    if (field.name === groupName && field.type === 'select-group') {
                        return { ...field, values: [...values], status: !isMissing }
                    }
                    return field
                })
                return updatedForms
            })
        }
    }

    // const handleRadioGroupChange = (radioData) => {
    //     const { groupName, value } = radioData
    //     const updatedForms = formData.map(
    //         fields => fields.map(
    //             field => field.name === groupName && field.type === 'radio-group'
    //                 ? { ...field, value: value }
    //                 : field
    //         )
    //     )
    //     setFormData(updatedForms)
    // }

    const handleRadioGroupChange = (radioData) => {
        const { groupName, value } = radioData
    
        const fieldIndex = formData.findIndex(form =>
            form.some(field => field.name === groupName && field.type === 'radio-group')
        )
    
        if (fieldIndex !== -1) {
            setFormData(prevFormData => {
                const updatedForms = [...prevFormData]
                updatedForms[fieldIndex] = updatedForms[fieldIndex].map(field => {
                    if (field.name === groupName && field.type === 'radio-group') {
                        return { ...field, value: value }
                    }
                    return field
                })
                return updatedForms
            })
        }
    }
    

    // const handleTableChange = (tableData) => {
    //     const { tableName, isMissing, values } = tableData
    //     const updatedForms = formData.map(
    //         fields => fields.map(
    //             field => field.name === tableName && field.type === 'table'
    //                 ? { ...field, values: values, status: !isMissing }
    //                 : field
    //         )
    //     )
    //     setFormData(updatedForms)
    // }

    const handleTableChange = (tableData) => {
        const { tableName, isMissing, values } = tableData
    
        const fieldIndex = formData.findIndex(form =>
            form.some(field => field.name === tableName && field.type === 'table')
        )
    
        if (fieldIndex !== -1) {
            setFormData(prevFormData => {
                const updatedForms = [...prevFormData]
                updatedForms[fieldIndex] = updatedForms[fieldIndex].map(field => {
                    if (field.name === tableName && field.type === 'table') {
                        return { ...field, values: values, status: !isMissing }
                    }
                    return field
                })
                return updatedForms
            })
        }
    }
    

    // const handleImageChange = (imageData) => {
    //     const { imageName, value } = imageData
    //     const updatedForms = formData.map(
    //         fields => fields.map(
    //             field => field.name === imageName && field.type === 'image'
    //                 ? { ...field, value: value }
    //                 : field
    //         )
    //     )
    //     setFormData(updatedForms)
    // }

    const handleImageChange = (imageData) => {
        const { imageName, value } = imageData
    
        const fieldIndex = formData.findIndex(form =>
            form.some(field => field.name === imageName && field.type === 'image')
        )
    
        if (fieldIndex !== -1) {
            setFormData(prevFormData => {
                const updatedForms = [...prevFormData]
                updatedForms[fieldIndex] = updatedForms[fieldIndex].map(field => {
                    if (field.name === imageName && field.type === 'image') {
                        return { ...field, value: value }
                    }
                    return field
                })
                return updatedForms
            })
        }
    }
    

    const handleNext = () => {
        const updatedCurrentForm = validateCurrentForm()
        if (isValidate)
            setFormData(() => {
                const updatedForms = [...formData]
                updatedForms.splice(currentForm, 1, updatedCurrentForm)
                if (updatedForms[currentForm].every(field => field.status))
                    setCurrentForm(prevForm => Math.min(prevForm + 1, forms.length - 1))
                return updatedForms
            })
        else
            setCurrentForm(prevForm => Math.min(prevForm + 1, forms.length - 1))
    }

    const handlePrev = () => {
        setCurrentForm(prevForm => Math.max(prevForm - 1, 0))
    }

    const handleComplete = () => {
        const updatedCurrentForm = validateCurrentForm()
        if (isValidate) {
            setFormData(() => {
                const updatedForms = [...formData]
                updatedForms.splice(currentForm, 1, updatedCurrentForm)
                if (updatedForms[currentForm].every(field => field.status))
                    setCurrentForm(prevForm => Math.min(prevForm + 1, forms.length - 1))

                if (updatedForms.every(fields => fields.every(field => field.status))) {
                    toast.success('Đăng ký thành công')
                } else {
                    toast.error('Vui lòng điền đầy đủ thông tin')
                }
                return updatedForms
            })
        }
        else {
            toast.info('Hoàn thành thử nghiệm')
        }
    }

    const isShowErrorMessage = (fieldName) => {
        return formData[currentForm].find(field => field.name === fieldName).status === false
    }

    return (
        <div className='_cv__forms'>
            <div className='_cv__data'>
                <div className='_title'>
                    <h1>Sơ yếu lý lịch viên chức</h1>
                    <div className='_tool'>
                        <ToastContainer
                            position='top-center'
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme='light'
                        />
                        <Button
                            width={35}
                            height={35}
                            textWeight={400}
                            icon={isValidate ? <GoShieldCheck /> : <GoShield />}
                            iconSize={20}
                            background={isValidate ? blueGradientColor : redGradientColor}
                            onClick={() => setIsValidate(!isValidate)}
                            title='Bật tắt chế độ validate'
                        />
                    </div>
                </div>
                {formData && formData.length > 0 && formData[currentForm].map(field => {
                    switch (field.type) {
                        case 'radio-group':
                            return (
                                <RadioGroup
                                    key={field.name}
                                    radios={field.radios}
                                    value={field.value}
                                    label={field.label}
                                    width={screenSize > 850 ? 'calc(50% - 7.5px)' : '100%'}
                                    height={47}
                                    groupName={field.name}
                                    onChange={handleRadioGroupChange}
                                />
                            )
                        case 'select-group':
                            let selectWidth = '100%'
                            if (screenSize > 850) {
                                selectWidth = 'calc(100% / 3 - (20px / 3))'
                            } else if (screenSize > 500 && screenSize <= 850) {
                                selectWidth = 'calc(100% / 2 - (10px / 2))'
                            }
                            return (
                                <SelectGroup
                                    key={field.name}
                                    selectWidth={selectWidth}
                                    selects={field.selects}
                                    label={field.label}
                                    values={field.values}
                                    textField={field.textField}
                                    onChange={handleSelectGroupChange}
                                    groupName={field.name}
                                    errorMessage={isShowErrorMessage(field.name) && field.error}
                                />
                            )
                        case 'table':
                            return (
                                <Table
                                    key={field.name}
                                    tableName={field.name}
                                    columns={field.columns}
                                    rows={field.values}
                                    label={field.label}
                                    onChange={handleTableChange}
                                    errorMessage={isShowErrorMessage(field.name) && field.error}
                                />
                            )
                        case 'date':
                            return (
                                <TextField
                                    key={field.name}
                                    width={screenSize > 850 ? 'calc(50% - 7.5px)' : '100%'}
                                    inputHeight={47}
                                    borderRadius={5}
                                    label={field.label}
                                    type={field.type}
                                    onChange={handleTextFieldChange}
                                    name={field.name}
                                    value={field.value}
                                    errorMessage={isShowErrorMessage(field.name) && field.error}
                                />
                            )
                        case 'text':
                            return (
                                <TextField
                                    key={field.name}
                                    width={screenSize > 850 ? 'calc(50% - 7.5px)' : '100%'}
                                    inputHeight={47}
                                    borderRadius={5}
                                    placeholder={field.placeholder}
                                    label={field.label}
                                    type={field.type}
                                    onChange={handleTextFieldChange}
                                    name={field.name}
                                    value={field.value}
                                    errorMessage={isShowErrorMessage(field.name) && field.error}
                                />
                            )
                        case 'number':
                            return (
                                <TextField
                                    key={field.name}
                                    width={screenSize > 850 ? 'calc(50% - 7.5px)' : '100%'}
                                    inputHeight={47}
                                    borderRadius={5}
                                    placeholder={field.placeholder}
                                    label={field.label}
                                    type={field.type}
                                    onChange={handleTextFieldChange}
                                    name={field.name}
                                    value={field.value}
                                    errorMessage={isShowErrorMessage(field.name) && field.error}
                                />
                            )
                        case 'text-area':
                            return (
                                <TextArea
                                    key={field.name}
                                    width='100%'
                                    height={screenSize > 850 ? '200px' : 'calc(37.5vh - 6px)'}
                                    textAreaWidth='100%'
                                    textAreaHeight='100%'
                                    borderRadius={5}
                                    placeholder={field.placeholder}
                                    label={field.label}
                                    type={field.type}
                                    onChange={handleTextAreaChange}
                                    name={field.name}
                                    value={field.value}
                                    errorMessage={isShowErrorMessage(field.name) && field.error}
                                />
                            )
                        case 'image':
                            return (
                                <Image
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    value={field.value}
                                    onChange={handleImageChange}
                                    errorMessage={isShowErrorMessage(field.name) && field.error}
                                />
                            )
                        default:
                            return null
                    }
                })}
            </div>

            <div className='_cv__pagination'>
                <div className='_cv__current__form'>Trang <span>{currentForm + 1}</span> / {formData.length}</div>
                <div className='_cv__prev__next' style={{ justifyContent: screenSize <= 500 && currentForm === 0 ? 'flex-end' : 'space-between' }}>
                    {currentForm > 0 && (
                        <Button
                            text={'Quay Lại'}
                            height={45}
                            textWeight={400}
                            icon={<PiArrowFatLeft />}
                            iconSize={18}
                            iconPosition={'left'}
                            background={blackGradientColor}
                            onClick={handlePrev}
                        />
                    )}
                    {currentForm === formData.length - 1 && (
                        <Button
                            text={'Hoàn Thành'}
                            height={45}
                            textWeight={400}
                            icon={<PiCheckFatLight />}
                            iconSize={18}
                            iconPosition={'right'}
                            onClick={handleComplete}
                        />
                    )}
                    {currentForm < formData.length - 1 && (
                        <Button
                            text={'Tiếp Tục'}
                            height={45}
                            textWeight={400}
                            icon={<PiArrowFatRight />}
                            iconSize={18}
                            iconPosition={'right'}
                            onClick={handleNext}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CurriculumVitae