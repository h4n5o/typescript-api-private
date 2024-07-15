import { Router, Request, Response } from 'express';

const UsersRouter = Router();

UsersRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send('Benutzerliste');
});

UsersRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).send(`Details für Benutzer ${id}`);
});

export default UsersRouter;
