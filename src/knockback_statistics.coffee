###
  knockback_statistics.js
  (c) 2012 Kevin Malakoff.
  Knockback.Stats is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
###

if (typeof(require) != 'undefined') then _ = require('underscore') else _ = window._
_ = _._ if _ and (_.hasOwnProperty('_')) # LEGACY
kb = if not window.kb and (typeof(require) != 'undefined') then require('knockback') else window.kb

class kb.Statistics
  constructor: ->
    @type_trackers = {}

  typeTracker: (type) ->
    return @type_trackers[type] if @type_trackers.hasOwnProperty(type)
    type_tracker = []; @type_trackers[type] = type_tracker
    return type_tracker

  register: (type, obj) ->
    @typeTracker(type).push(obj)

  unregister: (type, obj) ->
    type_tracker = @typeTracker(type)
    index = _.indexOf(type_tracker, obj)
    throw "failed to unregister type: #{type}" if index < 0
    type_tracker.splice(index, 1)

  registeredCount: (type) -> return @typeTracker(type).length
