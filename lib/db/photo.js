const {
    Photo
}=require('./model')

module.exports={
    async getPhotosByAlbumIdCount(albumId){
        return Photo.count({
            albumId,
            isApproved:true,
            isDelete:false
        })
    },
    async getPhotosByAlbumId(albumId,pageIndex,pageSize){
        return await Photo.find({
            albumId,
            isApproved:true,
            isDelete:false
        }).sort({
            'updated':-1
        })
    },
    async add(userId,url,albumId){
        return await Photo.create({
            userId,
            url,
            albumId
        })
    },
    async getPhotoById(id){
        return Photo.findById(id)
    },
    async delete(id){
        return Photo.update({
            _id:id
        },{
            isDelete:true
        })
    }
}