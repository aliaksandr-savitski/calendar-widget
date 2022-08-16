import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const event = {
    ...req.body,
    id: uuidv4(),
  };

  res.status(200).json(event);
}
