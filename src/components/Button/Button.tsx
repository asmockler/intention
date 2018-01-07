import glamorous from 'glamorous';
import {COLORS} from 'styles';

interface Props {
  color?: 'green';
}

export default glamorous.button<Props>(
  {
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    fontWeight: 700,
    padding: '18px 24px',
    transition: 'background 0.15s',
  },
  ({color}) => {
    let colorAttributes = {};

    switch (color) {
      case 'green':
        colorAttributes = {
          background: COLORS.green,
          color: COLORS.white,
          ':hover': {
            background: COLORS.greenDark,
          },
        };
        break;
      default:
        colorAttributes = {
          background: '#F7F7F7',
          color: COLORS.black,
          ':hover': {
            background: '#EAEAEA',
          },
        };
        break;
    }

    return colorAttributes;
  }
);
