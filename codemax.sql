/*
SQLyog Ultimate v12.4.1 (64 bit)
MySQL - 10.1.26-MariaDB : Database - codemax
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `quiz` */

DROP TABLE IF EXISTS `quiz`;

CREATE TABLE `quiz` (
  `quiz_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `quiz_name` varchar(200) COLLATE utf8_czech_ci NOT NULL,
  `total_question` int(11) NOT NULL,
  `total_mark` int(11) NOT NULL,
  `quiz_date` date NOT NULL,
  `quiz_start_time` time NOT NULL,
  `quiz_time_duration` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `uploaded_file_url` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `exam_hash` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `is_result_genreated` tinyint(4) NOT NULL DEFAULT '0',
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*Data for the table `quiz` */

/*Table structure for table `quiz_question` */

DROP TABLE IF EXISTS `quiz_question`;

CREATE TABLE `quiz_question` (
  `question_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quiz_id` int(10) unsigned NOT NULL,
  `question` varchar(1000) COLLATE utf8_czech_ci NOT NULL,
  `question_img` varchar(300) COLLATE utf8_czech_ci DEFAULT NULL,
  `ques_mark` int(11) NOT NULL,
  `question_has` enum('img','txt','txt_img','') COLLATE utf8_czech_ci NOT NULL,
  `question_type` enum('true_false','fill_in_the_blanks','match_column','single_choice_mcqs','multiple_choice_mcqs','') COLLATE utf8_czech_ci NOT NULL,
  `ans_opt_id` int(11) unsigned NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*Data for the table `quiz_question` */

/*Table structure for table `quiz_question_opt` */

DROP TABLE IF EXISTS `quiz_question_opt`;

CREATE TABLE `quiz_question_opt` (
  `opt_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int(10) unsigned NOT NULL,
  `option_txt` varchar(500) COLLATE utf8_czech_ci NOT NULL,
  `option_img` varchar(500) COLLATE utf8_czech_ci NOT NULL,
  `is_ans` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`opt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

/*Data for the table `quiz_question_opt` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type` enum('admin','user') DEFAULT 'user',
  `is_active` tinyint(2) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`user_id`,`user_name`,`password`,`user_type`,`is_active`,`created_at`) values 
(1,'admin','202cb962ac59075b964b07152d234b70','admin',1,'2018-07-18 22:34:48'),
(2,'user','202cb962ac59075b964b07152d234b70','user',1,'2018-07-18 22:35:04');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
