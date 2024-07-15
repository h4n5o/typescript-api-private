import { Router } from 'express';
import TodosRouter from './todos';
import UsersRouter from './users';
const AppRouter = Router();

AppRouter.use('/todos', TodosRouter);
AppRouter.use('/users', UsersRouter);

AppRouter.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

export default AppRouter;
