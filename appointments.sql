-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 06, 2024 at 02:27 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `swe2024assignments`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `attendee` varchar(255) DEFAULT NULL,
  `dtstart` date DEFAULT NULL,
  `dtstamp` datetime DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `stat` varchar(255) DEFAULT NULL,
  `uid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`attendee`, `dtstart`, `dtstamp`, `method`, `stat`, `uid`) VALUES
('preloaded3@outlook.com', '2025-05-14', '2024-03-02 00:00:00', 'REQUEST', 'TENTATIVE', '8645e2c5'),
('preloaded1@gmail.com', '2024-09-25', '2024-03-02 00:00:00', 'REQUEST', 'CONFIRMED', 'A3xZ9k'),
('preloaded2@yahoo.com', '2024-07-16', '2024-03-02 00:00:00', 'REQUEST', 'TENTATIVE', 'P7qR2y');

INSERT INTO `appointments` (`attendee`, `dtstart`, `dtstamp`, `method`, `stat`, `uid`) VALUES ('preloaded4@gmail.com', '2025-07-09', '2024-04-07 13:37:57', 'REQUEST', 'CONFIMED', 'B7yW2z');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uniqueDtstart` (`dtstart`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
