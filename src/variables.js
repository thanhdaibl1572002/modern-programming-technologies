export const mainFontFamily = 'Roboto'
export const mainColor = 'rgb(39,142,255)'
export const whiteColor = 'rgb(255, 255, 255)'
export const blackColor = 'rgb(30, 39, 46)'
export const violetColor = 'rgb(125, 95, 255)'
export const yellowColor = 'rgb(255, 242, 0)'
export const redColor = 'rgb(255, 56, 56)'
export const greenColor = 'rgb(50, 255, 126)'
export const blueColor = 'rgb(56, 182, 255)'

export const mainGradientColor = 'linear-gradient(76.8deg, rgb(9, 132, 227) 0.4%, rgba(0,180,253,1) 87.2%)'
export const whiteGradientColor = 'linear-gradient(359.3deg, rgb(255, 255, 255) 1%, rgb(255, 255, 255) 70.9%)'
export const blackGradientColor = 'linear-gradient(109.6deg, rgba(20,30,48,1) 11.2%, rgba(36,59,85,1) 91.1%)'
export const violetGradientColor = 'linear-gradient(68.6deg, rgba(57,67,248,1) 38.1%, rgba(192,0,255,1) 93.1%)'
export const yellowGradientColor = 'linear-gradient(108.5deg, rgba(255,185,0,1) 21.1%, rgba(255,237,0,1) 80.4%)'
export const redGradientColor = 'linear-gradient(111.3deg, rgba(252,56,56,1) 11.7%, rgba(237,13,81,1) 81.7%)'
export const greenGradientColor = 'linear-gradient(110deg, rgba(37,219,137,1) 7.8%, rgba(151,243,202,1) 91.6%)'
export const blueGradientColor = 'linear-gradient(249.1deg, rgba(11,206,250,1) -6.5%, rgba(65,46,248,1) 100.2%)'

export const mainBoxShadow = '0 0 5px 0 rgba(39,142,255,0.1)'
export const mainBorder = '1px solid rgba(39,142,255,0.1)'

export const getColorLevel = (color, level = 100) => {
    let red
    let green
    let blue

    if (color.startsWith("#")) {
        if (color.length === 4) {
            color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        }
        const hexValue = parseInt(color.slice(1), 16)
        red = (hexValue >> 16) & 255
        green = (hexValue >> 8) & 255
        blue = hexValue & 255
    } else {
        const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)

        if (match) {
            [, red, green, blue] = match.map(Number)
        } else {
            throw new Error("Mã màu không đúng định dạng.")
        }
    }

    if (level < 0 || level > 100) {
        throw new Error("Mức độ màu phải nằm trong khoảng từ 0 đến 100")
    }

    const alpha = level / 100
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

{/* <Button
            text='Click me'
            textSize={15.5}
            textWeight={400}
            icon={<PiArrowFatLineRightLight />}
            iconPosition='left'
            iconSize={25}
            onClick={e => e.preventDefault()}
        /> */}

    // useEffect(() => {
    //     const handleBeforeUnload = (e) => {
    //       e.preventDefault()
    //       e.returnValue = ''
    //     }

    //     window.addEventListener('beforeunload', handleBeforeUnload)

    //     return () => {
    //       window.removeEventListener('beforeunload', handleBeforeUnload)
    //     }
    // }, [])