USE `SwitchBot`;

CREATE TABLE `Boosters` (
    `client_id` VARCHAR(18) NOT NULL,
    `currently_boosted` BOOLEAN NOT NULL,
    `has_custom_role` BOOLEAN NOT NULL,
    `custom_role_name` VARCHAR(50) DEFAULT NULL,
    `custom_role_id` BIGINT(18) UNSIGNED DEFAULT NULL,
    `months_boosted` SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COLLATE=UTF8MB4_0900_AI_CI;
