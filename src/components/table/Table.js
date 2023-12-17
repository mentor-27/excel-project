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
      let cCoords = $resizer.getPosData();
      let x = event.pageX;
      let y = event.pageY;
      let delta;
      let value;

      document.onmousemove = e => {
        cCoords = $resizer.getPosData();
        x = e.pageX;
        y = e.pageY;
        if (direction === 'col') {
          delta = x - pCoords.right;
          value = $resizer.$el.style.right + delta;
          $resizer.$el.style.transform = `translateX(${value}px)`;
        } else {
          delta = y - pCoords.bottom;
          value = $resizer.$el.style.bottom + delta;
          $resizer.$el.style.transform = `translateY(${value}px)`;
        }
      }

      document.onmouseup = () => {
        if (direction === 'col') {
          const columnIndex = $parent.data.columnIndex;
          delta = x - pCoords.right;
          value = pCoords.width + delta;
          $parent.$el.style.width = `${value}px`;
          $resizer.$el.style.transform = 'unset';
          this.resizeColumns(columnIndex, value);
        } else {
          delta = y - pCoords.bottom;
          value = pCoords.height + delta;
          $parent.$el.style.height = `${value}px`;
          $resizer.$el.style.transform = 'unset';
        }
        document.onmousemove = null
      };
    }
  }

  onMouseup(event) {
  }
}
