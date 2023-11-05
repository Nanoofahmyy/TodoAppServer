const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTodo = async function (request, response) { 
  try {
    const userId = request.userId;
    const { text } = request.body;
    const newTodo = await prisma.todo.create({
      data: {
        text,
        isDone:false,
        userId:request.userId,
      },
    });
    response.json(newTodo);
  } catch (error) {
    console.log("🚀 ~ file: todo.js:20 ~ error:", error)
    response.status(500).json({ error: 'Failed to create a new todo.' });
  }
};

exports.getAllTodo = async function (request, response) { 
  try {
    const todos = await prisma.todo.findMany({ where: { userId: parseInt(request.userId) },});
    response.json(todos);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch todos.' });
  }
};

exports.updateTodo = async function (request, response) { 
  const { id } = request.params;
  const { text } = request.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) , userId: parseInt(request.userId)  },
      data: { text },
    });
    response.json(updatedTodo);
  } catch (error) {
    console.log("🚀 ~ file: todo.js:50 ~ error:", error)
    response.status(500).json({ error: 'Failed to update the todo.' });
  }
};


exports.deleteTodo = async function (request, response) { 
  const { id } = request.params;

  try {
    await prisma.todo.delete({
      where: { id: parseInt(id) , userId: parseInt(request.userId) },
    });
    response.json({ message: 'Todo deleted.' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete the todo.' });
  }
};

