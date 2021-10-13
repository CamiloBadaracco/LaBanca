import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1634014281289 implements MigrationInterface {
    name = 'initialMigration1634014281289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_agent" ADD "agentId" integer`);
        await queryRunner.query(`ALTER TABLE "sub_agent" ADD CONSTRAINT "FK_12838cd98a60e279593b522b981" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_agent" DROP CONSTRAINT "FK_12838cd98a60e279593b522b981"`);
        await queryRunner.query(`ALTER TABLE "sub_agent" DROP COLUMN "agentId"`);
    }

}
