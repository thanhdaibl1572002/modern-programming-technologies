import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineLoading } from 'react-icons/ai'
import './button.css'

const Button= ({ 
    text, 
    icon, 
    iconSize, 
    iconColor,
    iconPosition = 'left', 
    width, 
    height, 
    textSize, 
    textColor, 
    textWeight, 
    border, 
    borderRadius, 
    boxShadow, 
    loadingText, 
    loadingSuccessText, 
    loadingFailedText, 
    background, 
    bubbleColor, 
    animateDuration = 500,
    status, 
    onClick, 
    className, 
    ...rest 
}) => {

    const [bubbles, setBubbles] = useState([])

    const buttonRef = useRef(null)
    const bubbleRef = useRef(null)

    useEffect(() => {
        if (bubbleRef.current) {
            bubbleRef.current.style.setProperty('--animate-duration', `${animateDuration}ms`)
        }
    }, [animateDuration, bubbles])

    const handleClick = useCallback(
        async (event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            setBubbles([...bubbles, { x, y }])
            setTimeout(() => setBubbles(bubbles.slice(1)), animateDuration)
            onClick && onClick(event)
        }, 
        [onClick, bubbles, animateDuration]
    )

    const iconStyles = {
        fontSize: iconSize ?? undefined,
        color: iconColor ?? undefined
    }
    const textStyles = {
        fontSize: textSize ?? undefined,
        fontWeight: textWeight ?? undefined,
        color: textColor ?? undefined
    }

    const buttonClassName = `_button__container ${className || ''}`.trim()

    return (
        <button
            className={buttonClassName}
            style={{
                width: width ?? undefined,
                height: height ?? undefined,
                border: border ?? undefined,
                borderRadius: borderRadius ?? undefined,
                background: background ?? undefined,
                boxShadow: boxShadow ?? undefined,
                display: 'flex',
                flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
            }}
            onClick={handleClick}
            ref={buttonRef}
            {...rest}
        >
            {
                status && status !== 'normal' ? (
                    <span className={'_button__loading'} style={textStyles}>
                        {status === 'loading' && 
                            <>
                                <AiOutlineLoading className={'_button__loading__icon'} style={iconStyles} />
                                {loadingText ?? 'Đang tải...'}
                            </>
                        } 
                        {status === 'success' && 
                            <>
                                <AiOutlineCheck className={'_button__success__icon'} style={iconStyles} />
                                {loadingSuccessText ?? 'Thành công!'}
                            </>
                        }
                        {status === 'failed' && 
                            <>
                                <AiOutlineClose className={'_button__failed__icon'} style={iconStyles} />
                                {loadingFailedText ?? 'Thất bại!'}
                            </>
                        }
                    </span>
                ) : (
                    <>
                        {icon &&
                            <div className={'_button__icon'} style={iconStyles}>
                                {icon}
                            </div>
                        }
                        {text &&
                            <div className={'_button__text'} style={textStyles}>
                                {text}
                            </div>
                        }
                        {bubbles.map((bubble, index) => (
                            <span
                                key={index}
                                ref={bubbleRef}
                                className={'_button__bubble'}
                                style={{
                                    width: buttonRef.current ? buttonRef.current?.clientWidth * 2.5 : undefined,
                                    height: buttonRef.current ? buttonRef.current?.clientWidth * 2.5 : undefined,
                                    left: bubble.x,
                                    top: bubble.y,
                                    background: bubbleColor ?? 'rgb(255, 255, 255)',
                                }}
                            >
                            </span>
                        ))}
                    </>
                )
            }

        </button>
    )
}

export default memo(Button)
