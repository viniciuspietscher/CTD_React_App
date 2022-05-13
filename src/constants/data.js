const response = [
  {
    displayName: 'Oprah Winfrey',
    content:
      'HI TWITTERS . THANK YOU FOR A WARM WELCOME. FEELING REALLY 21st CENTURY .',
    promoted: true,
  },
  {
    displayName: 'Jack Dorsey',
    content: 'just setting up my twttr',
  },
  {
    displayName: 'Cher',
    content:
      'I was looking at tweets & saw that i really hurt someones feelings ! Im sorry. It was light blue background with white egg shape . Bye',
  },
  {
    displayName: 'Martha Stewart',
    content: 'L',
  },
];

export const mockData = new Promise((resolve) => {
  setTimeout(() => {
    resolve(response);
  }, 3000);
});
