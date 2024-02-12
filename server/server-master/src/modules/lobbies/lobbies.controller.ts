import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Prisma } from '@prisma/client';
import { LobbiesService } from './lobbies.service';

@Controller("lobbies")
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @Get("all")
  getAllLobbies() {
    return this.lobbiesService.getAllLobbies()
  }

  @Post("create")
  createLobby(
    @Body() createLobbyInput: any,
  ) {
    return this.lobbiesService.createLobby(createLobbyInput);
  }

  @Get(":id")
  findOne(@Param("id") lobby_id: string) {
    return this.lobbiesService.findLobby(lobby_id);
  }
  
  @Put("join")
  joinLobby(
    @Body() data:any
    ){
    return this.lobbiesService.joinLobby(data)
  }

  @Delete(":id")
  deleteLobby(@Param("id") lobby_id: string){
    return this.lobbiesService.deleteLobby(lobby_id)
  }
}
