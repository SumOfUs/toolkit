import * as CSS from 'csstype';

type StyleList = {
  [key: string]: CSS.Properties;
};
type Styles = {
  classic: StyleList;
  rebranding: StyleList;
};
const styles: Styles = {
  classic: {
    linkStyle: {
      color: '#00abbd',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonStyle: {
      backgroundColor: '#ed3224',
      borderRadius: '8px',
      boxShadow: 'inset 0 -1.2px rgba(0, 0, 0, 0.12) !important',
      color: 'white',
      display: 'block',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      lineHeight: '50px',
      margin: '10px auto',
      maxWidth: '300px',
      textAlign: 'center',
      textDecoration: 'none',
      textSizeAdjust: 'none',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },
  },
  rebranding: {
    linkStyle: {
      color: '#00abbd',
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
    },
    buttonStyle: {
      backgroundColor: '#f8492e',
      borderRadius: '0px',
      color: 'white',
      display: 'block',
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      lineHeight: '44px',
      margin: '10px 0',
      maxWidth: '300px',
      textAlign: 'center',
      textDecoration: 'none',
      textSizeAdjust: 'none',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },
  },
};

export default styles;
