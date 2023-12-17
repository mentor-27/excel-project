import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resize } from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
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
    if (shouldResize(event)) resize(event, this);
  }
}
