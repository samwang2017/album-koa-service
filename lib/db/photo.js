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
    }
}