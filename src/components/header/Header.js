import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '../../redux/actions';
import {debounce} from '../../core/utils';
import {ActiveRoute} from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
        name: 'Header',
        listeners: ['input', 'click'],
       ...options
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 500)
  }
  toHTML() {
    const title = this.store.getState().title
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <a
          href="#dashboard"
          class="button" 
          data-button="remove"
        >
          <i 
            class="material-icons"
            data-button="remove"
          >delete</i>
        </a>

        <a
          class="button"
          href="#dashboard"
        >
          <i class="material-icons">exit_to_app</i>
        </a>

        </div>
      `
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('are you sure ?')
      if (decision) {
        localStorage.removeItem(ActiveRoute.param.join(':'))
      }
    }
  }
}
