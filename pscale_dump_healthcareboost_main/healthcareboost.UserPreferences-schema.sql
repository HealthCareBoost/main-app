CREATE TABLE `UserPreferences` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `made` tinyint(1) NOT NULL,
  `liked` tinyint(1) NOT NULL,
  `saved` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  UNIQUE KEY `UserPreferences_user_id_recipe_id_key` (`user_id`,`recipe_id`),
  KEY `UserPreferences_user_id_idx` (`user_id`),
  KEY `UserPreferences_recipe_id_idx` (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
