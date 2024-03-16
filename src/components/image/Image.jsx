import React, { useState } from 'react'
import './image.css'
import { mainColor, whiteColor } from '../../variables'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

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
    const img = document.createElement('img')
    img.src = fileUrl

    img.onload = function (event) {
      const width = this.naturalWidth
      const height = this.naturalHeight
      const aspectRatio = (width / height).toFixed(2)
      const expectedAspectRatio = (4 / 6).toFixed(2)
      if (aspectRatio === expectedAspectRatio) {
        setPreview(fileUrl)
        onChange && onChange({ imageName: name, value: fileUrl })
        toast.success('Tải ảnh hồ sơ thành công')
      } else {
        toast.error('Vui lòng chọn ảnh theo tỉ lệ 4 x 6')
      }
    }
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