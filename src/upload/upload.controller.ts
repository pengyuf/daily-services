import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    @Post('/image')
    @UseInterceptors(FileInterceptor('file',{
        // 控制文件大小
        limits:{ fileSize: Math.pow(1024, 2) * 1 } 
    }))
    async uploadImage(@UploadedFile() file) {
        const fileUrl = `http://localhost:3000/uploads/${file.filename}`
        return {
            url: fileUrl
        }
    }
}
