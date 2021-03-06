const axios = require('axios').default;
const TimerMachine = require('timer-machine')

const { Client } = require('../../Bot');
/**
 * @param {Client} client
 */
module.exports = (client) => {
  if (process.env.DEV) return;

  setInterval(() => {
    let timer = new TimerMachine();
    timer.start()
    axios(process.env.DATABASE_URI)
      .then(res => {
        // If got the hand shake to the server
        if (res.status === 200) {
          timer.stop();
          client.log.info(`[HANDSHAKE] Handshake received! (${timer.time()} ms)`);
        }
      })
      .catch(err => {
        timer.stop();
        client.log.error(`[HANDSHAKE] Handshake Error! (${timer.time()} ms)\n\t${err.message}`);
      })
  }, 180000);
}
