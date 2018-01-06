import React from 'react';
import glamorous from 'glamorous';
import bind from '../../utilities/bind';

interface Props {
  label: string;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

interface State {
  labelFloating: boolean;
}

interface LabelProps {
  aboveInput: boolean;
}

const UNFOCUSED_COLOR = '#888';

const Input = glamorous.input({
  border: 0,
  borderBottom: `2px solid ${UNFOCUSED_COLOR}`,
  padding: '8px 0',
  transition: 'border-bottom 0.25s',
  width: '100%',

  ':focus': {
    borderBottom: '2px solid #000',
    outline: 'none',
  },
});

const Label = glamorous.label({
  display: 'inline-block',
  fontWeight: 700,
  pointerEvents: 'none',
  transformOrigin: 'left',
  transition: 'transform 0.15s, color 0.25s',
  willChange: 'transform, color',
}, ({aboveInput}: LabelProps) => ({
  color: aboveInput ? '#000' : `${UNFOCUSED_COLOR}`,
  transform: aboveInput ? 'translate3d(0, 5px, 0) scale(0.8)' : 'translate3d(0, 28px, 0) scale(1)',
}));

export default class TextField extends React.Component<Props, State> {
  state = {
    labelFloating: false,
  };

  render() {
    const {label, onChange, value} = this.props;
    const {labelFloating} = this.state;

    return (
      <div>
        <Label aboveInput={labelFloating}>
          {label}
        </Label>
        <Input
          onFocus={this.handleLabelFloating}
          onBlur={this.handleLabelFloating}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  @bind
  private handleLabelFloating(event: React.FocusEvent<HTMLInputElement>) {
    const isFocused = event.currentTarget === document.activeElement;
    const {value} = this.props;

    this.setState({
      labelFloating: isFocused || value.length > 0,
    });
  }
}
