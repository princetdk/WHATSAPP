const axios = require('axios');
const Message = require('../models/Message');

const WHATSAPP_API_URL = 'https://graph.instagram.com/v17.0';

// Receive WhatsApp message webhook
exports.receiveMessage = async (req, res) => {
  try {
    const body = req.body;

    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const message = body.entry[0].changes[0].value.messages[0];
        const sender = body.entry[0].changes[0].value.contacts[0].wa_id;

        const newMessage = new Message({
          type: 'whatsapp',
          from: sender,
          to: process.env.WHATSAPP_PHONE_NUMBER_ID,
          content: message.text?.body || '',
          status: 'received',
          metadata: { messageId: message.id }
        });

        await newMessage.save();
      }

      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Send WhatsApp message
exports.sendMessage = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get WhatsApp messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ type: 'whatsapp' }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
