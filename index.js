var App             = require('ghost-app'),
    hbs             = require('express-hbs'),
    _               = require('lodash'),
    downsize        = require('downsize'),
    typeset         = require('typeset'),
    ghostly_kerning;

ghostly_kerning = App.extend({

    install: function () {},

    uninstall: function () {},

    activate: function () {

	    this.app.helpers.register('content_typeset', this.content_typeset);
	    this.app.helpers.register('excerpt_typeset', this.excerpt_typeset);
    
    },

    excerpt_typeset: function (options) {
        var truncateOptions = (options || {}).hash || {},
            excerpt;

        truncateOptions = _.pick(truncateOptions, ['words', 'characters', 'sentences']);
        _.keys(truncateOptions).map(function (key) {
            truncateOptions[key] = parseInt(truncateOptions[key], 10);
        });

        /*jslint regexp:true */
        excerpt = String(this.html);
        // Strip inline and bottom footnotes
        excerpt = excerpt.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
        excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');
        // Strip headings, blockquotes and image captions -- hacky dyates addition
        excerpt = excerpt.replace(/<h[1-6].*?>.*?<\/h[1-6]>/gi, '');
        excerpt = excerpt.replace(/<blockquote>.*?<\/blockquote>/gi, '');
        excerpt = excerpt.replace(/<center>.*?<\/center>/gi, '');
        // Strip other html
        excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
        excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');
        /*jslint regexp:false */


        if (truncateOptions.sentences) {
            excerpt = excerpt.split(/([\.\?!] )/).slice(0,(truncateOptions.sentences*2)).join("");
            excerpt = typeset("<p>" + excerpt + "</p>"); //need to wrap with <p>s so that typeset works

            return new hbs.handlebars.SafeString(excerpt);
        }


        if (!truncateOptions.words && !truncateOptions.characters) {
            truncateOptions.words = 50;
        }

        return new hbs.handlebars.SafeString(
                typeset("<p>" + downsize(excerpt, truncateOptions) + "</p>")
        );
    },

    content_typeset: function (options) {
        var truncateOptions = (options || {}).hash || {};
        truncateOptions = _.pick(truncateOptions, ['words', 'characters']);
        _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
        });

        if (truncateOptions.hasOwnProperty('words') || truncateOptions.hasOwnProperty('characters')) {

            return new hbs.handlebars.SafeString(
                typeset(downsize(this.html, truncateOptions))
            );
        }

        return new hbs.handlebars.SafeString(typeset(this.html));
    },

    deactivate: function () {}

});

module.exports = ghostly_kerning;
