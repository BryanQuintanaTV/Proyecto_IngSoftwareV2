CREATE DATABASE  IF NOT EXISTS `database-3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `database-3`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: database-3
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `name_catagory` varchar(45) DEFAULT NULL,
  `date_create_product` date DEFAULT NULL,
  `date_update_product` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Bebidas','2021-10-19','2021-10-20 06:50:00'),(2,'Condimentos','2021-10-19','2021-10-20 06:50:00'),(3,'Frutas/Verduras','2021-10-19','2021-10-20 06:50:00'),(4,'Carnes','2021-10-19','2021-10-20 06:50:00'),(5,'Pescado/Marisco','2021-10-19','2021-10-20 06:50:00'),(6,'Lácteos','2021-10-19','2021-10-20 06:50:00');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id_client` int NOT NULL AUTO_INCREMENT,
  `name_client` varchar(45) DEFAULT NULL,
  `email_client` varchar(45) DEFAULT NULL,
  `password_client` varchar(45) DEFAULT NULL,
  `token_client` text,
  `token_exp_client` varchar(45) DEFAULT NULL,
  `date_create_client` date DEFAULT NULL,
  `date_update_cleint` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Luis Acosta','lacosta@correo.com','','','','2021-10-19','2021-10-20 06:50:00'),(2,'Claudia Cordero','ccordero@correo.com','','','','2021-10-19','2021-10-20 06:50:00'),(3,'Alexis Acosta','aacosta@correo.com','','','','2021-10-19','2021-10-20 06:50:00'),(4,'Maria Luisa Ramirez','mramirez@correo.com','','','','2021-10-19','2021-10-20 06:50:00'),(5,'Maria Luisa Márquez','mmárquez@correo.com','','','','2021-10-19','2021-10-20 06:50:00'),(6,'Victor Acosta G','vacosta@correo.com','','','','2021-10-19','2021-10-20 06:50:00'),(7,'Ramon Marquez','rmarquez@correo.com','','','','2021-10-19','2021-10-20 06:50:00');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `name_product` varchar(45) DEFAULT NULL,
  `id_category_product` int DEFAULT NULL,
  `date_create_product` date DEFAULT NULL,
  `date_update_product` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Té Dharamsala',1,'2021-10-19','2021-10-20 06:50:00'),(2,'Cerveza tibetana Barley',2,'2021-10-19','2021-10-20 06:50:00'),(3,'Sirope de regaliz',3,'2021-10-19','2021-10-20 06:50:00'),(4,'Especias Cajun del chef Anton',4,'2021-10-19','2021-10-20 06:50:00'),(5,'Mezcla Gumbo del chef Anton',5,'2021-10-19','2021-10-20 06:50:00'),(6,'Mermelada de grosellas de la abuela',6,'2021-10-19','2021-10-20 06:50:00'),(7,'Peras secas orgánicas del tío Bob',1,'2021-10-19','2021-10-20 06:50:00'),(8,'Salsa de arándanos Northwoods',2,'2021-10-19','2021-10-20 06:50:00'),(9,'Buey Mishi Kobe',3,'2021-10-19','2021-10-20 06:50:00'),(10,'Pez espada',4,'2021-10-19','2021-10-20 06:50:00'),(11,'Queso Cabrales',5,'2021-10-19','2021-10-20 06:50:00'),(12,'Queso Manchego La Pastora',6,'2021-10-19','2021-10-20 06:50:00'),(13,'Algas Konbu',1,'2021-10-19','2021-10-20 06:50:00'),(14,'Cuajada de judías',2,'2021-10-19','2021-10-20 06:50:00'),(15,'Salsa de soja baja en sodio',3,'2021-10-19','2021-10-20 06:50:00'),(16,'Postre de merengue Pavlova',4,'2021-10-19','2021-10-20 06:50:00'),(17,'Cordero Alice Springs',5,'2021-10-19','2021-10-20 06:50:00'),(18,'Langostinos tigre Carnarvon',6,'2021-10-19','2021-10-20 06:50:00'),(19,'Pastas de té de chocolate',1,'2021-10-19','2021-10-20 06:50:00'),(20,'Mermelada de Sir Rodney',2,'2021-10-19','2021-10-20 06:50:00'),(21,'Libro Matematicas',3,'2021-10-19','2021-10-20 06:50:00'),(22,'Gamesa Pastas de algo',1,'2021-10-19','2021-10-20 06:50:00'),(23,'Langostinos tigre Carnarvon',2,'2021-10-19','2021-10-20 06:50:00');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-06 21:37:34
