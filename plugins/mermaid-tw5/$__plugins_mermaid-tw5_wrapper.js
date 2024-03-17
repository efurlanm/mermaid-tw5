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

        // Add D3 library to support pan and zoom
        // by fkmiec 2023-05-21
        var d3 = require("$:/plugins/orange/mermaid-tw5/d3.v6.min.js");

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

                // Add bind functions to support click events
                // by fkmiec 2023-05-21
                if (bindFunctions) {
                    console.log("calling bindFunctions");
                    bindFunctions(divNode);
                    console.log("done calling bindFunctions");
                }
            };
        try {
            let options = {
                theme: ""
            };
            rocklib.getOptions(this, tag, options);

            // Add securityLevel: 'loose' configuration to support click events
            // by fkmiec 2023-05-21
            mermaidAPI.initialize({
                startOnLoad: false,
                flowchart: { useMaxWidth: true, htmlLabels: true },
                securityLevel: 'loose',
            });
            // START ZOOM LOGIC: Enable zooming the mermaid diagram with D3
            // by fkmiec 2023-05-21
            let zoomEventListenersApplied = false;
            let isZoomEnabled = false;

            divNode.addEventListener('click', function() {
                console.log("Zoom enabled: " + isZoomEnabled);
                if(!zoomEventListenersApplied) {
                    console.log("Executing svg.each...");
                    var id = Date.now().toString(36);
                    console.log("id=" + id);
                    this.firstChild.setAttribute("id",id);
                    var svg = d3.select("#" + id);
                    svg.html("<g>" + svg.html() + "</g>");
                    var inner = svg.select("g");
                    var zoom = d3.zoom().filter(() => isZoomEnabled).on("zoom", function(event) {
                        inner.attr("transform", event.transform);
                    });
                    svg.call(zoom);
                    zoomEventListenersApplied = true;
                }
                isZoomEnabled?isZoomEnabled=false:isZoomEnabled=true;
            });
            //END ZOOM LOGIC

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
