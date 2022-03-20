import Lists from './components/Lists';
import Footer from './components/Footer';
import lists from './constants/data';
import { createUseStyles } from 'react-jss';
import { BACKGROUND_COLOR, DARK_ON_LIGHT_TEXT_COLOR } from './styles';

const useStyles = createUseStyles({
  root: {
    fontFamily: 'Helvetica',
    color: DARK_ON_LIGHT_TEXT_COLOR,
    backgroundColor: BACKGROUND_COLOR,
    boxSizing: 'border-box',
    minHeight: `100vh`,
    padding: 30,
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>List App</h1>
      <Lists data={lists} />
      <Footer />
    </div>
  );
}

export default App;
