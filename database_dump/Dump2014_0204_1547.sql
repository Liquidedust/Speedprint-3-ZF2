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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id_categories` int(11) NOT NULL AUTO_INCREMENT,
  `name_categories` varchar(45) NOT NULL,
  `lft_categories` int(11) NOT NULL,
  `rgt_categories` int(11) NOT NULL,
  `sort_categories` int(11) DEFAULT NULL,
  `description_categories` text,
  `enabled_categories` enum('y','n') DEFAULT 'n',
  PRIMARY KEY (`id_categories`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (15,'Dekal & Dekor',2,3,1,'','y'),(16,'Display & Event',4,15,2,'','y'),(18,'Skyltar',24,31,4,'','y'),(19,'Storformat',31,32,5,'','y'),(20,'Trycksaker',47,48,6,'','y'),(21,'Övrigt',49,50,7,'','y'),(29,'Banderoll, Textil & Papper',33,46,NULL,NULL,'y'),(30,'Banderoll',34,39,NULL,NULL,'y'),(31,'Flagga',40,41,NULL,NULL,'y'),(32,'Vepa',42,43,NULL,NULL,'y'),(33,'Gjuten',35,36,NULL,NULL,'y'),(34,'Mesh',37,38,NULL,NULL,'y'),(35,'Profilkläder',52,67,NULL,NULL,'y'),(36,'T-Shirt',53,54,NULL,NULL,'y'),(37,'Sweatshirt',55,56,NULL,NULL,'y'),(38,'Jackor',57,58,NULL,NULL,'y'),(39,'Byxor',59,60,NULL,NULL,'y'),(40,'Kök & Resturang',61,62,NULL,NULL,'y'),(41,'Varselkläder',63,64,NULL,NULL,'y'),(42,'Träningskläder',65,66,NULL,NULL,'y'),(43,'Roll-Ups',5,6,NULL,NULL,'y'),(44,'Mässdiskar',7,8,NULL,NULL,'y'),(45,'Broschyrställ & Övrigt',9,10,NULL,NULL,'y'),(46,'Bildväggar',11,12,NULL,NULL,'y'),(47,'Tillbehör',13,14,NULL,NULL,'y'),(51,'Plåtskyltar',25,26,NULL,NULL,'y'),(52,'Smidesskyltar',27,28,NULL,NULL,'y'),(53,'Snäppramar',29,30,NULL,NULL,'y'),(54,'root',1,68,0,NULL,'y'),(55,'Tapet',44,45,NULL,NULL,'y');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
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
  PRIMARY KEY (`id_manufacturers`)
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
  PRIMARY KEY (`id_manufacturers_rel`)
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
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id_media` int(11) NOT NULL AUTO_INCREMENT,
  `name_media` varchar(100) NOT NULL DEFAULT 'undefined',
  `external_media` enum('y','n') DEFAULT 'n',
  `url_media` varchar(255) DEFAULT NULL,
  `type_media` varchar(45) DEFAULT 'undefined',
  `hash_media` char(64) DEFAULT NULL,
  `size_media` int(11) NOT NULL DEFAULT '0',
  `filename_media` varchar(100) DEFAULT 'undefined',
  `uploaded_date_media` datetime DEFAULT NULL,
  PRIMARY KEY (`id_media`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'Roll-Up Classic','n',NULL,'image/png',NULL,0,'roll_up_classic_1.png','2013-11-26 14:14:49'),(2,'Roll-Up Professional','n',NULL,'image/png',NULL,0,'roll_up_professional_1.png','2013-11-26 14:14:49'),(3,'Roll-Up Compact','n',NULL,'image/png',NULL,0,'roll_up_compact_1.png','2013-11-26 14:14:49'),(4,'Case & Counter','n',NULL,'image/png',NULL,0,'case_and_counter_1.png','2013-11-26 14:14:49'),(5,'Roll-Up Classic Video','y','40p-DopZBXI','youtube',NULL,0,NULL,'2014-01-30 13:54:51'),(6,'Case & Counter Video','y','VjPYI7MwNeo','youtube',NULL,0,'undefined',NULL),(7,'Roll-Up Professional Video','y','jAhmIYnfvGQ','youtube',NULL,0,'undefined',NULL),(8,'Roll-Up Classic Hårdvara','n',NULL,'image/png',NULL,0,'roll_up_classic_2.png',NULL),(9,'Roll-Up Classic Väska','n',NULL,'image/png',NULL,0,'roll_up_classic_3.png',NULL),(10,'Roll-Up Classic Färgval','n',NULL,'image/png',NULL,0,'roll_up_classic_4.png',NULL),(11,'Roll-Up Classic Detalj','n',NULL,'image/png',NULL,0,'roll_up_classic_5.png',NULL);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_bulk_rates`
--

LOCK TABLES `product_bulk_rates` WRITE;
/*!40000 ALTER TABLE `product_bulk_rates` DISABLE KEYS */;
INSERT INTO `product_bulk_rates` VALUES (1,1,9,1495),(2,10,49,1395),(3,50,99,1295),(4,100,199,1195),(5,200,200,1095),(6,1,1,5795),(7,2,3,5195),(8,4,9,4995),(9,10,10,4495),(10,1,9,1675),(11,10,49,1585),(12,50,99,1475),(13,100,199,1375),(14,200,200,1299),(15,1,1,2295),(16,1,1,2595),(17,1,1,3595),(18,1,1,2495),(19,1,1,3795);
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
  PRIMARY KEY (`id_product_bulk_rates_rel`)
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
-- Table structure for table `product_categories_rel`
--

DROP TABLE IF EXISTS `product_categories_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_categories_rel` (
  `id_pcr` int(11) NOT NULL AUTO_INCREMENT,
  `id_products` int(11) DEFAULT NULL,
  `id_categories` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pcr`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories_rel`
--

LOCK TABLES `product_categories_rel` WRITE;
/*!40000 ALTER TABLE `product_categories_rel` DISABLE KEYS */;
INSERT INTO `product_categories_rel` VALUES (1,1,43),(2,2,43),(3,3,43),(4,4,44);
/*!40000 ALTER TABLE `product_categories_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_media_rel`
--

DROP TABLE IF EXISTS `product_media_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_media_rel` (
  `id_product_media_rel` int(11) NOT NULL AUTO_INCREMENT,
  `id_products` int(11) NOT NULL,
  `id_media` int(11) NOT NULL,
  `primary_product_media_rel` enum('y','n') NOT NULL DEFAULT 'n',
  `sort_product_media_rel` int(11) NOT NULL,
  PRIMARY KEY (`id_product_media_rel`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_media_rel`
