import {Loader} from '../../components/Loader'
import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'
export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('selector is required')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.loader = new Loader()
    this.changePageHandler = this.changePageHandler.bind(this)
    this.page = null
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel : this.routes.dashboard
    this.page = new Page(ActiveRoute.param[1])
    const root = await this.page.getRoot()
    this.$placeholder.clear().append(root)
    this.page.afterRender()
  }

  desctroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
