const Adapter = class {
  constructor (webcg, movieClip) {
    if (!webcg || typeof webcg !== 'object') throw new TypeError('webcg must be an object')
    if (!movieClip || typeof movieClip !== 'object') throw new TypeError('movieClip must be an object')

    this.movieClip = movieClip

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
    this._updateMovieClipInstances(data)
  }

  _findLabel (label) {
    const labels = this.movieClip.getLabels()
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].label === label) return labels[i]
    }
    return null
  }

  _updateMovieClipInstances (data) {
    const instance = this.movieClip.instance
    Object.keys(data).forEach(componentId => {
      if (!instance.hasOwnProperty(componentId)) return

      if (typeof data[componentId] === 'object') {
        Object.keys(data[componentId]).forEach(dataKey => {
          if (!instance[componentId].hasOwnProperty(dataKey)) return
          instance[componentId][dataKey] = data[componentId][dataKey]
        })
      } else if (typeof data[componentId] === 'string') {
        if (!instance[componentId].hasOwnProperty('text')) return
        instance[componentId]['text'] = data[componentId]
      }
    })
  }
}

export default Adapter
