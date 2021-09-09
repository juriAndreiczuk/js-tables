import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.compoents = options.components || []
  }
  getRoot() {
    const $root = $.create('div', 'excel')

    this.compoents.forEach(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.innerHTML = component.toHTML()
      $root.append($el)
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
  }
}
