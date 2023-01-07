/*
title: $:/plugins/orange/mermaid-tw5/wrapper.js
type: application/javascript
module-type: widget
author: Nathaniel Jones 2017-05-26
modified: E Furlan 2022-05-08
*/
(function() {
    // jslint node: true, browser: true
    // global $tw: false
    'use strict';

    var uniqueID = 1,
        Rocklib = require("$:/plugins/orange/mermaid-tw5/widget-tools.js").rocklib,
        Widget = require("$:/core/modules/widgets/widget.js").widget,
        rocklib = new Rocklib(),
        mermaidAPI = require("$:/plugins/orange/mermaid-tw5/mermaid.min.js")
        .mermaidAPI;

    // Changes to run on TiddlyWiki for Node.js - 2022-12-28
    // if($tw.browser && !window.mermaidAPI) {
    //     window.rocklib = new Rocklib();
    //     window.mermaidAPI = require("$:/plugins/orange/mermaid-tw5/mermaid.min.js")
    //         .mermaidAPI;
    // }

    let MermaidWidget = function(parseTreeNode, options) {
        this.initialise(parseTreeNode, options);
    };
    MermaidWidget.prototype = new Widget();
    // Render this widget into the DOM
    MermaidWidget.prototype.render = function(parent, nextSibling) {
        this.parentDomNode = parent;
        this.computeAttributes();
        this.execute();
        var tag = "mermaid",
            scriptBody = rocklib.getScriptBody(this, "text"),
            divNode = rocklib.getCanvas(this, tag),
            _insertSVG = function(svgCode, bindFunctions) {
                divNode.innerHTML = svgCode;
            };
        try {
            let options = {
                theme: ""
            };
            rocklib.getOptions(this, tag, options);

            mermaidAPI.render(divNode.id, scriptBody, _insertSVG);
            // window.mermaidAPI.render(divNode.id, scriptBody, _insertSVG);

        } catch (ex) {
            divNode.innerText = ex;
        }
        parent.insertBefore(divNode, nextSibling);
        this.domNodes.push(divNode);
    };
    MermaidWidget.prototype.execute = function() {
        // Nothing to do
    };
    /*
    Selectively refreshes the widget if needed. Returns true if the
    widget or any of its children needed re-rendering
    */
    MermaidWidget.prototype.refresh = function(changedTiddlers) {
        return false;
    };
    exports.mermaid = MermaidWidget;
})();
