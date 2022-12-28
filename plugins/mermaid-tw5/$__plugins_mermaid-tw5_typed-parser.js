/*
title: $:/plugins/orange/mermaid-tw5/typed-parser.js
type: application/javascript
module-type: parser
author: Nathaniel Jones 2017-05-26
modified: E Furlan 2022-05-08

This parser wraps unadorned railroad syntax into a railroad widget

*/
(function() {
    // jslint node: true, browser: true
    // global $tw: false
    'use strict';
    let MermaidParser = function(type, text, options) {
        let element = {
            type: "mermaid",
            tag: "$mermaid",
            text: text
        };
        this.tree = [element];
    };
    exports["text/vnd.tiddlywiki.mermaid"] = MermaidParser;
})();
