const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const LeadTask = db.task;
const LeadNote = db.note;
const LeadComment = db.comment;
const LeadAttachment = db.attachment;

const TasksAndActivities = {
  // Task Controllers
  createBasicTask: async (req, res) => {
    try {
      const { lead_id, opportunity_id, user_id, title, description, type, big_status, task_status, note_text, created_by, task_date } = req.body;
      
      const newTask = await LeadTask.create({
        lead_id,
        opportunity_id,
        user_id,
        title,
        description,
        type,
        big_status,
        task_status,
        note_text,
        created_by,
        task_date,
        created_at: new Date()
      });
      
      res.status(200).json({
        ...newTask.toJSON(),
        statusCode: 201
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  getAllBasicTasks: async (req, res) => {
    try {
      const { lead_id, opportunity_id } = req.query;
      const whereClause = {};
      
      if (lead_id) whereClause.lead_id = lead_id;
      if (opportunity_id) whereClause.opportunity_id = opportunity_id;
      
      const tasks = await LeadTask.findAll({ where: whereClause });
      res.status(200).json({
        data: tasks,
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  updateBasicTask: async (req, res) => {
    try {
      const { task_id, ...updates } = req.body;
      if (!task_id) return res.status(200).json({ 
        error: "Task ID is required",
        statusCode: 400 
      });
      
      const task = await LeadTask.findByPk(task_id);
      if (!task) return res.status(200).json({ 
        error: "Task not found",
        statusCode: 404 
      });
      
      await task.update(updates);
      res.status(200).json({
        ...task.toJSON(),
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  deleteBasicTask: async (req, res) => {
    try {
      const { task_id } = req.body;
      if (!task_id) return res.status(200).json({ 
        error: "Task ID is required",
        statusCode: 400 
      });
      
      const task = await LeadTask.findByPk(task_id);
      if (!task) return res.status(200).json({ 
        error: "Task not found",
        statusCode: 404 
      });
      
      await task.destroy();
      res.status(200).json({ 
        message: "Task deleted successfully",
        statusCode: 200 
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  // Note Controllers
  createBasicNotes: async (req, res) => {
    try {
      const { lead_id, opportunity_id, user_id, title, content, status } = req.body;
      
      const newNote = await LeadNote.create({
        lead_id,
        opportunity_id,
        user_id,
        title,
        content,
        status: status || false,
        created_at: new Date()
      });
      
      res.status(200).json({
        ...newNote.toJSON(),
        statusCode: 201
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  getAllBasicNotes: async (req, res) => {
    try {
      const { lead_id, opportunity_id } = req.query;
      const whereClause = {};
      
      if (lead_id) whereClause.lead_id = lead_id;
      if (opportunity_id) whereClause.opportunity_id = opportunity_id;
      
      const notes = await LeadNote.findAll({ where: whereClause });
      res.status(200).json({
        data: notes,
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  updateBasicNotes: async (req, res) => {
    try {
      const { note_id, ...updates } = req.body;
      if (!note_id) return res.status(200).json({ 
        error: "Note ID is required",
        statusCode: 400 
      });
      
      const note = await LeadNote.findByPk(note_id);
      if (!note) return res.status(200).json({ 
        error: "Note not found",
        statusCode: 404 
      });
      
      await note.update(updates);
      res.status(200).json({
        ...note.toJSON(),
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  deleteBasicNotes: async (req, res) => {
    try {
      const { note_id } = req.body;
      if (!note_id) return res.status(200).json({ 
        error: "Note ID is required",
        statusCode: 400 
      });
      
      const note = await LeadNote.findByPk(note_id);
      if (!note) return res.status(200).json({ 
        error: "Note not found",
        statusCode: 404 
      });
      
      await note.destroy();
      res.status(200).json({ 
        message: "Note deleted successfully",
        statusCode: 200 
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  // Comment Controllers
  createBasicComments: async (req, res) => {
    try {
      const { lead_id, opportunity_id, user_id, comment } = req.body;
      
      const newComment = await LeadComment.create({
        lead_id,
        opportunity_id,
        user_id,
        comment,
        created_at: new Date()
      });
      
      res.status(200).json({
        ...newComment.toJSON(),
        statusCode: 201
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  getAllBasicComments: async (req, res) => {
    try {
      const { lead_id, opportunity_id } = req.query;
      const whereClause = {};
      
      if (lead_id) whereClause.lead_id = lead_id;
      if (opportunity_id) whereClause.opportunity_id = opportunity_id;
      
      const comments = await LeadComment.findAll({ where: whereClause });
      res.status(200).json({
        data: comments,
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  updateBasicComments: async (req, res) => {
    try {
      const { comment_id, ...updates } = req.body;
      if (!comment_id) return res.status(200).json({ 
        error: "Comment ID is required",
        statusCode: 400 
      });
      
      const comment = await LeadComment.findByPk(comment_id);
      if (!comment) return res.status(200).json({ 
        error: "Comment not found",
        statusCode: 404 
      });
      
      await comment.update(updates);
      res.status(200).json({
        ...comment.toJSON(),
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  deleteBasicComments: async (req, res) => {
    try {
      const { comment_id } = req.body;
      if (!comment_id) return res.status(200).json({ 
        error: "Comment ID is required",
        statusCode: 400 
      });
      
      const comment = await LeadComment.findByPk(comment_id);
      if (!comment) return res.status(200).json({ 
        error: "Comment not found",
        statusCode: 404 
      });
      
      await comment.destroy();
      res.status(200).json({ 
        message: "Comment deleted successfully",
        statusCode: 200 
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  // Attachment Controllers
  createBasicAttachments: async (req, res) => {
    try {
      const { lead_id, opportunity_id, user_id, title } = req.body;
      
      const newAttachment = await LeadAttachment.create({
        lead_id,
        opportunity_id,
        user_id,
        title,
        created_at: new Date()
      });
      
      res.status(200).json({
        ...newAttachment.toJSON(),
        statusCode: 201
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  getAllBasicAttachments: async (req, res) => {
    try {
      const { lead_id, opportunity_id } = req.query;
      const whereClause = {};
      
      if (lead_id) whereClause.lead_id = lead_id;
      if (opportunity_id) whereClause.opportunity_id = opportunity_id;
      
      const attachments = await LeadAttachment.findAll({ where: whereClause });
      res.status(200).json({
        data: attachments,
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  updateBasicAttachments: async (req, res) => {
    try {
      const { attachment_id, ...updates } = req.body;
      if (!attachment_id) return res.status(200).json({ 
        error: "Attachment ID is required",
        statusCode: 400 
      });
      
      const attachment = await LeadAttachment.findByPk(attachment_id);
      if (!attachment) return res.status(200).json({ 
        error: "Attachment not found",
        statusCode: 404 
      });
      
      await attachment.update(updates);
      res.status(200).json({
        ...attachment.toJSON(),
        statusCode: 200
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  },

  deleteBasicAttachments: async (req, res) => {
    try {
      const { attachment_id } = req.body;
      if (!attachment_id) return res.status(200).json({ 
        error: "Attachment ID is required",
        statusCode: 400 
      });
      
      const attachment = await LeadAttachment.findByPk(attachment_id);
      if (!attachment) return res.status(200).json({ 
        error: "Attachment not found",
        statusCode: 404 
      });
      
      await attachment.destroy();
      res.status(200).json({ 
        message: "Attachment deleted successfully",
        statusCode: 200 
      });
    } catch (error) {
      res.status(200).json({ 
        error: error.message,
        statusCode: 500 
      });
    }
  }
};

module.exports = TasksAndActivities;