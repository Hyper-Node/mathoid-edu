'use strict';

//
//  Load the packages needed for MathJaxv3
//
const {TeX} = require('mathjax-full/js/input/tex.js');
const {HTMLDocument} = require('mathjax-full/js/handlers/html/HTMLDocument.js');
const {liteAdaptor} = require('mathjax-full/js/adaptors/liteAdaptor.js');
const {STATE} = require('mathjax-full/js/core/MathItem.js');
const {AllPackages} = require('mathjax-full/js/input/tex/AllPackages.js');
const packages = AllPackages.filter((name) => name !== 'bussproofs');
// These  loaded packages possibly have to be adapter
const tex = new TeX({packages: packages});
const html = new HTMLDocument('', liteAdaptor(), {InputJax: tex});
const {SerializedMmlVisitor} = require('mathjax-full/js/core/MmlTree/SerializedMmlVisitor.js');


function tex2MathML( input ) {
    const visitor = new SerializedMmlVisitor();
    const toMathML = (node =>
        visitor.visitTree(node, html
        ));
    var conv = html.convert(input, {display: false, end: STATE.CONVERT});
    var mml = toMathML(conv);
    return mml;
}

module.exports = {
    tex2MathML,
};
