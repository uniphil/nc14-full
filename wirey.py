#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
    wirey
    ~~~~~

    run a wirey site thing
    just ignore languages for now
    write templates and they'll work at their urls. url_for('template')
"""

from flask import Flask, url_for, render_template
from werkzeug.routing import BuildError

app = Flask(__name__)


def monkey_url_for(endpoint, **kwargs):
    try:
        return url_for(endpoint, **kwargs)
    except BuildError:
        return url_for('page', page=endpoint, **kwargs)


fake_gettext = lambda message: message


@app.route('/')
def home():
    return render_template('home.html', url_for=monkey_url_for, _=fake_gettext)


@app.route('/<page>')
def page(page):
    return render_template('{}.html'.format(page), url_for=monkey_url_for, _=fake_gettext)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
