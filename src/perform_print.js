import { Browser } from './utils';
function performPrint(iframeElement) {
    try {
        iframeElement.focus();
        // If Edge or IE, try catch with execCommand
        if (Browser.isEdge() || Browser.isIE()) {
            try {
                iframeElement.contentWindow.document.execCommand('print', false, null);
            } catch (e) {
                iframeElement.contentWindow.print();
            }
        } else {
            // Other browsers
            iframeElement.contentWindow.print();
        }
    } catch (error) {
        console.error(error);
    } finally {
        iframeElement.parentNode.parentNode.removeChild(iframeElement.parentNode);
    }
}

export default performPrint;
