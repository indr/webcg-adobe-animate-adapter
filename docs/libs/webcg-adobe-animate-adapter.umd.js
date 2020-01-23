(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  (function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
  }((function () {
    var version = "2.5.0";

    var Parser = /*@__PURE__*/(function () {
      function Parser () {}

      Parser.prototype.parse = function parse (raw) {
        if (typeof raw === 'object') { return raw }
        if (typeof raw !== 'string') { return null }
        if (raw.length <= 0) { return null }
        if (raw[0] === '<') {
          return this._parseXml(raw)
        }
        if (raw[0] === '{') {
          return JSON.parse(raw)
        }
      };

      Parser.prototype._parseXml = function _parseXml (xmlString) {
        var xmlDoc = this._loadXmlDoc(xmlString);
        var result = {};
        var componentDataElements = xmlDoc.getElementsByTagName('componentData');
        for (var i = 0; i < componentDataElements.length; i++) {
          var componentId = componentDataElements[i].getAttribute('id');
          result[componentId] = {};
          var dataElements = componentDataElements[i].getElementsByTagName('data');
          for (var ii = 0; ii < dataElements.length; ii++) {
            var dataElement = dataElements[ii];
            result[componentId][dataElement.getAttribute('id')] = dataElement.getAttribute('value');
          }
        }
        return result
      };

      Parser.prototype._loadXmlDoc = function _loadXmlDoc (xmlString) {
        if (window && window.DOMParser && typeof XMLDocument !== 'undefined') {
          return new window.DOMParser().parseFromString(xmlString, 'text/xml')
        } else {
          // Internet Explorer
          // eslint-disable-next-line no-undef
          var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
          xmlDoc.async = false;
          xmlDoc.loadXML(xmlString);
          return xmlDoc
        }
      };

      return Parser;
    }());

    var FUNCTIONS = ['play', 'stop', 'next', 'update'];

    var State = Object.freeze({ 'stopped': 0, 'playing': 1 });

    var WebCG = function WebCG (window) {
      var this$1 = this;

      this._listeners = {};
      this._window = window;
      FUNCTIONS.forEach(function (each) {
        this$1._window[each] = this$1[each].bind(this$1);
        this$1._window[each].webcg = true;
      });
      this._state = State.stopped;
      this._bufferCommands = false;
    };

    WebCG.prototype.addEventListener = function addEventListener (type, listener) {
      if (typeof listener !== 'function') { throw new TypeError('listener must be a function') }
      var listeners = this._listeners[type] = this._listeners[type] || [];
      listeners.push(listener);
      this._addWindowFunction(type);
    };

    WebCG.prototype.once = function once (type, listener) {
      if (typeof listener !== 'function') { throw new TypeError('listener must be a function') }
      var onceWrapper = function () {
        this.removeEventListener(type, onceWrapper);
        return listener.apply(null, arguments)
      }.bind(this);
      this.addEventListener(type, onceWrapper);
    };

    WebCG.prototype._addWindowFunction = function _addWindowFunction (name) {
      if (typeof this._window[name] === 'function' && this._window[name].webcg) { return }

      this._window[name] = this.invokeFunction.bind(this, name);
      this._window[name].webcg = true;
    };

    WebCG.prototype.invokeFunction = function invokeFunction (name) {
      if (this._bufferCommand.apply(this, ['_dispatch'].concat(Array.prototype.slice.call(arguments, 0)))) { return }
      this._dispatch.apply(this, arguments);
    };

    WebCG.prototype.removeEventListener = function removeEventListener (type, listener) {
      var listeners = this._getListeners(type);
      var idx = listeners.indexOf(listener);
      if (idx >= 0) {
        listeners.splice(idx, 1);
      }

      if (listeners.length === 0) {
        this._removeWindowFunction(type);
      }
    };

    WebCG.prototype._removeWindowFunction = function _removeWindowFunction (name) {
      if (FUNCTIONS.indexOf(name) >= 0) { return }
      if (typeof this._window[name] !== 'function' || !this._window[name].webcg) { return }
      delete this._window[name];
    };

    WebCG.prototype.bufferCommands = function bufferCommands () {
      this._bufferCommands = true;
      this._commandQueue = [];
    };

    WebCG.prototype.flushCommands = function flushCommands () {
        var this$1 = this;

      this._bufferCommands = false;
      this._commandQueue.forEach(function (each) {
        this$1[each.name].apply(this$1, each.args);
      });
      this._commandQueue = [];
    };

    WebCG.prototype.play = function play () {
      if (this._bufferCommand('play')) { return }
      if (this._state !== State.playing) {
        this._dispatch('play');
        this._state = State.playing;
      }
    };

    WebCG.prototype.stop = function stop () {
      if (this._bufferCommand('stop')) { return }
      if (this._state === State.playing) {
        this._dispatch('stop');
        this._state = State.stopped;
      }
    };

    WebCG.prototype.next = function next () {
      if (this._bufferCommand('next')) { return }
      this._dispatch('next');
    };

    WebCG.prototype.update = function update (data) {
      if (this._bufferCommand('update', data)) { return }
      var handled = this._dispatch('update', data);
      if (!handled) {
        var parsed = new Parser().parse(data);
        this._dispatch('data', parsed);
      }
    };

    WebCG.prototype._bufferCommand = function _bufferCommand (name) {
      if (!this._bufferCommands) { return false }
      var args = Array.prototype.slice.call(arguments, 1);
      this._commandQueue.push({ name: name, args: args });
      return true
    };

    WebCG.prototype._dispatch = function _dispatch (type) {
      var listeners = this._getListeners(type);
      var args = Array.prototype.slice.call(arguments, 1);
      var handled = false;
      for (var i = listeners.length - 1; i >= 0 && handled === false; i--) {
        var listener = listeners[i];
        if (typeof listener !== 'function') { continue }
        try {
          handled = !!listener.apply(null, args);
        } catch (error) {
          console.warn(("[webcg-framework] " + type + " event listener threw " + (error.constructor.name) + ": " + (error.message)));
          handled = false;
        }
      }
      return handled
    };

    WebCG.prototype._getListeners = function _getListeners (type) {
      this._listeners[type] = this._listeners[type] || [];
      return this._listeners[type]
    };

    // Aliases
    WebCG.prototype.on = WebCG.prototype.addEventListener;
    WebCG.prototype.off = WebCG.prototype.removeEventListener;

    var initWebCg = function (window) {
      window.webcg = new WebCG(window);
    };

    var getCurrentScriptPathWithTrailingSlash = function (document) {
      if (!document || typeof document !== 'object') { return '' }
      if (!document.currentScript) { return '' }
      if (!document.currentScript.src || typeof document.currentScript.src !== 'string') { return '' }
      var src = document.currentScript.src;
      return src.substring(0, src.lastIndexOf('/') + 1)
    };

    var initDevTools = function (window) {
      var debug = (window.location.search.match(/[?&]debug=([^&$]+)/) || [])[1] === 'true';
      if (!debug) { return }

      var document = window.document;
      var script = document.createElement('script');
      script.src = getCurrentScriptPathWithTrailingSlash(document) + 'webcg-devtools.umd.js';
      console.log('[webcg-framework] injecting ' + script.src);
      document.head.append(script);
    };

    var boot = function (window) {
      initWebCg(window);
      initDevTools(window);
    };

    /**
     * When required globally
     */
    if (typeof (window) !== 'undefined') {
      console.log('[webcg-framework] version ' + version);
      boot(window);
    }

  })));

  var version = "1.3.0";

  var Adapter = /*@__PURE__*/(function () {
    function Adapter (webcg, movieClip, createjs) {
      if (!webcg || typeof webcg !== 'object') { throw new TypeError('webcg must be an object') }
      if (!movieClip || typeof movieClip !== 'object') { throw new TypeError('movieClip must be an object') }
      if (!createjs || typeof createjs !== 'object') { throw new TypeError('createjs must be an object') }

      this.movieClip = movieClip;
      this.createjs = createjs;

      // Immediately call stop since CasparCG will invoke play
      // to start the template
      this.movieClip.stop();

      webcg.addEventListener('play', this.play.bind(this));
      webcg.addEventListener('stop', this.stop.bind(this));
      webcg.addEventListener('next', this.next.bind(this));
      webcg.addEventListener('data', this.data.bind(this));

      if (this.movieClip) {
        var labels = this.movieClip.getLabels().filter(function (label) { return ['play', 'stop', 'next', 'update', 'data'].indexOf(label.label) === -1; });
        for (var i = 0; i < labels.length; i++) {
          var labelName = labels[i].label;
          webcg.addEventListener(labelName, this._gotoAndPlay.bind(this, labelName));
        }
      }
    }

    Adapter.prototype.play = function play () {
      this.movieClip.visible = true;
      var label = this._findLabel('intro');
      if (label) {
        this.movieClip.gotoAndPlay(label.position);
      } else {
        this.movieClip.gotoAndPlay(0);
      }
    };

    Adapter.prototype.stop = function stop () {
      var label = this._findLabel('outro');
      if (label) {
        this.movieClip.gotoAndPlay(label.position);
      } else {
        this.movieClip.visible = false;
      }
    };

    Adapter.prototype.next = function next () {
      this.movieClip.visible = true;
      this.movieClip.play();
    };

    Adapter.prototype.data = function data (data$1) {
      if (!data$1 || typeof data$1 !== 'object') { return }
      this._updateInstances(data$1);
    };

    Adapter.prototype._findLabel = function _findLabel (label) {
      var labels = this.movieClip.getLabels();
      for (var i = 0; i < labels.length; i++) {
        if (labels[i].label === label) { return labels[i] }
      }
      return null
    };

    Adapter.prototype._gotoAndPlay = function _gotoAndPlay (labelName) {
      var label = this._findLabel(labelName);
      if (label) {
        this.movieClip.gotoAndPlay(label.position);
      } else {
        console.warn('[webcg-adobe-animate-adapter] label "%s" not found', labelName);
      }
    };

    Adapter.prototype._updateInstances = function _updateInstances (data) {
      var this$1 = this;

      var instances = this._getDisplayObjectInstances(this.movieClip);
      Object.keys(data).forEach(function (componentId) {
        // Skip if there are not instanes with current id
        if ((instances[componentId] || []).length <= 0) { return }

        // If the current value is a string, update given text property
        if (typeof data[componentId] === 'string' || typeof data[componentId] === 'number') {
          instances[componentId].forEach(function (instance) {
            this$1._updateInstanceProps(instance, { text: data[componentId] });
          });
        } else if (typeof data[componentId] === 'object') {
          instances[componentId].forEach(function (instance) {
            this$1._updateInstanceProps(instance, data[componentId]);
          });
        }
      });
    };

    Adapter.prototype._getDisplayObjectInstances = function _getDisplayObjectInstances (instance, result) {
      var this$1 = this;

      return Object.keys(instance).reduce(function (map, curr) {
        // Ignore parent property to prevent infinite recursion
        if (curr === 'parent') { return map }
        // Ignore inherited properties
        if (!Object.prototype.hasOwnProperty.call(instance, curr)) { return map }

        if (instance[curr] instanceof this$1.createjs.DisplayObject) {
          // Add instance to the result map
          map[curr] = map[curr] || [];
          map[curr].push(instance[curr]);
          // Recurse over the properties
          return this$1._getDisplayObjectInstances(instance[curr], map)
        }
        return map
      }, result || {})
    };

    Adapter.prototype._updateInstanceProps = function _updateInstanceProps (instance, props) {
      Object.keys(props).forEach(function (key) {
        if (!Object.prototype.hasOwnProperty.call(instance, key)) { return }
        instance[key] = props[key];
      });
    };

    return Adapter;
  }());

  var init = function (window) {
    if (typeof window.webcg !== 'object') {
      console.warn('[webcg-adobe-animate-adapter] expected window.webcg to be an object');
      return
    }
    if (typeof window.AdobeAn !== 'object') {
      console.warn('[webcg-adobe-animate-adapter] expected window.AdobeAn to be an object');
      return
    }
    if (typeof window.createjs !== 'object') {
      console.warn('[webcg-adobe-animate-adapter] expected window.createjs to be an object');
      return
    }

    // The template host may already call template commands such as update() and play() before the template is ready to
    // receive calls. We ask WebCG to buffer these commands and flush them after we have instantiated the adapter.
    window.webcg.bufferCommands();
    window.AdobeAn.bootstrapCallback(function () {
      /* eslint-disable no-new */
      new Adapter(window.webcg, window.exportRoot, window.createjs);
      // The template is bootstrapped and the adapter is ready to receive and process calls
      window.webcg.flushCommands();
    });
  };

  /**
   * When required globally
   */
  if (typeof window !== 'undefined') {
    console.log('[webcg-adobe-animate-adapter] version ' + version);
    ready(function () {
      init(window);
    });
  }

  // @see http://youmightnotneedjquery.com/#ready
  function ready (fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

})));
