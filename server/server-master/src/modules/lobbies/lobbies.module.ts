import { Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { LobbiesController } from './lobbies.controller';
import { PrismaModule } from "prisma/prisma.module";
import { PrismaService } from "prisma/prisma.service";

@Module({
  imports: [PrismaModule],
  controllers: [LobbiesController],
  providers: [LobbiesService,PrismaService],
  exports: [LobbiesService],
})
export class LobbiesModule {}
