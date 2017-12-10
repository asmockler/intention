declare module '@shopify/draggable' {
  type Plugin = any;

  interface SortableOptions {
    draggable: string,
    swapAnimation: {
      duration: number,
      easingFunction: string,
    },
    plugins: Plugin[],
  }

  export class Sortable {
    constructor(root: HTMLElement, options: SortableOptions);
  }

  namespace Plugins {
    class SwapAnimation {}
  }
}
