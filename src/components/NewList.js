import { createUseStyles } from 'react-jss';
import Card from '../layout/Card';

const useStyles = createUseStyles({
  title: {
    margin: 0,
    marginBottom: 10,
  },
});

export function CreateNewList() {
  return (
    <Card>
      <form>
        List Name: <input type="text"></input>
      </form>
    </Card>
  );
}

export default CreateNewList;
