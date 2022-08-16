// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const EVENTS = [
  {
    id: '42803351-96A3-4A39-B1A8-91F905DDF37B',
    title: 'Meet dentist',
    date: '2022-08-16T22:00:00.000Z'
  },
  {
    id: '68D2BDDF-0268-4BC6-ADB6-3C37EFE0044C',
    title: 'Pick up kids from school',
    date: '2022-08-18T22:00:00.000Z'
  },
  {
    id: '20F9D671-1323-46D4-9B29-D4976D2DD520',
    title: 'Opera Theatre',
    date: '2022-08-20T22:00:00.000Z'
  },
  {
    id: '6CE046AE-34EF-482D-A562-7299BD52AB2D',
    title: 'Trip to London',
    date: '2022-08-24T22:00:00.000Z'
  },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(EVENTS);
  }
}
