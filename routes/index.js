const express = require('express');
const router = express.Router();
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

router.get('/getTasks', (req, res) => {
  res.json(tasks);
});

router.get('/getGoals', (req, res) => {
  res.json(goals);
});

router.post('/addTask', (req, res) => {
  const { nombre } = req.body;
  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'Parámetro "nombre" inválido' });
  }

  const nueva = { id: Date.now(), nombre };
  tasks.push(nueva);
  res.status(200).json({ mensaje: 'Tarea agregada', tarea: nueva });
});

router.post('/addGoal', (req, res) => {
  const { nombre } = req.body;
   if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'Parámetro "nombre" inválido' });
  }
  const nueva = { id: Date.now(), nombre };
  goals.push(nueva);
  res.status(200).json({ mensaje: 'Tarea agregada', tarea: nueva });
});

router.delete('/removeTask', (req, res) => {
  const { id } = req.body;
  if (typeof id !== 'number') {
    return res.status(400).json({ error: 'Parámetro "id" inválido' });
  }

  const existe = tasks.some(t => t.id === id);
  if (!existe) {
    return res.status(400).json({ error: 'No existe una tarea con ese ID' });
  }

  tasks = tasks.filter(t => t.id !== id);
  res.status(200).json({ mensaje: `Tarea con ID ${id} eliminada` });
});

router.delete('/removeGoal', (req, res) => {
  const { id } = req.body;
   if (typeof id !== 'number') {
    return res.status(400).json({ error: 'Parámetro "id" inválido' });
  }
  const existe = goals.some(t => t.id === id);
   if (!existe) {
    return res.status(400).json({ error: 'No existe una tarea con ese ID' });
  }
  goals = goals.filter(g => g.id !== id);
  res.status(200).json({ mensaje: `Meta con ID ${id} eliminada` });
});

module.exports = router;
