-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 02 2024 г., 03:42
-- Версия сервера: 5.7.39
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Sneakers`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

CREATE TABLE IF NOT EXISTS `cards` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `cards`
--

INSERT IGNORE INTO `cards` (`id`, `user_id`, `product_id`, `quantity`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4),
(5, 5, 5, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `categories`
--

INSERT IGNORE INTO `categories` (`id`, `name`) VALUES
(1, 'Обувь'),
(2, 'Штаны'),
(3, 'Носки'),
(4, 'Пижамы'),
(5, 'Куртки');

-- --------------------------------------------------------

--
-- Структура таблицы `characteristics`
--

CREATE TABLE IF NOT EXISTS `characteristics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('INT','VARCHAR','BOOLEAN','FLOAT','TEXT','TIMESTAMP','DECIMAL','JSON') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `characteristics`
--

INSERT IGNORE INTO `characteristics` (`id`, `name`, `type`) VALUES
(1, 'Размер', 'INT'),
(2, 'Цвет', 'VARCHAR'),
(3, 'Оригинальность', 'BOOLEAN'),
(4, 'Вес', 'FLOAT'),
(5, 'Качество', 'VARCHAR');

-- --------------------------------------------------------

--
-- Структура таблицы `companies`
--

CREATE TABLE IF NOT EXISTS `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `companies`
--

INSERT IGNORE INTO `companies` (`id`, `name`, `description`) VALUES
(1, 'Apple', 'Производитель техники'),
(2, 'Nike', 'Производитель китайских кроссовок'),
(3, 'New Balance', 'Производитель кроссовок'),
(4, 'Lacosta', 'Французский бренд'),
(5, 'Uniclo', 'Неизвестный бренд');

-- --------------------------------------------------------

--
-- Структура таблицы `company_comments`
--

CREATE TABLE IF NOT EXISTS `company_comments` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `company_comments`
--

INSERT IGNORE INTO `company_comments` (`id`, `company_id`, `user_id`, `comment`, `created_at`, `image_id`) VALUES
(1, 1, 1, 'Классная компания', '2024-09-01 21:30:03', Null),
(2, 2, 2, 'Продают китайский шеропотреп', '2024-09-01 21:30:03', Null),
(3, 3, 3, 'Такая компания вообще существует?', '2024-09-01 21:30:03', Null),
(4, 4, 4, 'Дефолт на китайском рынке', '2024-09-01 21:30:03', Null),
(5, 5, 5, 'Мне нравится играть в футбол, а тебе?', '2024-09-01 21:30:03', Null);

-- --------------------------------------------------------

--
-- Структура таблицы `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `news`
--

INSERT IGNORE INTO `news` (`id`, `name`, `description`, `image_id`) VALUES
(1, 'Пурга', 'Сегодня так замело улицу, что я не смог дойти до банкомата, чтобы заплатить за кроссовки', Null),
(2, 'Капельница', 'Лежал на больничном, теперь не смогу побегать в своих новых кроссовках', Null),
(3, 'Бутерброд', 'Думал перекусить, но порвал последний кроссовок', Null),
(4, 'Наташа', 'Сегодня классно провел ночь с Наташкой, мне кажется у нее есть вкус в кроссовках', Null),
(5, 'Самолет', 'Когда выпрыгивал с парашутом забыл свои найки в багаже :(', Null);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `orders`
--

INSERT IGNORE INTO `orders` (`id`, `user_id`, `date`, `total_price`) VALUES
(1, 1, '2024-09-01 23:26:57', 704645),
(2, 2, '2024-09-01 23:27:55', 74309),
(3, 3, '2024-09-01 23:27:56', 415398),
(4, 4, '2024-09-01 23:30:06', 723159),
(5, 5, '2024-09-01 23:30:07', 604050);

-- --------------------------------------------------------

--
-- Структура таблицы `order_products`
--

CREATE TABLE IF NOT EXISTS `order_products` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `order_products`
--

