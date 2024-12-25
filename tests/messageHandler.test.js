import { describe, it, expect } from 'vitest';
import messageHandler from '../src/messageHandler';

describe('MessageHandler', () => {
  describe('validateMessage', () => {
    it('should return false for empty message', () => {
      const data = { message: '' };
      expect(messageHandler.validateMessage(data)).toBe(false);
    });

    it('should return true for valid message', () => {
      const data = { message: 'hello' };
      expect(messageHandler.validateMessage(data)).toBe(true);
    });
  });

  describe('formatMessage', () => {
    it('should format message correctly', () => {
      const data = { message: 'hello' };
      const result = messageHandler.formatMessage(data);
      
      expect(result).toEqual({
        message: 'hello',
        timestamp: expect.any(String)
      });
    });

    it('should trim whitespace', () => {
      const data = { message: ' hello ' };
      const result = messageHandler.formatMessage(data);
      
      expect(result).toEqual({
        message: 'hello',
        timestamp: expect.any(String)
      });
    });
  });
});