-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.11


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema snickercity
--

CREATE DATABASE IF NOT EXISTS snickercity;
USE snickercity;

--
-- Definition of table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `cartID` int(11) NOT NULL AUTO_INCREMENT,
  `sessionID` varchar(255) NOT NULL DEFAULT '',
  `productID` int(10) NOT NULL DEFAULT '0',
  `productName` varchar(255) DEFAULT NULL,
  `quantity` double DEFAULT NULL,
  `unitPrice` double DEFAULT NULL,
  `size` varchar(45) NOT NULL,
  `model` varchar(245) NOT NULL,
  `pic` varchar(245) NOT NULL,
  PRIMARY KEY (`cartID`,`sessionID`,`productID`) USING BTREE,
  UNIQUE KEY `Index_2` (`sessionID`,`productID`) USING BTREE,
  UNIQUE KEY `Index_3` (`productID`,`sessionID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` (`cartID`,`sessionID`,`productID`,`productName`,`quantity`,`unitPrice`,`size`,`model`,`pic`) VALUES 
 (65,'RbHumJWBuSnOeYTTYEwgCE-bTulR0TZ2',7,'Cool Timbers',1,25000,'39','Kids','3dVXbhkafQcoolTimbers.jpg'),
 (69,'RbHumJWBuSnOeYTTYEwgCE-bTulR0TZ2',6,'Timber land',1,45000,'39','Women','jVjT6ktH5jTimber.jpg'),
 (71,'RbHumJWBuSnOeYTTYEwgCE-bTulR0TZ2',8,'Lace up Timbers',1,65000,'39','Men','OAV5E2duq0laceTimbers.jpg'),
 (73,'5R80OUVAoKlcr8R7jhFKpN1l-gHcJqxW',6,'Timber land',7,45000,'39','Women','jVjT6ktH5jTimber.jpg');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;


--
-- Definition of table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(250) DEFAULT NULL,
  `lastName` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `telephone` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `profilePic` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;


--
-- Definition of table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(250) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `pic1` varchar(250) DEFAULT NULL,
  `pic2` varchar(250) DEFAULT NULL,
  `pic3` varchar(250) DEFAULT NULL,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdBy` varchar(250) DEFAULT NULL,
  `status` varchar(250) DEFAULT NULL,
  `releaseDate` datetime NOT NULL,
  `model` varchar(245) NOT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`productID`,`productName`,`description`,`price`,`currency`,`pic1`,`pic2`,`pic3`,`updateTime`,`createdBy`,`status`,`releaseDate`,`model`) VALUES 
 (4,'Air max','Sport shoes',45000,'rwf','LI2MxZiB71Nike air.jpg','p0O1umFzy9Nike air.jpg','M9r5fNnSTUNike air.jpg','2019-01-25 15:46:24','Cedric Kagabo',NULL,'2019-01-20 00:00:00','Men'),
 (5,'Air Force','Inkweto y\' ikingara',45000,'rwf','OdYBHrNbzMair force.jpg','XjZ2oR7lpmair force.jpg','l6GSyyK1NTair force.jpg','2019-01-25 17:34:00','Cedric Kagabo',NULL,'2019-01-17 00:00:00','Men'),
 (6,'Timber land','These are not snickers but they are my favorite shoes',45000,'rwf','jVjT6ktH5jTimber.jpg','fFEfVbQTg6Timber.jpg','gB419kOnbsTimber.jpg','2019-01-25 17:34:00','Cedric Kagabo',NULL,'2019-01-16 00:00:00','Women'),
 (7,'Cool Timbers','I got one pare like this but in blue i like style too',25000,'rwf','3dVXbhkafQcoolTimbers.jpg','c4tfFCUoMNcoolTimbers.jpg','0xfXosspLHcoolTimbers.jpg','2019-01-25 17:34:03','Cedric Kagabo',NULL,'2019-01-10 00:00:00','Kids'),
 (8,'Lace up Timbers','The coolest timberland shoes only for cool people',65000,'rwf','OAV5E2duq0laceTimbers.jpg','MG92abzDr4laceTimbers.jpg','Sy1vzs1YsrlaceTimbers.jpg','2019-01-25 17:41:47','Cedric Kagabo','Available','2019-01-19 00:00:00','Men');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;


--
-- Definition of table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` (`session_id`,`expires`,`data`) VALUES 
 (0x355238304F5556416F4B6C63723852376A68464B704E316C2D6748634A717857,1548671625,0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C22666C617368223A7B7D7D),
 (0x46636F773663357A774B6C766A3956435162346F4C30376B37796F7068776F75,1548679907,0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C22666C617368223A7B7D7D),
 (0x526248756D4A574275536E4F655954545945776743452D6254756C5230545A32,1548616210,0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C22666C617368223A7B7D7D),
 (0x5A6C4F596E416B6C58384663524646616C57313445664A4B72335448664C4D49,1548748898,0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C22666C617368223A7B7D7D);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
