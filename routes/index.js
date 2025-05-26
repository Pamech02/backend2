const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Goal = require('../models/Goal');
const API_KEY = '12345-mi-apikey-secreta';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Falta el header Authorization' });
  }

  if (authHeader !== API_KEY) {
    return res.status(403).json({ error: 'API key inválida' });
  }

  next(); 
}

let tasks = [
  { id: 1, nombre: 'Estudiar Node.js' },
  { id: 2, nombre: 'Hacer ejercicio' }
];

let goals = [
  { id: 1, nombre: 'Aprender backend' },
  { id: 2, nombre: 'Publicar un proyecto' }
];

router.use(authMiddleware);

router.get('/getTasks', async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

router.get('/getGoals', async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

router.post('/addTask', async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });

  const nueva = new Task({ nombre });
  await nueva.save();
  res.status(200).json({ mensaje: 'Tarea guardada', tarea: nueva });
});

router.post('/addGoal', async (req, res) => {
  const { nombre } = req.body;
   if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'Parámetro "nombre" inválido' });
  }
  const nueva = new Goal({ nombre });
  await nueva.save();
  res.status(200).json({ mensaje: 'Goasl agregado', tarea: nueva });
});

router.delete('/removeTask', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Falta el ID' });

  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) return res.status(400).json({ error: 'No se encontró esa tarea' });

  res.status(200).json({ mensaje: `Tarea con ID ${id} eliminada` });
});

router.delete('/removeGoal', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Falta el ID' });

  const deleted = await Goal.findByIdAndDelete(id);
  if (!deleted) return res.status(400).json({ error: 'No se encontró esa tarea' });

  res.status(200).json({ mensaje: `Tarea con ID ${id} eliminada` });
});

module.exports = router;
