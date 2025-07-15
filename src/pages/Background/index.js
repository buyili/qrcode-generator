chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 ~ chrome.runtime.onInstalled.addListener ~ runtime:", Date.now())

    // 菜单配置数组
    const menuItems = [
        { id: "createQRCodeForPage", title: "为此页面创建二维码", contexts: ["page"] },
        { id: "createQRCodeForSelecton", title: "为选中文本创建二维码", contexts: ["selection"] },
        { id: "createQRCodeForLink", title: "为链接创建二维码", contexts: ["link"] },
        { id: "createQRCodeForImage", title: "为图片链接创建二维码", contexts: ["image"] },
        { id: "createQRCodeForVideo", title: "为视频链接创建二维码", contexts: ["video"] },
    ];

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
        console.log("没有可处理的内容");
    }
});
