module.exports = {
  users:    new Map(),  // socketId → { id, username, online, lastSeen }
  messages: [],         // { id, from, to, body, type, mediaUrl, timestamp, readBy[] }
  statuses: [],         // { id, authorId, text, imageUrl, timestamp, expiresAt }
};
