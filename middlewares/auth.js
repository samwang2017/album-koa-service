const {
    findBySessionKey
}=require('../lib/db/user')

module.exports=async function (context,next) {
    const sessionKey=context.get('x-session')
    if(!sessionKey){
        context.throw(401,'requestHeader not contain x-ssion')
    }
    const user=await findBySessionKey(sessionKey)
    if(user){
        context.state.user={
            id:user._id,
            name:user.name,
            avatar:user.avatar,
            isAdmin:user.userType===1
        }
    }else{
        context.throw(401,'session is expired')
    }
    await next()
}