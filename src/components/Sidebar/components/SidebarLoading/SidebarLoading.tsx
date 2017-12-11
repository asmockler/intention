import * as React from 'react';
import { css } from 'glamor';
import glamorous from 'glamorous';

const animationKeyframes = css.keyframes({
  '0%': {
    opacity: 0.45,
  },
  '100%': {
    opacity: 1,
  },
});

const LoadingBar = glamorous.div({
  animation: `${animationKeyframes} 750ms infinite ease-in-out alternate`,
  background: '#EEE',
  borderRadius: 20,
  height: 15,
  margin: '15px 0',
});

export default function SidebarLoading() {
  return (
    <div style={{marginTop: 10}}>
      <LoadingBar />
      <LoadingBar />
      <LoadingBar />
    </div>
  );
}
