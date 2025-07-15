
import { storageKeys, assets } from '../../../utils/const';
const logo = assets.logo;

function createJumpBtn() {
    const link = document.getElementsByClassName('link')[0]
    if (!link) {
        return;
    }

    const eleA = document.createElement('a');
    eleA.href = link.innerHTML;
    eleA.innerHTML = '跳转';
    eleA.style.cssText = `
    margin-left: 10px;
    `;

    const eleImg = document.createElement('img');
    eleImg.src = logo;
    eleImg.style.cssText = `
    width: 12px;
    height: 12px;
    margin-right: 2px;
    vertical-align: baseline;
    `;
    eleA.prepend(eleImg);

    link.append(eleA)
}

function toggleLink() {
    const link = document.getElementsByClassName('link')[0]
    console.log("🚀 ~ toggleLink ~ link:", link)

    if (!link) {
        return;
    }

    const href = link.innerHTML;
    console.log("🚀 ~ toggleLink ~ href:", href)


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