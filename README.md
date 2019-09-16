# Introduction

a mini tool for print html page with browser.

# Installation

You can download the latest version of print_html.js from the GitHub releases or use the npm.

To install via npm:

```shell
npm install print_html --save
```

```shell
yarn add print_html
```

When installing via npm or yarn, import the library into your project:

```shell
import print from 'print_html'
```

# Use

```html
<html>
<body>
<div id="print">print this</div>

<script>
    // const print = document.querySelector('#print');
    // const printHtml = new PrintHtml(print);
    // or
    const printHtml = new PrintHtml('#print'); // you can add options: {dev: true} enable print css debugger
    printHtml.print();
</script>
</body>
</html>
```

# Detail

accept two arguments elementOrSelector and options

## elementOrSelector

| arguments | type | default | 
| --- | --- | ---| --- |
| dom | elementOrSelector | - | 

## Options

| arguments | type | default | 
| --- | --- | ---| --- |
| dev | Boolean | false | 
| style | string | '' | 
| printFrameId | string | 'print-html-id' | 

**Please make sure printFrameId only one in this page**

# Suport Browser

Chrome | Firefox | IE | Edge | Safari
