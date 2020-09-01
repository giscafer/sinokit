import { path } from 'd3';

function drawPath(context) {
  context.moveTo(14, 7);
  context.lineTo(18, 11);
  context.lineTo(18, 3);
  context.closePath();
  context.moveTo(28, 7);
  context.lineTo(24, 3);
  context.lineTo(24, 11);
  context.closePath();
  return context;
}

export function drawHandle(g, selection, type) {
  return g
    .select('.brush')
    .append('path')
    .attr('class', 'handle--custom')
    .attr('fill', '#fff')
    .attr('fill-opacity', 0.8)
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .attr('type', type)
    .attr('transform', `translate(${selection + (type === 'w' ? 2 : -44)},0)`)
    .attr('d', drawPath(path()));
}

export const transformHandle = (g, selection, type) => {
  if (!g) return;
  g.attr('display', selection === null ? 'none' : null).attr(
    'transform',
    selection === null
      ? null
      : `translate(${selection + (type === 'w' ? 2 : -44)},0)`
  );
};

export const brushHandle = id => {
  // export const brushHandle = (context, selection, height) => {
  document.querySelector(`#${id}>svg .overlay`).setAttribute('fill', '#EBEDF8');
  document
    .querySelector(`#${id}>svg .selection`)
    .setAttribute('fill', '#B4B9D2');
  document.querySelector(`#${id}>svg .overlay`).setAttribute('fill', '#EBEDF8');
};
/**
 * 获取 translate x 轴偏移量
 * @param {Element}} element
 */
const getOffsetX = element => {
  const style = element.getAttribute('style');
  const matchStr = style.match(/translate\((.*?)\)/)[1];
  const offsetX = matchStr.split(',')[0] || '0';
  return Number(offsetX.replace('px', ''));
};
/**
 * 因dot渲染顺序会变化，这里将node重新排序
 * @param {Array<Element>} dotNodes
 */
const getSortNodes = dotNodes => {
  dotNodes.forEach(item => {
    item._offsetX = getOffsetX(item);
  });
  const nodes = [].slice
    .call(dotNodes)
    .sort((a, b) => (a._offsetX > b._offsetX ? 1 : -1));
  return nodes;
};

export const handleTooltip = (pcontainer, data) => {
  const tooltipEle = pcontainer.querySelector('.timeline-tooltip');
  const vsgroup = pcontainer.querySelector('.vis-group');
  const dotNodes = vsgroup.querySelectorAll('.vis-item.vis-dot');
  const dotArr = getSortNodes(dotNodes);

  const enterCbFn = e => {
    const dateIndex = dotArr.indexOf(e.target);
    const tooltipText = data[dateIndex].tooltip;
    if (!tooltipText) {
      return;
    }
    tooltipEle.querySelector('.timeline-tooltip-inner').innerHTML = tooltipText;
    tooltipEle.style.display = 'block';
    const tiprect = tooltipEle.getBoundingClientRect();
    const dotrect = e.target.getBoundingClientRect();

    tooltipEle.style.left = dotrect.left - 10 + 'px';
    tooltipEle.style.top = dotrect.top - tiprect.height + 'px';
  };
  const leaveCbFn = () => {
    tooltipEle.style.display = 'none';
  };
  dotNodes.forEach(element => {
    element.onmouseenter = enterCbFn;
    element.onmouseleave = leaveCbFn;
  });
};

export const handleBorderStartEnd = pcontainer => {
  const vsgroup = pcontainer.querySelector('.vis-group');
  const dotNodes = vsgroup.querySelectorAll('.vis-item.vis-dot');
  const dotArr = getSortNodes(dotNodes);
  const borderStartEl = pcontainer.querySelector('.timeline-border-start');
  const firstDotEl = dotArr[0];
  // const lastDotEl = dotArr[dotArr.length - 1];
  const rect = firstDotEl.getBoundingClientRect();
  const offsetX = getOffsetX(firstDotEl);
  console.log(firstDotEl, offsetX, rect);
  borderStartEl.style.width = rect.left + 'px';
  // borderStartEl.style.width = offsetX + 'px';
  borderStartEl.style.top = rect.top + 'px';
};
