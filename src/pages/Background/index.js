import { dayFormat } from '../../utils/day_format';

const isDevelopment = process.env.NODE_ENV !== 'production';

chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 ~ chrome.runtime.onInstalled.addListener ~ run at:", dayFormat())

    // 菜单配置数组
    const menuItems = [
        { id: "createQRCodeForPage", title: "为此页面创建二维码", contexts: ["page"] },
        { id: "createQRCodeForSelecton", title: "为选中文本创建二维码", contexts: ["selection"] },
        { id: "createQRCodeForLink", title: "为链接创建二维码", contexts: ["link"] },
        { id: "createQRCodeForImage", title: "为图片链接创建二维码", contexts: ["image"] },
        { id: "createQRCodeForVideo", title: "为视频链接创建二维码", contexts: ["video"] },
    ];

    if (isDevelopment) menuItems.push({ id: "clearBackgroundConsoleLog", title: "清理 background 日志", contexts: ["all"] })

    // 批量创建菜单
    menuItems.forEach(item => chrome.contextMenus.create(item));
});

// 统一处理菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("🚀 ~ 菜单点击信息:", info);

    if (info.menuItemId === "createQRCodeForPage") {
        chrome.action.openPopup();
        return;
    }

    if (info.menuItemId == 'clearBackgroundConsoleLog') {
        console.clear()
        return true;
    }

    // 根据菜单ID映射需要存储的数据
    const dataMap = {
        createQRCodeForSelecton: info.selectionText,
        createQRCodeForLink: info.linkUrl,
        createQRCodeForImage: info.srcUrl,
        createQRCodeForVideo: info.srcUrl
    };

    // 获取当前需要处理的数据
    const content = dataMap[info.menuItemId];

    // 只有存在有效内容时才执行操作
    if (content) {
        chrome.storage.local.set({ selectedText: content }, () => {
            chrome.action.openPopup();
        });
    } else {
        console.log("🚀 ~ 菜单点击: 没有可处理的内容");
    }
});

/**
 * 拦截在新建窗口中打开的广告
 * @param {chrome.tabs.Tab} tab 
 */
function blockNewWindowAD(tab) {
    // 判断 newWindowAD 方式一：窗口高度等于 99
    if (tab.height == 99) {
        chrome.tabs.remove(tab.id);
        return
    }
    // 判断 newWindowAD 方式二：新建窗口时 tab.pendingUrl 属性值为空。
    // 注意：这只适用于 chrome.tabs.onCreated 事件，不适用于 chrome.tabs.onUpdated 事件
    // 根据 tab.active 是否为 true 区分广告。例如第三方网站(如 x.com)使用google账号登录时，弹窗标签信息中 tab.active = true
    if (!tab.pendingUrl && tab.active == false) {
        chrome.tabs.remove(tab.id)
        return
    }
}


// 拦截 https://akuma.moe/ 网站换页时的广告弹窗
chrome.tabs.onCreated.addListener((tab) => {
    // console.log("🚀 ~ chrome.tabs.onCreated.addListener ~ tab:", tab)
    blockNewWindowAD(tab)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log("🚀 ~ chrome.tabs.onUpdated.addListener ~ tabId, changeInfo, tab:", tabId, changeInfo, tab)
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");

    if (message == 'clearlog') {
        console.clear()
        sendResponse('success')
        return true
    }

    return true
})