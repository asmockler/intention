import * as React from 'react';

export const DRAG_CLASS = 'intention-drag-enabled';

export function makeDraggable<Props>(Component: React.ComponentClass<Props> | React.StatelessComponent<Props>) {
  return (props: Props) => (
    <div className={DRAG_CLASS}>
      <Component {...props} />
    </div>
  );
}
