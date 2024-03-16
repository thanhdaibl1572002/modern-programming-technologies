import axios from 'axios'
import * as XLSX from 'xlsx'

export const getDistrictsFromAPI = async (provinceId) => {
    if (provinceId) {
        const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
        const districts = res.data.results
        const convertDistricts = districts.map(item => ({
            name: 'district',
            label: item.district_name,
            value: item.district_name,
            id: item.district_id
        }))
        const updatedDistricts = [{ name: 'district', label: 'Chọn quận / huyện', value: '', id: '' }, ...convertDistricts]
        return updatedDistricts
    } else {
        return [{ name: 'district', label: 'Chọn quận / huyện', value: '', id: '' }]
    }
}

export const getWardsFromAPI = async (districtId) => {
    if (districtId) {
        const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
        const wards = res.data.results
        const convertWards = wards.map(item => ({
            name: 'ward',
            label: item.ward_name,
            value: item.ward_name,
            id: item.ward_id
        }))
        const updatedWards = [{ name: 'ward', label: 'Chọn phường / xã', value: '', id: '' }, ...convertWards]
        return updatedWards
    } else {
        return [{ name: 'ward', label: 'Chọn phường / xã', value: '', id: '' }]
    }
}

export const updateDistricts = async (formData, setFormData, fieldName, provinceId) => {
    const newDistricts = await getDistrictsFromAPI(provinceId)
    const fieldIndex = formData.findIndex(form => form.some(field => field.name === fieldName))
    if (fieldIndex !== -1) {
        setFormData(prevFormData => {
            const updatedForms = [...prevFormData]
            updatedForms[fieldIndex] = updatedForms[fieldIndex].map(field => (
                field.name === fieldName
                    ? { ...field, selects: field.selects.map((select, selectIndex) => selectIndex === 1 ? newDistricts : select) }
                    : field
            ))
            return updatedForms
        })
    }
}

export const updateWards = async (formData, setFormData, fieldName, districtId) => {
    const newWards = await getWardsFromAPI(districtId)
    const fieldIndex = formData.findIndex(form => form.some(field => field.name === fieldName))
    if (fieldIndex !== -1) {
        setFormData(prevFormData => {
            const updatedForms = [...prevFormData]
            updatedForms[fieldIndex] = updatedForms[fieldIndex].map(field => (
                field.name === fieldName
                    ? { ...field, selects: field.selects.map((select, selectIndex) => selectIndex === 0 ? newWards : select) }
                    : field
            ))
            return updatedForms
        })
    }
}


export const exportToExcel = (data) => {
    const flatData = data.map(item => {
        if (Array.isArray(item.value)) {
            return item.value.reduce((acc, val) => {
                acc[val.name] = val.value
                return acc
            }, {})
        }
        return { [item.name]: item.value }
    })

    const ws = XLSX.utils.json_to_sheet(flatData)

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data')

    XLSX.writeFile(wb, 'data.xlsx')
}
