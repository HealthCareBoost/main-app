CREATE TABLE `RecipeCategory` (
  `recipe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`category_id`),
  KEY `RecipeCategory_category_id_idx` (`category_id`),
  KEY `RecipeCategory_recipe_id_idx` (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
