# mermaid-tw5

Wrapper for mermaid (http://github.com/mermaid-js/mermaid).

Tiddlywiki website/notebook including the plugin: http://efurlanm.github.io/mermaid-tw5 . You can install the plugin by navigating to the site and dragging the link to your TiddlyWiki.

I'm not the author of the plugin, I just got what I was already ready, and updated the mermaid.js to the latest version. All credits are from the original authors:

* http://github.com/gt6796c/mermaid-tw5
* http://github.com/jasonmhoule/tw5-mermaid
* http://github.com/cedarvera/mermaid-tw5
* http://github.com/jceb/mermaid-tw5
* https://github.com/mermaid-js/mermaid
* and others

As I didn't make the plugin, I have no idea how to eliminate issues. Please contact the original authors.


# About TiddlyWiki (TW)

TW (http://tiddlywiki.com/) in single-file configuration typically bundles everything into a single file: the data, images, text, plugins, JavaScript, CSS, and HTML that make up TW itself (is capable of saving changes to itself). This lack of dependencies is usually very convenient: it means that it increases the chances of still working in the future, and allows you to download a single HTML file from the Internet (using the `Save Changes' button) and send this single file by email or WhatsApp (provided that all dependencies are within HTML). It will work anywhere, including your smartphone, as it does not require an external reader or the installation of any additional software. It can even be edited and used to add more material anywhere using the web browser as long as everything required is included within the HTML single file.

The plugin will add 1.3 MB to the empty TW 5.2.2 file size (2.2 MB), for a total of 3.5 MB. The idea is therefore not to use the plugin if it is not needed. Use the plugin only for a certain purpose or subject in a new TW file, and keep that file for that purpose only. As an example, we can have two TW files, one called index.html (without the plugin) and the other called gantt.html (with the plugin), with index.html having a link to gantt.html, and this way we keep a small index.html that loads fast, and a larger gantt.html file that loads a little longer and contains only the whole gantt subject. The downside in this case will be that we have two separate files instead of one. So you might think: if you need to send both files by email or whatsapp, then it's probably better to have a single file instead of two.
