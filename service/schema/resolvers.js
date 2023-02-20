const { Employee, Department, Shift, User } = require('../modules/factoryModules')
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { getAllActions, addUserLogin, getDecrementAction, getActByUID } = require('../jsonData/actionsMethods');


const resolvers = {
    Query: {
        async getAllEmployees() {
            return await Employee.find({})
        },
        async getEmployee(_, { ID }) {
            return await Employee.findById(ID)
        },

        async getAllDepartments() {
            return await Department.find({})
        },
        async getDepartment(_, { ID }) {
            return await Department.findById(ID)
        },

        async getAllShifts() {
            return await Shift.find({})
        },
        async getShift(_, { ID }) {
            return await Shift.findById(ID)
        },

        // return users from mongodb, in first start get the users from jsonplaceholder API
        async getAllUsers() {
            const count = await User.countDocuments({});
            if (count > 0) {
                let users = await User.find({})
                return users
            } else {
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
                for (const user of data) {
                    const userModel = new User(user);
                    await userModel.save();
                }
                const dep = new Department({
                    fullName: "Demo Department",
                    numOfActions: 50
                });
                await dep.save();
            }
        },

        async getUserByName(_, { username }) {
            const u = await User.findOne({ username })
            const act = { "id": u.id, "maxActions": u.numOfActions, "date": new Date().toDateString(), "actionAllowd": !u.numOfActions && u.numOfActions != 0 ? 40 : u.numOfActions }
            addUserLogin(act)
            return u
        },
        async getAllActs() {
            const actions = await getAllActions()
            return actions
        },
        async getActByUserID(_, { ID }) {
            return await getActByUID(ID)
        }
    },
    Mutation: {
        async addEmployee(_, args) {
            const emp = new Employee(args.emp);
            await emp.save();
            return 'Created!';
        },
        async updateEmployee(_, args) {
            const update = (await Employee.updateOne({ _id: args.ID }, args.emp)).modifiedCount
            if (update) return 'Update!'
            else return 'Some error'
        },
        async deleteEmployee(_, { ID }) {
            const deleted = (await Employee.deleteOne({ _id: ID })).deletedCount;
            if (deleted) return 'Deleted!'
            else return 'Some error'
        },

        async addDepartment(_, args) {
            const dep = new Department(args.dep);
            await dep.save();
            return 'Created!';
        },
        async updateDepartment(_, args) {
            const update = (await Department.updateOne({ _id: args.ID }, args.dep)).modifiedCount
            if (update) return 'Update!'
            else return 'Some error'
        },
        async deleteDepartment(_, { ID }) {
            const deleted = (await Department.deleteOne({ _id: ID })).deletedCount;
            if (deleted) return 'Deleted!'
            else return 'Some error'
        },

        async addShift(_, args) {
            const shif = new Shift(args.shif);
            await shif.save();
            return 'Created!';
        },
        async updateShift(_, args) {
            const update = (await Shift.updateOne({ _id: args.ID }, args.shif)).modifiedCount
            if (update) return 'Update!'
            else return 'Some error'
        },
        async updateUser(_, args) {
            const update = (await User.updateOne({ _id: args.ID }, args.u)).modifiedCount
            if (update) return 'Update!'
            else return 'Some error'
        },
        // user make first login or not - check athentication and if user have enough actionAllowd toda. first time login add the user to jsonData(all actions)
        async loginUser(_, { loginInput: { username, email } }) {
            const user = await User.findOne({ email })
            const allowd = await getActByUID(user.id)
            if (user && user.username === username) {
                if ((allowd?.actionAllowd > 0) || (!allowd?.actionAllowd)) {
                    const token = jwt.sign(
                        { id: user.id, numOfActions: user.numOfActions, username },
                        "secret",
                        { expiresIn: "3h" }
                    )
                    user.token = token
                    return {
                        ...user._doc
                    }
                }
            }
        },
        async getDecAction(_, { ID }) {
            const res = await getDecrementAction(ID)
            return res
        },
    }
}
module.exports = { resolvers }



