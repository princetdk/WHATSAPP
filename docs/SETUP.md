# Setup Guide

## Prerequisites

- Node.js (v14+)
- MongoDB
- Twilio Account
- WhatsApp Business Account

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/princetdk/WHATSAPP.git
cd WHATSAPP
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### 4. Setup Twilio

- Create a [Twilio account](https://www.twilio.com)
- Get your Account SID and Auth Token
- Purchase a phone number
- Update `.env` with your Twilio credentials

### 5. Setup WhatsApp Business API

- Create a [WhatsApp Business Account](https://www.whatsapp.com/business/api)
- Get your API token and phone number ID
- Update `.env` with your WhatsApp credentials

### 6. Start MongoDB

```bash
mongod
```

### 7. Start the server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### SMS
- `POST /api/sms/temporary-number` - Get a temporary phone number
- `POST /api/sms/receive` - Webhook for incoming SMS
- `GET /api/sms/messages` - Get all SMS messages

### WhatsApp
- `POST /api/whatsapp/webhook` - Webhook for incoming messages
- `POST /api/whatsapp/send` - Send a WhatsApp message
- `GET /api/whatsapp/messages` - Get all WhatsApp messages

### Messages
- `GET /api/messages` - Get all messages (SMS + WhatsApp)
- `GET /api/messages/:id` - Get a specific message
