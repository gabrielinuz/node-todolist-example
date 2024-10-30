// Importamos express y el modelo de la tarea
const express = require('express');
const Todo = require('../models/todo');


// Controlador para obtener todas las tareas
exports.getTasks = async (req, res) => {
    try 
    {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

// Controlador para crear una tarea
exports.createTask = async (req, res) => {
    const { task } = req.body;

    try 
    {
        const newTodo = new Todo({ task });
        await newTodo.save();
        res.status(201).json(newTodo);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

// Controlador para marcar como completada una tarea
exports.completeTask = async (req, res) => {
    const { id } = req.params;

    try 
    {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
        res.status(200).json(updatedTodo);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

// Controlador para eliminar una tarea
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try 
    {
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Tarea eliminada' });
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};

// Controlador para activar una tarea
exports.activateTask = async (req, res) => {
    const { id } = req.params;

    try 
    {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: false }, { new: true });
        res.status(200).json(updatedTodo);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};
