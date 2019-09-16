/* eslint-disable */
export const Browser = {
    // Firefox 1.0+
    isFirefox: () => {
        return typeof InstallTrigger !== 'undefined';
    },
    // Internet Explorer 6-11
    isIE: () => {
        return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;
    },
    // Edge 20+
    isEdge: () => {
        return !Browser.isIE() && !!window.StyleMedia;
    },
    // Chrome 1+
    isChrome: (context = window) => {
        return !!context.chrome;
    },
    // At least Safari 3+: "[object HTMLElementConstructor]"
    isSafari: () => {
        return (
            Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
            navigator.userAgent.toLowerCase().indexOf('safari') !== -1
        );
    },
};

export function loadIframeImages(images) {
    const promises = [];
    for (let image of images) {
        promises.push(loadIframeImage(image));
    }
    return Promise.all(promises);
}

function loadIframeImage(image) {
    return new Promise(resolve => {
        const pollImage = () => {
            !image || typeof image.naturalWidth === 'undefined' || image.naturalWidth === 0 || !image.complete
                ? setTimeout(pollImage, 500)
                : resolve();
        };
        pollImage();
    });
}
