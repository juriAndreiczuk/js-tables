import {$} from '@core/dom'
import {ActiveRoute} from './ActiveRoute'
export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('selector is required')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.page = null
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel : this.routes.dashboard
    this.page = new Page(ActiveRoute.param[1])
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  desctroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
