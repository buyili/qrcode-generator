
import { storageKeys, assets } from '../../../utils/const';
const logo = assets.logo;


var linkUrl = '';

(() => {
    const link = document.getElementsByClassName('link')[0]
    console.log("🚀 ~ toggleLink ~ link:", link)

    if (!link) {
        return;
    }

    const href = link.innerHTML;
    console.log("🚀 ~ toggleLink ~ href:", href)

    linkUrl = href;
})()

function createJumpBtn() {
    const link = document.getElementsByClassName('link')[0]
    if (!link) {
        return;
    }

    const eleA = document.createElement('a');
    eleA.href = linkUrl;
    eleA.innerHTML = '跳转';
    eleA.style.cssText = `
    margin-left: 10px;
    `;
    link.append(eleA)

    const eleImg = document.createElement('img');
    eleImg.src = logo;
    eleImg.style.cssText = `
    width: 12px;
    height: 12px;
    margin-right: 2px;
    vertical-align: baseline;
    `;
    eleA.prepend(eleImg);

}

function toggleLink() {
    const href = linkUrl;
    if (href) {
        // location.href = href;
        location.replace(href)
    }
}

chrome.storage.local.get([storageKeys.autoSkipBookmarkearthExternalLinkVerification], (result) => {
    const autoSkip = result[storageKeys.autoSkipBookmarkearthExternalLinkVerification] || true;

    createJumpBtn();

    if (autoSkip) {
        toggleLink();
    }
});