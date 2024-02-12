-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "TournamentFormat" AS ENUM ('RO8', 'RO16', 'RO32');

-- CreateEnum
CREATE TYPE "League" AS ENUM ('Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Controller', 'Sentinel', 'Duelist', 'Initiator');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "riot_name" TEXT NOT NULL,
    "riot_tag" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL DEFAULT 'USER',
    "profilePicture" BYTEA,
    "discord" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Lobby" (
    "description" TEXT,
    "lobby_id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "map" TEXT NOT NULL,
    "players" TEXT[],
    "in_progress" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lobby_pkey" PRIMARY KEY ("lobby_id")
);

-- CreateTable
CREATE TABLE "Team" (
    "team_name" VARCHAR(32) NOT NULL,
    "team_acronym" VARCHAR(4) NOT NULL,
    "teamPicture" BYTEA,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("team_name")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "tournament_id" SERIAL NOT NULL,
    "bracket_data" JSONB,
    "max_teams" INTEGER NOT NULL,
    "tournament_name" VARCHAR(64) NOT NULL,
    "tournament_format" "TournamentFormat" NOT NULL,
    "description" TEXT NOT NULL,
    "prize_pool" DECIMAL(65,30) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "tournamentPicture" BYTEA,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("tournament_id")
);

-- CreateTable
CREATE TABLE "Rosters" (
    "player_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rosters_pkey" PRIMARY KEY ("player_id","team_name")
);

-- CreateTable
CREATE TABLE "TournamentOrganizers" (
    "organizer_id" TEXT NOT NULL,
    "tournament_id" INTEGER NOT NULL,

    CONSTRAINT "TournamentOrganizers_pkey" PRIMARY KEY ("organizer_id","tournament_id")
);

-- CreateTable
CREATE TABLE "_TeamToTournament" (
    "A" VARCHAR(32) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE INDEX "User_user_id_phone_number_email_idx" ON "User"("user_id", "phone_number", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Team_team_name_key" ON "Team"("team_name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_team_acronym_key" ON "Team"("team_acronym");

-- CreateIndex
CREATE INDEX "Team_team_name_idx" ON "Team"("team_name");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToTournament_AB_unique" ON "_TeamToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToTournament_B_index" ON "_TeamToTournament"("B");

-- AddForeignKey
ALTER TABLE "Rosters" ADD CONSTRAINT "Rosters_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rosters" ADD CONSTRAINT "Rosters_team_name_fkey" FOREIGN KEY ("team_name") REFERENCES "Team"("team_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentOrganizers" ADD CONSTRAINT "TournamentOrganizers_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentOrganizers" ADD CONSTRAINT "TournamentOrganizers_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "Tournament"("tournament_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("team_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("tournament_id") ON DELETE CASCADE ON UPDATE CASCADE;
