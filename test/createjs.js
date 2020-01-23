class DisplayObject {
  constructor () {
    this.visible = true
  }
}

class MovieClip extends DisplayObject {
  getLabels () {
    return []
  }

  stop () {}
}

class Text extends DisplayObject {
  constructor (text, font, color) {
    super()
    this.text = text || ''
    this.font = font || '10px sans-serif'
    this.color = color || '#000'
  }
}

export default window.createjs = {
  DisplayObject,
  MovieClip,
  Text
}
