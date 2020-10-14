import Vue from 'vue';

export default function logger(...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (
      args[0] &&
      args[0] instanceof Vue &&
      args[0].$vnode['componentOptions']
    ) {
      console.log(
        `component[${args[0].$vnode['componentOptions']['tag']}]:`,
        ...args.slice(1)
      );
    } else {
      console.log(`LOG>>>`, ...args);
    }
  }
}
