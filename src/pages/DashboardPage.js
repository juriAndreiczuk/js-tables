import {$} from '../core/dom'
import Page from '../core/page/Page'
import {createRecodsTable} from '../shared/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db').html(
      ` 
    <div class="db__header">
      <h1>Excel Dashboard</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
        <a href="#excel/${now}" class="db__create">
          Новая <br /> Таблица
        </a>
      </div>
    </div>

    <div class="db__table db__view">
      ${createRecodsTable()}
    </div>`
    )
  }
}
