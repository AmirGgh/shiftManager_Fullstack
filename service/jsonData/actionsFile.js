const jsonfile = require('jsonfile')
const file = './data/data.json'
const getActs = () => {
    return jsonfile.readFile(file)
}
const setActs = async (act) => {
    await jsonfile.writeFile(file, act)
    return Done
}
module.exports = { getActs, setActs }