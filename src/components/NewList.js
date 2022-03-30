import { createUseStyles } from 'react-jss';
import { Card, CardContent } from '@mui/material';

const useStyles = createUseStyles({
  title: {
    margin: 0,
    marginBottom: 10,
  },
});

export function CreateNewList() {
  return (
    <Card>
      <CardContent>
        <form>
          List Name: <input type="text"></input>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateNewList;
