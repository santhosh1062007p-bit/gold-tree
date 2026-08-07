-- SQL Database Setup Script for Innovation Legacy Tree
-- Password configured: santhosh106207

CREATE DATABASE IF NOT EXISTS `legacy_tree_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `legacy_tree_db`;

CREATE TABLE IF NOT EXISTS `guests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `guest_id` VARCHAR(100) UNIQUE NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(255) NOT NULL,
  `organization` VARCHAR(255) NOT NULL,
  `event_name` VARCHAR(255) NOT NULL,
  `event_date` VARCHAR(50) NOT NULL,
  `timestamp` BIGINT NOT NULL,
  `signature_url` LONGTEXT,
  `branch_id` VARCHAR(100) NOT NULL,
  `anchor_id` VARCHAR(100) NOT NULL,
  `leaf_position` JSON NOT NULL,
  `status` VARCHAR(50) DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_status` (`status`),
  INDEX `idx_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SELECT '✅ MySQL Database legacy_tree_db setup complete (Clean State - 0 Leaves)!' AS Status;
