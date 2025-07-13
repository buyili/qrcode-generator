chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "createQRCodeForPage",
        title: "为此页面创建二维码",
        contexts: ["page"]
    });
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "createQRCodeForSelecton",
        title: "为选中文本创建二维码",
        contexts: ["selection"]
    });
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "createQRCodeForLink",
        title: "为链接创建二维码",
        contexts: ["link"]
    });
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "createQRCodeForImage",
        title: "为图片链接创建二维码",
        contexts: ["image"]
    });
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "createQRCodeForVideo",
        title: "为视频链接创建二维码",
        contexts: ["video"]
    });
});

// Listen for clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("🚀 ~ chrome.contextMenus.onClicked.addListener ~ info:", info)
    if (info.menuItemId === "createQRCodeForPage") {
        chrome.action.openPopup();
    }
    else if (info.menuItemId === "createQRCodeForSelecton") {
        if (info.selectionText) {
            console.log("Selected text: " + info.selectionText);
            chrome.storage.local.set({ selectedText: info.selectionText }, () => {
                chrome.action.openPopup();
            });
        } else {
            console.log("No text selected.");
        }
    }
    else if (info.menuItemId === "createQRCodeForLink") {
        chrome.storage.local.set({ selectedText: info.linkUrl }, () => {
            chrome.action.openPopup();
        });
    }
    else if (info.menuItemId === "createQRCodeForImage") {
        chrome.storage.local.set({ selectedText: info.srcUrl }, () => {
            chrome.action.openPopup();
        });
    }
    else if (info.menuItemId === "createQRCodeForVideo") {
        chrome.storage.local.set({ selectedText: info.srcUrl }, () => {
            chrome.action.openPopup();
        });
    }
});