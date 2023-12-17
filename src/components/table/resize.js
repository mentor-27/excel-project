import { $ } from '@core/dom';

export function resize(event, target) {
  if (event.target.dataset.resize) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getPosData();
    const sideProp = $resizer.data.resize === 'col' ? 'right' : 'bottom';
    const sizeProp = $resizer.data.resize === 'col' ? 'width' : 'height';
    const axisProp = $resizer.data.resize === 'col' ? 'pageX' : 'pageY';

    document.onmousemove = e => {
      const delta = -(e[axisProp] - coords[sideProp] + 3);
      $resizer.css({ [sideProp]: `${delta}px` });
    }

    document.onmouseup = e => {
      const delta = e[axisProp] - coords[sideProp];
      const value = coords[sizeProp] + delta;
      $parent.css({ [sizeProp]: `${value}px` });
      $resizer.$el.removeAttribute('style');
      if (axisProp === 'pageX') {
        const columnIndex = $parent.data.columnIndex;
        target.resizeColumns(columnIndex, value);
      }

      document.onmousemove = null
      document.onmouseup = null;
    }
  }
}