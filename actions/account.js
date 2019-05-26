const {
    login
}=require('../lib/db/user')

const {
    getSession
}=require('../lib/wx')

const {
    encodeErCode,
    decode
}=require('../lib/crypto')

const {
    add,removeData,updateSessionKey,getSessionKey
}=require('../lib/db/code')
module.exports={
    async login(code){
        const session=await getSession(code)
        if(session){
            const {
                openid
            }=session
            return login(openid)
        }else{
            throw new Error('login failed')
        }
    },
    async getErCode(){
        const code=encodeErCode()
        await add(code)
        setTimeout(()=>{
            removeData(code)
        },30000)
        return code
    },
    async setSessionKeyForCode(code,sessionKey){
        const {timespan}=decode(code)
        if(Date.now()-timespan>30000){
            throw new Error('time out 30s')
        }
        await updateSessionKey(code,sessionKey)
    },
    async getSessionKeyByCode(code){
        const sessionKey=await getSessionKey(code)
        if(sessionKey){
            await removeData(code)
        }
        return sessionKey

    }

}