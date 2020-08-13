import { arc } from 'd3';

/**
 * 设置可视区域
 * @param {Object} timeline
 * @param {Date} minDate 最小日期
 * @param {Date} maxDate 最大日期
 * @param {Array} selection brush 锚点（起点和终点坐标，相减可知道宽度）
 * @param {Number} brushRange brush 最大宽度
 */
/* export const setWindow = (
  timeline,
  minDate,
  maxDate,
  selection,
  brushRange
) => {
  // brush 当前宽度
  const brushWidth = selection[1] - selection[0];
  const rangeTime = maxDate.getTime() - minDate.getTime();
  // 根据 brush 当前宽度得到缩放比例
  // 根据 brush 当前位置得到 window 可视区域起始和终止时间
  const timeLength = (brushWidth / brushRange) * rangeTime;
  const end = new Date(minDate.getTime() + Math.ceil(timeLength));
  const brushStartRate = selection[0] / brushRange;
  // 设置当前可视窗
  timeline.setWindow(start, end);
}; */
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
