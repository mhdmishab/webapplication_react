import User from '../model/user.js';

export const getUsers = (async (req, res) => {
    try {
        console.log("hellooo")
        const getAllUser = await User.find();

        res.json({
            status: true,
            AllUsers: getAllUser
        })


    } catch (error) {
        console.log(error.message);
    }


})

export const BlockUser = (async (req, res) => {

    try {
        console.log("inside blockUser")

        const id = req.params.id;
        console.log(id);
        await User.updateOne({ _id: id }, { $set: { isBlocked: true } })
        const isBlocked = await User.findOne({ _id: id })
        return res.json(isBlocked.isBlocked)

    } catch (err) {
        console.log(err.message);
    }

})

export const UnblockUser = (async (req, res) => {
    try {

        const id = req.params.id;
        await User.updateOne({ _id: id }, { $set: { isBlocked: false } })
        const isUnBlocked = await User.findOne({ _id: id })
        return res.json(isUnBlocked.isBlocked)

    } catch (error) {
        console.log(error.message);
    }

})
