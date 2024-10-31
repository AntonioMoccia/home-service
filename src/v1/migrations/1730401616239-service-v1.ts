import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceV11730401616239 implements MigrationInterface {
    name = 'ServiceV11730401616239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("service_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "base_price" numeric NOT NULL, "unit" character varying NOT NULL, "is_free_quote" boolean NOT NULL, "deposit_required" boolean NOT NULL, "deposit_amount" numeric NOT NULL, "workerId" uuid, CONSTRAINT "PK_ef0531b9789b488593690ab8d5d" PRIMARY KEY ("service_id"))`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_494598501a65fd6d9ee88728d19" FOREIGN KEY ("workerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_494598501a65fd6d9ee88728d19"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
