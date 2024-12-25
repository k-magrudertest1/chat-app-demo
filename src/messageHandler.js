class MessageHandler {
    validateMessage(data) {
      if (!data.message) {
        return false;
      }
      return data.message.trim().length > 0;
    }
  
    formatMessage(data) {
      return {
        message: data.message.trim(),
        timestamp: new Date().toISOString()
      };
    }
  }
  
  module.exports = new MessageHandler();