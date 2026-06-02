const twilio = require('twilio');
const Message = require('../models/Message');
const TemporaryNumber = require('../models/TemporaryNumber');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Get or create temporary number
exports.getTemporaryNumber = async (req, res) => {
  try {
    const { userId } = req.body;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const temporaryNumber = new TemporaryNumber({
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
      owner: userId,
      expiresAt
    });

    await temporaryNumber.save();
    res.json(temporaryNumber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Receive SMS webhook
exports.receiveSms = async (req, res) => {
  try {
    const { From, To, Body } = req.body;

    const message = new Message({
      type: 'sms',
      from: From,
      to: To,
      content: Body,
      status: 'received'
    });

    await message.save();

    // Update message count
    await TemporaryNumber.findOneAndUpdate(
      { phoneNumber: To },
      { $inc: { messageCount: 1 } }
    );

    res.status(200).send('SMS received');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get SMS messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ type: 'sms' }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
