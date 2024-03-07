CREATE TABLE `UserDailyDiet` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL,
  `recipe_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meal_type` enum('BREAKFAST','DINNER','LUNCH','SNACK') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`recipe_id`,`date`),
  KEY `UserDailyDiet_recipe_id_idx` (`recipe_id`),
  KEY `UserDailyDiet_user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
