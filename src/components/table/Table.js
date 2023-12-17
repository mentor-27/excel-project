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
      const direction = $resizer.data.resize;
      // const $parent = $resizer.$el.parentNode; // bad
      // const $parent = $resizer.$el.closest('.column'); // better but not enough
      const $parent = $resizer.closest('[data-type="resizable"]');
      const pCoords = $parent.getPosData();
      let delta;
      let value;
      let x = 0;
      let y = 0;

      document.onmousemove = e => {
        const cCoords = $resizer.getPosData();
        x = e.pageX;
        y = e.pageY;
        if (direction === 'col') {
          delta = -(x - pCoords.right + 3);
          $resizer.$el.style.right = `${delta}px`;
        } else {
          delta = -(y - pCoords.bottom + 3);
          $resizer.$el.style.bottom = `${delta}px`;
        }
      }

      document.onmouseup = () => {
        if (direction === 'col') {
          const columnIndex = $parent.data.columnIndex;
          delta = x - pCoords.right;
          value = pCoords.width + delta;
          $parent.$el.style.width = `${value}px`;
          $resizer.$el.removeAttribute('style');
          this.resizeColumns(columnIndex, value);
        } else {
          delta = y - pCoords.bottom;
          value = pCoords.height + delta;
          $parent.$el.style.height = `${value}px`;
          $resizer.$el.removeAttribute('style');
        }
        document.onmousemove = null
      };
    }
  }

  onMouseup(event) {
  }
}
