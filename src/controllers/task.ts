import { Request, Response } from "express";
import { PrismaClient, Task } from "@prisma/client";
import { formatResponse } from "../utils";

const prisma = new PrismaClient();

const createTask = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newTask: Task = await prisma.task.create({
      data: body,
    });

    res
      .status(201)
      .json(formatResponse("Task created successfully", true, newTask));
  } catch (error) {
    res.status(500).json(formatResponse("Failed to create task", false));
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks: Task[] = await prisma.task.findMany();
    res
      .status(200)
      .json(formatResponse("Tasks fetched successfully", true, tasks));
  } catch (error) {
    console.log(error);
    res.status(500).json(formatResponse("Failed to fetch tasks", false));
  }
};

const getTaskById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { params } = req;
    const { id: queryId } = params;
    const id = parseInt(queryId, 10);

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (task) {
      res
        .status(200)
        .json(formatResponse("Task fetched successfully", true, task));
    } else {
      res.status(404).json(formatResponse("Task not found", false));
    }
  } catch (error) {
    res.status(500).json(formatResponse("Failed to fetch task", false));
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { id: queryId } = params;
    const id = parseInt(queryId, 10);

    const taskData = req.body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: taskData,
    });

    res
      .status(200)
      .json(formatResponse("Task updated successfully", true, updatedTask));
  } catch (error) {
    res.status(500).json(formatResponse("Failed to update task", false));
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { id: queryId } = params;
    const id = parseInt(queryId, 10);

    const deletedTask = await prisma.task.delete({
      where: { id },
    });
    res
      .status(200)
      .json(formatResponse("Task deleted successfully", true, deletedTask));
  } catch (error) {
    res.status(500).json(formatResponse("Failed to delete task", false, 200));
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
