DROP DATABASE IF EXISTS `brighte-eats`;

CREATE DATABASE `brighte-eats`;

USE `brighte-eats`;

CREATE TABLE `lead` (
  `id` varchar(50) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `postcode` varchar(50) DEFAULT NULL,
  `services` json DEFAULT NULL,
  PRIMARY KEY (`id`)
);


INSERT INTO `brighte-eats`.`lead` (`id`, `name`, `email`, `mobile`, `postcode`, `services`) VALUES ('ff348451-6cc4-446f-94e4-84fb05338891', 'john limpin', 'john.limpin@gmail.com', '+639778111203', '2000', '[\"delivery\", \"pick-up\", \"payment\"]');
INSERT INTO `brighte-eats`.`lead` (`id`, `name`, `email`, `mobile`, `postcode`, `services`) VALUES ('bb768f1b-f1be-48f6-b2fa-5c6e4b18ed54', 'cora limpin', 'corazon.limpin@gmail.com', '+639228467188', '2023', '[\"delivery\", \"pick-up\", \"payment\"]');
