export default {
  classic: {
    linkStyle: {
      color: '#00abbd',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    },
    buttonStyle: {
      backgroundColor: '#dc6134',
      borderRadius: '3px',
      boxShadow: 'inset 0 -1.2px rgba(0, 0, 0, 0.12) !important',
      color: 'white',
      display: 'block',
      fontFamily: 'sans-serif',
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
  rebranding: {
    linkStyle: {
      color: '#00abbd',
      fontWeight: 'bold',
      fontFamily: `Montserrat, Helvetica, Arial, sans-serif`,
    },
    buttonStyle: {
      color: 'white',
      display: 'block',
      textDecoration: 'none',
      fontFamily: `Montserrat, Helvetica, Arial, sans-serif`,
      fontSize: '14px', 
      fontWeight: 'bold',
      textTransform: 'uppercase',
      WebkitBorderRadius: '4px', 
      MozBorderRadius: '4px', 
      borderRadius: '4px',
      background: '#f8492e',
    },
    buttonInnerStyle: {
      textAlign: 'center',
      borderTop: '15px solid #f8492e',
      borderBottom: '15px solid #f8492e',
      borderRight: '8px solid #f8492e',
      borderLeft: '8px solid #f8492e',
      maxWidth: `300px; Max-width: 300px;`, // For outlook Max-width is a hack to make it a medium sized button
    },
  },
}
