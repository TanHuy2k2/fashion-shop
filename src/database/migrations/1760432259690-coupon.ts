import { MigrationInterface, QueryRunner } from "typeorm";

export class Coupon1760432259690 implements MigrationInterface {
    name = 'Coupon1760432259690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`coupon_users\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`used_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`coupon_id\` varchar(36) NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`coupons\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`coupon_type\` enum ('percent', 'fixed') NOT NULL, \`coupon_value\` decimal(10,2) NOT NULL DEFAULT '0.00', \`max_discount\` decimal(10,2) NULL, \`min_order_value\` decimal(10,2) NULL, \`usage_limit\` int NOT NULL DEFAULT '0', \`used_count\` int NOT NULL DEFAULT '0', \`is_global\` tinyint NOT NULL DEFAULT 1, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, UNIQUE INDEX \`IDX_e025109230e82925843f2a14c4\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`coupon_orders\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`used_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`coupon_id\` varchar(36) NULL, \`order_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discounts\` CHANGE \`scope\` \`scope\` enum ('all', 'product') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`coupon_users\` ADD CONSTRAINT \`FK_1ed98e7e7561a0666d603bf2422\` FOREIGN KEY (\`coupon_id\`) REFERENCES \`coupons\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coupon_users\` ADD CONSTRAINT \`FK_396bd3ecb71da895d102e71a10b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coupon_orders\` ADD CONSTRAINT \`FK_54854d01b5637425410a8b2c782\` FOREIGN KEY (\`coupon_id\`) REFERENCES \`coupons\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coupon_orders\` ADD CONSTRAINT \`FK_f681a485a42318b2081ae2af256\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupon_orders\` DROP FOREIGN KEY \`FK_f681a485a42318b2081ae2af256\``);
        await queryRunner.query(`ALTER TABLE \`coupon_orders\` DROP FOREIGN KEY \`FK_54854d01b5637425410a8b2c782\``);
        await queryRunner.query(`ALTER TABLE \`coupon_users\` DROP FOREIGN KEY \`FK_396bd3ecb71da895d102e71a10b\``);
        await queryRunner.query(`ALTER TABLE \`coupon_users\` DROP FOREIGN KEY \`FK_1ed98e7e7561a0666d603bf2422\``);
        await queryRunner.query(`ALTER TABLE \`discounts\` CHANGE \`scope\` \`scope\` enum ('all', 'product', 'category') NOT NULL`);
        await queryRunner.query(`DROP TABLE \`coupon_orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_e025109230e82925843f2a14c4\` ON \`coupons\``);
        await queryRunner.query(`DROP TABLE \`coupons\``);
        await queryRunner.query(`DROP TABLE \`coupon_users\``);
    }

}
