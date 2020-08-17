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
    .attr('fill', '#333')
    .attr('fill-opacity', 0.8)
    .attr('stroke', '#000')
    .attr('stroke-width', 1.5)
    .attr('cursor', 'ew-resize')
    .attr('type', type)
    .attr('transform', `translate(${selection - 22},0)`)
    .attr('d', drawPath(path()));
}

export const transformHandle = (g, selection) => {
  if (!g) return;
  g.attr('display', selection === null ? 'none' : null).attr(
    'transform',
    selection === null ? null : `translate(${selection - 22},0)`
  );
};

export const brushHandle = () => {
  // export const brushHandle = (context, selection, height) => {
  document.querySelector('.overlay').setAttribute('fill', '#EBEDF8');
  document.querySelector('.selection').setAttribute('fill', '#B4B9D2');
  document.querySelector('.overlay').setAttribute('fill', '#EBEDF8');
};
