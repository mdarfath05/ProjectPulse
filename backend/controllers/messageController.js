const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'Message text required' });
    const msg = await Message.create({ user: req.user.id, text });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMyMessages = async (req, res) => {
  try {
    const msgs = await Message.find({ user: req.user.id }).sort('-createdAt');
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
