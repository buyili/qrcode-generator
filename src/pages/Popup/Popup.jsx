import React, { useEffect, useState, useRef } from 'react';
import './Popup.css';
import CurrentIPUtil from '../../utils/CurrentIPUtil';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import QRCodeComp from './components/qrcode';

const Popup = () => {
  const [activeTab, setActiveTab] = useState({
    title: '',
    url: '',
  })
  const [ip, setIp] = useState('')
  const [copied, setCopied] = useState(false)
  const [inputQrcode, setInputQrcode] = useState({
    input: '',
  })
  const inputRef = useRef(null)

  var xmarkIconClass = classNames({ 'clear-btn': true, 'opacity-20': !inputQrcode.input })

  useEffect(() => {
    chrome.storage.local.get(['selectedText'], (result) => {
      const selectedText = result.selectedText || '';

      setInputQrcode({
        ...inputQrcode,
        input: selectedText
      })

      // 清除临时存储的数据（可选）
      chrome.storage.local.remove('selectedText');
    });

    // 显示当前标签页地址的二维码
    chrome.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
      setActiveTab({
        title: activeTab.title,
        url: activeTab.url,
      })
    })

    // 显示本机ipv4地址
    CurrentIPUtil.getUserIP(ip => {
      setIp(ip)
    });

  }, [])

  function clearInput() {
    setInputQrcode({
      input: '',
    })
    inputRef.current.focus()
  }

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <div className='App-body'>

        <div className='ellipsis activetab-title'>{activeTab.title}</div>
        <div className='ellipsis activetab-url'>{activeTab.url}</div>

        <div className='qrcode-container'>
          <QRCodeComp className='qrcode' text={activeTab.url} />
          <div className='space'></div>
          <QRCodeComp className='qrcode' text={inputQrcode.input}></QRCodeComp>
        </div>

        <div className='mt8'>
          <div className='flex items-end justify-between'>
            <FontAwesomeIcon className={xmarkIconClass} icon={faXmark} onClick={clearInput}></FontAwesomeIcon>
            文本转二维码:
          </div>
          <div className="input-group">
            <textarea className='input' type="text"
              placeholder='请输入文本'
              ref={inputRef}
              value={inputQrcode.input}
              onChange={(e) => setInputQrcode({ input: e.target.value })}
            ></textarea>
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
