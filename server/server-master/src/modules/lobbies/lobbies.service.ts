import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class LobbiesService {
    constructor(private prisma: PrismaService) {}
    
    async createLobby(data: any) {
        return await this.prisma.lobby.create({
            data: {
                host: data.host,
                rank: data.rank,
                map: data.map,
                in_progress: data.in_progress,
                players: data.players
            }
        })
    }

    async getAllLobbies() {
        return await this.prisma.lobby.findMany();
    }

    async joinLobby(data:any){
        return await this.prisma.lobby.update({
            where: {
                lobby_id: data.lobby_id,
            },
            data: {
                players: {
                    push: data.username
                }
            }
        })
    }

    async findLobby(lobby_id: string){
        console.log("LOBBY ID: ", lobby_id)
        const test = await this.prisma.lobby.findMany({
            where: {
                lobby_id: lobby_id
            }
        })
        console.log("this is test: ", test)
        return test
    }

    async deleteLobby(lobby_id: string) {
        return await this.prisma.lobby.delete({
            where: {
                lobby_id: lobby_id
            }
        })
    }

}
