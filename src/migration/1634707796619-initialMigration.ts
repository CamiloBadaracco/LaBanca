import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1634707796619 implements MigrationInterface {
    name = 'initialMigration1634707796619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "agencyNumber" character varying NOT NULL, "orden" character varying, "zone" character varying, "mail" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "UQ_cda83fad680301ef802524ecf30" UNIQUE ("agencyNumber"), CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provisorio" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "observation" character varying, "active" boolean NOT NULL, "subAgentId" integer, CONSTRAINT "PK_5faa9eb0f50aa5f27fe42bd4c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expedient" ("expedientNumber" integer NOT NULL, "url" character varying NOT NULL, "observation" character varying, "active" boolean NOT NULL, "subAgentId" integer, CONSTRAINT "PK_0f240fadce7051fd330c09d3ec9" PRIMARY KEY ("expedientNumber"))`);
        await queryRunner.query(`CREATE TABLE "sub_agent" ("id" SERIAL NOT NULL, "subAgencyNumber" character varying NOT NULL, "documentNumber" character varying NOT NULL, "name" character varying NOT NULL, "passportPhoto" character varying, "certificateGoodConduct" character varying, "dateOfUpdate" TIMESTAMP, "rut" character varying, "literalE" character varying, "patentNumber" character varying, "certificateNumber" character varying, "resolutionNumber" character varying, "active" boolean, "agentId" integer, CONSTRAINT "UQ_4cdd997e197aad7ba6d9ad476bc" UNIQUE ("name"), CONSTRAINT "PK_b99bf5f574c0c3d8ace14ea11e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "department" character varying NOT NULL, "location" character varying NOT NULL, "streetName" character varying, "streetNumber" character varying, "apto" character varying, "observation" character varying, "active" boolean NOT NULL, "subAgentId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "userName" character varying NOT NULL, "pass" character varying, "mail" character varying NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "provisorio" ADD CONSTRAINT "FK_d5bd3db7ca3e968e4fed33e8aa7" FOREIGN KEY ("subAgentId") REFERENCES "sub_agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expedient" ADD CONSTRAINT "FK_bd527ab856b305ce6e3cdbd48a6" FOREIGN KEY ("subAgentId") REFERENCES "sub_agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_agent" ADD CONSTRAINT "FK_12838cd98a60e279593b522b981" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_c30fa1f177aceb04a934e843454" FOREIGN KEY ("subAgentId") REFERENCES "sub_agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_c30fa1f177aceb04a934e843454"`);
        await queryRunner.query(`ALTER TABLE "sub_agent" DROP CONSTRAINT "FK_12838cd98a60e279593b522b981"`);
        await queryRunner.query(`ALTER TABLE "expedient" DROP CONSTRAINT "FK_bd527ab856b305ce6e3cdbd48a6"`);
        await queryRunner.query(`ALTER TABLE "provisorio" DROP CONSTRAINT "FK_d5bd3db7ca3e968e4fed33e8aa7"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "sub_agent"`);
        await queryRunner.query(`DROP TABLE "expedient"`);
        await queryRunner.query(`DROP TABLE "provisorio"`);
        await queryRunner.query(`DROP TABLE "agent"`);
    }

}
