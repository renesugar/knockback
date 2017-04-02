/*
  knockback.js 2.0.0-alpha.1
  Copyright (c)  2011-2016 Kevin Malakoff.
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
  Source: https://github.com/kmalakoff/knockback
  Dependencies: Knockout.js, Backbone.js, and Underscore.js (or LoDash.js).
  Optional dependencies: Backbone.ModelRef.js and BackboneORM.
*/

import kb from '@knockback/core';
import FormattedObservable, { formattedObservable } from './formatted-observable';

const api = {
  FormattedObservable,
  formattedObservable,
  observableFormatted: formattedObservable,
};
kb.assign(kb, api);

module.exports = api;