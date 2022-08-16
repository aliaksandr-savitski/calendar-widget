import { rest } from 'msw';

import { EVENTS } from '@/pages/api/events';

export const eventsHandlers = [
  rest.get('/api/events', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(EVENTS)),
  )
]
