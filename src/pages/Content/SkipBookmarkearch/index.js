
import { storageKeys } from '../../../utils/const';

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