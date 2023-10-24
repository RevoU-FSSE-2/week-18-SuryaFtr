const applyHelmet = require('./helmet');
const applyBodyParser = require('./bodyParser');
const applyMorgan = require('./morgan');
const applyAuth = require('./auth');
const applyCookieParser = require('./cookieparser');
const applyCors = require('./cors');

module.exports = (app) => {
  applyCors(app);
  applyHelmet(app);
  applyBodyParser(app);
  applyMorgan(app);
  applyCookieParser(app);
  applyAuth(app);
}
