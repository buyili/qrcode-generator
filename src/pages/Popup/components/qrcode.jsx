import React, { useEffect, useState } from "react"
import QRCode from 'qrcode';
import qrcodePlaceholder from '../../../assets/img/qrcode-placeholder.svg'

export default (props) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (!props.text) {
            setUrl(null)
            return
        }
        QRCode.toDataURL(props.text)
            .then(url => {
                console.log(url)
                setUrl(url)
            })
            .catch(err => {
                console.error(err)
            })
    }, [props.text])

    return (
        <img className={props.className} src={url ?? qrcodePlaceholder} alt={props.text} />
    )
}