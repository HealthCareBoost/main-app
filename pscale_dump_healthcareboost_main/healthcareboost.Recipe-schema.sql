CREATE TABLE `Recipe` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creator_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `difficulty_level` enum('easy','medium','hard','expert') COLLATE utf8mb4_unicode_ci NOT NULL,
  `preparation_time_minutes` int NOT NULL DEFAULT '0',
  `cooking_time_minutes` int NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipe_steps` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `total_likes` int NOT NULL DEFAULT '0',
  `total_time_minutes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Recipe_creator_id_idx` (`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
