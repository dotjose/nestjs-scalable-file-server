import {MigrationInterface, QueryRunner} from "typeorm";

export class amlApi1655998536248 implements MigrationInterface {
    name = 'amlApi1655998536248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`organizationRelation\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`relationType\` varchar(255) NOT NULL, \`organizationId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`CountryList\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`word1\` varchar(255) NOT NULL, \`word2\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`countryOfCorporation\` varchar(255) NOT NULL, \`legalName\` varchar(255) NOT NULL, \`isTradingNameExist\` tinyint NULL, \`tradingName\` varchar(255) NULL, \`registrationNumber\` varchar(255) NOT NULL, \`taxIdentificationNumber\` int NULL, \`taxregistrationNumber\` int NULL, \`dateOfIncorporation\` datetime NOT NULL, \`businessType\` varchar(255) NOT NULL, \`website\` varchar(255) NOT NULL, \`businessSector\` varchar(255) NOT NULL, \`rangeOfServicesOrGoods\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`PersonNamePart\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`order\` int NOT NULL, \`abbreviation\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`native\` varchar(255) NOT NULL, \`suffix\` varchar(255) NOT NULL, \`prefix\` varchar(255) NOT NULL, \`personId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`gender\` int NOT NULL, \`dateOfBirth\` datetime NOT NULL, \`placeOfBirth\` varchar(255) NOT NULL, \`nationality\` varchar(255) NOT NULL, \`postCode\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`organizationId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ShareHolder\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`responsibility\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`personId\` varchar(255) NULL, \`escallationId\` varchar(255) NULL, \`peersId\` varchar(255) NULL, \`organizationIdId\` varchar(255) NULL, UNIQUE INDEX \`REL_838773f91303ee82a4a0378b87\` (\`personId\`), UNIQUE INDEX \`REL_8d613083082d3ec73121c7ccc7\` (\`escallationId\`), UNIQUE INDEX \`REL_532c992e93f68d1cb5535de7f1\` (\`peersId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Documents\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`purpose\` varchar(255) NOT NULL DEFAULT 'kyb', \`name\` varchar(255) NOT NULL, \`documentType\` varchar(255) NOT NULL DEFAULT 'id_back_side', \`location\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`metadata\` text NOT NULL, \`organization\` varchar(255) NOT NULL, \`verificationResponse\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`AddressRelation\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`relationType\` int NOT NULL, \`addressId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TelephoneNumber\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`phoneType\` int NOT NULL, \`operator\` varchar(255) NOT NULL, \`encoding\` int NOT NULL, \`country\` varchar(255) NOT NULL, \`Number\` varchar(255) NOT NULL, \`purpose\` varchar(255) NOT NULL, \`organizationId\` varchar(255) NULL, \`telephoneNumberId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`SecretQuestion\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`question\` int NOT NULL, \`answer\` varchar(255) NOT NULL, \`personId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`PrivateCustomer\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`personId\` varchar(255) NULL, UNIQUE INDEX \`REL_ae13014724eb546a62bfb0797a\` (\`personId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Addresses\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addresspurpose\` varchar(255) NOT NULL, \`organizationId\` varchar(255) NULL, \`privateCustomerId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`GeoPosition\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`latitude\` int NOT NULL, \`longitude\` int NOT NULL, \`attitude\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ThreeWords\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`word1\` varchar(255) NOT NULL, \`word2\` varchar(255) NOT NULL, \`word3\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Address\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`country\` varchar(255) NOT NULL, \`area\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`building\` varchar(255) NOT NULL, \`apartment\` varchar(255) NOT NULL, \`entrance\` varchar(255) NOT NULL, \`floor\` varchar(255) NOT NULL, \`doorNumber\` varchar(255) NOT NULL, \`geoPositionId\` varchar(255) NULL, \`alternativeId\` varchar(255) NULL, \`addressId\` varchar(255) NULL, UNIQUE INDEX \`REL_6b06976158053067f84e75eef6\` (\`geoPositionId\`), UNIQUE INDEX \`REL_38ceaa2517eb5ca5b72b41c7da\` (\`alternativeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TransactionPredict\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`monthlyVolumeRange\` int NOT NULL, \`numberOfMonthlyPayment\` int NOT NULL, \`maxSinglePayment\` int NOT NULL, \`organizationIdId\` varchar(255) NULL, UNIQUE INDEX \`REL_a80167595ac6aa69dc5dbd86ba\` (\`organizationIdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`MetaData\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`type\` int NOT NULL, \`value\` varchar(255) NOT NULL, \`documentId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Documents\` DROP COLUMN \`verificationResponse\``);
        await queryRunner.query(`ALTER TABLE \`Documents\` ADD \`verificationResponse\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`PersonNamePart\` ADD CONSTRAINT \`FK_557f088bb3d2b5e5e3933bd8817\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` ADD CONSTRAINT \`FK_838773f91303ee82a4a0378b87f\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` ADD CONSTRAINT \`FK_8d613083082d3ec73121c7ccc74\` FOREIGN KEY (\`escallationId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` ADD CONSTRAINT \`FK_532c992e93f68d1cb5535de7f1b\` FOREIGN KEY (\`peersId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` ADD CONSTRAINT \`FK_7e3260cc1ed43a6c750bda71687\` FOREIGN KEY (\`organizationIdId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`AddressRelation\` ADD CONSTRAINT \`FK_1c701cf7bb11f2ce62389840017\` FOREIGN KEY (\`addressId\`) REFERENCES \`Address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TelephoneNumber\` ADD CONSTRAINT \`FK_17b88f7f468836fdb5f09360bb0\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TelephoneNumber\` ADD CONSTRAINT \`FK_14fb2700e9d0199c54a3e504817\` FOREIGN KEY (\`telephoneNumberId\`) REFERENCES \`PrivateCustomer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`SecretQuestion\` ADD CONSTRAINT \`FK_8b271072c20cbd7b81ab5a75bc0\` FOREIGN KEY (\`personId\`) REFERENCES \`PrivateCustomer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PrivateCustomer\` ADD CONSTRAINT \`FK_ae13014724eb546a62bfb0797a3\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Addresses\` ADD CONSTRAINT \`FK_4e6d418a291e954bd24813236d1\` FOREIGN KEY (\`organizationId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Addresses\` ADD CONSTRAINT \`FK_9201c3e629ff0f1e2af83cb26c0\` FOREIGN KEY (\`privateCustomerId\`) REFERENCES \`PrivateCustomer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_6b06976158053067f84e75eef6e\` FOREIGN KEY (\`geoPositionId\`) REFERENCES \`GeoPosition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_38ceaa2517eb5ca5b72b41c7da7\` FOREIGN KEY (\`alternativeId\`) REFERENCES \`ThreeWords\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_0407b2d7be80fa8920a27fbddf1\` FOREIGN KEY (\`addressId\`) REFERENCES \`Addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TransactionPredict\` ADD CONSTRAINT \`FK_a80167595ac6aa69dc5dbd86ba0\` FOREIGN KEY (\`organizationIdId\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`MetaData\` ADD CONSTRAINT \`FK_0b9aa88dd05119194796e275848\` FOREIGN KEY (\`documentId\`) REFERENCES \`Documents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`MetaData\` DROP FOREIGN KEY \`FK_0b9aa88dd05119194796e275848\``);
        await queryRunner.query(`ALTER TABLE \`TransactionPredict\` DROP FOREIGN KEY \`FK_a80167595ac6aa69dc5dbd86ba0\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_0407b2d7be80fa8920a27fbddf1\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_38ceaa2517eb5ca5b72b41c7da7\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_6b06976158053067f84e75eef6e\``);
        await queryRunner.query(`ALTER TABLE \`Addresses\` DROP FOREIGN KEY \`FK_9201c3e629ff0f1e2af83cb26c0\``);
        await queryRunner.query(`ALTER TABLE \`Addresses\` DROP FOREIGN KEY \`FK_4e6d418a291e954bd24813236d1\``);
        await queryRunner.query(`ALTER TABLE \`PrivateCustomer\` DROP FOREIGN KEY \`FK_ae13014724eb546a62bfb0797a3\``);
        await queryRunner.query(`ALTER TABLE \`SecretQuestion\` DROP FOREIGN KEY \`FK_8b271072c20cbd7b81ab5a75bc0\``);
        await queryRunner.query(`ALTER TABLE \`TelephoneNumber\` DROP FOREIGN KEY \`FK_14fb2700e9d0199c54a3e504817\``);
        await queryRunner.query(`ALTER TABLE \`TelephoneNumber\` DROP FOREIGN KEY \`FK_17b88f7f468836fdb5f09360bb0\``);
        await queryRunner.query(`ALTER TABLE \`AddressRelation\` DROP FOREIGN KEY \`FK_1c701cf7bb11f2ce62389840017\``);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` DROP FOREIGN KEY \`FK_7e3260cc1ed43a6c750bda71687\``);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` DROP FOREIGN KEY \`FK_532c992e93f68d1cb5535de7f1b\``);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` DROP FOREIGN KEY \`FK_8d613083082d3ec73121c7ccc74\``);
        await queryRunner.query(`ALTER TABLE \`ShareHolder\` DROP FOREIGN KEY \`FK_838773f91303ee82a4a0378b87f\``);
        await queryRunner.query(`ALTER TABLE \`PersonNamePart\` DROP FOREIGN KEY \`FK_557f088bb3d2b5e5e3933bd8817\``);
        await queryRunner.query(`ALTER TABLE \`Documents\` DROP COLUMN \`verificationResponse\``);
        await queryRunner.query(`ALTER TABLE \`Documents\` ADD \`verificationResponse\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`MetaData\``);
        await queryRunner.query(`DROP INDEX \`REL_a80167595ac6aa69dc5dbd86ba\` ON \`TransactionPredict\``);
        await queryRunner.query(`DROP TABLE \`TransactionPredict\``);
        await queryRunner.query(`DROP INDEX \`REL_38ceaa2517eb5ca5b72b41c7da\` ON \`Address\``);
        await queryRunner.query(`DROP INDEX \`REL_6b06976158053067f84e75eef6\` ON \`Address\``);
        await queryRunner.query(`DROP TABLE \`Address\``);
        await queryRunner.query(`DROP TABLE \`ThreeWords\``);
        await queryRunner.query(`DROP TABLE \`GeoPosition\``);
        await queryRunner.query(`DROP TABLE \`Addresses\``);
        await queryRunner.query(`DROP INDEX \`REL_ae13014724eb546a62bfb0797a\` ON \`PrivateCustomer\``);
        await queryRunner.query(`DROP TABLE \`PrivateCustomer\``);
        await queryRunner.query(`DROP TABLE \`SecretQuestion\``);
        await queryRunner.query(`DROP TABLE \`TelephoneNumber\``);
        await queryRunner.query(`DROP TABLE \`AddressRelation\``);
        await queryRunner.query(`DROP TABLE \`Documents\``);
        await queryRunner.query(`DROP INDEX \`REL_532c992e93f68d1cb5535de7f1\` ON \`ShareHolder\``);
        await queryRunner.query(`DROP INDEX \`REL_8d613083082d3ec73121c7ccc7\` ON \`ShareHolder\``);
        await queryRunner.query(`DROP INDEX \`REL_838773f91303ee82a4a0378b87\` ON \`ShareHolder\``);
        await queryRunner.query(`DROP TABLE \`ShareHolder\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP TABLE \`PersonNamePart\``);
        await queryRunner.query(`DROP TABLE \`organization\``);
        await queryRunner.query(`DROP TABLE \`CountryList\``);
        await queryRunner.query(`DROP TABLE \`organizationRelation\``);
    }

}
