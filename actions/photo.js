const photo=require('../lib/db/photo')
const album=require('../lib/db/album')

module.exports={
    async addAlbum (userId,name){
        return album.add(userId,name)
    },
    async updateAlbum(id,name,user){
        const _album=await album.findById(id)
        if(!_album){
            throw new Error('album does not exit')
        }
        if(!user.isAdmin&&user.id!=_album.id){
            throw new Error('u have no access to this album')
        }
        return album.update(id,name)
    },
    async deleteAlbum(id){
        const photos=await photo.getPhotosByAlbumIdCount(id)
        if(photos.length){
            throw new Error('exits photo,can not delete album')
        }
        return album.delete(id)
    },
    async getAlbums(userId,pageIndex,pageSize){
        const albums=await album.getAlbums(userId)
        return Promise.all(albums.map(async function (item) {
            const id=item._id
            let ps=await photo.getPhotosByAlbumId(id)
            return Object.assign({
                photoCount:ps.length,
                fm:ps[0]?ps[0].url:null
            },item.toObject())
        }))
    }
}