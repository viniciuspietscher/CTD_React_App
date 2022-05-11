
// JSS
const spacer = 20;

const buttonStyle = {
  padding: 8,
  fontSize: 16,
  border: 'none',
  borderRadius: 3,
  margin: 10,
};

const containedButton = {
  ...buttonStyle,
  color: 'white',
  backgroundColor: '#3685ff',
  '&:hover': {
    color: '#2161c4',
  },
};

const outlinedButton = {
  ...buttonStyle,
  background: 'none',
  border: '1px solid black',
};

const styles = {
  root: {
    padding: spacer,
    fontFamily: 'Arial',
    backgroundColor: '#eee',
    minHeight: '100vh',
  },
  searchContainer: {
    marginBottom: spacer,
    fontSize: 16,
  },
  newTweetButton: {
    ...containedButton,
  },
  likeButton: {
    ...containedButton,
  },
  loginButton: {
    ...containedButton,
  },
  clearButton: {
    ...outlinedButton,
    borderColor: '#a9a9a9',
    color: '#a9a9a9',
  },
  removeLikeButton: {
    ...outlinedButton,
    borderColor: '#ff4e4e',
    color: '#ff4e4e',
  },
  newTweetArea: {
    fontFamily: 'Arial',
    fontSize: 18,
    padding: 20,
    width: 300,
    height: 200,
  },
  searchLabel: {
    marginRight: spacer,
  },
  tweet: {
    border: '1px solid #bbb',
    borderRadius: 5,
    padding: spacer,
    marginBottom: spacer,
    backgroundColor: '#fff',
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#222',
    color: 'white',
    fontSize: 14,
    padding: spacer,
    pointer: '',
  },
  nextStepsPopoverBackground: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  nextStepsPopoverContainer: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  },
};
