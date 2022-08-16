import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  if (req.method !== 'PUT') {
    return;
  }

  const { id } = req.query;

  res.status(200).json({
    id,
    title: req.body.title,
  });
}
