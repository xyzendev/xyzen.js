import { Low, JSONFile } from "lowdb";
import yargs from "yargs";
import _ from "lodash";

async function dbsystem(name) {
    global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
    global.db = new Low(new JSONFile(name));

    global.DATABASE = global.db
    global.loadDatabase = async function loadDatabase() {
        if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
        if (global.db.data !== null) return
        global.db.READ = true
        await global.db.read()
        global.db.READ = false
        global.db.data = {
            users: {},
            group: {},
            game: {},
            settings: {},
            ...(global.db.data || {})
        }
        global.db.chain = _.chain(global.db.data)
    }
    loadDatabase()
}

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
}, 30 * 1000)


module.exports = dbsystem