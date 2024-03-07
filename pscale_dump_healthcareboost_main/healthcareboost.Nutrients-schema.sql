CREATE TABLE `Nutrients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Nutrients_ingredient_id_idx` (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=811 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
