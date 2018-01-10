import glamorous from 'glamorous';

import {GRADIENTS} from 'styles';

interface Props {
  slim: boolean;
}

export default glamorous.div<Props>(
  {
    backgroundImage: GRADIENTS.blue,
    borderRadius: 4,
    color: 'white',
    cursor: '-webkit-grab',
    height: '100%',
  },
  ({slim}) => ({
    padding: slim ? 8 : '6px 8px',
  })
);
