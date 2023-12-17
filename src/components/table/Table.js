import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup']
    });
  }

  toHTML() {
    return createTable();
  }

  resizeColumns(index, width) {
    const arr = this.$root.$el.querySelectorAll(`[data-column-index="${index}"]`);
    arr.forEach(el => el.style.width = `${width}px`);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const direction = $resizer.$el.dataset.resize;
      // const $parent = $resizer.$el.parentNode; // bad
      // const $parent = $resizer.$el.closest('.column'); // better but not enough
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getPosData();

      document.onmousemove = e => {
        let delta;
        let value;
        if (direction === 'col') {
          const columnIndex = $parent.$el.dataset.columnIndex;
          delta = e.pageX - coords.right;
          value = coords.width + delta;
          $parent.$el.style.width = `${value}px`;
          this.resizeColumns(columnIndex, value);
        } else {
          delta = e.pageY - coords.bottom;
          value = coords.height + delta;
          $parent.$el.style.height = `${value}px`;
        }
        document.querySelector(`[data-column-index=""]`);
      }

      document.onmouseup = () => document.onmousemove = null;
    }
  }

  onMouseup(event) {
  }
}
