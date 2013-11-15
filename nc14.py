#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
    nc14
    ~~~~

    website for the ewb national conference 2014
"""

from random import choice
from functools import partial
from werkzeug.routing import BuildError
from flask import Flask, request, redirect, url_for, render_template
from flask.ext.babel import Babel
# from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.jinja_env.line_statement_prefix = '%%'
app.jinja_env.line_comment_prefix = '##'
app.config.update(BABEL_DEFAULT_TIMEZONE='UTC',
                  # SQLALCHEMY_DATABASE_URI='sqlite://',  # memory for now
                  SCHED_NAME='nc14test',
                  SCHED_RO_KEY='7f82cee5b43e2cdb49f3cfabea82b489')


# import sched


babel = Babel(app)
# db = SQLAlchemy(app)


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
        if 'lang' not in kwargs and endpoint != 'static':
            kwargs.update(lang=get_locale())
        try:
            return url_for(endpoint, **kwargs)
        except BuildError:
            return url_for('page', page=endpoint, **kwargs)
    kwargs.update(lang=kwargs.get('lang', get_locale()),
                  url_for=monkey_url_for)
    return render_template(*args, **kwargs)


@app.route('/')
def root():
    return redirect(url_for('home', lang='en'))


@app.route('/<lang>/')
def home(lang):
    # all_sessions = sched.sessions_list()
    # homepage_sessions = sched.homepage_sessions(all_sessions)
    # return monkey_render('home.html', sessions=homepage_sessions)
    return monkey_render('home.html', choice=choice, page='home')


@app.route('/<lang>/<page>/')
def page(lang, page):
    return monkey_render('{}.html'.format(page), page=page)


def freeze_app():
    from flask_frozen import Freezer
    debugged = app.debug
    app.debug = True
    url_rules = ('about', 'schedule', 'logistics', 'partner', 'register')
    for rule in url_rules:
        app.add_url_rule('/<lang>/{}/'.format(rule), rule, partial(page, page=rule))
    freezer = Freezer(app)
    freezer.freeze()
    app.debug = debugged


def run_dev():
    for static_thing in ('favicon.ico', 'robots.txt'):
        app.add_url_rule('/' + static_thing, static_thing, lambda: '')
    app.run(debug=True, host='0.0.0.0', port=5000)


if __name__ == '__main__':
    import sys
    if len(sys.argv) == 2 and sys.argv[1] == 'freeze':
        freeze_app()
        print 'frozen.'
    else:
        run_dev()
