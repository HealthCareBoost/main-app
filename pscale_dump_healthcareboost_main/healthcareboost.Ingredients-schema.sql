CREATE TABLE `Ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `recipe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `measurement_unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Ingredients_recipe_id_idx` (`recipe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=773 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
