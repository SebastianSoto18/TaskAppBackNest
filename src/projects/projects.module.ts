import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsEntity } from './entities/projects.entity';
import { ProjectsService } from './services/projects.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectsEntity])
    ],
    providers: [ProjectsService],
    controllers: [ProjectsController]
})
export class ProjectsModule {}
