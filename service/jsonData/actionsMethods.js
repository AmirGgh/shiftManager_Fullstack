const actFile = require('./actionsFile')
// for users page
const getAllActions = async () => {
    const { actions } = await actFile.getActs()
    return actions
}
const getActByUID = async (id) => {
    let actions = await getAllActions()
    return actions.find((act) => act.id === id)
}


//  update user action IN NEW LOGIN TODAY
const addUserLogin = async (obj) => {
    let actions = await getAllActions()
    const actLen = actions.length
    const valDay = new Date().toDateString()
    actions = actions.filter((act) => act.date === valDay)
    if (actLen != actions.length) {
        await actFile.setActs({ "actions": actions })
        console.log('restart data')
    }
    if (!actions.find((act) => act?.id === obj.id)) {
        actions.push(obj)
        const res = await actFile.setActs({ "actions": actions })
        return 'add to actions'
    }

}
const firstUpdate = async (obj) => {
    let actions = await getAllActions()
    actions.push(obj)
    const res = await actFile.setActs({ "actions": actions })
    return 'add to actions'
}
const getDecrementAction = async (id) => {
    const actions = await getAllActions()
    const index = actions.findIndex(act => act.id === id)
    if (index != -1) {
        const u = actions[index]
        if (u.actionAllowd > 0) {
            u.actionAllowd -= 1
            actions[index] = u
            await actFile.setActs({ "actions": actions })
            return u.actionAllowd
        } else {
            return -1
        }
    }
}

module.exports = { getAllActions, addUserLogin, getDecrementAction, getActByUID, firstUpdate }

