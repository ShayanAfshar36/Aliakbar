/**
 * Editorial staff. Demonstration profiles — no real-world credentials are claimed.
 */
const avatar = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=240&h=240&q=70`;

export const authors = [
  {
    id: 'elena-marchetti',
    name: 'Elena Marchetti',
    role: 'World Affairs Editor',
    location: 'Geneva',
    avatar: avatar('1552664730-d307ca884978'),
    bio: 'Elena leads the foreign desk, covering multilateral institutions, diplomacy and cross-border policy.',
  },
  {
    id: 'daniel-osei',
    name: 'Daniel Osei',
    role: 'Economics Correspondent',
    location: 'New York',
    avatar: avatar('1541888946425-d81bb19240f5'),
    bio: 'Daniel writes about markets, central banking and the economics of everyday life.',
  },
  {
    id: 'priya-raghavan',
    name: 'Priya Raghavan',
    role: 'Science Correspondent',
    location: 'London',
    avatar: avatar('1503676260728-1c00da094a0b'),
    bio: 'Priya covers research, medicine and the people who do the science.',
  },
  {
    id: 'tomas-lindqvist',
    name: 'Tomas Lindqvist',
    role: 'Technology Editor',
    location: 'Stockholm',
    avatar: avatar('1493809842364-78817add7ffb'),
    bio: 'Tomas reports on computing, platforms and the industry that builds them.',
  },
  {
    id: 'amara-diallo',
    name: 'Amara Diallo',
    role: 'Environment Correspondent',
    location: 'Nairobi',
    avatar: avatar('1532187863486-abf9dbad1b69'),
    bio: 'Amara reports on climate policy, energy transition and the built environment.',
  },
  {
    id: 'james-whitfield',
    name: 'James Whitfield',
    role: 'Chief Political Correspondent',
    location: 'Washington',
    avatar: avatar('1584036561566-baf8f5f1b144'),
    bio: 'James has covered legislatures and campaigns for two decades.',
  },
  {
    id: 'sofia-almeida',
    name: 'Sofia Almeida',
    role: 'Culture Editor',
    location: 'Lisbon',
    avatar: avatar('1576086213369-97a306d36557'),
    bio: 'Sofia writes on art, film and the institutions that shape public taste.',
  },
  {
    id: 'marcus-hale',
    name: 'Marcus Hale',
    role: 'Sports Correspondent',
    location: 'Manchester',
    avatar: avatar('1526374965328-7f61d4dc18c5'),
    bio: 'Marcus covers professional sport, its economics and its culture.',
  },
];

export const getAuthor = (id) => authors.find((author) => author.id === id) ?? null;
