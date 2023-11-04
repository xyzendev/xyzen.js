require('dotenv').config()
const Function = new (require('./configuration/function'));
const Converter = new (require('./configuration/converter'));
const Wm = new (require('./configuration/watermark'));
const db = new (require('./configuration/database'));

module.exports = class system {
    Converter = Converter
    Function = Function
    Wm = Wm
    db = db
}