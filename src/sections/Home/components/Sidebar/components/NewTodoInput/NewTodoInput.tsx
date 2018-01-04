import * as React from 'react';
import glamorous from 'glamorous';

export interface Props {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): void;
}

interface ButtonProps {
  visible: boolean;
}

const Container = glamorous.div({position: 'relative'});

const Input = glamorous.input({
  background: 'transparent',
  border: 0,
  borderBottom: '2px solid #888',
  fontSize: 14,
  fontWeight: 500,
  margin: '10px 0',
  padding: '4px 2px',
  transition: 'border-bottom 0.25s',
  width: '100%',

  ':focus': {
    borderBottom: '2px solid #000',
    outline: 'none',
  },
});

const Button = glamorous.button<ButtonProps>({
  fontSize: 20,
  position: 'absolute',
  right: 0,
  top: 10,
}, ({visible}) => ({
  display: visible ? 'block' : 'none',
}));

export default function NewTodoInput({
  value,
  onChange,
  onSubmit,
}: Props) {
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          placeholder="New todo"
          type="text"
          value={value}
        />
        <Button
          onClick={onSubmit}
          type="submit"
          visible={value.length > 0}
        >
          &rarr;
        </Button>
      </form>
    </Container>
  );
}
