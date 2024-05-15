-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 15, 2024 lúc 04:57 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `demo`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `advertises`
--

CREATE TABLE `advertises` (
  `advertise_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `advertises`
--

INSERT INTO `advertises` (`advertise_id`, `title`, `image`, `description`, `created_at`) VALUES
(1, 'Bài viết 1', '', 'Mô tả bài viết 1', '2024-05-15 00:00:00'),
(2, 'Bài viết 2', '', 'Mô tả bài viết 2', '2024-05-15 00:00:00'),
(3, 'Bài viết 3', '', 'Mô tả bài viết 3', '2024-05-15 00:00:00'),
(4, 'Bài viết 4', '', 'Mô tả bài viết 4', '2024-05-15 00:00:00'),
(5, 'Bài viết 5', '', 'Mô tả bài viết 5', '2024-05-15 00:00:00'),
(6, 'Bài viết 6', '', 'Mô tả bài viết 6', '2024-05-15 00:00:00'),
(7, 'Bài viết 7', '', 'Mô tả bài viết 7', '2024-05-15 00:00:00'),
(8, 'Bài viết 8', '', 'Mô tả bài viết 8', '2024-05-15 00:00:00'),
(9, 'Bài viết 9', '', 'Mô tả bài viết 9', '2024-05-15 00:00:00'),
(10, 'Bài viết 10', '', 'Mô tả bài viết 10', '2024-05-15 00:00:00'),
(11, 'Bài viết 11', '', 'Mô tả bài viết 11', '2024-05-15 00:00:00'),
(12, 'Bài viết 12', '', 'Mô tả bài viết 12', '2024-05-15 00:00:00'),
(13, 'Bài viết 13', '', 'Mô tả bài viết 13', '2024-05-15 00:00:00'),
(14, 'Bài viết 14', '', 'Mô tả bài viết 14', '2024-05-15 00:00:00'),
(15, 'Bài viết 15', '', 'Mô tả bài viết 15', '2024-05-15 00:00:00'),
(16, 'Bài viết 16', '', 'Mô tả bài viết 16', '2024-05-15 00:00:00'),
(17, 'Bài viết 17', '', 'Mô tả bài viết 17', '2024-05-15 00:00:00'),
(18, 'Bài viết 18', '', 'Mô tả bài viết 18', '2024-05-15 00:00:00'),
(19, 'Bài viết 19', '', 'Mô tả bài viết 19', '2024-05-15 00:00:00'),
(20, 'Bài viết 20', '', 'Mô tả bài viết 20', '2024-05-15 00:00:00'),
(21, 'Bài viết 21', '', 'Mô tả bài viết 21', '2024-05-15 00:00:00'),
(22, 'Bài viết 22', '', 'Mô tả bài viết 22', '2024-05-15 00:00:00'),
(23, 'Bài viết 23', '', 'Mô tả bài viết 23', '2024-05-15 00:00:00'),
(24, 'Bài viết 24', '', 'Mô tả bài viết 24', '2024-05-15 00:00:00'),
(25, 'Bài viết 25', '', 'Mô tả bài viết 25', '2024-05-15 00:00:00'),
(26, 'Bài viết 26', '', 'Mô tả bài viết 26', '2024-05-15 00:00:00'),
(27, 'Bài viết 27', '', 'Mô tả bài viết 27', '2024-05-15 00:00:00'),
(28, 'Bài viết 28', '', 'Mô tả bài viết 28', '2024-05-15 00:00:00'),
(29, 'Bài viết 29', '', 'Mô tả bài viết 29', '2024-05-15 00:00:00'),
(30, 'Bài viết 30', '', 'Mô tả bài viết 30', '2024-05-15 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(13) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `created_at` datetime DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `phone_number`, `email`, `user_name`, `password`, `token`, `created_at`) VALUES
(1, 'Admin', '0976849539', 'phuxuan02@gmail.com', 'admin', '8a88afced3a218f436ced6f277a2d1e5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidHlwZSI6InVzZXIiLCJleHBpcmUiOiIyMDI0LTA1LTE2VDA4OjU2OjIyKzA3OjAwIiwiaWF0IjoxNzE1NzM4MTgyfQ.ik8FHwOAwHpGkF60hNacGZdvJrajuZMUi9kplMavlTw', '0000-00-00 00:00:00'),
(7, 'Customer 1', '0976849539', '', 'customer 1', '8a88afced3a218f436ced6f277a2d1e5', NULL, '2024-05-15 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tours`
--

CREATE TABLE `tours` (
  `tour_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tours`
--

INSERT INTO `tours` (`tour_id`, `name`, `image`, `price`, `start_time`, `end_time`) VALUES
(2, 'Tour 1', '', 3000000, '2024-08-21 08:50:19', '2024-09-24 08:50:19'),
(3, 'Tour 2', '', 15000000, '2024-07-13 08:50:19', '2024-07-29 08:50:19'),
(4, 'Tour 3', '', 14000000, '2024-07-04 08:50:19', '2024-07-29 08:50:19'),
(5, 'Tour 4', '', 5000000, '2024-09-08 08:50:19', '2024-10-12 08:50:19'),
(6, 'Tour 5', '', 2000000, '2024-08-17 08:50:19', '2024-09-19 08:50:19'),
(7, 'Tour 6', '', 6000000, '2024-07-03 08:50:19', '2024-08-02 08:50:19'),
(8, 'Tour 7', '', 4000000, '2024-09-08 08:50:19', '2024-09-28 08:50:19'),
(9, 'Tour 8', '', 19000000, '2024-09-05 08:50:19', '2024-10-05 08:50:19'),
(10, 'Tour 9', '', 14000000, '2024-07-24 08:50:19', '2024-08-07 08:50:19'),
(11, 'Tour 10', '', 3000000, '2024-09-04 08:50:19', '2024-10-04 08:50:19'),
(12, 'Tour 11', '', 12000000, '2024-08-18 08:50:19', '2024-09-12 08:50:19'),
(13, 'Tour 12', '', 20000000, '2024-07-01 08:50:19', '2024-08-01 08:50:19'),
(14, 'Tour 13', '', 16000000, '2024-09-03 08:50:19', '2024-10-09 08:50:19'),
(15, 'Tour 14', '', 4000000, '2024-06-18 08:50:19', '2024-07-24 08:50:19'),
(16, 'Tour 15', '', 9000000, '2024-06-19 08:50:19', '2024-07-14 08:50:19'),
(17, 'Tour 16', '', 10000000, '2024-08-22 08:50:19', '2024-09-14 08:50:19'),
(18, 'Tour 17', '', 11000000, '2024-07-16 08:50:19', '2024-07-31 08:50:19'),
(19, 'Tour 18', '', 9000000, '2024-06-16 08:50:19', '2024-06-30 08:50:19'),
(20, 'Tour 19', '', 8000000, '2024-07-05 08:50:19', '2024-08-07 08:50:19'),
(21, 'Tour 20', '', 1000000, '2024-07-30 08:50:19', '2024-08-31 08:50:19'),
(22, 'Tour 21', '', 3000000, '2024-08-07 08:50:19', '2024-08-17 08:50:19'),
(23, 'Tour 22', '', 19000000, '2024-06-30 08:50:19', '2024-07-27 08:50:19'),
(24, 'Tour 23', '', 14000000, '2024-07-27 08:50:19', '2024-08-12 08:50:19'),
(25, 'Tour 24', '', 1000000, '2024-07-24 08:50:19', '2024-08-28 08:50:19'),
(26, 'Tour 25', '', 4000000, '2024-08-11 08:50:19', '2024-09-19 08:50:19'),
(27, 'Tour 26', '', 5000000, '2024-07-02 08:50:19', '2024-07-15 08:50:19'),
(28, 'Tour 27', '', 11000000, '2024-08-21 08:50:19', '2024-09-27 08:50:19'),
(29, 'Tour 28', '', 17000000, '2024-08-27 08:50:19', '2024-09-12 08:50:19'),
(30, 'Tour 29', '', 18000000, '2024-06-29 08:50:19', '2024-07-19 08:50:19'),
(31, 'Tour 30', '', 13000000, '2024-07-11 08:50:19', '2024-07-29 08:50:19');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tour_regis_informations`
--

CREATE TABLE `tour_regis_informations` (
  `tour_regis_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `tour_id` int(11) DEFAULT NULL,
  `person` smallint(6) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tour_regis_informations`
--

INSERT INTO `tour_regis_informations` (`tour_regis_id`, `customer_id`, `tour_id`, `person`, `price`, `start_date`, `end_date`, `status`, `created_at`) VALUES
(5, 1, 2, 3, 3000000, '2024-06-01', '2024-06-03', NULL, '2024-05-13 00:00:00'),
(6, 1, 5, 3, 3000000, '2024-06-01', '2024-06-03', NULL, '2024-05-13 00:00:00'),
(7, 1, 8, 3, 3000000, '2024-06-01', '2024-06-03', NULL, '2024-05-15 00:00:00');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `advertises`
--
ALTER TABLE `advertises`
  ADD PRIMARY KEY (`advertise_id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Chỉ mục cho bảng `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`tour_id`);

--
-- Chỉ mục cho bảng `tour_regis_informations`
--
ALTER TABLE `tour_regis_informations`
  ADD PRIMARY KEY (`tour_regis_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `advertises`
--
ALTER TABLE `advertises`
  MODIFY `advertise_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `tours`
--
ALTER TABLE `tours`
  MODIFY `tour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `tour_regis_informations`
--
ALTER TABLE `tour_regis_informations`
  MODIFY `tour_regis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
