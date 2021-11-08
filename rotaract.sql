-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2021 at 05:35 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rotaract`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'coming',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `chapter` varchar(255) NOT NULL,
  `event_code` varchar(255) NOT NULL,
  `backgroundColor` varchar(255) NOT NULL DEFAULT '#d91b5c',
  `borderColor` varchar(255) NOT NULL DEFAULT '#d91b5c'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `start`, `end`, `description`, `status`, `date_created`, `chapter`, `event_code`, `backgroundColor`, `borderColor`) VALUES
(12367, 'Event 1', '2021-11-01 08:00:00', '2021-11-02 08:08:00', 'Holiday', 'coming', '2021-10-30 07:50:49', 'all', 'holdaiy12344', '#d91b5c', '#d91b5c');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(8) NOT NULL,
  `first_name` varchar(225) NOT NULL,
  `last_name` varchar(225) NOT NULL,
  `role` varchar(225) NOT NULL,
  `chapter` varchar(225) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `first_name`, `last_name`, `role`, `chapter`, `date_created`) VALUES
(32432, 'Krizelle Mae', 'Falcasantos', 'President', 'Zamboanga City West', '2021-10-27 07:34:12'),
(34567, 'Beryl', 'Del Pilar', 'President', 'Western Mindanao State University (WMSU)', '2021-10-27 12:09:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `member_id` int(8) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT 'rotaract',
  `role` varchar(255) NOT NULL DEFAULT 'member',
  `date_joined` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`member_id`, `password`, `role`, `date_joined`) VALUES
(11111, '$2b$10$3NB8DFpi15GaXaKwoheMgu0mWAGK4NJ.ccZK7HuNmunxUr14T0mDC', 'admin', '2021-10-23 23:35:10'),
(32432, '$2b$10$a3eDxPLKu1FmCLhpnBw2R..WBGe6ZboMp83uWF85rvwXwmlE0rACO', 'President', '2021-10-27 15:34:12'),
(34567, '$2b$10$mt4pAv28CYfp.rWTlny1nuk5Ei3kc2coVmpHPprdxbd.JRSVrVLZa', 'President', '2021-10-27 20:09:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`member_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12368;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
