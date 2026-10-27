# WhatsApp Automation Bot

A Node.js bot that automates WhatsApp Web sessions using [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js), with MongoDB (Mongoose) for persistence.

## Tech Stack

- Node.js
- whatsapp-web.js and Puppeteer for driving WhatsApp Web
- MongoDB with Mongoose
- qrcode-terminal for QR-code login in the terminal
- dotenv for configuration

## Getting Started

```bash
# 1. Install dependencies
yarn install

# 2. Configure environment
cp .env.example .env   # then set MONGO_URI

# 3. Run
yarn start      # production
yarn dev        # auto-reload with nodemon
```

On first run a QR code is printed in the terminal. Scan it with WhatsApp (Linked devices) to authenticate the session.

## Configuration

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |

## Disclaimer

This project is unofficial and is not affiliated with WhatsApp. Use it responsibly and in line with WhatsApp's terms of service.
