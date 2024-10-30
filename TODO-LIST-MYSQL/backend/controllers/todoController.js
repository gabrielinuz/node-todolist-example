// Importamos express y el modelo de la tarea
const express = require('express');
const Todo = require('../models/todo');

// Controlador para obtener todas las tareas
exports.getTasks = async (req, res) => 
{
    try 
    {
        const todos = await Todo.getAllTodos(req.db); // Usamos el método del modelo para obtener tareas
        res.status(200).json(todos);
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

// Controlador para crear una tarea
exports.createTask = async (req, res) => 
{
    const { task } = req.body; // Aseguramos que estamos extrayendo el valor de task correctamente las llaves son importantes

    try 
    {
        const newTodoId = await Todo.createTodo(req.db, task); // Pasamos task directamente
        res.status(201).json({ id: newTodoId, task, completed: false });
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

// Controlador para marcar como completada una tarea
exports.completeTask = async (req, res) => 
{
    const id = parseInt(req.params.id, 10);;

    try 
    {
        const affectedRows = await Todo.updateTodo(req.db, id, true); // Actualizamos la tarea
        if (affectedRows > 0) 
        {
            res.status(200).json({ id, completed: true });
        } 
        else 
        {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

// Controlador para activar una tarea (marcar como no completada, osea: activa)
exports.activateTask = async (req, res) => 
{
    const id = parseInt(req.params.id, 10);

    try 
    {
        const affectedRows = await Todo.updateTodo(req.db, id, false); // Actualizamos la tarea
        if (affectedRows > 0) 
        {
            res.status(200).json({ id, completed: false });
        } 
        else 
        {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

// Controlador para eliminar una tarea
exports.deleteTask = async (req, res) => 
{
    const id = parseInt(req.params.id, 10);

    try 
    {
        const affectedRows = await Todo.deleteTodo(req.db, id); // Eliminamos la tarea
        if (affectedRows > 0) 
        {
            res.status(200).json({ message: 'Tarea eliminada' });
        } 
        else 
        {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } 
    catch (error) 
    {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};
