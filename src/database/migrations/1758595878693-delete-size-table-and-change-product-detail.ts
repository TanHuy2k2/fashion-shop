import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteSizeTableAndChangeProductDetail1758595878693 implements MigrationInterface {
    name = 'DeleteSizeTableAndChangeProductDetail1758595878693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_discount\` DROP FOREIGN KEY \`FK_615e7e29a5bb78cea30b9a02df0\``);
        await queryRunner.query(`ALTER TABLE \`product_discount\` CHANGE \`product_item_id\` \`product_detail_id\` varchar(36) NULL`);
        await queryRunner.query(`CREATE TABLE \`product_detail\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`size\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`product_id\` varchar(36) NULL, \`color_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_detail\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` varchar(36) NOT NULL, \`unit_price\` int NOT NULL, \`quantity\` int NOT NULL, \`total_price\` int NOT NULL, \`order_id\` varchar(36) NULL, \`product_detail_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_discount\` ADD CONSTRAINT \`FK_4bb3cb556ed243cb7141fd6529b\` FOREIGN KEY (\`product_detail_id\`) REFERENCES \`product_detail\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_detail\` ADD CONSTRAINT \`FK_38145409fc923c67bffc76bdb68\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_detail\` ADD CONSTRAINT \`FK_e35a843117a8ff2ff4adcf4733f\` FOREIGN KEY (\`color_id\`) REFERENCES \`colors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_a6ac5c99b8c02bd4ee53d3785be\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_f8de266b91fd5e295ed56b513cf\` FOREIGN KEY (\`product_detail_id\`) REFERENCES \`product_detail\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_f8de266b91fd5e295ed56b513cf\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_a6ac5c99b8c02bd4ee53d3785be\``);
        await queryRunner.query(`ALTER TABLE \`product_detail\` DROP FOREIGN KEY \`FK_e35a843117a8ff2ff4adcf4733f\``);
        await queryRunner.query(`ALTER TABLE \`product_detail\` DROP FOREIGN KEY \`FK_38145409fc923c67bffc76bdb68\``);
        await queryRunner.query(`ALTER TABLE \`product_discount\` DROP FOREIGN KEY \`FK_4bb3cb556ed243cb7141fd6529b\``);
        await queryRunner.query(`DROP TABLE \`order_detail\``);
        await queryRunner.query(`DROP TABLE \`product_detail\``);
        await queryRunner.query(`ALTER TABLE \`product_discount\` CHANGE \`product_detail_id\` \`product_item_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_discount\` ADD CONSTRAINT \`FK_615e7e29a5bb78cea30b9a02df0\` FOREIGN KEY (\`product_item_id\`) REFERENCES \`product_item\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
