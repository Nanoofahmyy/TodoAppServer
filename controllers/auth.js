const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async function (request, response) { 
  const { Email, Password , UserName} = request.body;

  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        Email,
        UserName,
        Password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, 'your-secret-key');

    response.json({ token });
  } catch (error) {
    console.log("🚀 ~ file: auth.js:27 ~ error:", error)
    response.status(400).json({ error: 'User already exists' });
  }
}


exports.login = async function (request, response) { 
 try{
    const { Email, Password } = request.body;

  const user = await prisma.user.findUnique({
    where: {
        Email,
    },
  });

  if (!user) {
    response.status(400).json({ error: 'User not found' });
    return;
  }

  const passwordMatch = await bcrypt.compare(Password, user.Password);

  if (!passwordMatch) {
    response.status(400).json({ error: 'Invalid password' });
    return;
  }

  const token = jwt.sign({ userId: user.id }, 'your-secret-key');

  response.json({ token });
} catch (error) {
    console.log("🚀 ~ file: auth.js:27 ~ error:", error)
   
  }
}