--

LOCK TABLES `product_media_rel` WRITE;
/*!40000 ALTER TABLE `product_media_rel` DISABLE KEYS */;
INSERT INTO `product_media_rel` VALUES (1,1,1,'y',1),(2,2,2,'y',1),(3,3,3,'y',1),(4,4,4,'y',1),(5,1,5,'n',6),(6,4,6,'n',2),(7,2,7,'n',2),(8,1,8,'n',2),(9,1,9,'n',3),(10,1,10,'n',4),(11,1,11,'n',5);
/*!40000 ALTER TABLE `product_media_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specifications`
--

DROP TABLE IF EXISTS `product_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_specifications` (
  `id_product_specifications` int(11) NOT NULL AUTO_INCREMENT,
  `name_product_specifications` varchar(100) NOT NULL,
  `sort_product_specifications` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_product_specifications`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifications`
--

LOCK TABLES `product_specifications` WRITE;
/*!40000 ALTER TABLE `product_specifications` DISABLE KEYS */;
INSERT INTO `product_specifications` VALUES (1,'Vikt',1),(2,'Bredd',2),(3,'Djup',3),(4,'Höjd',4);
/*!40000 ALTER TABLE `product_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specifications_groups_rel`
--

DROP TABLE IF EXISTS `product_specifications_groups_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_specifications_groups_rel` (
  `id_psgr` int(11) NOT NULL AUTO_INCREMENT,
  `id_product_specifications` int(11) DEFAULT NULL,
  `id_product_specification_groups` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_psgr`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifications_groups_rel`
--

LOCK TABLES `product_specifications_groups_rel` WRITE;
/*!40000 ALTER TABLE `product_specifications_groups_rel` DISABLE KEYS */;
INSERT INTO `product_specifications_groups_rel` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1);
/*!40000 ALTER TABLE `product_specifications_groups_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specifiction_groups`
--

DROP TABLE IF EXISTS `product_specifiction_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_specifiction_groups` (
  `id_product_specitication_groups` int(11) NOT NULL AUTO_INCREMENT,
  `name_product_specification_groups` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_product_specitication_groups`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifiction_groups`
--

LOCK TABLES `product_specifiction_groups` WRITE;
/*!40000 ALTER TABLE `product_specifiction_groups` DISABLE KEYS */;
INSERT INTO `product_specifiction_groups` VALUES (1,'Vikt och dimensioner');
/*!40000 ALTER TABLE `product_specifiction_groups` ENABLE KEYS */;
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
  UNIQUE KEY `seo_product_variants_UNIQUE` (`seo_product_variants`),
  CONSTRAINT `fk_pr_pvr_pvid` FOREIGN KEY (`id_product_variants`) REFERENCES `product_variants_rel` (`id_product_variants`) ON DELETE CASCADE ON UPDATE CASCADE
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
  PRIMARY KEY (`id_product_variants_bulk_rel`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants_bulk_rates_rel`
--

LOCK TABLES `product_variants_bulk_rates_rel` WRITE;
/*!40000 ALTER TABLE `product_variants_bulk_rates_rel` DISABLE KEYS */;
INSERT INTO `product_variants_bulk_rates_rel` VALUES (1,6,1),(2,6,2),(3,6,3),(4,6,4),(5,6,5),(6,7,10),(7,7,11),(8,7,12),(9,7,13),(10,7,14),(11,1,15),(12,2,16),(13,3,17),(14,4,18),(15,5,19);
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
  KEY `fk_pvr_pid_idx` (`id_products`),
  KEY `fk_product_variants_rel_pvid_idx` (`id_product_variants`),
  CONSTRAINT `fk_product_variants_rel_pid` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_products`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_product_variants_rel_pvid` FOREIGN KEY (`id_product_variants`) REFERENCES `product_variants` (`id_product_variants`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `variants_title_products` varchar(255) DEFAULT NULL,
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
INSERT INTO `products` VALUES (1,'Roll-Up Classic',0,0,0,'Roll Up Classic har av Föreningen Svensk Forms Opinionsnämnd fått utmärkelsen \"brukskonst\"!\r\n\r\nSystemet är lätt att bära med sig och är snabbt klart för en presentation.\r\n\r\nRoll Up Classic finns i flera olika bredder och är tänkt för upprepad användning i olika typer av miljöer.\r\n\r\n I priset ingår 1st bildvåd i angiven bredd samt montering av denna i mekaniken.','Storlek',0,'y','roll_up_classic'),(2,'Roll-Up Professional',0,0,0,'Roll Up Professional är ett lite exklusivare displaysystem gjort för användning vid upprepade tillfällen i alla tänkbara miljöer.\r\n\r\nRoll Up Professional har ännu enklare bildbyten och finns även i ett dubbelsidigt utförande.\r\n\r\nEtt självklart val för event- och promotionaktiviteter.\r\n\r\n I priset ingår 1, enkelsidig, eller 2, dubbelsidig, bildvåder samt montering av denna i mekaniken.','Modell',0,'y','roll_up_professional'),(3,'Roll-Up Compact',0,0,0,'Roll Up Compact är en kompakt och lätthanterlig Roll Up och de rundade hörnen och sidorna gör den behaglig att handskas med.\r\n\r\nDen justerbara pinnen ger stor valfrihet vid val av bildmått och gör det lätt att sätta upp systemet utan att behöva sträcka eller anstränga sig, vilket gör den lätt att montera för en person.\r\n\r\nRoll Up Compact finns med mekanik för både 85cm och 100cm bredd på bildvåd. I priset ingår 1st bildvåd i angiven bredd samt montering av denna i mekaniken.','Storlek',0,'y','roll_up_compact'),(4,'Case & Counter',0,0,0,'Expolinc Case & Counter är en rymlig transportbox som på minuten konverteras till en snygg och stabil disk.\r\n\r\nDe mjuka, rundade hörnen på toppskivan skapar en inbjudande mötesplats samtidigt som du kan exponera ditt budskap på omslagspanelen.\r\n\r\nCase & Counter finns som färdiga Pop Up-paket men kan med fördel även användas för transport av andra portabla displaysystem.',NULL,0,'y','case_and_counter');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_seo_rel`
--

DROP TABLE IF EXISTS `products_seo_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_seo_rel` (
  `id_psr` int(11) NOT NULL AUTO_INCREMENT,
  `id_products` int(11) NOT NULL,
  `id_seo` int(11) NOT NULL,
  PRIMARY KEY (`id_psr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_seo_rel`
--

LOCK TABLES `products_seo_rel` WRITE;
/*!40000 ALTER TABLE `products_seo_rel` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_seo_rel` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo`
--

LOCK TABLES `seo` WRITE;
/*!40000 ALTER TABLE `seo` DISABLE KEYS */;
INSERT INTO `seo` VALUES (4,'case_and_counter'),(1,'roll_up_classic'),(3,'roll_up_compact'),(2,'roll_up_professional');
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

-- Dump completed on 2014-02-04 15:47:13
