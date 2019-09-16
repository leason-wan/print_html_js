import performPrint from './perform_print';
import { loadIframeImages } from './utils';
import style from './style';

class PrintHtml {
    constructor(dom, options) {
        this.options = this.init(dom, options);
    }
    init(dom, options) {
        const initOptions = {
            element: '',
            style,
            printFrameId: 'print-html-id',
            dev: false
        };
        if (typeof dom === 'string') {
            initOptions.element = document.querySelector(dom);
        } else if (dom instanceof HTMLElement) {
            initOptions.element = dom;
        } else {
            throw new Error('Invalid HTML element');
        }
        return { ...initOptions, ...options };
    }
    print() {
        let printFrame = document.createElement('iframe');
        // printFrame.setAttribute('style', 'visibility: hidden;height: 0; width: 0;position: absolute;');
        printFrame.setAttribute('id', this.options.printFrameId);
        const bgDiv = document.createElement('div');
        bgDiv.style = 'visibility: hidden;height: 0; width: 0;position: absolute;';
        bgDiv.appendChild(printFrame);
        document.body.appendChild(bgDiv);

        // document.body.appendChild(printFrame);
        const iframeElement = document.getElementById(this.options.printFrameId);
        let printDocument = iframeElement.contentWindow || iframeElement.contentDocument;
        if (printDocument.document) {
            printDocument = printDocument.document;
        }
        // copy host enviroment
        // const styles = document.querySelectorAll('style,link');
        // const scripts = document.querySelectorAll('script');
        // for(let style of styles) {
        //     printDocument.head.appendChild(style.cloneNode(true));
        // };
        // for(let style of scripts) {
        //     printDocument.head.appendChild(style.cloneNode(true));
        // };
        printDocument.body.appendChild(this.options.element.cloneNode(true));
        // Add custom style
        if (this.options.style) {
            const style = document.createElement('style');
            style.innerHTML = this.options.style;
            printDocument.head.appendChild(style);
        }
        // If printing images, wait for them to load inside the iframe
        // dev debug
        if (this.options.dev) {
            bgDiv.setAttribute('style', 'height: 100%; width: 100%;position: absolute;top: 0;left: 0;z-index: 99999;background-color: #0000005c;');
            iframeElement.setAttribute('style', 'height: 100%; width: 700px;position: absolute;top: 0;left: 25%;background-color:#fff;');
            const colseBtn = document.createElement('div');
            colseBtn.innerHTML = '关闭打印预览';
            colseBtn.style = 'height: 20px;position: absolute;top: 20px;left: 10%;border-radius: 4px;text-align: center;line-height: 20px;font-size: 20px;background-color: #00C4C0;color: #fff;padding: 10px;cursor: pointer;';
            colseBtn.addEventListener('click', () => {
                bgDiv.parentElement.removeChild(bgDiv);
            });
            bgDiv.appendChild(colseBtn);
        } else {
            const images = printDocument.getElementsByTagName('img');
            if (images.length > 0) {
                loadIframeImages(images).then(() => performPrint(iframeElement));
            } else {
                performPrint(iframeElement);
            }
        }
    };
}

export default PrintHtml;
