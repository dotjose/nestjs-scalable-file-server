import {MigrationInterface, QueryRunner} from "typeorm";

export class business1645745573562 implements MigrationInterface {
    name = 'business1645745573562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`countryOfCorporation\` varchar(255) NOT NULL, \`legalName\` varchar(255) NOT NULL, \`isTradingNameExist\` tinyint NULL, \`tradingName\` varchar(255) NULL, \`registrationNumber\` varchar(255) NOT NULL, \`taxIdentificationNumber\` int NULL, \`taxregistrationNumber\` int NULL, \`dateOfIncorporation\` datetime NOT NULL, \`businessType\` varchar(255) NOT NULL, \`website\` varchar(255) NOT NULL, \`businessSector\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`organization\``);
    }

}
