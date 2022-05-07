# mermaid-tw5

Wrapper for mermaid (http://github.com/mermaid-js/mermaid)

Website/plugin: http://efurlanm.github.io/mermaid-tw5

You can install the plugin by navigating to the site and dragging the link to your TiddlyWiki. More instructions on the website.

I'm not the author of the plugin, I just got what I was already ready, and updated the mermaid.js to the latest version. All credits are from the original authors.


# About TiddlyWiki (TW)

TW (http://tiddlywiki.com/) in single-file configuration typically bundles everything into a single file: the data, images, text, plugins, JavaScript, CSS, and HTML that make up TW itself. This lack of dependencies is usually very convenient: it means it greatly increases the chances that it will still work in the future. It also allows you to download the HTML file from the Internet (using the `Save changes` button) and send it via email or whatsapp. It will work anywhere, including your smartphone, as it does not require an external reader or the installation of any additional software. It can even be edited and used to add more material, as everything needed to create or change is also included within the HTML file.

The plugin will add 1.3 MB to the empty TW 5.2.2 file size (2.2 MB), for a total of 3.5 MB. The idea is therefore not to use the plugin if it is not needed. Use the plugin only for a certain purpose or subject in a new TW file, and keep that file for that purpose only. As an example, we can have two TW files, one called index.html (without the plugin) and the other called gantt.html (with the plugin), with index.html having a link to gantt.html, and this way we keep a small index.html that loads fast, and a larger gantt.html file that loads a little longer and contains only the whole gantt subject. The disadvantage in this case will be that we have two separate files instead of one, so you have to think, if you need to send both files by email or whatsapp, then it will be better to have a single index.html file containing the plugin, than two separate files.
