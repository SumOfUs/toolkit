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
      color: '#ed3224',
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonStyle: {
      backgroundColor: '#ed3224',
      borderRadius: '8px',
      color: 'white',
      display: 'block',
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      lineHeight: '55px',
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
      color: '#ed3224',
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
    },
    buttonStyle: {
      backgroundColor: '#ed3224',
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
