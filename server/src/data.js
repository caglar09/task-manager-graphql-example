const users = [
  {
    id: '1',
    full_name: 'Perle Banet',
    age: 22,
  },
  {
    id: '2',
    full_name: 'Bernardine Tyler',
    age: 42,
  },
];

const posts = [
  {
    id: '1',
    title: 'Return, The',
    user_id: '1',
  },
  {
    id: '2',
    title: 'Bullet for Joey, A',
    user_id: '1',
  },
  {
    id: '3',
    title: 'Ten Inch Hero',
    user_id: '2',
  },
];

const comments = [
  {
    id: '1',
    text: 'comment Lorem 1',
    post_id: '1',
    user_id: '2'
  },
  {
    id: '2',
    text: 'Ipsum lorem 2',
    post_id: '1',
    user_id: '1'
  },
  {
    id: '3',
    text: 'Dolor sit Amet 3',
    post_id: '2',
    user_id: '1'
  },
  {
    id: '4',
    text: 'Foo bar 4',
    post_id: '3',
    user_id: '2'
  },
  {
    id: '5',
    text: 'Foo bar 5',
    post_id: '3',
    user_id: '2'
  },
  {
    id: '6',
    text: 'Foo bar 6',
    post_id: '1',
    user_id: '2'
  },
  {
    id: '7',
    text: 'Foo bar 7',
    post_id: '2',
    user_id: '2'
  },
  {
    id: '8',
    text: 'Foo bar 8',
    post_id: '1',
    user_id: '2'
  },
];

module.exports = { users, posts, comments }