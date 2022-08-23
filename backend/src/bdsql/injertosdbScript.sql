CREATE DATABASE  IF NOT EXISTS `injertosdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `injertosdb`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: injertosdb
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `injertos`
--

DROP TABLE IF EXISTS `injertos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `injertos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `edad` int NOT NULL,
  `sexo` tinyint NOT NULL,
  `imc` float NOT NULL,
  `hta` tinyint NOT NULL,
  `dm` tinyint NOT NULL,
  `dlp` tinyint NOT NULL,
  `apm` tinyint NOT NULL,
  `apq` tinyint NOT NULL,
  `got` float NOT NULL,
  `gpt` float NOT NULL,
  `ggt` float NOT NULL,
  `na` float NOT NULL,
  `bbt` float NOT NULL,
  `acvhc` tinyint NOT NULL,
  `acvhbc` tinyint NOT NULL,
  `aminas` tinyint NOT NULL,
  `dosisna` float DEFAULT NULL,
  `ecografia_1` int NOT NULL,
  `ecografia_2` int NOT NULL,
  `ecografia_3` int NOT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `injertos`
--

LOCK TABLES `injertos` WRITE;
/*!40000 ALTER TABLE `injertos` DISABLE KEYS */;
INSERT INTO `injertos` VALUES (2,63,1,24.49,0,0,0,1,0,15,18,43,138,0.4,0,0,0,0,1,0,0,'2022-07-22 17:21:02'),(3,65,1,28.34,1,0,0,0,0,29,18,82,139,0.94,0,0,1,0.06,0,1,0,'2022-07-22 17:25:12'),(4,81,0,32.81,1,1,1,1,1,22,21,68,153,0.8,0,0,1,0.15,1,0,0,'2022-07-22 20:52:58'),(5,65,0,25.81,1,1,1,1,1,22,21,68,153,0.8,1,0,1,0.15,1,0,0,'2022-07-22 21:35:23'),(6,74,0,25.81,1,1,1,1,0,22,21,68,160,0.8,0,0,1,0.15,0,1,0,'2022-07-25 21:26:03'),(7,63,1,24.49,0,0,0,0,0,15,18,43,138,0.4,0,0,0,0,1,0,0,'2022-08-22 22:26:54'),(8,42,0,24.49,0,0,0,0,0,15,18,43,138,0.4,0,0,0,0,1,0,0,'2022-08-22 22:48:47');
/*!40000 ALTER TABLE `injertos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reentrenamientos`
--

DROP TABLE IF EXISTS `reentrenamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reentrenamientos` (
  `id_reentrenamiento` int NOT NULL AUTO_INCREMENT,
  `numero_instancias` int NOT NULL,
  `fecha` datetime NOT NULL,
  `auc` float NOT NULL,
  `ultima_instancia` int NOT NULL,
  `id_usuario` varchar(9) DEFAULT NULL,
  `tiempo` float DEFAULT NULL,
  `acc` float NOT NULL,
  PRIMARY KEY (`id_reentrenamiento`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `reentrenamientos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`dni`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reentrenamientos`
--

LOCK TABLES `reentrenamientos` WRITE;
/*!40000 ALTER TABLE `reentrenamientos` DISABLE KEYS */;
INSERT INTO `reentrenamientos` VALUES (2,429,'2022-08-23 00:11:11',0.772844,8,'53769119H',11.9924,0.713287),(3,206,'2022-07-22 21:33:48',0.8,5,NULL,2.06,0.6);
/*!40000 ALTER TABLE `reentrenamientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `apellidos` varchar(60) DEFAULT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `contraseña` varchar(500) NOT NULL,
  `rol` enum('usuario','administrador') DEFAULT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('53769119H','admin','admin','678678678','admin@gmail.com','$2b$10$tb935DK7gx/vqNMIG1htE.E1M7A5Zzseq6u3hB7lqtv/eVtCy11BK','administrador'),('68641418E','Lucas','Diaz Rivas','678987116','lucas@gmail.com','$2b$10$Y4WAFKsS0UnmkD7zYVI7dOceC1U9fQ2GQAfAFpZAsoVjMUaxbcKMm','usuario');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoraciones`
--

DROP TABLE IF EXISTS `valoraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoraciones` (
  `id_valoracion` int NOT NULL AUTO_INCREMENT,
  `validez` int NOT NULL,
  `acierto` tinyint DEFAULT NULL,
  `probabilidad` float NOT NULL,
  `id_injerto` int NOT NULL,
  `id_usuario` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`id_valoracion`),
  KEY `id_injerto` (`id_injerto`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `valoraciones_ibfk_1` FOREIGN KEY (`id_injerto`) REFERENCES `injertos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `valoraciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`dni`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoraciones`
--

LOCK TABLES `valoraciones` WRITE;
/*!40000 ALTER TABLE `valoraciones` DISABLE KEYS */;
INSERT INTO `valoraciones` VALUES (1,0,NULL,0.925516,2,'68641418E'),(2,1,NULL,0.959811,3,'68641418E'),(3,1,NULL,0.927851,4,'68641418E'),(4,1,NULL,0.727392,5,'68641418E'),(5,1,NULL,0.819013,6,'53769119H'),(10,0,NULL,0.9111,7,'53769119H'),(12,0,NULL,0.8971,8,NULL);
/*!40000 ALTER TABLE `valoraciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-23  0:15:35
