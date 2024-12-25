class MessageHandler {
    validateMessage(data) {
      if (!data.username || !data.message) {
        return false;
      }
      return data.username.trim().length > 0 && data.message.trim().length > 0;
    }
  
    formatMessage(data) {
      return {
        username: data.username.trim(),
        message: data.message.trim(),
        timestamp: new Date().toISOString()
      };
    }
  }
  
  module.exports = new MessageHandler();