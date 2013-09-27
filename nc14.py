#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
    nc14
    ~~~~

    website for the ewb national conference 2014
"""

from werkzeug.routing import BuildError
from flask import Flask, request, redirect, url_for, render_template
from flask.ext.babel import Babel


app = Flask(__name__)
app.jinja_env.line_statement_prefix = '%%'
app.jinja_env.line_comment_prefix = '##'
app.config.update(BABEL_DEFAULT_TIMEZONE='UTC')


babel = Babel(app)


@babel.localeselector
def get_locale():
    if request.path.startswith('/en/'):
        return 'en'
    elif request.path.startswith('/fr/'):
        return 'fr'
    else:
        return request.accept_languages.best_match(['en', 'fr'])


def monkey_render(*args, **kwargs):
    def monkey_url_for(endpoint, **kwargs):
        try:
            return url_for(endpoint, **kwargs)
        except BuildError:
            kwargs.update(lang=get_locale())
            return url_for('page', page=endpoint, **kwargs)
    kwargs.update(lang=kwargs.get('lang', 'en'),
                  url_for=monkey_url_for)
    return render_template(*args, **kwargs)


@app.route('/')
def root():
    return redirect(url_for('home', lang='en'))


@app.route('/<lang>/')
def home(lang):
    return monkey_render('home.html')


@app.route('/<lang>/<page>')
def page(lang, page):
    return monkey_render('{}.html'.format(page))


for static_thing in ('favicon.ico', 'robots.txt'):
    app.add_url_rule('/' + static_thing, static_thing, lambda: '')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
