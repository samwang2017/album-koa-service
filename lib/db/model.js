//存储服务需要的数据模型
//添加账户的数据类型
const mongoose=require('mongoose')

//小程序 oauth 授权认证登录
const userSchema=new mongoose.Schema({
    openId:{
        type:String,
        index:true,
        unique:true
    },
    created:{
        type:Date,
        default:Date.now
    },
    lastLogin:{
        type:Date
    },
    name:{
        type:String,
        index:true
    },
    avatar:{
        type:String
    },
    userType:{
        type:Number
    }
})

//扫码登录 存储 用户关联的二维码信息
const codeSchema=new mongoose.Schema({
    code:{
        type:String
    },
    sessionKey:String
})


//相册数据模型
const albumSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    name:{
        type:String
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:'created',
        updatedAt:'updated'
    }
})

//照片数据模型
const photoSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    url:{
        type:String
    },
    isApproved:{
        type:Boolean,
        default:null,
        index:true
    },
    albumId:{
        type:mongoose.Schema.Types.ObjectId
    },
    created:{
        type:Date,
        default:Date.now
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})


module.exports={
    User:mongoose.model('User',userSchema),
    Code:mongoose.model('Code',codeSchema),
    Album:mongoose.model('Album',albumSchema),
    Photo:mongoose.model('Photo',photoSchema)
}