import { Request, Response, Router } from 'express';

import { emailAdapter } from '../adapters/email-adapter';

export const emailRouter = Router({});

emailRouter.post('/send', async (req: Request, res: Response) => {
  const info = await emailAdapter.sendEmail({
    email: req.body.email,
    message: req.body.message,
    subject: req.body.subject,
  });

  res.send(info);
});
