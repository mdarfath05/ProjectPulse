const Project = require('../models/Project');


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('team', 'name email')
      .populate({
        path: 'tasks',
        populate: { path: 'assignedTo', select: 'name email' } // 👈 Nested populate
      });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
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
