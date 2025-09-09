import { MigrationInterface, QueryRunner } from 'typeorm';

export class DB1757406277173 implements MigrationInterface {
  name = 'DB1757406277173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`shipping\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`shipping_address\` varchar(255) NOT NULL, \`shipping_method\` varchar(255) NOT NULL, \`shipping_fee\` int NOT NULL, \`status\` enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed', 'paid', 'expired') NOT NULL DEFAULT 'pending', \`order_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payments\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`payment_method\` enum ('cash', 'momo') NOT NULL, \`payment_date\` datetime NOT NULL, \`status\` enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed', 'paid', 'expired') NOT NULL DEFAULT 'pending', \`order_id\` varchar(36) NULL, UNIQUE INDEX \`REL_b2f7b823a21562eeca20e72b00\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`brands\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sub-category\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`category_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reviews\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`comment\` varchar(255) NOT NULL, \`rating\` int NOT NULL, \`user_id\` varchar(36) NULL, \`product_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`brand_id\` varchar(36) NULL, \`sub_category_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sizes\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`size\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`colors\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`hex_code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`discounts\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`percent\` decimal(5,2) NOT NULL DEFAULT '0.00', \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`scope\` enum ('all', 'product') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_discount\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`product_item_id\` varchar(36) NULL, \`discount_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_item\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, \`product_id\` varchar(36) NULL, \`size_id\` varchar(36) NULL, \`color_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_detial\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`unit_price\` int NOT NULL, \`quantity\` int NOT NULL, \`total_price\` int NOT NULL, \`order_id\` varchar(36) NULL, \`product_item_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`discount_amount\` int NOT NULL, \`final_amount\` int NOT NULL, \`status\` enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed', 'paid', 'expired') NOT NULL DEFAULT 'pending', \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`updated_by\` int NULL, \`id\` varchar(36) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`date_of_birth\` date NOT NULL, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`role\` enum ('admin', 'customer') NOT NULL DEFAULT 'customer', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`shipping\` ADD CONSTRAINT \`FK_a37456893780ce2dfe0a7484c22\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_b2f7b823a21562eeca20e72b006\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub-category\` ADD CONSTRAINT \`FK_94c2857520e600bbd8fb48c8c42\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_728447781a30bc3fcfe5c2f1cdf\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_9482e9567d8dcc2bc615981ef44\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_3fffb0be83ac483af3a55f41170\` FOREIGN KEY (\`sub_category_id\`) REFERENCES \`sub-category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_discount\` ADD CONSTRAINT \`FK_615e7e29a5bb78cea30b9a02df0\` FOREIGN KEY (\`product_item_id\`) REFERENCES \`product_item\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_discount\` ADD CONSTRAINT \`FK_6080929074c3c5c5a2dbb55af44\` FOREIGN KEY (\`discount_id\`) REFERENCES \`discounts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_item\` ADD CONSTRAINT \`FK_88ef002ea2f04e6bf896da91692\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_item\` ADD CONSTRAINT \`FK_2df8d93bf623763b894caf15c25\` FOREIGN KEY (\`size_id\`) REFERENCES \`sizes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_item\` ADD CONSTRAINT \`FK_e5ec8631eaf6726e9012cf44da9\` FOREIGN KEY (\`color_id\`) REFERENCES \`colors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detial\` ADD CONSTRAINT \`FK_ddba5f853af7eabd7846efdc614\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detial\` ADD CONSTRAINT \`FK_d3fba9f43c2ab6e65ff94bcbd6b\` FOREIGN KEY (\`product_item_id\`) REFERENCES \`product_item\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detial\` DROP FOREIGN KEY \`FK_d3fba9f43c2ab6e65ff94bcbd6b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_detial\` DROP FOREIGN KEY \`FK_ddba5f853af7eabd7846efdc614\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_item\` DROP FOREIGN KEY \`FK_e5ec8631eaf6726e9012cf44da9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_item\` DROP FOREIGN KEY \`FK_2df8d93bf623763b894caf15c25\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_item\` DROP FOREIGN KEY \`FK_88ef002ea2f04e6bf896da91692\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_discount\` DROP FOREIGN KEY \`FK_6080929074c3c5c5a2dbb55af44\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_discount\` DROP FOREIGN KEY \`FK_615e7e29a5bb78cea30b9a02df0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_3fffb0be83ac483af3a55f41170\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_9482e9567d8dcc2bc615981ef44\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_728447781a30bc3fcfe5c2f1cdf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub-category\` DROP FOREIGN KEY \`FK_94c2857520e600bbd8fb48c8c42\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_b2f7b823a21562eeca20e72b006\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`shipping\` DROP FOREIGN KEY \`FK_a37456893780ce2dfe0a7484c22\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`order_detial\``);
    await queryRunner.query(`DROP TABLE \`product_item\``);
    await queryRunner.query(`DROP TABLE \`product_discount\``);
    await queryRunner.query(`DROP TABLE \`discounts\``);
    await queryRunner.query(`DROP TABLE \`colors\``);
    await queryRunner.query(`DROP TABLE \`sizes\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`reviews\``);
    await queryRunner.query(`DROP TABLE \`sub-category\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP TABLE \`brands\``);
    await queryRunner.query(
      `DROP INDEX \`REL_b2f7b823a21562eeca20e72b00\` ON \`payments\``,
    );
    await queryRunner.query(`DROP TABLE \`payments\``);
    await queryRunner.query(`DROP TABLE \`shipping\``);
  }
}
