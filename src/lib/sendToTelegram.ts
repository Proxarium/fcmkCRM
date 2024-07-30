import axios from 'axios';

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

export const sendToTelegram = async (message: string) => {
  try {
    await axios.post(TELEGRAM_API_URL, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
};
