#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
    sched
    ~~~~~

    wrapper for the sched.org "rest" (lol) api
"""

import requests
from nc14 import app

sched_url_base = 'http://{}.sched.org/api/'\
    .format(app.config.get('SCHED_NAME'))

def sessions_list():
    request_params = dict(format='json',
                          api_key=app.config.get('SCHED_RO_KEY'))
    sessions = requests.get('{}/session/list'.format(sched_url_base),
                            params=request_params)
    return sessions.json()


def homepage_sessions(sessions):
    """filter the sessions to the ones that are on the home page"""
    return filter(lambda thing: 'homepage' in thing.get('tags', []), sessions)


# stuff = sessions_list().json()

# for thing in homepage_sessions(stuff):
#     print thing.get('tags'), thing['name']
