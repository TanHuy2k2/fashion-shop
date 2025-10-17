import { MigrationInterface, QueryRunner } from "typeorm";

export class CouponUser1760588208753 implements MigrationInterface {
    name = 'CouponUser1760588208753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupon_users\` DROP COLUMN \`used_at\``);
        await queryRunner.query(`ALTER TABLE \`coupon_users\` ADD \`used_at\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupon_users\` DROP COLUMN \`used_at\``);
        await queryRunner.query(`ALTER TABLE \`coupon_users\` ADD \`used_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
