import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { extname, join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const uploadDir = join(process.cwd(),'uploads')

@Module({
    imports:[
     MulterModule.register({
        storage:diskStorage({
            destination:(req,file,cb)=>{
                cb(null,uploadDir)
            },
            filename:(req,file,cb)=>{
                const ext = extname(file.originalname)
                const filename = `${Date.now()}${ext}`
                cb(null,filename)
            }
        }),
        fileFilter:(req,file,cb)=>{
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                cb(null,true)
            }else{
                cb(new Error('仅可上传图片'),false)
            }
        }
     })
    ],
    controllers: [UploadController]
})
export class UploadModule {

}