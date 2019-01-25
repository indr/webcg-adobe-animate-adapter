class DisplayObject {
  constructor () {
    this.visible = true
  }
}

class MovieClip extends DisplayObject {
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

window.createjs = {
  DisplayObject,
  MovieClip,
  Text
}
