const Router=require('koa-router')
const router=new Router()
const account=require('./actions/account')
const auth=require('./middlewares/auth')


async function responseOK(ctx,next){
    ctx.body={
        status:0
    }
    await next()
}

//小程序登录 接受小程序登录获取的code

//扫码登录时 获取二维码字符串
router.get('/login/ercode',async(context,next)=>{
    context.body={
        status:0,
        data:await account.getErCode()
    }
})

//扫码后 把二维码信息附带登录凭证传到后端
router.get('/login/ercode/:code',auth,async(context,next)=>{
    const code=context.params.code
    const sessionKey=context.get('x-session')
    await account.setSessionKeyForCode(code,sessionKey)
    await next()
},responseOK)

//长轮询当前生成的二维码是否被扫描过
router.get('/login/errcode/check/:code',async(context,next)=>{
    const startTime=Date.now()
    async function login(){
        const code=context.params.code
        const sessionKey=await account.getSessionKeyByCode(code)
        if(sessionKey){
            context.body={
                status:0,
                data:{
                    sessionKey:sessionKey
                }
            }
        }else{
            if(Date.now()-startTime<10000){
                await new Promise((resolve)=>{
                    process.nextTick(()=>{
                        resolve()
                    })
                })
                await login()
            }else{
                context.body={
                    status:-1
                }
            }
        }

    }
    await login()
})
