const node = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const babel = require ('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const configs = {
    'web': {
        input: './src/index.js',
        output: {
            file: './dist/print_html.min.js',
            format: 'umd',
            compact: true,
        }
    },
    'node': {
        input: './src/index.js',
        output: {
            file: './dist/print_html.common.js',
            format: 'cjs',
        }
    }
};

const genConfig = (name = 'web') => {
    const opt = configs[name];
    const config = {
        input: opt.input,
        output: {
            file: 'build.js',
            format: 'umd',
            name: 'PrintHtml',
            ...opt.output
        },
        plugins: [
            node(),
            cjs(),
            babel({
                exclude: 'node_modules/**'
            }),
            uglify.uglify(),
        ]
    }
    return config;
}

module.exports = genConfig(process.env.TARGET);