import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOAuthClient1733661543392 implements MigrationInterface {
    name = 'CreateOAuthClient1733661543392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."oauth_clients_client_type_enum" AS ENUM('CONFIDENTIAL', 'PUBLIC')`);
        await queryRunner.query(`CREATE TABLE "oauth_clients" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" character varying NOT NULL, "client_secret" character varying NOT NULL, "redirect_uris" text NOT NULL, "client_type" "public"."oauth_clients_client_type_enum" NOT NULL, "grant_types" text NOT NULL, CONSTRAINT "PK_c4759172d3431bae6f04e678e0d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "oauth_clients"`);
        await queryRunner.query(`DROP TYPE "public"."oauth_clients_client_type_enum"`);
    }

}
