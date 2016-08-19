Ghostly Kerning
===============

A simple app (plugin) for the Ghost blogging platform which formats post excerpts and contents using David Merfield's [Typeset](https://github.com/davidmerfield/typeset) HTML pre-processor.

The new `excerpt-typeset` Handlebars helper also contains the following enhancements:

* Removes the text of headings, blockquotes and `<center>` tags.
* Provides truncation according to sentences, in addition to words or characters.

This was made mostly for my personal use, so it's a bit schizo. As I don't use Ghost for my personal website anymore, I'm not going to be updating it. Please hack it up to be more to your liking.

Installation
------------

1. Place the app directory in `content/apps/`.
2. Run `npm install` in the `content/apps/ghostly_kerning` directory.
3. Add it to your active apps by appending it to the array in the `value` field of the `activeApps` record in the `settings`. You can do this by access your blog database directly through a SQLite/Postgres client, or by [exporting a backup of your blog and editing the JSON](https://github.com/TryGhost/Ghost/wiki/Apps-Getting-Started-for-Ghost-Devs).

Usage
-----

Replace `{{content}}` and `{{excerpt}}` helpers in your theme with `{{content_typeset}}` and `{{excerpt_typeset}}`. Optionally, use the sentence truncation feature like so `{{excerpt_typeset sentences="4"}}` to make your excerpt the first four sentences.

Include [typeset.css](https://blot.im/typeset/demo/typeset.css) in your theme and tweak it for your chosen font for full advantage.

Todo
----

* Find an elegant way of spinning the excerpt features off into their own app that is compatible and not redundant with this one.
* Split into more files once [this issue gets fixed](https://github.com/TryGhost/Ghost/issues/5356).
