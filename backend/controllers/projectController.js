const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('team', 'name email').populate('tasks');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, team } = req.body;
    const project = await Project.create({ title, description, team });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
