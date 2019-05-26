const {
    User
}=require('./model')

const {
    encode,
    decode
}=require('../crypto')
const getByOpenId=async(openid)=>{

}

module.exports={
    async login(openId){
        let user=await getByOpenId(openId)
        if(!user){
            user=await User.create({
                openId:openId
            })
        }
        const id=user._id
        const sessionKey=encode(id)
        await User.update({
            _id:id
        },{
            lastLogin:Date.now()
        })
        return {
            sessionKey
        }
    },
    async findBySessionKey(sessionKey){
        const {
            id,
            timespan
        }=decode(sessionKey)
        if(Date.now()-timespan>1000*60*60*24*3){
            return null
        }
        const user= await User.find({
            _id:id
        })
        if(user.length){
            return user[0]
        }
        return null
    }
}