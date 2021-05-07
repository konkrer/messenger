/** onlineUsers Object
 *
 * This object will contain an object (user-agent-obj) for each online user,
 * located at the key of the user's id.
 *
 * Each user-agent-obj will have a key for each of the user's user-agents
 * (i.e. connections to this App). At each key will be the current socket id
 * for that userAgent's io.socket's connection. The  user-agent key is a UUID
 * created on successfull user signup or login.
 *
 * Example: {
 *            userID: {
 *              userAgentUUID: socketID,
 *              anotherUserAgentUUID: anotherSocketID
 *               }
 *          }
 */
const onlineUsers = {};
module.exports = onlineUsers;
