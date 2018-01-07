import React from 'react';

interface Props {
  keys: string[];
  onKeypress(): void;
}

export default class KeydownListener extends React.Component<Props, never> {
  componentDidMount() {
    const {keys, onKeypress} = this.props;

    window.addEventListener('keydown', (event) => {
      if (keys.indexOf(event.key) > -1) {
        onKeypress();
      }
    });
  }

  componentWillUnmount() {
    const {onKeypress} = this.props;
    window.removeEventListener('keydown', onKeypress);
  }

  render() {
    return null;
  }
}
