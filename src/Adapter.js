const Adapter = class {
  constructor (webcg, movieClip, createjs) {
    if (!webcg || typeof webcg !== 'object') throw new TypeError('webcg must be an object')
    if (!movieClip || typeof movieClip !== 'object') throw new TypeError('movieClip must be an object')
    if (!createjs || typeof createjs !== 'object') throw new TypeError('createjs must be an object')

    this.movieClip = movieClip
    this.createjs = createjs

    // Immediately call stop since CasparCG will invoke play
    // to start the template
    this.movieClip.stop()

    webcg.addEventListener('play', this.play.bind(this))
    webcg.addEventListener('stop', this.stop.bind(this))
    webcg.addEventListener('next', this.next.bind(this))
    webcg.addEventListener('data', this.data.bind(this))
  }

  play () {
    this.movieClip.visible = true
    const label = this._findLabel('intro')
    if (label) {
      this.movieClip.gotoAndPlay(label.position)
    } else {
      this.movieClip.gotoAndPlay(0)
    }
  }

  stop () {
    const label = this._findLabel('outro')
    if (label) {
      this.movieClip.gotoAndPlay(label.position)
    } else {
      this.movieClip.visible = false
    }
  }

  next () {
    this.movieClip.visible = true
    this.movieClip.play()
  }

  data (data) {
    if (!data || typeof data !== 'object') return
    this._updateInstances(data)
  }

  _findLabel (label) {
    const labels = this.movieClip.getLabels()
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].label === label) return labels[i]
    }
    return null
  }

  _updateInstances (data) {
    const instances = this._getDisplayObjectInstances(this.movieClip)
    Object.keys(data).forEach(componentId => {
      // Skip if there are not instanes with current id
      if ((instances[componentId] || []).length <= 0) return

      // If the current value is a string, update given text property
      if (typeof data[componentId] === 'string' || typeof data[componentId] === 'number') {
        instances[componentId].forEach(instance => {
          this._updateInstanceProps(instance, { text: data[componentId] })
        })
      } else if (typeof data[componentId] === 'object') {
        instances[componentId].forEach(instance => {
          this._updateInstanceProps(instance, data[componentId])
        })
      }
    })
  }

  _getDisplayObjectInstances (instance, result) {
    return Object.keys(instance).reduce((map, curr) => {
      // Ignore parent property to prevent infinite recursion
      if (curr === 'parent') return map
      // Ignore inherited properties
      if (!Object.prototype.hasOwnProperty.call(instance, curr)) return map

      if (instance[curr] instanceof this.createjs.DisplayObject) {
        // Add instance to the result map
        map[curr] = map[curr] || []
        map[curr].push(instance[curr])
        // Recurse over the properties
        return this._getDisplayObjectInstances(instance[curr], map)
      }
      return map
    }, result || {})
  }

  _updateInstanceProps (instance, props) {
    Object.keys(props).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(instance, key)) return
      instance[key] = props[key]
    })
  }
}

export default Adapter
