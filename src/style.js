const style = `
    * {
        // 强制打印背景
        -webkit-print-color-adjust: exact !important;   /* Chrome, Safari */
        color-adjust: exact !important;                 /*Firefox*/
    }
    html, body {
        width: 100%;
        margin: 0px; 
        padding: 0px;
        font-size: 12px;
    }
    /* 禁止内部分页 */
    table, thead, tbody, tr { 
        page-break-before: auto; 
        page-break-after: auto; 
        page-break-inside: avoid; 
        break-inside: avoid;
        width: 100%;
    }
    // 去除多余元素
    header, footer, aside, nav, form, iframe {
        display: none;
    }
    table {
        font-size: 12px;
        border:1px solid #000;
        border-collapse:collapse;    //去掉边框间空隙
    }
    th,td {
        border: 1px solid #000000;
        text-align: center;
        padding: 5px 10px;
    }
    // 打印样式设置
    @page {
        size: A4;
        margin: 0mm;
    }
    /*在超链接后面添加带<http://XXX>的完整地址*/
    article a {
        font-weight: bolder;
        text-decoration: none;
    }
    article a[href^=http]:after {
        content:" <" attr(href) "> ";
    }
`;

export default style;
