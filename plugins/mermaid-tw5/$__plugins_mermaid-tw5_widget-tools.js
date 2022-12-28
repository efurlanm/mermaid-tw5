/*
title: $:/plugins/orange/mermaid-tw5/widget-tools.js
type: application/javascript
author: Nathaniel Jones 2017-05-26
modified: E Furlan 2022-05-08
*/
(function() {
    "use strict";

    function Rocklib() {
        this.uniqueID = 1;
        this.hue = .2;
    };
    // tries to un-parse the wikitext. of dubious value
    Rocklib.prototype.getScriptBody = function(src, attr) {
        var scriptBody = src.getAttribute(attr, src
            .parseTreeNode.text || "");
        if (src.parseTreeNode.text) {
            scriptBody = src.parseTreeNode.text;
        } else if (src.parseTreeNode.children) {
            var kids = src.parseTreeNode.children;
            for (var k in kids) {
                var kk = kids[k];
                switch (kk.type) {
                    // no wikiparsing found
                    case "text":
                        scriptBody += kk.text;
                        break;
                        // internal link, make it a permalink reference
                    case "link":
                        scriptBody += "#" + kk.children[0].text;
                        break;
                        // -- gets interpreted as an HTML element, we
                        // don't want that
                    case "entity":
                        switch (kk.entity) {
                            case "&ndash;":
                                scriptBody += "--";
                                break;
                        };
                        break;
                        // just re-write it back out
                    case "element":
                        switch (kk.tag) {
                            case "a":
                                scriptBody += kk.children[0]
                                    .text;
                        }
                };
            }
        }
        return scriptBody;
    };
    /*
    Runs through lots of ways to get options. It can pull them from a
    named data Tiddler, from the fields of the Tiddler, and from the
    attributes of the widget specified by 'tag'. Any value pulled is
    treated as JSON first and then as straight text.
    @param src
    @param tag
    @param options
    @returns {*}
    */
    Rocklib.prototype.getOptions = function(src, tag, options) {
        try {
            // try to set options from fields on tiddler first
            // [tag-xxx]
            var tt = src.getVariable('currentTiddler');
            if (tt) {
                var t = src.wiki.getTiddler(tt);
                if (t) {
                    // this looks for fields that start with our tag
                    // and then maps a.x to aX since something is
                    // unCamelCasing the vars
                    for (var f in t.fields) {
                        var fi = f.indexOf(tag);
                        if (fi != 0) continue;
                        var k = f.substring(tag.length + 1);
                        var cap = k.indexOf(".");
                        while (cap > -1) {
                            if (k.length < cap + 2) break;
                            k = k.substring(0, cap) + k.charAt(
                                    cap + 1)
                                .toUpperCase() + k.substring(
                                    cap + 2);
                            cap = k.indexOf(".");
                        }
                        var v = t.fields[f];
                        // try as JSON
                        try {
                            options[k] = JSON.parse(v);
                        }
                        // last attempt is just a string
                        catch (ex) {
                            options[k] = v;
                        }
                    }
                }
            }
            // treat any attributes as JSON representations of options
            // for the object
            for (var att in src.attributes) {
                var attval = src.getAttribute(att);
                // allow for data from named tiddlers
                if ($tw.wiki.tiddlerExists(attval)) {
                    var data = $tw.wiki.getTiddlerData(attval);
                    options[att] = data;
                } else {
                    // try as JSON
                    try {
                        options[att] = JSON.parse(attval);
                    }
                    // last attempt is just a string
                    catch (ex) {
                        options[att] = attval;
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
        return options;
    };
    /*
    Retrieves a canvas to work with based on the calling functions
    need of a "div" or "canvas" element
    @param src
    @param tag
    @param type
    @returns {Element}
    */
    Rocklib.prototype.getCanvas = function(src, tag, type) {
        type = typeof(type) === "undefined" ? "div" : type;
        var height = src.getAttribute("height");
        var width = src.getAttribute("width");
        var canvas = src.document.createElement(type);
        var style = "";
        if (type === "canvas") {
            if (width) canvas.width = width;
            if (height) canvas.height = height;
        } else {
            if (height) style += " height:" + height;
            if (width) style += " width:" + width;
            if (style) canvas.setAttribute("style", style);
        }
        canvas.setAttribute("id", tag + "_" + this.uniqueID);
        this.uniqueID++;
        return canvas;
    };
    /*
    Based on <http://martin.ankerl.com/2009/12/09/how-to-create-
    random-colors-programmatically/>
    @param s
    @param v
    @returns {string}
    */
    Rocklib.prototype.nextColor = function(s, v) {
        var golden_ratio_conjugate = 0.618033988749895
        this.hue += golden_ratio_conjugate;
        this.hue %= 1;
        var rgb = this.hsv_to_rgb(this.hue, s, v);
        return "#" + rgb.r.toString(16) + rgb.g.toString(16) +
            rgb.b.toString(16);
    };
    /*
    Taken from <http://stackoverflow.com/questions/17242144/
    javascript-convert-hsb-hsv-color-to-rgb-accurately>
    accepts parameters
    r  Object = {r:x, g:y, b:z}
    OR
    r, g, b
    */
    Rocklib.prototype.rgb_to_hsv = function(r, g, b) {
        if (arguments.length === 1) {
            g = r.g, b = r.b, r = r.r;
        }
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            d = max - min,
            h,
            s = (max === 0 ? 0 : d / max),
            v = max / 255;
        switch (max) {
            case min:
                h = 0;
                break;
            case r:
                h = (g - b) + d * (g < b ? 6 : 0);
                h /= 6 * d;
                break;
            case g:
                h = (b - r) + d * 2;
                h /= 6 * d;
                break;
            case b:
                h = (r - g) + d * 4;
                h /= 6 * d;
                break;
        }
        return {
            h: h,
            s: s,
            v: v
        };
    };
    /*
    Taken from <http://stackoverflow.com/questions/17242144/
    javascript-convert-hsb-hsv-color-to-rgb-accurately>
    accepts parameters
    h  Object = {h:x, s:y, v:z}
    OR
    h, s, v
    */
    Rocklib.prototype.hsv_to_rgb = function(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    };
    exports.rocklib = Rocklib;
})();
