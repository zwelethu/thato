import { createMuiTheme } from '@material-ui/core/styles';

const zyrlavender = '#6C648B';
const zyrOrange = '#FBA100';

export default createMuiTheme({
  palette: {
    common: {
      blue: `${zyrlavender}`,
      orange: `${zyrOrange}`,
    },
    primary: {
      main: `${zyrlavender}`,
    },
    secondary: {
      main: `${zyrOrange}`,
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    estimate: {
      fontSize: '1rem',
      textTransform: 'none',
      fontFamily: 'Righteous',
      color: 'white',
    },
  },
});
