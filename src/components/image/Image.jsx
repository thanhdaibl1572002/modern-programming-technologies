import React, { useState } from 'react'
import './image.css'
import TestImage from '../test.jpeg'
import { mainColor, whiteColor } from '../../variables'
import { IoCloudUploadOutline } from 'react-icons/io5'

const Image = ({
  label,
  name,
  value,
  labelBackground = whiteColor,
  labelColor = mainColor,
  errorMessage,
  onChange,
}) => {

  const [preview, setPreview] = useState(value)

  const handleFileSelect = (file) => {
    const fileUrl = URL.createObjectURL(file)
    setPreview(fileUrl)
    onChange && onChange({ imageName: name, value: fileUrl })
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  return (
    <div className='_image__container'>
      {label && <span className='_label' style={{ background: labelBackground, color: labelColor }}>{label}</span>}
      <label
        className='_select'
        htmlFor={name}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          value=''
          onChange={e => handleFileSelect(e.target.files[0])}
        />
        {preview ? (
          <img src={preview} alt='' />
        ) : (
          <>
            <span><b>Chọn</b> hoặc <b>Kéo</b> và <b>Thả</b> ảnh vào đây</span>
            <IoCloudUploadOutline />
          </>
        )}
      </label>
      <span className='_error'>{errorMessage && errorMessage}</span>
    </div>
  )
}

export default Image