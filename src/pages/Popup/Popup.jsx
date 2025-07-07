import React, { useEffect, useState } from 'react';
import qrcodePlaceholder from '../../assets/img/qrcode-placeholder.svg'
import './Popup.css';
import QRCode from 'qrcode';
import CurrentIPUtil from '../../utils/CurrentIPUtil';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Popup = () => {
  const [activeTab, setActiveTab] = useState({
    title: '',
    url: '',
    urlQrcode: null,
  })
  const [ip, setIp] = useState('')
  const [copied, setCopied] = useState(false)
  const [inputQrcode, setInputQrcode] = useState({
    input: '',
    qrcode: null,
  })

  useEffect(() => {

    // 显示当前标签页地址的二维码
    chrome.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
      setActiveTab({
        title: activeTab.title,
        url: activeTab.url,
        urlQrcode: ''
      })

      QRCode.toDataURL(activeTab.url)
        .then(url => {
          console.log(url)
          setActiveTab({
            ...activeTab,
            urlQrcode: url
          })
        })
        .catch(err => {
          console.error(err)
        })
    })

    // 显示本机ipv4地址
    CurrentIPUtil.getUserIP(ip => {
      setIp(ip)
    });

  }, [])

  useEffect(() => {
    QRCode.toDataURL(inputQrcode.input)
      .then(url => {
        console.log(url)
        setInputQrcode({
          ...inputQrcode,
          qrcode: url,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }, [inputQrcode.input])

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <div className='App-body'>

        <div className='activetab-title'>{activeTab.title}</div>
        <div className='activetab-url'>{activeTab.url}</div>

        <div className='qrcode-container'>
          <img className='qrcode' src={activeTab.urlQrcode ?? qrcodePlaceholder} alt={activeTab.url} />
          <div className='space'></div>
          <img className="qrcode" src={inputQrcode.qrcode ?? qrcodePlaceholder} alt={inputQrcode.input} ></img>
        </div>

        <div className='text-right mt8'>
          <div>文本转二维码:</div>
          <div className="input-group">
            <label>请输入文本：</label>
            <input type="text" value={inputQrcode.input} onChange={(e) => setInputQrcode({ input: e.target.value })}></input>
          </div>
        </div>

        <div className="divider"></div>

        {/* ip地址 */}
        <div>
          IPv4地址：
          <CopyToClipboard text={ip} onCopy={() => {
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 1000);
          }}>
            <span className='clipboard'>
              {ip}
            </span>
          </CopyToClipboard>
          {copied ? <span style={{ color: '#61dafb', fontSize: '10px', marginLeft: '5px' }}>复制成功.</span> : null}
        </div>

      </div>
    </div>
  );
};

export default Popup;
