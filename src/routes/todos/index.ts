import { Router, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import TodoModel from '../../database/models/TodoModel';

const TodosRouter = Router();

// GET  REQUESTS
// /v1/todos/bytodoid
TodosRouter.get('/byid', async (req: Request, res: Response) => {
  const todoId = parseInt(req.query.todoId as string);
  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const todo = await TodoModel.findOne({ where: { id: todoId } });

  res.status(StatusCodes.OK).json({ todo });
});

// Alle Todos von einer UserId
TodosRouter.get('/byuserid', async (req: Request, res: Response) => {
  const userId = parseInt(req.query.userId as string);

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + ' Keine userID');
    return;
  }

  const userTodos = await TodoModel.findAll({
    where: { userId: userId },
  });

  res.status(StatusCodes.OK).json({ todos: userTodos });
});

TodosRouter.get('/all', async (req: Request, res: Response) => {
  const todos = await TodoModel.findAll();
  res.status(StatusCodes.OK).send(todos);
});

// PUT REQUESTS
TodosRouter.put('/mark', async (req: Request, res: Response) => {
  try {
    const { todoId, newIsDone } = req.body as {
      todoId: number;
      newIsDone: boolean;
    };

    if (!todoId) throw Error('keine User Id');

    await TodoModel.update({ isDone: newIsDone }, { where: { id: todoId } });

    res.status(StatusCodes.OK).json({ updatedTodoId: todoId });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
});

TodosRouter.put('/update', async (req: Request, res: Response) => {
  const { todoId, newTask, newIsDone, newDueDate } = req.body as {
    todoId: number;
    newTask: string;
    newIsDone: boolean;
    newDueDate: string;
  };

  await TodoModel.update(
    {
      task: newTask,
      isDone: newIsDone,
      dueDate: newDueDate,
    },
    { where: { id: todoId } },
  );

  res.status(StatusCodes.OK).json({ updatedTodoId: todoId });
});

// POST REQUESTS
TodosRouter.post('/create', async (req: Request, res: Response) => {
  const { newTask, newIsDone, newDueDate, newUserId } = req.body as {
    newTask: string;
    newIsDone: string;
    newDueDate: number;
    newUserId: number;
  };

  console.log('Here we are', newTask, newIsDone, newDueDate, newUserId);
  if (!newTask || !newDueDate || !newUserId) {
    throw ReferenceError('One of my required Parameters is not defined');
  }

  const newTodo = {
    task: newTask,
    isDone: newIsDone === 'true',
    dueDate: new Date(newDueDate),
    userId: newUserId,
  };

  const todo = await TodoModel.create(newTodo);

  res.status(StatusCodes.OK).json({ todo: todo });
});

// DELETE REQUEST
TodosRouter.delete('/delete', async (req: Request, res: Response) => {
  const { todoId } = req.body as { todoId: number }; //req.body.todoId

  await TodoModel.destroy({ where: { id: todoId } });

  res.status(StatusCodes.OK).json({ deletedTodosId: todoId });
});

export default TodosRouter;
