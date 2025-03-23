const fs = require('fs');
const { string } = require('@tdewolff/minify');
const test = require('./test.cjs');

const originalFile = require.resolve('victory/dist/victory.js');
test(require(originalFile)); // Works before minification
console.log('✅ Original code works');

const minifiedCode = string(
    'application/javascript',
    fs.readFileSync(originalFile, 'utf8'),
);

const minifiedFile = `./minified-${Date.now()}.js`
fs.writeFileSync(minifiedFile, minifiedCode);

try {
    test(require(minifiedFile)); // Fails after minimification
    console.log('✅ Minified code works');
} catch (error) {
    console.error('❌ Minified code does not work', error);
} finally {
    fs.unlinkSync(minifiedFile);
}
