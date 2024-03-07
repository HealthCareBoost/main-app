CREATE TABLE `ChatMessage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prompt` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `responce` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `chat_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ChatMessage_chat_id_idx` (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
