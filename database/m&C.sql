-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: protest9
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_commit`
--

DROP TABLE IF EXISTS `tb_commit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_commit` (
  `id_commit` int NOT NULL AUTO_INCREMENT,
  `id_eva` int DEFAULT NULL,
  `id_member` int DEFAULT NULL,
  `status_commit` varchar(100) DEFAULT NULL,
  `level_commit` varchar(100) DEFAULT NULL,
  `detail_comit` text,
  `signature` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_commit`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_commit`
--

LOCK TABLES `tb_commit` WRITE;
/*!40000 ALTER TABLE `tb_commit` DISABLE KEYS */;
INSERT INTO `tb_commit` VALUES (1,1,5,'n','ประธาน',NULL,NULL),(2,1,4,'n','กรรมการ',NULL,NULL),(3,1,3,'n','เลขา',NULL,NULL);
/*!40000 ALTER TABLE `tb_commit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_member`
--

DROP TABLE IF EXISTS `tb_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล') DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pic_user` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_member`
--

LOCK TABLES `tb_member` WRITE;
/*!40000 ALTER TABLE `tb_member` DISABLE KEYS */;
INSERT INTO `tb_member` VALUES (1,'sommai','jaidee','sommaija','$2b$10$PQknM/aDQfLDDyl1dvRoJ.QD8hhxfPDK98damP4yyA7nGjH9ChSLm','ผู้รับการประเมินผล','jaidee@gmail.com','1786765818799.png'),(2,'staff','staff','staff','$2b$10$B4xs/ZQtRaigCpu2G4L4Ku6i9r3E/duiAODdjuiYKsvqbUKJDM4Ky','ฝ่ายบุคลากร','staff@gmail.com','1786776698628.jpg'),(3,'commit','commit','commit1','$2b$10$VpQSDXEHw2fvXCj/LALSXONyKELFbTv6y964ERKTYcGH0SPu/qYTa','กรรมการประเมิน','c@gmail.com',NULL),(4,'commit2','commit2','commit2','$2b$10$9lrWuGmEPoNU2WRcBxO0yOZ2My.rqIkNZ4HYlytWe2f4HgAc79NYq','กรรมการประเมิน','c2@gmail.com',NULL),(5,'commit3','commit3','commit3','$2b$10$Rolrx.lwde0sytAtxiYys.NLNEHbl3SX.ch3yci8SB1jNBCYfFjG6','กรรมการประเมิน','c3@gmail.com',NULL);
/*!40000 ALTER TABLE `tb_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-15 14:48:45
