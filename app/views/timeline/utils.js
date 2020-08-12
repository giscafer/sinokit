import { arc } from 'd3';

/**
 * 判断是移动brush还是缩短伸长,true 是移动，false是伸缩
 * @param {Array<number>} selection
 * @param {Array<number>} prevSelection
 */
export const isMoveBrush = (selection, prevSelection = []) => {
  if (selection[0] === prevSelection[0] || selection[1] === prevSelection[1]) {
    return false;
  }
  return true;
};
/**
 * 1左边拉伸，2左边收缩；3右边拉伸、4右边收缩
 * @param {Array<number>} selection
 * @param {Array<number>} prevSelection
 */
export const flexibleType = (selection, prevSelection = []) => {
  const [s1, e1] = selection;
  const [s2, e2] = prevSelection;
  if (s1 - s2 < 0) {
    return 1;
  } else if (s1 - s2 > 0) {
    return 2;
  } else if (e1 - e2 > 0) {
    return 3;
  } else if (e1 - e2 < 0) {
    return 4;
  }
};

export const createArc = height => {
  return arc()
    .innerRadius(0)
    .outerRadius(height / 2)
    .startAngle(0)
    .endAngle((d, i) => (i ? Math.PI : -Math.PI));
};

export const brushHandle = (context, selection, height) => {
  document.querySelector('.overlay').setAttribute('fill', '#EBEDF8');
  document.querySelector('.selection').setAttribute('fill', '#B4B9D2');
  document.querySelector('.overlay').setAttribute('fill', '#EBEDF8');
  document.querySelector('.handle--w').setAttribute('stroke-width', 1.5);
  document.querySelector('.handle--w').setAttribute('d', createArc());
  document.querySelector('.handle--e').setAttribute('d', createArc());

  context
    .select('.brush')
    .select('path')
    .attr('display', selection === null ? 'none' : null)
    .attr(
      'transform',
      selection === null
        ? null
        : (d, i) => `translate(${selection[i]},${height / 2})`
    );
};