INSERT IGNORE INTO `order_products` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 3),
(5, 5, 5, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `category_id` int(11) NOT NULL,
  `promotion_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `type_product` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `products`
--

INSERT IGNORE INTO `products` (`id`, `name`, `price`, `description`, `category_id`, `promotion_id`, `company_id`, `image_id`, `type_product`) VALUES
(1, 'Носки Lacosta', '1000.00', 'Дизайн придуман французом Алексеем', 1, 1, 1, Null, 'Опт'),
(2, 'Майка с открытой спиной', '1000.00', 'Майка вдохвновленная фильмом Пляж', 2, 2, 2, Null, Null),
(3, 'Кроссы с разноцветными шнурками', '1000.00', 'Разноцветные шнурки', 3, 3, 3, Null, Null),
(4, 'Найки', '1000.00', 'Обычные кроссовки', 4, 4, 4, Null, Null),
(5, 'Ветровка NewBalance', '1000.00', 'Дизайнерская ветровка от LiNaighty', 5, 5, 5, Null, 'Опт');

-- --------------------------------------------------------

--
-- Структура таблицы `product_characteristics`
--

CREATE TABLE IF NOT EXISTS `product_characteristics` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `characteristic_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `product_characteristics`
--

INSERT IGNORE INTO `product_characteristics` (`id`, `product_id`, `characteristic_id`, `value`) VALUES
(1, 1, 1, '38'),
(2, 2, 2, 'Голубой'),
(3, 3, 3, 'True'),
(4, 4, 4, '500.00'),
(5, 5, 5, 'Новый');

-- --------------------------------------------------------

--
-- Структура таблицы `product_comments`
--

CREATE TABLE IF NOT EXISTS `product_comments` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `product_comments`
--

INSERT IGNORE INTO `product_comments` (`id`, `product_id`, `user_id`, `comment`, `created_at`, `image_id`) VALUES
(1, 1, 1, 'Ничего так', '2024-09-01 22:04:53', '1,2,3,4'),
(2, 2, 2, 'Сносно', '2024-09-01 22:04:54', '1,2,3,4'),
(3, 3, 3, 'Мне понравилось', '2024-09-01 22:06:15', '1,2,3,4'),
(4, 4, 4, 'Дешево', '2024-09-01 22:06:16', '1,2,3,4'),
(5, 5, 5, 'Класс', '2024-09-01 22:08:08', '1,2,3,4'),
(6, 6, 6, 'Угар', '2024-09-01 22:08:09', '1,2,3,4');

-- --------------------------------------------------------

--
-- Структура таблицы `promotions`
--

CREATE TABLE IF NOT EXISTS `promotions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `promotions`
--

INSERT IGNORE INTO `promotions` (`id`, `name`, `quantity`, `sale`) VALUES
(1, 'Скидка 8 процентов', 2, 15),
(2, 'Скидка 10 процентов', 5, 10),
(3, 'Скидка 12 процентов', 1, 12),
(4, 'Скидка 40 процентов', 5, 40),
(5, 'Скидка 30 процентов', 3, 30);

-- --------------------------------------------------------

--
-- Структура таблицы `question_answers`
--

CREATE TABLE IF NOT EXISTS `question_answers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `question_answers`
--

INSERT IGNORE INTO `question_answers` (`id`, `user_id`, `question`, `answer`) VALUES
(1, 1, 'Сколько будет два кроссовка плюс три?', 'эээээ, розовый?'),
(2, 2, 'Сможешь сочинить симфонию с 2 кроссовками в предложении?', 'А ты?'),
(3, 3, 'Как создать адронный коллайдер в домашних условиях?', 'Сожги кроссовки'),
(4, 4, 'Кто проживает на дне океана?', 'Кроссовки'),
(5, 5, 'Сделай упражнение два кроссовка по спине', 'Получи грыжу на конец');

-- --------------------------------------------------------

--
-- Структура таблицы `receipts`
--

CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `receipts`
--

INSERT IGNORE INTO `receipts` (`id`, `product_id`, `company_id`, `quantity`, `date`) VALUES
(1, 1, 1, 1, '2024-09-01 22:04:53'),
(2, 2, 2, 2, '2024-09-01 22:04:54'),
(3, 3, 3, 3, '2024-09-01 22:06:15'),
(4, 4, 4, 4, '2024-09-01 22:06:16'),
(5, 5, 5, 5, '2024-09-01 22:08:08'),
(6, 6, 6, 6, '2024-09-01 22:08:09');

-- --------------------------------------------------------

--
-- Структура таблицы `type_users`
--

CREATE TABLE IF NOT EXISTS `type_users` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `type_users`
--

INSERT IGNORE INTO `type_users` (`id`, `type`) VALUES
(1, 'Новичек'),
(2, 'Любитель'),
(3, 'Профессионал'),
(4, 'Прошаренный'),
(5, 'Гендольф');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `telegram_id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT IGNORE INTO `users` (`id`, `first_name`, `last_name`, `telegram_id`, `type_id`, `role`) VALUES
(1, 'Коля', 'Ермолин', 1, 1, 'user'),
(2, 'admin', 'admin', 2, 2, 'admin'),
(3, 'Алексей', 'Запасной', 3, 3, 'user'),
(4, 'Оля', 'Гладиолус', 4, 4, 'user'),
(5, 'Миша', 'Северный', 5, NULL, 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `write_offs`
--

CREATE TABLE IF NOT EXISTS `write_offs` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT IGNORE INTO `write_offs` (`id`, `product_id`, `quantity`, `date`) VALUES
(1, 1, 1, '2024-09-01 22:04:53'),
(2, 2, 2, '2024-09-01 22:04:54'),
(3, 3, 3, '2024-09-01 22:06:15'),
(4, 4, 4, '2024-09-01 22:06:16'),
(5, 5, 5, '2024-09-01 22:08:08'),
(6, 6, 6, '2024-09-01 22:08:09');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `characteristics`
--
ALTER TABLE `characteristics`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `company_comments`
--
ALTER TABLE `company_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Индексы таблицы `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`,`order_id`,`product_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `promotion_id` (`promotion_id`);

--
-- Индексы таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  ADD PRIMARY KEY (`id`,`product_id`,`characteristic_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `characteristic_id` (`characteristic_id`);

--
-- Индексы таблицы `product_comments`
--
ALTER TABLE `product_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `question_answers`
--
ALTER TABLE `question_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Индексы таблицы `type_users`
--
ALTER TABLE `type_users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Индексы таблицы `write_offs`
--
ALTER TABLE `write_offs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=599;

--
-- AUTO_INCREMENT для таблицы `characteristics`
--
ALTER TABLE `characteristics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT для таблицы `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=641;

--
-- AUTO_INCREMENT для таблицы `company_comments`
--
ALTER TABLE `company_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT для таблицы `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=316;

--
-- AUTO_INCREMENT для таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT для таблицы `product_comments`
--
ALTER TABLE `product_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=644;

--
-- AUTO_INCREMENT для таблицы `question_answers`
--
ALTER TABLE `question_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `type_users`
--
ALTER TABLE `type_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=618;

--
-- AUTO_INCREMENT для таблицы `write_offs`
--
ALTER TABLE `write_offs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `company_comments`
--
ALTER TABLE `company_comments`
  ADD CONSTRAINT `company_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `company_comments_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  ADD CONSTRAINT `product_characteristics_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_characteristics_ibfk_2` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristics` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_comments`
--
ALTER TABLE `product_comments`
  ADD CONSTRAINT `product_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_comments_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `question_answers`
--
ALTER TABLE `question_answers`
  ADD CONSTRAINT `question_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `receipts_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type_users` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `write_offs`
--
ALTER TABLE `write_offs`
  ADD CONSTRAINT `write_offs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
