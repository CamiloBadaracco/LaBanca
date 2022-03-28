import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1646722967054 implements MigrationInterface {
    name = 'initialMigration1646722967054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "actionDescription" character varying NOT NULL, "dateAction" TIMESTAMP NOT NULL, "dateNotif" TIMESTAMP, "agency" character varying, "subAgencyModified" character varying NOT NULL, "sended" boolean NOT NULL, "agentId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_agent" ("id" SERIAL NOT NULL, "documentUser" character varying NOT NULL, "name" character varying, "firstLastName" character varying, "secondLastName" character varying, "mail" character varying NOT NULL, "expedientUp" character varying, "expedientDown" character varying, "patentAgent" character varying, "observation" character varying NOT NULL, "active" boolean NOT NULL, "agencyNumber" character varying NOT NULL, "agentId" integer, CONSTRAINT "UQ_af987c2ce67b06d41db3e63551d" UNIQUE ("documentUser"), CONSTRAINT "PK_7851758f9943f896d2c1d3194e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "agencyNumber" character varying NOT NULL, "orden" character varying, "zone" character varying, "mail" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "UQ_cda83fad680301ef802524ecf30" UNIQUE ("agencyNumber"), CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provisorio" ("id" SERIAL NOT NULL, "url" character varying, "observation" character varying, "active" boolean NOT NULL, "dateOfUpdated" TIMESTAMP NOT NULL DEFAULT 'NOW()', "subAgentId" integer, CONSTRAINT "PK_5faa9eb0f50aa5f27fe42bd4c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expedient" ("id" SERIAL NOT NULL, "expedientNumber" integer, "url" character varying, "observation" character varying, "active" boolean NOT NULL, "dateOfUpdated" TIMESTAMP NOT NULL DEFAULT 'NOW()', "subAgentId" integer, CONSTRAINT "PK_b4f61f0dd7ef7fc7cc2b0de8ab5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_agent" ("id" SERIAL NOT NULL, "subAgencyNumber" character varying NOT NULL, "documentNumber" character varying NOT NULL, "firstName" character varying NOT NULL, "secondFirstName" character varying NOT NULL, "firstLastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "name" character varying NOT NULL, "documentIdPhoto" character varying, "formNineHundred" character varying, "passportPhoto" character varying, "certificateGoodConduct" character varying, "dateOfUpdate" TIMESTAMP NOT NULL DEFAULT 'NOW()', "rut" character varying, "documentDGI" character varying, "literalE" boolean, "patentNumber" character varying, "certificateNumber" character varying, "enabledDocument" character varying, "cesantiaDocument" character varying, "changeAddressDocument" character varying, "active" boolean, "agentId" integer, CONSTRAINT "UQ_4cdd997e197aad7ba6d9ad476bc" UNIQUE ("name"), CONSTRAINT "PK_b99bf5f574c0c3d8ace14ea11e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "department" character varying NOT NULL, "location" character varying NOT NULL, "streetName" character varying, "streetNumber" character varying, "apto" character varying, "observation" character varying, "active" boolean NOT NULL, "dateOfUpdated" TIMESTAMP NOT NULL DEFAULT 'NOW()', "subAgentId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "type" character varying(128) NOT NULL, "subAgencyNumber" character varying(128) NOT NULL, "name" character varying(255) NOT NULL, "dateOfUpdated" TIMESTAMP NOT NULL DEFAULT 'NOW()', "active" boolean NOT NULL, CONSTRAINT "UQ_df16ff3255e6dfc777b086949b7" UNIQUE ("name"), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "lastName" character varying(128) NOT NULL, "userName" character varying(128) NOT NULL, "pass" character varying(128), "mail" character varying(128), "roles" text NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_36bfb828ab0ae962433f662f517" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_agent" ADD CONSTRAINT "FK_b9f0087154b2a1905096fc93389" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provisorio" ADD CONSTRAINT "FK_d5bd3db7ca3e968e4fed33e8aa7" FOREIGN KEY ("subAgentId") REFERENCES "sub_agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expedient" ADD CONSTRAINT "FK_bd527ab856b305ce6e3cdbd48a6" FOREIGN KEY ("subAgentId") REFERENCES "sub_agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_agent" ADD CONSTRAINT "FK_12838cd98a60e279593b522b981" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_c30fa1f177aceb04a934e843454" FOREIGN KEY ("subAgentId") REFERENCES "sub_agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_c30fa1f177aceb04a934e843454"`);
        await queryRunner.query(`ALTER TABLE "sub_agent" DROP CONSTRAINT "FK_12838cd98a60e279593b522b981"`);
        await queryRunner.query(`ALTER TABLE "expedient" DROP CONSTRAINT "FK_bd527ab856b305ce6e3cdbd48a6"`);
        await queryRunner.query(`ALTER TABLE "provisorio" DROP CONSTRAINT "FK_d5bd3db7ca3e968e4fed33e8aa7"`);
        await queryRunner.query(`ALTER TABLE "user_agent" DROP CONSTRAINT "FK_b9f0087154b2a1905096fc93389"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_36bfb828ab0ae962433f662f517"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "sub_agent"`);
        await queryRunner.query(`DROP TABLE "expedient"`);
        await queryRunner.query(`DROP TABLE "provisorio"`);
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`DROP TABLE "user_agent"`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
