CREATE DATABASE  IF NOT EXISTS `speedprint_v3` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `speedprint_v3`;
-- MySQL dump 10.13  Distrib 5.6.11, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: speedprint_v3
-- ------------------------------------------------------
-- Server version	5.5.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id_images` int(11) NOT NULL AUTO_INCREMENT,
  `name_images` varchar(100) NOT NULL DEFAULT 'undefined',
  `hash_images` char(64) DEFAULT NULL,
  `size_images` int(11) NOT NULL DEFAULT '0',
  `filename_images` varchar(100) NOT NULL DEFAULT 'undefined.png',
  PRIMARY KEY (`id_images`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'Roll-Up Classic Large',NULL,0,'roll_up_classic_large.png'),(2,'Roll-Up Professional Large',NULL,0,'roll_up_professional_large.png'),(3,'Roll-Up Compact Large',NULL,0,'roll_up_compact_large.png'),(4,'Case & Counter Large',NULL,0,'case_and_counter_large.png');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturers` (
  `id_manufacturers` int(11) NOT NULL AUTO_INCREMENT,
  `name_manufacturers` varchar(100) DEFAULT NULL,
  `description_manufacturers` text,
  `image_manufacturers` enum('y','n') DEFAULT 'n',
  `enabled_manufacturers` enum('y','n') DEFAULT 'n',
  `seo_manufacturers` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_manufacturers`),
  UNIQUE KEY `seo_manufacturers_UNIQUE` (`seo_manufacturers`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers`
--

LOCK TABLES `manufacturers` WRITE;
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
INSERT INTO `manufacturers` VALUES (1,'Speedprint','. . .','n','y','speedprint'),(2,'Expolinc','. . .','n','y','expolinc');
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturers_rel`
--

DROP TABLE IF EXISTS `manufacturers_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturers_rel` (
  `id_manufacturers_rel` int(11) NOT NULL AUTO_INCREMENT,
  `id_products` int(11) NOT NULL,
  `id_manufacturers` int(11) NOT NULL,
  PRIMARY KEY (`id_manufacturers_rel`),
  KEY `fk_mr_pid_idx` (`id_products`),
  KEY `fk_mr_mid_idx` (`id_manufacturers`),
  CONSTRAINT `fk_mr_mid` FOREIGN KEY (`id_manufacturers`) REFERENCES `manufacturers` (`id_manufacturers`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mr_pid` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_products`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers_rel`
--

LOCK TABLES `manufacturers_rel` WRITE;
/*!40000 ALTER TABLE `manufacturers_rel` DISABLE KEYS */;
INSERT INTO `manufacturers_rel` VALUES (1,1,2),(2,2,2),(3,3,2),(4,4,2);
/*!40000 ALTER TABLE `manufacturers_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_bulk_rates`
--

DROP TABLE IF EXISTS `product_bulk_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_bulk_rates` (
  `id_product_bulk_rates` int(11) NOT NULL AUTO_INCREMENT,
  `product_bulk_rates_min_amount` int(11) DEFAULT NULL,
  `product_bulk_rates_max_amount` int(11) DEFAULT NULL,
  `product_bulk_prices` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_product_bulk_rates`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_bulk_rates`
--

LOCK TABLES `product_bulk_rates` WRITE;
/*!40000 ALTER TABLE `product_bulk_rates` DISABLE KEYS */;
INSERT INTO `product_bulk_rates` VALUES (1,1,9,1495),(2,10,49,1395),(3,50,99,1295),(4,100,199,1195),(5,200,NULL,1095),(6,1,1,5795),(7,2,3,5195),(8,4,9,4995),(9,10,NULL,4495);
/*!40000 ALTER TABLE `product_bulk_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_bulk_rates_rel`
--

DROP TABLE IF EXISTS `product_bulk_rates_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_bulk_rates_rel` (
  `id_product_bulk_rates_rel` int(11) NOT NULL AUTO_INCREMENT,
  `id_products` int(11) NOT NULL,
  `id_product_bulk_rates` int(11) NOT NULL,
  PRIMARY KEY (`id_product_bulk_rates_rel`),
  KEY `fk_pbrr_pid_idx` (`id_products`),
  KEY `fk_pbrr_pbrid_idx` (`id_product_bulk_rates`),
  CONSTRAINT `fk_pbrr_pbrid` FOREIGN KEY (`id_product_bulk_rates`) REFERENCES `product_bulk_rates` (`id_product_bulk_rates`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pbrr_pid` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_products`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_bulk_rates_rel`
--

LOCK TABLES `product_bulk_rates_rel` WRITE;
/*!40000 ALTER TABLE `product_bulk_rates_rel` DISABLE KEYS */;
INSERT INTO `product_bulk_rates_rel` VALUES (1,4,6),(2,4,7),(3,4,8),(4,4,9);
/*!40000 ALTER TABLE `product_bulk_rates_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_spotlight`
--

DROP TABLE IF EXISTS `product_spotlight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_spotlight` (
  `id_product_spotlight` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_product_spotlight`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_spotlight`
--

LOCK TABLES `product_spotlight` WRITE;
/*!40000 ALTER TABLE `product_spotlight` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_spotlight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_variants` (
  `id_product_variants` int(11) NOT NULL AUTO_INCREMENT,
  `name_product_variants` varchar(100) DEFAULT NULL,
  `weight_product_variants` int(11) DEFAULT NULL,
  `length_product_variants` int(11) DEFAULT NULL,
  `height_product_variants` int(11) DEFAULT NULL,
  `description_product_variants` text,
  `price_product_variants` int(11) DEFAULT NULL,
  `enabled_product_variants` enum('y','n') DEFAULT 'n',
  `seo_product_variants` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_product_variants`),
  UNIQUE KEY `seo_product_variants_UNIQUE` (`seo_product_variants`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (1,'85 x 215 cm',NULL,NULL,NULL,NULL,2295,'y',NULL),(2,'100 x 215 cm',NULL,NULL,NULL,NULL,2595,'y',NULL),(3,'145 x 215 cm',NULL,NULL,NULL,NULL,3595,'y',NULL),(4,'enkelsidig',NULL,NULL,NULL,NULL,2495,'y',NULL),(5,'dubbelsidig',NULL,NULL,NULL,NULL,3795,'y',NULL),(6,'85 cm bred',NULL,NULL,NULL,NULL,1495,'y',NULL),(7,'100 cm bred',NULL,NULL,NULL,NULL,1675,'y',NULL);
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants_bulk_rates_rel`
--

DROP TABLE IF EXISTS `product_variants_bulk_rates_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_variants_bulk_rates_rel` (
  `id_product_variants_bulk_rel` int(11) NOT NULL AUTO_INCREMENT,
  `id_product_variants` int(11) NOT NULL,
  `id_product_bulk_rates` int(11) NOT NULL,
  PRIMARY KEY (`id_product_variants_bulk_rel`),
  KEY `fk_pvbrr_pvid_idx` (`id_product_variants`),
  KEY `fk_pvbrr_pbrid_idx` (`id_product_bulk_rates`),
  CONSTRAINT `fk_pvbrr_pbrid` FOREIGN KEY (`id_product_bulk_rates`) REFERENCES `product_bulk_rates` (`id_product_bulk_rates`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pvbrr_pvid` FOREIGN KEY (`id_product_variants`) REFERENCES `product_variants` (`id_product_variants`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants_bulk_rates_rel`
--

LOCK TABLES `product_variants_bulk_rates_rel` WRITE;
/*!40000 ALTER TABLE `product_variants_bulk_rates_rel` DISABLE KEYS */;
INSERT INTO `product_variants_bulk_rates_rel` VALUES (1,6,1),(2,6,2),(3,6,3),(4,6,4),(5,6,5);
/*!40000 ALTER TABLE `product_variants_bulk_rates_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants_rel`
--

DROP TABLE IF EXISTS `product_variants_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_variants_rel` (
  `id_pvr` int(11) NOT NULL AUTO_INCREMENT,
  `id_products` int(11) NOT NULL,
  `id_product_variants` int(11) NOT NULL,
  PRIMARY KEY (`id_pvr`),
  KEY `fk_pvr_pid_id` (`id_products`),
  KEY `fk_pvr_pvid_id` (`id_product_variants`),
  CONSTRAINT `fk_pvr_pid` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_products`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pvr_pvid` FOREIGN KEY (`id_product_variants`) REFERENCES `product_variants` (`id_product_variants`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants_rel`
--

LOCK TABLES `product_variants_rel` WRITE;
/*!40000 ALTER TABLE `product_variants_rel` DISABLE KEYS */;
INSERT INTO `product_variants_rel` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,4),(5,2,5),(6,3,6),(7,3,7);
/*!40000 ALTER TABLE `product_variants_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id_products` int(11) NOT NULL AUTO_INCREMENT,
  `name_products` varchar(100) NOT NULL,
  `weight_products` int(11) DEFAULT NULL,
  `length_products` int(11) DEFAULT NULL,
  `height_products` int(11) DEFAULT NULL,
  `description_products` text NOT NULL,
  `price_products` int(11) DEFAULT '0',
  `enabled_products` enum('y','n') DEFAULT 'n',
  `seo_products` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_products`),
  UNIQUE KEY `seo_products_UNIQUE` (`seo_products`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Roll-Up Classic',0,0,0,'Roll Up Classic har av Föreningen Svensk Forms Opinionsnämnd fått utmärkelsen \"brukskonst\"!\r\n\r\nSystemet är lätt att bära med sig och är snabbt klart för en presentation.\r\n\r\nRoll Up Classic finns i flera olika bredder och är tänkt för upprepad användning i olika typer av miljöer.',0,'y','roll_up_classic'),(2,'Roll-Up Professional',0,0,0,'Roll Up Professional är ett lite exklusivare displaysystem gjort för användning vid upprepade tillfällen i alla tänkbara miljöer.\r\n\r\nRoll Up Professional har ännu enklare bildbyten och finns även i ett dubbelsidigt utförande.\r\n\r\nEtt självklart val för event- och promotionaktiviteter.',0,'y','roll_up_professional'),(3,'RollUp Compact',0,0,0,'Roll Up Compact är en kompakt och lätthanterlig Roll Up och de rundade hörnen och sidorna gör den behaglig att handskas med.\r\n\r\nDen justerbara pinnen ger stor valfrihet vid val av bildmått och gör det lätt att sätta upp systemet utan att behöva sträcka sig.',0,'y','roll_up_compact'),(4,'Case & Counter',0,0,0,'Expolinc Case & Counter är en rymlig transportbox som på minuten konverteras till en snygg och stabil disk.\r\n\r\nDe mjuka, rundade hörnen på toppskivan skapar en inbjudande mötesplats samtidigt som du kan exponera ditt budskap på omslagspanelen.\r\n\r\nCase & Counter finns som färdiga Pop Up-paket men kan med fördel även användas för transport av andra portabla displaysystem.',0,'y','case_and_counter');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo`
--

DROP TABLE IF EXISTS `seo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seo` (
  `id_seo` int(11) NOT NULL AUTO_INCREMENT,
  `name_seo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_seo`),
  UNIQUE KEY `name_seo_UNIQUE` (`name_seo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo`
--

LOCK TABLES `seo` WRITE;
/*!40000 ALTER TABLE `seo` DISABLE KEYS */;
/*!40000 ALTER TABLE `seo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vat`
--

DROP TABLE IF EXISTS `vat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vat` (
  `id_vat` int(11) NOT NULL AUTO_INCREMENT,
  `name_vat` varchar(100) DEFAULT NULL,
  `rate_vat` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_vat`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vat`
--

LOCK TABLES `vat` WRITE;
/*!40000 ALTER TABLE `vat` DISABLE KEYS */;
INSERT INTO `vat` VALUES (1,'Sverige 25%',25),(2,'Sverige 12%',12),(3,'Sverige 6%',6),(4,'Sverige Momsfritt',0);
/*!40000 ALTER TABLE `vat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-11-08 15:27:47
