const bot = require('./bot');

async function createTelegramPoll(petition) {
  try {
    const chatId = process.env.TELEGRAM_CHAT_ID; 
    const newpoll = await bot.sendPoll(
      chatId,
      `Upvote petition: ${petition.title}`,
      ['Upvote'],
      { is_anonymous: false }
    );

    petition.telegramPollId = newpoll.poll.id;
    await petition.save();
    console.log(`Telegram poll created for petition: ${petition.title}`);
  } catch (error) {
    console.error("Error creating Telegram poll:", error);
  }
}

module.exports = { createTelegramPoll };
