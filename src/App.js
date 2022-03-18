import Lists from './components/Lists';
import data from './constants/data';
import { createUseStyles } from 'react-jss';
import { fontColor } from './styles';

const useStyles = createUseStyles({
  root: {
    fontFamily: 'Helvetica',
    color: fontColor,
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>List App</h1>
      <Lists data={data} />
      <footer>Information that will go on the bottom of the page</footer>
    </div>
  );
}

export default App;
