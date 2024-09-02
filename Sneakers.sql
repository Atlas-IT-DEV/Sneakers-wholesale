-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 02 2024 г., 03:42
-- Версия сервера: 5.7.39
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Sneakers`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

CREATE TABLE IF NOT EXISTS `cards` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `categories`
--

INSERT IGNORE INTO `categories` (`id`, `name`) VALUES
(171, 'vIDAVnsx'),
(173, 'EhCTPywl'),
(175, 'YhSVslAs'),
(177, 'QUzqtwvO'),
(179, 'fzqzyGcb'),
(181, 'WaljNOBt'),
(183, 'kVxdivMr'),
(185, 'RlKycntY'),
(187, 'ZxMhyyLY'),
(189, 'dEnppyqu'),
(191, 'WZjPSqxM'),
(193, 'scddWiIZ'),
(195, 'NWitAeZN'),
(197, 'SQYffLqI'),
(199, 'vDvSECsG'),
(201, 'sqLTOONK'),
(203, 'VvTzipmr'),
(205, 'gNSEHVGq'),
(207, 'zsbGxvPp'),
(209, 'dwbESfRC'),
(211, 'CvwvihoH'),
(212, 'xdMdcOkS'),
(213, 'mVgqSWML'),
(215, 'jtpDJpdn'),
(216, 'dABaoRJx'),
(217, 'XEWwDcdz'),
(219, 'EzJfckoe'),
(220, 'MkUOwspP'),
(221, 'QISYuMKE'),
(223, 'PPgEevoR'),
(224, 'lLofXoIi'),
(225, 'TJSsqeja'),
(227, 'TDtzKqfc'),
(228, 'iajHinbm'),
(229, 'BHItuAPA'),
(231, 'NnyYjDYD'),
(233, 'LzfzAufh'),
(235, 'UvrgUpCD'),
(236, 'TRMHnMzs'),
(238, 'alErCaxC'),
(239, 'uMCvXsHh'),
(241, 'SKQuSNyI'),
(242, 'hWuruLRd'),
(244, 'vJhqexrw'),
(245, 'IGabpxjh'),
(247, 'SKCJzvOX'),
(248, 'JEcksnFt'),
(249, 'ZdsMRpIZ'),
(251, 'zFPGrlUR'),
(252, 'mZlhVmxH'),
(253, 'uCFlTauS'),
(255, 'vGPiQNUx'),
(256, 'ugfyXawC'),
(257, 'YtBwojss'),
(259, 'soErZECn'),
(260, 'uzucNcUs'),
(261, 'gDhxyjRW'),
(263, 'TfSwLfFp'),
(264, 'oElzZSZQ'),
(265, 'VDsKNwrs'),
(267, 'IJzSICYE'),
(268, 'dnifliPG'),
(269, 'uueBXxYD'),
(271, 'sTIccoeS'),
(272, 'dOzozljv'),
(273, 'qpLWpZxI'),
(275, 'gNVodpQo'),
(276, 'gyVQwLEB'),
(277, 'APnLqPNT'),
(279, 'MfVKVmWF'),
(280, 'HlouqaMD'),
(281, 'pNStESjV'),
(283, 'QmiYskPM'),
(284, 'yxaAqHPN'),
(285, 'TZUxfOqo'),
(287, 'xpJQKkaO'),
(288, 'nhnIUgsi'),
(289, 'drhgwIab'),
(291, 'NYBrktny'),
(292, 'fjIIiRmu'),
(293, 'ytHwXNvW'),
(294, 'ZsmFrCHg'),
(295, 'FXNAYHKy'),
(297, 'wlRwIiYK'),
(298, 'LipzySUJ'),
(299, 'heQQEPSY'),
(301, 'tJeWCUGE'),
(302, 'JKYxcaOK'),
(303, 'GiQJjDkZ'),
(305, 'gbnqdSZX'),
(306, 'qdkcrLFl'),
(307, 'ffZeHwVe'),
(308, 'mSsJhOso'),
(310, 'hrWOcHAC'),
(311, 'DoXgYSvK'),
(312, 'laTAMiBw'),
(313, 'KqlGkHVJ'),
(315, 'nAihQXrx'),
(316, 'rqIaEkiM'),
(317, 'DhJnMLZn'),
(318, 'gwvJNqlq'),
(320, 'KgEXRPcN'),
(321, 'MJakonLL'),
(322, 'NIwlIisF'),
(323, 'YOYlooDN'),
(325, 'OAjFQjBR'),
(326, 'NpEgjnAg'),
(327, 'uvNuGtmm'),
(328, 'LKrcLJAR'),
(329, 'dnfeBcXA'),
(331, 'GmDbprrP'),
(332, 'kQGrakKp'),
(333, 'mpXybmnU'),
(334, 'XdaVKyHP'),
(335, 'QVkIlNqf'),
(337, 'gWdqkPYt'),
(338, 'gJwJNUxH'),
(339, 'hkSbUAEG'),
(340, 'MCaDbajz'),
(341, 'XHpJZxVO'),
(343, 'prBuXYEt'),
(344, 'wbvbewuH'),
(345, 'lmrlaPLb'),
(346, 'KZEtdbfM'),
(347, 'QJNQDhRC'),
(349, 'khhnNKSj'),
(350, 'IEjGWNDo'),
(351, 'nWvqWrMB'),
(352, 'keOOykfR'),
(353, 'nUzBrMmM'),
(355, 'lBetawjY'),
(356, 'xazypwTr'),
(357, 'QxhELTqA'),
(358, 'rKrxjvEF'),
(359, 'HCFFwrww'),
(361, 'nnoPjDiE'),
(362, 'WZOsCocX'),
(363, 'idOclZLc'),
(364, 'DSnugPRc'),
(365, 'rbzwITMJ'),
(367, 'XSyHJXyN'),
(368, 'snMGcXwY'),
(369, 'WmSUgWpG'),
(370, 'MGxkZzgS'),
(371, 'EQGzRFYr'),
(373, 'AAJnlbaL'),
(374, 'CRlnAWMf'),
(375, 'TlYwDzfT'),
(376, 'FAXoVYnS'),
(377, 'KiXnVvHl'),
(379, 'edZTtZVB'),
(380, 'OVSsxLWb'),
(381, 'KVvvAvzn'),
(382, 'zwUufrVA'),
(383, 'ifdKsrkL'),
(385, 'oysyCyuW'),
(386, 'qrEXtwXy'),
(387, 'LMxDoXVo'),
(388, 'JapNaZAS'),
(389, 'TkcGhFLR'),
(391, 'Mruojibx'),
(392, 'VHuEJHAI'),
(393, 'TmUeDWoX'),
(394, 'BeavSxgr'),
(395, 'pfysaTiU'),
(397, 'MXGtfOqg'),
(398, 'rLPnrswN'),
(399, 'bhYNURpI'),
(400, 'pqWbfJOZ'),
(401, 'DLgxCnRr'),
(403, 'lcOCHOBO'),
(404, 'wNXKmHFT'),
(405, 'EFjwHDAK'),
(406, 'gDSAAWpj'),
(407, 'jOCWWoGH'),
(409, 'niGfCUiy'),
(410, 'HUTVWfZw'),
(411, 'PmQhSeIf'),
(412, 'mOwjHgWu'),
(413, 'YXtkGQRh'),
(415, 'Qaffnhgm'),
(416, 'fWDCVdpc'),
(417, 'BIrQQgAj'),
(418, 'WlnQxUWg'),
(419, 'mqzIfdAZ'),
(421, 'ibVKnWIY'),
(422, 'NpEdNtoI'),
(423, 'CRWVASdg'),
(424, 'wXcUXRmd'),
(425, 'nKuPNNqz'),
(427, 'tHvyLnYq'),
(428, 'nBXrqnKu'),
(429, 'ZrrbpoQz'),
(430, 'scVqNcrP'),
(431, 'facJNLwX'),
(433, 'iFeQlhPL'),
(434, 'EIevivDc'),
(435, 'AftkerwY'),
(436, 'tOgWegPj'),
(437, 'tlsiuGaY'),
(439, 'luRwqkBF'),
(440, 'qipVbUXc'),
(441, 'PIlVQqFj'),
(442, 'dQHElfQp'),
(443, 'VpIlRIeH'),
(445, 'SOAoRFTi'),
(446, 'eItvUczb'),
(447, 'WtcElyun'),
(448, 'YqNVBlOy'),
(449, 'rOvtTaKa'),
(451, 'tPQzNXly'),
(452, 'WVKaKacT'),
(453, 'AfiOrHKy'),
(454, 'TXnDJfKL'),
(455, 'eyvZJjhz'),
(457, 'sRlkyQbw'),
(458, 'WWIvbvIN'),
(459, 'qdVhjliN'),
(460, 'QIAFfYVE'),
(461, 'zBqcxOCF'),
(462, 'ktYuUjPn'),
(464, 'VGnSuJVw'),
(465, 'rqKfwDpA'),
(466, 'ZposgVgi'),
(467, 'MsOJEViJ'),
(468, 'EMJQbucr'),
(469, 'AcWCTxQG'),
(471, 'KxYscfuT'),
(472, 'amIjmoBN'),
(473, 'qVymCPUF'),
(474, 'APrdmEQx'),
(475, 'WpklQqMB'),
(476, 'YSsEBnON'),
(477, 'gvBznQLa'),
(479, 'UnhQvelg'),
(480, 'gvZotMJV'),
(481, 'MLtpIBNW'),
(482, 'rFIVCWRx'),
(483, 'ORIEYTXY'),
(484, 'GWbgcRVS'),
(485, 'QkQHOZno'),
(487, 'sdZntUlt'),
(488, 'AmshaEKb'),
(489, 'orXIgmcp'),
(490, 'ORpHhioT'),
(491, 'BaSWBXXd'),
(492, 'whiYAOBw'),
(493, 'jmnmsrsA'),
(495, 'PVMTwaiJ'),
(496, 'yzNtlAjh'),
(497, 'aBAIwLZV'),
(498, 'tpzXEmix'),
(499, 'iqLLBoCi'),
(500, 'CaySjLBq'),
(501, 'NANwKbGo'),
(503, 'oWpmvODG'),
(504, 'LHGcGVhg'),
(505, 'LExDbWAU'),
(506, 'PtePQtnq'),
(507, 'GzxnAGhj'),
(508, 'EEoHWwTg'),
(509, 'gEpkVeIB'),
(511, 'yLNuPKeX'),
(512, 'NDeLlHAZ'),
(513, 'mZftzHyb'),
(514, 'FxQHHWyh'),
(515, 'aukrhsNF'),
(516, 'TNcsiAIS'),
(517, 'qcfgkVrD'),
(519, 'ztUOqNps'),
(520, 'AQAlqGCp'),
(521, 'ABMqZYJg'),
(522, 'ShxkPeAT'),
(523, 'hdHmvlig'),
(524, 'mpUnQoUk'),
(525, 'kEbDNlcZ'),
(527, 'dNDEbZfD'),
(528, 'kKgCBSAr'),
(529, 'TGNtcZVn'),
(530, 'RkeOfTmo'),
(531, 'MpSrcexL'),
(532, 'duuuLRjJ'),
(533, 'EohaDrqQ'),
(535, 'tiDWaazP'),
(536, 'FtBtLANb'),
(537, 'WNGRdLZo'),
(538, 'fUnvpxOH'),
(539, 'NiTlihLV'),
(540, 'PoyvWzvF'),
(541, 'HhGdyenI'),
(543, 'WPPlDuaZ'),
(544, 'VuQnaofc'),
(545, 'OCirpPQB'),
(546, 'nhMSdxST'),
(547, 'lgkVsrkE'),
(548, 'YWBOjXPB'),
(549, 'DfpSPbkr'),
(551, 'ASYaywzN'),
(552, 'oobtuptu'),
(553, 'KOFtlreB'),
(554, 'tyaFwUFh'),
(555, 'scYMnsGs'),
(556, 'wigHkcYq'),
(557, 'UfQqxIsq'),
(559, 'yeZzGXtD'),
(560, 'FVoXzquW'),
(561, 'WHNXorMn'),
(562, 'lEYtAXRf'),
(563, 'tVPfxpPX'),
(564, 'mnGnIYjl'),
(565, 'aUyKZRsI'),
(567, 'aZRCvAgo'),
(568, 'WwyCHDRz'),
(569, 'xJXyrYEK'),
(570, 'VHGKBVzS'),
(571, 'KtIktddw'),
(572, 'FgUCgINa'),
(573, 'OiOqraOA'),
(575, 'UEFBLESn'),
(576, 'vxUbsivP'),
(577, 'LGMZaAdm'),
(578, 'YJMVRuDP'),
(579, 'CHdJzHDk'),
(580, 'IUpaUpeS'),
(581, 'rYuptznm'),
(583, 'nfuHnxqn'),
(584, 'CDNcPtDX'),
(585, 'vvEeTHsA'),
(586, 'CYJPbrpr'),
(587, 'BLPfOBRD'),
(588, 'ePTOMwOd'),
(589, 'FSGigiyv'),
(591, 'NZRVAvVT'),
(592, 'USyYpBEo'),
(593, 'zSYXDYro'),
(594, 'dOMyEfhb'),
(595, 'aXgfvhgs'),
(596, 'medBUyel'),
(597, 'gkKYPLHZ'),
(598, 'Обувь');

-- --------------------------------------------------------

--
-- Структура таблицы `characteristics`
--

CREATE TABLE IF NOT EXISTS `characteristics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('INT','VARCHAR','BOOLEAN','FLOAT','TEXT','TIMESTAMP','DECIMAL','JSON') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `characteristics`
--

INSERT IGNORE INTO `characteristics` (`id`, `name`, `type`) VALUES
(95, 'MpZFlIYf', 'INT'),
(97, 'cCpHpday', 'INT'),
(99, 'LpchlBFv', 'INT'),
(101, 'pYCzLoSE', 'INT'),
(103, 'LbPQPUQF', 'INT'),
(111, 'IJtHbEJA', 'INT'),
(113, 'PnCdYqGa', 'INT'),
(115, 'FbpQmrmy', 'INT'),
(117, 'PSTCRsLZ', 'INT'),
(119, 'htwEVHbB', 'INT'),
(121, 'gJFYEwOV', 'INT'),
(123, 'zDtUUSyb', 'INT'),
(125, 'IDfLhTsL', 'INT'),
(127, 'VeyUUvTC', 'INT'),
(129, 'JdncfxgL', 'INT'),
(131, 'XPqooTzQ', 'INT'),
(133, 'IsqjEAFC', 'INT'),
(134, 'bWiapmRx', 'INT'),
(135, 'RilpwBHw', 'INT'),
(137, 'uTJWTbFB', 'INT'),
(139, 'pBXVKjze', 'INT'),
(141, 'amlsKoDu', 'INT'),
(143, 'NixnhMKa', 'INT'),
(145, 'hnqBjWrM', 'INT'),
(147, 'cHceMtGu', 'INT'),
(149, 'OwfxYFHK', 'INT'),
(151, 'NpGPfvnK', 'INT'),
(153, 'LqNmOdfv', 'INT'),
(155, 'RckhYQWm', 'INT'),
(157, 'FANziTQb', 'INT'),
(159, 'kjOwAiIO', 'INT'),
(161, 'APbKugwL', 'INT'),
(163, 'qraHwGbr', 'INT'),
(165, 'jBPMiYnK', 'INT'),
(167, 'ILloMnen', 'INT'),
(169, 'GgPNMxRW', 'INT'),
(171, 'VDNUvrjG', 'INT'),
(173, 'wQSWZtzM', 'INT'),
(175, 'HedNsQiO', 'INT'),
(177, 'RDHdTiWA', 'INT'),
(179, 'YECeRRam', 'INT'),
(181, 'UGHxHztG', 'INT'),
(183, 'lBJijEUO', 'INT'),
(185, 'HUgoffbh', 'INT'),
(187, 'WVYebZZI', 'INT'),
(189, 'KMmQKDDa', 'INT'),
(191, 'yUUhBCrj', 'INT'),
(193, 'KFPcqoaT', 'INT'),
(195, 'ZudDhdzf', 'INT'),
(197, 'BOoBeLdx', 'INT'),
(199, 'WfXdxuWP', 'INT'),
(201, 'OQEoTLxa', 'INT'),
(203, 'uPVpXLuK', 'INT'),
(205, 'OpmZYpJM', 'INT'),
(207, 'skHePNgC', 'INT'),
(209, 'HgrtZWtu', 'INT'),
(211, 'rJYUlakO', 'INT'),
(213, 'toClAHer', 'INT'),
(215, 'JffeuPpe', 'INT'),
(217, 'TsJOjfDa', 'INT'),
(219, 'xDOeHbfh', 'INT'),
(221, 'iZjiSjlS', 'INT'),
(223, 'PgOgzqnv', 'INT'),
(225, 'WkYpOBvd', 'INT'),
(227, 'SPeXXdsc', 'INT'),
(228, 'Размер', 'INT');

-- --------------------------------------------------------

--
-- Структура таблицы `companies`
--

CREATE TABLE IF NOT EXISTS `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `companies`
--

INSERT IGNORE INTO `companies` (`id`, `name`, `description`) VALUES
(170, 'BFfsBWCo', 'xoBMnYrc'),
(172, 'nJYwifFO', 'LfqxpWRf'),
(174, 'ojwIedkj', 'vebOFrxJ'),
(176, 'ZiTkkYwL', 'deOvbnuP'),
(178, 'JKHXtDaS', 'yAGPBmAk'),
(180, 'mnRHckWH', 'JFpqCVGw'),
(182, 'xvYQYyFx', 'bTeiCjUK'),
(184, 'oANFPZUb', 'NuzwakJx'),
(186, 'fxuXWwrJ', 'FEHwNxZH'),
(188, 'JGGAuKjh', 'uEpYysGt'),
(190, 'JfDEqVHG', 'TLCsONGk'),
(192, 'QDZvUQDo', 'FXmXQBwL'),
(194, 'TBaYLaUC', 'BWObotvd'),
(196, 'KwCoHicx', 'XrhSQTeC'),
(198, 'HYtiiyUM', 'oyctHpUd'),
(200, 'KtqVvXUN', 'xeuMUtsY'),
(202, 'wJEkuvPP', 'wskesOBp'),
(204, 'WyrDOxCB', 'xhkcfQfI'),
(206, 'mYuFqJhQ', 'dAskexJe'),
(208, 'LxVQnilL', 'yiiMamNO'),
(210, 'PWgrzHoL', 'LhaPOwzt'),
(211, 'gxVKiAqk', 'qtTaDNae'),
(212, 'oUuwXfCj', 'MrVSCRyy'),
(214, 'JhisNtpY', 'VSZLtMSm'),
(215, 'tJknmgIq', 'HqgvblDx'),
(216, 'xSiChItV', 'KHUUVbNv'),
(218, 'fyxLZmJq', 'suLUwEwv'),
(219, 'btMWoxXA', 'OHQCbieu'),
(220, 'UwDelzye', 'RwIGNZbs'),
(222, 'viXKNvRM', 'klbkvLUT'),
(223, 'tdAFnadl', 'vIqFSiKJ'),
(224, 'hDivNdhT', 'msZuJDpN'),
(226, 'mbwmODIl', 'ALokPEnx'),
(227, 'dpmSiZnU', 'JuJrjlQL'),
(228, 'fhitTiQy', 'eCCGPsod'),
(230, 'wtZLsQMm', 'jzxwtEPz'),
(232, 'rCqMkoKq', 'oitbBZqn'),
(234, 'egVUkZFv', 'hxByEtVv'),
(235, 'ibPjOMQH', 'gEGWSbWH'),
(237, 'WVuIjuwx', 'HEUcLbQU'),
(238, 'BXOZAmMl', 'SbaZHefD'),
(240, 'GwDGiODx', 'ukJwadZT'),
(241, 'KGxOhyVv', 'OsihXBuA'),
(243, 'qKqILfzb', 'vhTfsHkX'),
(244, 'xrZaOHqg', 'ZmpFjTDl'),
(246, 'CkxUkAGQ', 'LsJjWaqL'),
(247, 'xwBxiOks', 'tDGsmhxA'),
(248, 'gNvkGgoO', 'aUQICqIA'),
(250, 'RkjhzAYN', 'RlndBeqX'),
(251, 'sTEMLpKA', 'IEsyDydh'),
(252, 'UciyQADS', 'ULONhNRf'),
(254, 'zAEeNwsz', 'AdztrFUd'),
(255, 'BnywYCUQ', 'MmajdigZ'),
(256, 'eFgLFEbL', 'xTSDAEsO'),
(258, 'fbmtaTiQ', 'tjGBvoWI'),
(259, 'dfcawOgF', 'oTxKRyjZ'),
(260, 'XHStFOMz', 'hcfzimfS'),
(262, 'qgghmmkj', 'AbMTDwZP'),
(263, 'QcdjEqbc', 'OaPpqoRe'),
(264, 'vAfUaszd', 'CQnsRtQl'),
(266, 'YTmqnTTz', 'tfiEFapa'),
(267, 'VdmSPney', 'feSCwOYv'),
(268, 'ZtRhaXIM', 'IAfgUVPz'),
(270, 'oRhnQUPA', 'TAgljwqI'),
(271, 'EedNRjXc', 'XNLZQWvc'),
(272, 'LAILsakc', 'lbAhSpmF'),
(274, 'cgAagfoM', 'DxjYkXKk'),
(275, 'iOrJCwhv', 'zfBXVECV'),
(276, 'RwxuLxcG', 'OExtlhDe'),
(278, 'ZXitUPHr', 'XOeiKzLw'),
(279, 'sJcrbqMF', 'egeSOWXP'),
(280, 'ckyHYqbv', 'hXtXpKbO'),
(282, 'oXqAggCz', 'QpUfylsC'),
(283, 'JlXxglty', 'EtGAGajQ'),
(284, 'vlFEWGPx', 'mQPCDybL'),
(286, 'LrEJZRgL', 'IorJPFKQ'),
(287, 'DeTOKcfB', 'LOzditQf'),
(288, 'lDWaWBBI', 'DsHasZbs'),
(290, 'jtBFgdfn', 'MIalecHX'),
(291, 'zYpgAeWv', 'qoTSmsTM'),
(292, 'uWkEVNei', 'Kstyoreu'),
(293, 'fmIFhjIC', 'pHsWZvbP'),
(294, 'bPwtZYPN', 'kiHFmUza'),
(296, 'MhkxWvAG', 'eAauZqfG'),
(297, 'tcWgfovu', 'odfeoakL'),
(298, 'WbWHZNLm', 'ztKWTHuy'),
(300, 'aRKuGiWJ', 'CCAyyjrG'),
(301, 'hjmOcMtx', 'zyUGaamM'),
(302, 'cpledGuW', 'POyXDdvk'),
(304, 'pehbMPnH', 'vWRFaplS'),
(305, 'uhncvCtQ', 'vPkFNBBN'),
(306, 'zEzKpBCX', 'eKyityBU'),
(307, 'MIDCwebp', 'paWhVIde'),
(309, 'MLiCexRX', 'lRLpBifz'),
(310, 'GsOGQVwI', 'RDaRmlOb'),
(311, 'ViOOHIuL', 'mjmlRBgk'),
(312, 'DSLBtoxf', 'KwroUymi'),
(314, 'PEBmcakJ', 'LReddVpp'),
(315, 'cQQwJFrT', 'XPeSQJmu'),
(316, 'SXSGaTrc', 'eyiSCmXl'),
(317, 'JurNqahQ', 'dwOPrnKX'),
(319, 'ZQtvobKP', 'gGXcoUOH'),
(320, 'kQcsSUme', 'bmZFavHF'),
(321, 'SvGPiayc', 'JnqvdRXh'),
(322, 'imOUJsvu', 'MpCkxedH'),
(324, 'WRIACVrh', 'gKHMuqVr'),
(325, 'MukqLFRZ', 'yEpZEwxd'),
(326, 'IggxgwRr', 'nylHFRtb'),
(327, 'eloLtAAO', 'UquRFfTQ'),
(328, 'cnEJTvCb', 'SVwySRvV'),
(330, 'eFNhhdfA', 'gLwpJyFa'),
(331, 'UnvHgoGa', 'sKrTmdOL'),
(332, 'RgnVMzGY', 'HWoLUpck'),
(333, 'tgYowFDH', 'YVXNBmxC'),
(334, 'DsulRlBt', 'AzAFfypf'),
(336, 'BzfagJef', 'CxvKDfKH'),
(337, 'XQewsVfV', 'gcWpmvVT'),
(338, 'iVilnQcK', 'YOpPZenK'),
(339, 'XPibpbIR', 'nnombUFc'),
(340, 'WBIRKlXY', 'vodROMxv'),
(342, 'MZxbAcgA', 'cKdwByCe'),
(343, 'daYoEQRb', 'kNiISfgn'),
(344, 'sVTPamtn', 'QMTgpRWa'),
(345, 'IQSioxFh', 'ebATMbVt'),
(346, 'BOadfvDm', 'ISIvpHdR'),
(348, 'yvNJQdww', 'GRFjQjyh'),
(349, 'JsdMkiXJ', 'EoxUqDYH'),
(350, 'NvPuNFPB', 'rbuzpEWB'),
(351, 'qjqvljZB', 'uphXXWhd'),
(352, 'hDEMweeR', 'YBjnYatY'),
(354, 'AokOZhaW', 'DpqnSZKB'),
(355, 'hkHasAgZ', 'VFnlnxfS'),
(356, 'SqXQMmJS', 'soBBjzeq'),
(357, 'nRtwwGlS', 'EUhbMVIh'),
(358, 'qCcZkOBw', 'jfAXPqPH'),
(360, 'eMtoVLbS', 'hQZOHTAX'),
(361, 'eqPKNufg', 'fFFdtFYH'),
(362, 'ySiNtzho', 'MhOBhKnF'),
(363, 'qKMFKYGD', 'MEtXojKT'),
(364, 'kUYobZPA', 'MaTJrpVE'),
(366, 'xYvFBldn', 'uWQyLevH'),
(367, 'nyihWDSE', 'MiqRaDUN'),
(368, 'OpkDdVus', 'LuQuHEet'),
(369, 'FmAGpvSF', 'GRTjCLIo'),
(370, 'XqmedWSQ', 'cVqEKZPd'),
(372, 'iyKtuvsB', 'kofjwfov'),
(373, 'WCjSRWFi', 'qvrYzqyj'),
(374, 'swrvSIqJ', 'MXRVtrox'),
(375, 'jrboZZJP', 'idLxwiPI'),
(376, 'ajHHxwkj', 'DGgoxCCE'),
(378, 'cwKvziRV', 'jCzzXuaB'),
(379, 'sHDJdtra', 'peYFLCgV'),
(380, 'yJhQvzFo', 'gPVHbqWi'),
(381, 'ldlkJyhz', 'wjhZqJeN'),
(382, 'yiJGDaWi', 'IlXBAteA'),
(384, 'hSvxJtQc', 'lpSJAOyD'),
(385, 'fPAFvwBO', 'lXOIwLQO'),
(386, 'sCTjpbDd', 'FyntuEIx'),
(387, 'cSDerlHl', 'CQlGISvo'),
(388, 'nphuLyIe', 'rDlDmSKs'),
(390, 'JtKiUyHO', 'gFmiieeN'),
(391, 'duktkmnZ', 'WgeKfIjP'),
(392, 'rWCHGWto', 'IKyVKwtn'),
(393, 'flzuhWaT', 'tSlpUlTA'),
(394, 'GuDItcEt', 'GsgZgCjx'),
(396, 'LYFNeyTw', 'FZLwaPgi'),
(397, 'ICtGxZdY', 'HFuPCsCA'),
(398, 'VpvlNbLF', 'fifPunjJ'),
(399, 'QZKCXlQs', 'WJXMzxBW'),
(400, 'pSPjfHcD', 'VKXbaNVL'),
(402, 'QBSTRkWG', 'aHVtlNEe'),
(403, 'TXQYoxgl', 'MZpJuQXQ'),
(404, 'cvFVwEUK', 'ECURBDkN'),
(405, 'eCARXKKr', 'CpObUGjF'),
(406, 'aUykUzpY', 'hHCAUomF'),
(408, 'CPjBaecd', 'qDhHLkdW'),
(409, 'rsooZxcX', 'YevQZjoT'),
(410, 'cCuYStNP', 'dzLWihyN'),
(411, 'wEHcnWHe', 'RUpBAWOC'),
(412, 'lkgYJcDu', 'wUUQnrGY'),
(413, 'oLUXJgty', 'tAXvtnZG'),
(415, 'UbiWjShQ', 'SoHxIwaX'),
(416, 'HTgbPGOP', 'FmVAZXkM'),
(417, 'NFlynCkQ', 'ppCaxVQC'),
(418, 'TEAtKJdX', 'AajcxlUS'),
(419, 'dVfgkPiL', 'UMgOzoxH'),
(420, 'lGFoqhhU', 'RGCOSzvd'),
(422, 'urThyOsp', 'eIMcaFgJ'),
(423, 'JdpLaVZe', 'NWWFbeem'),
(424, 'kpiqZhby', 'dDpUnepz'),
(425, 'JiyUYFbo', 'yHgboyqm'),
(426, 'LahICUHh', 'rVBxTkXT'),
(427, 'lgJhPHQP', 'nDYbfFDJ'),
(429, 'jZiNxAfl', 'gaUwpqLJ'),
(430, 'vhlivxCu', 'nNWuXxKd'),
(431, 'EaenGXTo', 'VCJAcxSr'),
(432, 'parcvwOT', 'JKzLoDtv'),
(433, 'umMUoIje', 'hEATULAi'),
(434, 'pvaNFWJo', 'UtIBBQag'),
(436, 'oNtgFsMT', 'hXmAuMqA'),
(437, 'GSfOKlbj', 'pINvGAsy'),
(438, 'dTArifkO', 'dbqgtZXW'),
(439, 'btujQVKy', 'EJQWvkcq'),
(440, 'bOKwgHuy', 'vfyWAGFD'),
(441, 'rJitcpBL', 'cvGZNYti'),
(443, 'ptPPEqZv', 'DfZBAFmJ'),
(444, 'zGCNligl', 'BjnyUorw'),
(445, 'yLTEdguN', 'ZLHDznnd'),
(446, 'LnDUainn', 'xIlcLmoC'),
(447, 'sKqMRCme', 'YXneqNFH'),
(448, 'jObfbGdC', 'tuGJZHev'),
(450, 'eUSanLFd', 'kmkEezzD'),
(451, 'CFNxEQql', 'SetUHPcD'),
(452, 'juPyIoDu', 'ySxCFwdQ'),
(453, 'EnSNDfFs', 'txSxCpWW'),
(454, 'lphyAvAN', 'lYzksSlo'),
(455, 'NTyznTRy', 'HFVAblDy'),
(457, 'gyolNDkr', 'jzGlAEpE'),
(458, 'fCcOHrZo', 'psUzQgUi'),
(459, 'TxheirTn', 'cveGvXQw'),
(460, 'cuUSHDNt', 'HGUkuKFx'),
(461, 'FtcFrLVJ', 'VIwXXfEp'),
(462, 'tlxaSQey', 'msDIHMxP'),
(464, 'bTEhLIgn', 'awnMgVDm'),
(465, 'ZiscVjgZ', 'mlmkLaea'),
(466, 'oKProatM', 'ICuECbHm'),
(467, 'HuwVvpBZ', 'xBpsgfVj'),
(468, 'mPlawOEF', 'VAtJnAmG'),
(469, 'onZJHiLH', 'PqSvSYSX'),
(470, 'JcPyXVmp', 'tktzyqXA'),
(471, 'iolGaptI', 'ukQHEfHG'),
(473, 'FPZmFBff', 'htMqUbKO'),
(474, 'NOxeZRMi', 'BBlhIVSy'),
(475, 'dWhjmSxz', 'raLJfSci'),
(476, 'ZGRJKImK', 'EdrlhINo'),
(477, 'KaWflrBF', 'wwKkUmIR'),
(478, 'WkNvfcuM', 'cQVxBKxg'),
(479, 'JMaJewaB', 'lYaSDqfl'),
(480, 'qYCcqICa', 'lGDnlszA'),
(482, 'RbgCCyPb', 'duEgUQAO'),
(483, 'xlBUZkHP', 'MdKVsbTj'),
(484, 'tfDlJFUj', 'vcIDVPSQ'),
(485, 'DIwnYqEU', 'WmSmCejF'),
(486, 'IAsuUKjL', 'MdOwXyjt'),
(487, 'bLOhbwvM', 'fgLCoBKp'),
(488, 'edMbyRTI', 'jOZYLPeT'),
(489, 'SFPvrfcs', 'OVXgrnjj'),
(490, 'UWTuZRDj', 'iHSXFRDq'),
(492, 'vMgpvvpP', 'IgrJMQgY'),
(493, 'EWPnoFdH', 'dmVgOpad'),
(494, 'EwpENgKu', 'YYLvbCkt'),
(495, 'HAajjOFu', 'cAvnZDlo'),
(496, 'agbgvsta', 'jrgcTczs'),
(497, 'vtFfVtDB', 'GkXAeXcZ'),
(498, 'TdcvVpvs', 'EirUOAsR'),
(499, 'MgnoiSHQ', 'nsUocETx'),
(500, 'iHlJojXX', 'yUsdooMs'),
(502, 'wfHpIhOl', 'YtAjxegh'),
(503, 'EICBjWDS', 'cIKrWdUg'),
(504, 'bifoyTRo', 'rWfJZVFv'),
(505, 'arYpfxfS', 'xuyYXPaT'),
(506, 'FHVLOabC', 'ihwDFanW'),
(507, 'dCTETCtv', 'alJiKYlK'),
(508, 'rYwUxFfS', 'heIyjwWH'),
(509, 'tJTjmKYC', 'YyiTNgTj'),
(510, 'TQsZbZAa', 'ESabMSdc'),
(512, 'oHJWnxFk', 'vIebdZmE'),
(513, 'khztwrXE', 'aQCTuFpL'),
(514, 'ozHqZvii', 'cypZEvFd'),
(515, 'GygFPVzN', 'UWqRrjtl'),
(516, 'auAQSovW', 'BgKazUYG'),
(517, 'CLsYuYzM', 'afISMAqW'),
(518, 'uMzHHmPt', 'OPHCPBFz'),
(519, 'rngXdExo', 'CFZNHYLj'),
(520, 'phooLyIM', 'KkOYXQif'),
(522, 'sdkFLMPZ', 'uGxqSWMC'),
(523, 'SrZYJLEt', 'UlUuhGsR'),
(524, 'ORBJyCBk', 'xgTMOnAO'),
(525, 'ZdSZTzaV', 'ZMwZagmu'),
(526, 'rzsaUuOZ', 'hZcjBNFI'),
(527, 'cGlWpJbH', 'OqAmJSMy'),
(528, 'VZFuLViv', 'tYCyHocn'),
(529, 'PscyyIcF', 'EiIZFPhY'),
(530, 'TSQBDPYy', 'eGsYrmTF'),
(532, 'LCWPBneK', 'dzZMLMTA'),
(533, 'tCvooBZN', 'ptpmKdGM'),
(534, 'yuEphkFd', 'ArFsgnNe'),
(535, 'exYNUNxu', 'QECVMTtn'),
(536, 'EBWoxuqX', 'zGOGeuJX'),
(537, 'XijNiKet', 'WScKuDAR'),
(538, 'vfwSHhMe', 'AaUdIhQf'),
(539, 'HxecummP', 'jvGDDKpv'),
(540, 'zoiiTkjt', 'ZfGQDRlp'),
(542, 'tYEPNrYo', 'VtnIiUwT'),
(543, 'NHmFxQTE', 'UzAXVMvB'),
(544, 'RyimGawb', 'JlnOYrJB'),
(545, 'rDxamxlt', 'iLhvfGkj'),
(546, 'TrWfyjxZ', 'XMwjhTja'),
(547, 'cjaiigHW', 'cpgzutBQ'),
(548, 'RNvdDkaN', 'Fvqcesdj'),
(549, 'RlrhVWRT', 'dAwQISlu'),
(550, 'GUroTkAg', 'xKFZlZfH'),
(552, 'XBhesPLD', 'zOOsjYvA'),
(553, 'TMwXqQCV', 'tCLunyHv'),
(554, 'owbiRGsA', 'DYeWwfvz'),
(555, 'hFvWKhZT', 'YntmoSfg'),
(556, 'mvwiyGSg', 'UsbHGlSH'),
(557, 'pVvyPXXL', 'wfxAEJIi'),
(558, 'vZOHhvNQ', 'SfuhOPnc'),
(559, 'RMtaUTTp', 'gDogUpGl'),
(560, 'BJfiBMJs', 'VOheScby'),
(562, 'YngxlNCV', 'eGdBXKHy'),
(563, 'OBlDVutF', 'IfoDlesc'),
(564, 'WKsmYddX', 'ubiGJmhk'),
(565, 'InlTUYYp', 'RDpwEEnD'),
(566, 'dBXnRlLz', 'cDTlDaGX'),
(567, 'QoLTRZTq', 'OPLyndAw'),
(568, 'rBAtxyTz', 'CiOYwIbs'),
(569, 'NNzAxfbf', 'oLitwAvR'),
(570, 'XSlrhrEx', 'JmSBjfmj'),
(572, 'cUJLnWai', 'JHoRGUMZ'),
(573, 'OScabbjh', 'ZVmDIBut'),
(574, 'JaWHUpRb', 'bYalEAZz'),
(575, 'XvmvNXlL', 'CZPsMWwM'),
(576, 'QuFwIjPh', 'bWwBfFqL'),
(577, 'RdJHyBxR', 'enUqxJxs'),
(578, 'PkUxgWQc', 'sAcwtaig'),
(579, 'YmYWNkxJ', 'TkbvaEce'),
(580, 'QlvLsXvW', 'tQfnWdgD'),
(582, 'veUzDbQd', 'OihVhnQy'),
(583, 'HEMeYMGp', 'gTZtoUDh'),
(584, 'qViLBJVS', 'pOmNuADJ'),
(585, 'bAkHhVAO', 'amgQJOwg'),
(586, 'ayVlmcqs', 'pfBpYzCh'),
(587, 'ngdqdqIZ', 'GYkHXacu'),
(588, 'DljOUWZz', 'eMOeoxur'),
(589, 'PaNkluXv', 'OIVTuWkg'),
(590, 'VcZGCTXt', 'MrbsonUw'),
(592, 'goOOApFi', 'JGYEJZyx'),
(593, 'locRPdXu', 'bQjSLoLp'),
(594, 'TqjHenpu', 'xksGXNcK'),
(595, 'YgKjVuvw', 'zwQQPrHs'),
(596, 'xmdCaqCo', 'WeZRAjCH'),
(597, 'EgZJnRty', 'QBhXtMCm'),
(598, 'CdEZdOze', 'qnAYpELT'),
(599, 'LmXcqDWt', 'RrkhQpkR'),
(600, 'phSQwqCS', 'aYckOmHn'),
(602, 'qHRwaMfo', 'aqmdazmS'),
(603, 'hntyacda', 'BSofEvOf'),
(604, 'FRDbvUZA', 'AbFJaOrL'),
(605, 'EjFWWCoi', 'tfruGUbg'),
(606, 'sSLNYlVy', 'uKuZLMLK'),
(607, 'woRhOyfs', 'MGbqgGuA'),
(608, 'RYGEUPUe', 'lXTzMXzr'),
(609, 'KFrfhLbq', 'gkeVtsyI'),
(610, 'exGEEEvV', 'GOadFXGZ'),
(612, 'mMfirXnX', 'yypantFg'),
(613, 'RMywTkXT', 'tFCrWdWl'),
(614, 'rcWtESVn', 'JAOjhien'),
(615, 'mFuacwSo', 'hOhRXeyS'),
(616, 'WvTHtURW', 'jJTiVaTP'),
(617, 'BnoMwhRT', 'fIFXfZiT'),
(618, 'nOdnILdI', 'EVISVfzn'),
(619, 'yqZywEQc', 'OjnZTHbN'),
(620, 'pYTOjqnH', 'WlsJOaWd'),
(622, 'efqGFhVO', 'cScSxQry'),
(623, 'sSGNTlMk', 'UnLxIaOX'),
(624, 'ndjnwSGn', 'PFCTWVrC'),
(625, 'FEUpeaJr', 'VwBcPwiK'),
(626, 'YTNJieDK', 'SafYYxIV'),
(627, 'eWwALRuz', 'yBwceesU'),
(628, 'yyJHcetZ', 'wlzEpYdR'),
(629, 'qbjCsPbV', 'WfxLTvgO'),
(630, 'pocgHOSt', 'TgsQmjDz'),
(632, 'oNGXItGE', 'zNNTBRCM'),
(633, 'ZtrEZTUX', 'CFveSfoR'),
(634, 'sjWiBcso', 'oFsiSfMO'),
(635, 'BHugEauJ', 'VOZQxYfS'),
(636, 'HegzmhxX', 'ZSeQfyMu'),
(637, 'YsBSCHFp', 'BPbgKPNV'),
(638, 'nxBSMAzG', 'pIhFOZTN'),
(639, 'dmHptUQy', 'PHjdiHQX'),
(640, 'oNBEqhMx', 'yWZXrJpa');

-- --------------------------------------------------------

--
-- Структура таблицы `company_comments`
--

CREATE TABLE IF NOT EXISTS `company_comments` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `images`
--

INSERT IGNORE INTO `images` (`id`, `url`) VALUES
(135, 'oblDFTSj'),
(137, 'RyuPBZWj'),
(156, 'USOFiUqr'),
(157, 'SkJoKThs');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `image_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `news`
--

INSERT IGNORE INTO `news` (`id`, `name`, `description`, `image_id`) VALUES
(86, 'eiOFlwCl', 'ofySizJY', '1,2,3,4'),
(88, 'irmQaLWJ', 'euiuGlKY', '1,2,3,4'),
(90, 'HiARlPEA', 'mSvcdSAl', '1,2,3,4'),
(92, 'PjyDRevG', 'DJjNFwXY', '1,2,3,4'),
(94, 'fSvXGVvf', 'gsXjfnWL', '1,2,3,4'),
(113, 'cLPpEHzJ', 'BFpehrQK', '1,2,3,4'),
(114, 'LqpHLCXu', 'ggLjRoyi', '1,2,3,4');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `orders`
--

INSERT IGNORE INTO `orders` (`id`, `user_id`, `date`, `total_price`) VALUES
(6, 344, '2024-09-01 21:30:03', 843855),
(8, 348, '2024-09-01 21:30:04', 494715),
(10, 353, '2024-09-01 21:31:16', 961134),
(12, 357, '2024-09-01 21:31:17', 105986),
(14, 362, '2024-09-01 22:03:17', 345594),
(16, 367, '2024-09-01 22:03:18', 586398),
(18, 373, '2024-09-01 22:04:53', 887510),
(20, 378, '2024-09-01 22:04:54', 66781),
(22, 384, '2024-09-01 22:06:15', 3765),
(24, 389, '2024-09-01 22:06:16', 494572),
(26, 395, '2024-09-01 22:08:08', 4454),
(28, 400, '2024-09-01 22:08:09', 255624),
(30, 406, '2024-09-01 22:08:52', 153837),
(32, 411, '2024-09-01 22:08:53', 941522),
(34, 417, '2024-09-01 22:23:51', 726531),
(36, 422, '2024-09-01 22:23:52', 871273),
(38, 428, '2024-09-01 22:26:16', 351353),
(40, 433, '2024-09-01 22:26:17', 328533),
(42, 439, '2024-09-01 22:28:35', 714337),
(44, 445, '2024-09-01 22:28:36', 418356),
(46, 452, '2024-09-01 22:29:31', 353994),
(48, 458, '2024-09-01 22:29:32', 445557),
(50, 465, '2024-09-01 22:39:15', 535564),
(52, 471, '2024-09-01 22:39:16', 258180),
(54, 478, '2024-09-01 22:53:51', 781746),
(56, 484, '2024-09-01 22:53:52', 574717),
(58, 491, '2024-09-01 23:10:22', 494114),
(60, 497, '2024-09-01 23:10:23', 72375),
(62, 504, '2024-09-01 23:12:08', 544983),
(64, 510, '2024-09-01 23:12:08', 999208),
(66, 517, '2024-09-01 23:14:55', 455213),
(68, 523, '2024-09-01 23:14:56', 453351),
(70, 530, '2024-09-01 23:17:12', 332284),
(72, 537, '2024-09-01 23:17:13', 546175),
(74, 545, '2024-09-01 23:23:05', 207886),
(76, 552, '2024-09-01 23:23:06', 675320),
(78, 560, '2024-09-01 23:24:29', 770382),
(80, 567, '2024-09-01 23:24:30', 8610),
(82, 575, '2024-09-01 23:26:56', 726348),
(84, 582, '2024-09-01 23:26:57', 704645),
(86, 590, '2024-09-01 23:27:55', 74309),
(88, 597, '2024-09-01 23:27:56', 415398),
(90, 605, '2024-09-01 23:30:06', 723159),
(92, 612, '2024-09-01 23:30:07', 604050);

-- --------------------------------------------------------

--
-- Структура таблицы `order_products`
--

CREATE TABLE IF NOT EXISTS `order_products` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `category_id` int(11) NOT NULL,
  `promotion_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `products`
--

INSERT IGNORE INTO `products` (`id`, `name`, `price`, `description`, `category_id`, `promotion_id`, `company_id`, `image_id`) VALUES
(2, 'ozGtoiNf', '594233.00', 'ylvEeDgX', 209, 254, 208, '1,2,3,4'),
(4, 'GeFHQHAg', '154584.00', 'KuYlaWTf', 213, 258, 212, '1,2,3,4'),
(6, 'dblkGVAA', '55667.00', 'PVVYGDcO', 217, 262, 216, '1,2,3,4'),
(8, 'JLuPuqHg', '180719.00', 'rbNGnAFQ', 221, 266, 220, '1,2,3,4'),
(10, 'iDyQrLGH', '422435.00', 'UcserAaA', 225, 270, 224, '1,2,3,4'),
(12, 'tIDQwBSF', '245451.00', 'VatbMFFp', 229, 274, 228, '1,2,3,4'),
(16, 'fcgkZrjN', '413388.00', 'WZpQhFUL', 236, 281, 235, '1,2,3,4'),
(18, 'LJPRWaVX', '54920.00', 'QMJueEYH', 239, 284, 238, '1,2,3,4'),
(20, 'LwtoHsPW', '256260.00', 'VWfkTajR', 242, 287, 241, '1,2,3,4'),
(22, 'JAYnTfGp', '687255.00', 'jtDmISNR', 245, 290, 244, '1,2,3,4'),
(24, 'BvBoftal', '553491.00', 'HjEGtZaF', 248, 293, 247, '1,2,3,4'),
(25, 'hyWlWVri', '859739.00', 'rXjkZvmW', 249, 294, 248, '1,2,3,4'),
(27, 'IhOISbfT', '105071.00', 'ChJMYVxt', 252, 297, 251, '1,2,3,4'),
(28, 'GcpBOzTg', '954480.00', 'nZYjGFvl', 253, 298, 252, '1,2,3,4'),
(30, 'JKkQJKtB', '863971.00', 'yCSFqxdA', 256, 301, 255, '1,2,3,4'),
(31, 'BjWgNout', '329109.00', 'vHSdmEOn', 257, 302, 256, '1,2,3,4'),
(33, 'rkLwejPC', '680093.00', 'hGzCbtiw', 260, 305, 259, '1,2,3,4'),
(34, 'zkcLMvRG', '254284.00', 'xVXkuPSa', 261, 306, 260, '1,2,3,4'),
(36, 'IJpOayTh', '181955.00', 'ujXLQzQq', 264, 309, 263, '1,2,3,4'),
(37, 'NekgoATD', '2288.00', 'cAKrSuFo', 265, 310, 264, '1,2,3,4'),
(39, 'ZOmQVKvP', '891910.00', 'zlcDEzaO', 268, 313, 267, '1,2,3,4'),
(40, 'KLLOHzws', '773214.00', 'KxbnWbUW', 269, 314, 268, '1,2,3,4'),
(42, 'tJYaBcCa', '42719.00', 'LxpHVeAg', 272, 317, 271, '1,2,3,4'),
(43, 'uOzrGbTG', '320156.00', 'eljLBazn', 273, 318, 272, '1,2,3,4'),
(45, 'JaLWJyos', '185523.00', 'UcQneBFi', 276, 321, 275, '1,2,3,4'),
(46, 'zHYozOsa', '291622.00', 'kxZTMLik', 277, 322, 276, '1,2,3,4'),
(48, 'TIBwIquN', '332437.00', 'fzOjVbsJ', 280, 325, 279, '1,2,3,4'),
(49, 'FNOAxixH', '426199.00', 'nVsXnPPf', 281, 326, 280, '1,2,3,4'),
(51, 'DCKfOPFP', '867050.00', 'uUwPsuBJ', 284, 329, 283, '1,2,3,4'),
(52, 'VKeeNEQW', '570.00', 'lPIuriDX', 285, 330, 284, '1,2,3,4'),
(54, 'FOXVvYij', '774397.00', 'CbAjKRGh', 288, 333, 287, '1,2,3,4'),
(55, 'LqwGUUIH', '26805.00', 'hAFmZfhA', 289, 334, 288, '1,2,3,4'),
(57, 'vswykVqr', '346635.00', 'mnFmLypY', 292, 337, 291, '1,2,3,4'),
(58, 'oSJdFIQR', '13863.00', 'nfdGHimE', 293, 338, 292, '1,2,3,4'),
(60, 'nNATWDBk', '793921.00', 'LebarcuU', 298, 343, 297, '1,2,3,4'),
(61, 'oKQbViiD', '459017.00', 'fQsCyXYN', 299, 344, 298, '1,2,3,4'),
(63, 'FJAKGpAt', '777011.00', 'eNpnllAk', 302, 347, 301, '1,2,3,4'),
(64, 'giXmXqsr', '507220.00', 'LOrslBhh', 303, 348, 302, '1,2,3,4'),
(66, 'XyjKMMAf', '223566.00', 'kkYEsRPB', 306, 351, 305, '1,2,3,4'),
(67, 'ECaYUIGu', '611439.00', 'qCcqkZuP', 307, 352, 306, '1,2,3,4'),
(68, 'LbSfTAQq', '166267.00', 'JWZEDhXs', 308, 353, 307, '1,2,3,4'),
(70, 'uitvYgpb', '755423.00', 'VSMDuORO', 311, 356, 310, '1,2,3,4'),
(71, 'egSTRIQQ', '108133.00', 'BXTwQADY', 312, 357, 311, '1,2,3,4'),
(72, 'SOubfAbR', '811470.00', 'sECjeDLd', 313, 358, 312, '1,2,3,4'),
(74, 'TrnVnigu', '538054.00', 'CzatuUWs', 316, 361, 315, '1,2,3,4'),
(75, 'BXwVoWxW', '566990.00', 'gwlbgoPL', 317, 362, 316, '1,2,3,4'),
(76, 'ROXeTDvl', '976668.00', 'RpvgYLOv', 318, 363, 317, '1,2,3,4'),
(78, 'kTTetlMY', '665319.00', 'pKwwZCgV', 321, 366, 320, '1,2,3,4'),
(79, 'NSIRMxKd', '535311.00', 'IkqFUyVB', 322, 367, 321, '1,2,3,4'),
(80, 'MqbKvQYD', '698762.00', 'WKgiRuQz', 323, 368, 322, '1,2,3,4'),
(82, 'NcXZPzSg', '505283.00', 'YXSxjNCM', 326, 371, 325, '1,2,3,4'),
(83, 'iyyonIOh', '885262.00', 'DTJqYCfh', 327, 372, 326, '1,2,3,4'),
(84, 'tPlDKwzK', '892494.00', 'ecXGxNLf', 328, 373, 327, '1,2,3,4'),
(85, 'KyiqYXuX', '396099.00', 'AsHZApoB', 329, 374, 328, '1,2,3,4'),
(87, 'AJzjYQhl', '503928.00', 'xovWsyJV', 332, 377, 331, '1,2,3,4'),
(88, 'wMVaDCVq', '993091.00', 'OjzxeKcO', 333, 378, 332, '1,2,3,4'),
(89, 'PPdemsnL', '7342.00', 'kwvaQYxh', 334, 379, 333, '1,2,3,4'),
(90, 'MUvgGGzl', '870990.00', 'WKzqnOyo', 335, 380, 334, '1,2,3,4'),
(92, 'GyYxXPUh', '44404.00', 'DiBPJzxX', 338, 383, 337, '1,2,3,4'),
(93, 'xDVNHSAZ', '897346.00', 'bhCOeZOe', 339, 384, 338, '1,2,3,4'),
(94, 'vhiwUtHw', '185059.00', 'MFvmZaaJ', 340, 385, 339, '1,2,3,4'),
(95, 'ObnzNqAk', '429196.00', 'mYtCCTzQ', 341, 386, 340, '1,2,3,4'),
(97, 'eQAbakAO', '745206.00', 'JzxnuwxP', 344, 389, 343, '1,2,3,4'),
(98, 'gQiXpfZw', '742511.00', 'YjCdUNBx', 345, 390, 344, '1,2,3,4'),
(99, 'zjKFOGSv', '315351.00', 'qeBzBmKP', 346, 391, 345, '1,2,3,4'),
(100, 'bXEfFUJZ', '408179.00', 'bIWpxQyX', 347, 392, 346, '1,2,3,4'),
(102, 'TuKZfmKD', '205958.00', 'WJvBYeRH', 350, 395, 349, '1,2,3,4'),
(103, 'eKGRaDqS', '388591.00', 'msbizxcs', 351, 396, 350, '1,2,3,4'),
(104, 'tcODBvJL', '647905.00', 'AhWMwKvy', 352, 397, 351, '1,2,3,4'),
(105, 'BgEsGLqk', '130165.00', 'OWiOCtzD', 353, 398, 352, '1,2,3,4'),
(107, 'DiVRVNTz', '662730.00', 'jskGxbqS', 356, 401, 355, '1,2,3,4'),
(108, 'rLgGFOcm', '186394.00', 'BGjEXCJB', 357, 402, 356, '1,2,3,4'),
(109, 'xQgHOUxR', '264609.00', 'XbcaUEpd', 358, 403, 357, '1,2,3,4'),
(110, 'fGwMlPZQ', '759437.00', 'OestycOG', 359, 404, 358, '1,2,3,4'),
(112, 'YKrvPTGs', '147816.00', 'AQAWwqFv', 362, 407, 361, '1,2,3,4'),
(113, 'emMvVDWJ', '330879.00', 'syycWhXD', 363, 408, 362, '1,2,3,4'),
(114, 'rhZwfdQd', '443399.00', 'vuJtKSbR', 364, 409, 363, '1,2,3,4'),
(115, 'yazPhZHQ', '853694.00', 'MCRiukxC', 365, 410, 364, '1,2,3,4'),
(117, 'iFISTVvc', '933550.00', 'gVOzqyYw', 368, 413, 367, '1,2,3,4'),
(118, 'sacDXVVU', '975726.00', 'tlQNxNAC', 369, 414, 368, '1,2,3,4'),
(119, 'uuhwkWAu', '289989.00', 'qsgEXNuI', 370, 415, 369, '1,2,3,4'),
(120, 'REvlRkTa', '22750.00', 'sAGLYlkU', 371, 416, 370, '1,2,3,4'),
(122, 'gAwFVkwG', '352609.00', 'cPwJCzPb', 374, 419, 373, '1,2,3,4'),
(123, 'AHaHFeZq', '164819.00', 'XXmJZkZG', 375, 420, 374, '1,2,3,4'),
(124, 'WhZWwtCD', '132834.00', 'KWxCeLKn', 376, 421, 375, '1,2,3,4'),
(125, 'JibtMhGo', '756374.00', 'pgsLOJUI', 377, 422, 376, '1,2,3,4'),
(127, 'IVRkxLzL', '555495.00', 'aRgFBtIN', 380, 425, 379, '1,2,3,4'),
(128, 'ppMMOvjQ', '787026.00', 'nXvUKotQ', 381, 426, 380, '1,2,3,4'),
(129, 'DrhpIbEh', '717029.00', 'tXiHFHFb', 382, 427, 381, '1,2,3,4'),
(130, 'kFzMwvuq', '339362.00', 'EmseZPwO', 383, 428, 382, '1,2,3,4'),
(132, 'MzKNWyYX', '979438.00', 'FuTkcaAG', 386, 431, 385, '1,2,3,4'),
(133, 'mGqvOPVW', '662749.00', 'ytuKMjFh', 387, 432, 386, '1,2,3,4'),
(134, 'wEGgwZpQ', '38103.00', 'xkmGLfop', 388, 433, 387, '1,2,3,4'),
(135, 'ZBZSsCfN', '273983.00', 'WRatYuim', 389, 434, 388, '1,2,3,4'),
(137, 'tIYnNyKl', '710551.00', 'KPvYzNWy', 392, 437, 391, '1,2,3,4'),
(138, 'Qffsvogo', '520897.00', 'zfnBlJMe', 393, 438, 392, '1,2,3,4'),
(139, 'tveusRdG', '305486.00', 'yCnHlZFo', 394, 439, 393, '1,2,3,4'),
(140, 'TDXanZCM', '226459.00', 'wnGqvBdR', 395, 440, 394, '1,2,3,4'),
(142, 'ecLzCgFy', '530552.00', 'TSSBSWtd', 398, 443, 397, '1,2,3,4'),
(143, 'iswYmtxv', '326132.00', 'HGnHlSHP', 399, 444, 398, '1,2,3,4'),
(144, 'qZkBcqfl', '935503.00', 'GcmknrLa', 400, 445, 399, '1,2,3,4'),
(145, 'cUmmoqcP', '901648.00', 'DVDsoXgo', 401, 446, 400, '1,2,3,4'),
(147, 'twnxqqHX', '642671.00', 'ygPIBFoq', 404, 449, 403, '1,2,3,4'),
(148, 'DbLGlPUP', '794927.00', 'yyocAQWt', 405, 450, 404, '1,2,3,4'),
(149, 'kUJoqAzR', '330602.00', 'bsysMKHO', 406, 451, 405, '1,2,3,4'),
(150, 'HTdrTHOA', '78933.00', 'FXhveOxL', 407, 452, 406, '1,2,3,4'),
(152, 'eOTkaCRf', '896574.00', 'dowGhjFd', 410, 455, 409, '1,2,3,4'),
(153, 'TzVgXNFK', '432644.00', 'xXaHmRlN', 411, 456, 410, '1,2,3,4'),
(154, 'etQkgJLV', '928217.00', 'qccJssVr', 412, 457, 411, '1,2,3,4'),
(155, 'EiCWpguN', '156510.00', 'gWtmJmlW', 413, 458, 412, '1,2,3,4'),
(157, 'SiVRydYw', '824469.00', 'WWxwjdiv', 416, 461, 416, '1,2,3,4'),
(158, 'CUWkDUEU', '766201.00', 'enHTAugS', 417, 462, 417, '1,2,3,4'),
(159, 'XaXJLJtj', '837097.00', 'olZLawRw', 418, 463, 418, '1,2,3,4'),
(160, 'MaVDtGcx', '596628.00', 'TbUTiydv', 419, 464, 419, '1,2,3,4'),
(162, 'nsovWrxH', '362462.00', 'wRBsJHGc', 422, 467, 423, '1,2,3,4'),
(163, 'qQvriVEB', '718358.00', 'foYAnYWs', 423, 468, 424, '1,2,3,4'),
(164, 'TYcSrHMP', '837026.00', 'ToJZRtox', 424, 469, 425, '1,2,3,4'),
(165, 'yjExVUEl', '950263.00', 'vsOZIkmD', 425, 470, 426, '1,2,3,4'),
(167, 'JacCrmTe', '977135.00', 'eLFbrwLv', 428, 473, 430, '1,2,3,4'),
(168, 'zfyqzbEg', '751393.00', 'YKmgxMtD', 429, 474, 431, '1,2,3,4'),
(169, 'MLrMQaIi', '428206.00', 'IEmmmABr', 430, 475, 432, '1,2,3,4'),
(170, 'QsVVEPOl', '15305.00', 'EamnpxAj', 431, 476, 433, '1,2,3,4'),
(172, 'gfZIHgnH', '55366.00', 'FjGLatmt', 434, 479, 437, '1,2,3,4'),
(173, 'LrRaYVmY', '653926.00', 'NOqzAYuC', 435, 480, 438, '1,2,3,4'),
(174, 'zPqdvnPL', '55896.00', 'eBYHTgkp', 436, 481, 439, '1,2,3,4'),
(175, 'kuUJYTlm', '335758.00', 'ZpvNdaaR', 437, 482, 440, '1,2,3,4'),
(177, 'iMzIqrkV', '282190.00', 'MUWMDsVv', 440, 485, 444, '1,2,3,4'),
(178, 'TXHRiMOH', '868179.00', 'AfUypoCR', 441, 486, 445, '1,2,3,4'),
(179, 'vzcIcMGB', '194743.00', 'giVYeMga', 442, 487, 446, '1,2,3,4'),
(180, 'drEmlQsh', '315574.00', 'huvRrWAF', 443, 488, 447, '1,2,3,4'),
(182, 'BaxZLXlC', '408082.00', 'TQebGIew', 446, 491, 451, '1,2,3,4'),
(183, 'LtKOnKMN', '507823.00', 'ISkDIMnq', 447, 492, 452, '1,2,3,4'),
(184, 'IPSvSvcB', '735610.00', 'OuQduCDn', 448, 493, 453, '1,2,3,4'),
(185, 'gPPEnSXo', '165869.00', 'DbPjakzF', 449, 494, 454, '1,2,3,4'),
(187, 'XbihCDIU', '365122.00', 'dgVKWcvr', 452, 497, 458, '1,2,3,4'),
(188, 'lunLEock', '616247.00', 'zquHCnXa', 453, 498, 459, '1,2,3,4'),
(189, 'KTxEPsjs', '903471.00', 'rMHPhBdi', 454, 499, 460, '1,2,3,4'),
(190, 'sEAqkqqC', '153651.00', 'ZcnhcavH', 455, 500, 461, '1,2,3,4'),
(192, 'gzEpXcJu', '413355.00', 'hrNxFAaT', 458, 503, 465, '1,2,3,4'),
(193, 'bLTFvFHV', '314076.00', 'ekOBtRol', 459, 504, 466, '1,2,3,4'),
(194, 'IAxMmXEf', '287662.00', 'yrhBFhrj', 460, 505, 467, '1,2,3,4'),
(195, 'fwnPOCph', '700625.00', 'TOsITsBQ', 461, 506, 468, '1,2,3,4'),
(196, 'IlzaQQLq', '696961.00', 'GROgMAQN', 462, 507, 471, '1,2,3,4'),
(198, 'txkNpsjj', '513770.00', 'MDIMpCKb', 465, 510, 474, '1,2,3,4'),
(199, 'oKqfWOjZ', '198210.00', 'WwzTJBct', 466, 511, 475, '1,2,3,4'),
(200, 'yjtlXHDY', '683298.00', 'OFXvexzr', 467, 512, 476, '1,2,3,4'),
(201, 'ElJFISsY', '220603.00', 'wGVOCSBt', 468, 513, 477, '1,2,3,4'),
(202, 'OTfmFpuY', '866498.00', 'OswTYSTh', 469, 514, 480, '1,2,3,4'),
(204, 'QMWtqBhx', '283376.00', 'pxcXuQKQ', 472, 517, 483, '1,2,3,4'),
(205, 'WSnVFWza', '789239.00', 'uIrIOBUZ', 473, 518, 484, '1,2,3,4'),
(206, 'JoMCoppk', '671977.00', 'lEYHBxJY', 474, 519, 485, '1,2,3,4'),
(207, 'JWufIulJ', '752162.00', 'VMGsvHDn', 475, 520, 486, '1,2,3,4'),
(208, 'YhvNMNft', '113952.00', 'ybxfoSXf', 476, 521, 489, '1,2,3,4'),
(209, 'lQpHaimx', '229049.00', 'PKxCZjrq', 477, 522, 490, '1,2,3,4'),
(211, 'VDHXDNXw', '464436.00', 'tHwZmKjx', 480, 525, 493, '1,2,3,4'),
(212, 'XxAPvojh', '566934.00', 'rolUwHAd', 481, 526, 494, '1,2,3,4'),
(213, 'gUTecAuM', '382700.00', 'yXBCAuKU', 482, 527, 495, '1,2,3,4'),
(214, 'FyNXJEBs', '608458.00', 'oXtXkokB', 483, 528, 496, '1,2,3,4'),
(215, 'SyGJvbqc', '502000.00', 'ugilUzrd', 484, 529, 499, '1,2,3,4'),
(216, 'XGkYwotD', '312238.00', 'QhHUjPWd', 485, 530, 500, '1,2,3,4'),
(218, 'AclFGRaF', '389414.00', 'AtPFUdtJ', 488, 533, 503, '1,2,3,4'),
(219, 'WwksGsIB', '803500.00', 'HrVRsuPF', 489, 534, 504, '1,2,3,4'),
(220, 'UEBPtURe', '835967.00', 'CRqFyLcW', 490, 535, 505, '1,2,3,4'),
(221, 'HkNwrqxN', '655746.00', 'MkugkPDW', 491, 536, 506, '1,2,3,4'),
(222, 'JuHnAgsf', '788917.00', 'enxQhQvA', 492, 537, 509, '1,2,3,4'),
(223, 'oUqihDHb', '650472.00', 'RdCimFUc', 493, 538, 510, '1,2,3,4'),
(225, 'KvRwvnFb', '952669.00', 'CaPHfgHw', 496, 541, 513, '1,2,3,4'),
(226, 'IzufWxBw', '527389.00', 'jXOQHXil', 497, 542, 514, '1,2,3,4'),
(227, 'LThiORhn', '952525.00', 'GMLMKCnr', 498, 543, 515, '1,2,3,4'),
(228, 'TUCSOvEK', '531374.00', 'JTQsRfVl', 499, 544, 516, '1,2,3,4'),
(229, 'UhWoVTxn', '771420.00', 'YvRfmwFI', 500, 545, 519, '1,2,3,4'),
(230, 'YknPHcPd', '326506.00', 'palgpQSS', 501, 546, 520, '1,2,3,4'),
(232, 'UXjdTXFT', '852124.00', 'vMYIRVCv', 504, 549, 523, '1,2,3,4'),
(233, 'kGloVGlP', '746794.00', 'JGotAZxE', 505, 550, 524, '1,2,3,4'),
(234, 'vdcrHnsM', '16638.00', 'lzpCnYkt', 506, 551, 525, '1,2,3,4'),
(235, 'CssgXrUm', '720954.00', 'yFDhNScE', 507, 552, 526, '1,2,3,4'),
(236, 'OdcHkQMS', '596596.00', 'zrewYOIz', 508, 553, 529, '1,2,3,4'),
(237, 'iXToxKkT', '797818.00', 'thxZLHho', 509, 554, 530, '1,2,3,4'),
(239, 'GekqAsEC', '440.00', 'lipFlHwH', 512, 557, 533, '1,2,3,4'),
(240, 'OoubKdBH', '375762.00', 'IdCUlPpY', 513, 558, 534, '1,2,3,4'),
(241, 'XHECHeCq', '632866.00', 'WpSMoQhU', 514, 559, 535, '1,2,3,4'),
(242, 'qgHPtREr', '176655.00', 'DgLcjLuN', 515, 560, 536, '1,2,3,4'),
(243, 'KePsubfN', '726467.00', 'TPNxmRfP', 516, 561, 539, '1,2,3,4'),
(244, 'ZmgdVnQi', '985389.00', 'qQVpnNst', 517, 562, 540, '1,2,3,4'),
(246, 'WYtsETel', '826608.00', 'zmHhARre', 520, 565, 543, '1,2,3,4'),
(247, 'IUsIResY', '551776.00', 'ZgJKueSd', 521, 566, 544, '1,2,3,4'),
(248, 'KHKMqJhi', '176078.00', 'KdozjFsH', 522, 567, 545, '1,2,3,4'),
(249, 'CeoaJDwJ', '268597.00', 'OeedsRcd', 523, 568, 546, '1,2,3,4'),
(250, 'EGArolml', '294777.00', 'seLRiLaN', 524, 569, 549, '1,2,3,4'),
(251, 'WRJlZRkd', '803039.00', 'YyTLVYbb', 525, 570, 550, '1,2,3,4'),
(253, 'ceSAAzdC', '307585.00', 'UnjgDKMG', 528, 573, 553, '1,2,3,4'),
(254, 'mPRpYljB', '821570.00', 'YCsMjvpI', 529, 574, 554, '1,2,3,4'),
(255, 'GEYDjnsM', '834758.00', 'YBYtRriz', 530, 575, 555, '1,2,3,4'),
(256, 'nbYTGjCQ', '131205.00', 'VuEMvhPZ', 531, 576, 556, '1,2,3,4'),
(257, 'boeTYXHm', '481326.00', 'BUmCYpnd', 532, 577, 559, '1,2,3,4'),
(258, 'RpPFNOas', '372634.00', 'dPEEbJhk', 533, 578, 560, '1,2,3,4'),
(260, 'mkpLdnTG', '132146.00', 'KbqwOrbo', 536, 581, 563, '1,2,3,4'),
(261, 'bRuazvVB', '358564.00', 'IWgNgUjg', 537, 582, 564, '1,2,3,4'),
(262, 'zCiFevco', '670417.00', 'uoKNJRBu', 538, 583, 565, '1,2,3,4'),
(263, 'swcXEgBV', '532762.00', 'niUisIbF', 539, 584, 566, '1,2,3,4'),
(264, 'TKPUBKdn', '31103.00', 'AvPkqFHp', 540, 585, 569, '1,2,3,4'),
(265, 'EiqYAQUK', '43237.00', 'aKofzNfq', 541, 586, 570, '1,2,3,4'),
(267, 'mTimEDdc', '206003.00', 'tRbvUoBD', 544, 589, 573, '1,2,3,4'),
(268, 'syiScamg', '609842.00', 'nsHKCKII', 545, 590, 574, '1,2,3,4'),
(269, 'dFkthLPr', '609149.00', 'fLtDLmeD', 546, 591, 575, '1,2,3,4'),
(270, 'MkNueZtY', '344998.00', 'zzraccHh', 547, 592, 576, '1,2,3,4'),
(271, 'JeZhpSIZ', '201820.00', 'bXZJBPSA', 548, 593, 579, '1,2,3,4'),
(272, 'hgNVPctV', '562413.00', 'hNuVDkmR', 549, 594, 580, '1,2,3,4'),
(274, 'BvvRHXlP', '258324.00', 'jKeUImUe', 552, 597, 583, '1,2,3,4'),
(275, 'lpHQewGH', '324255.00', 'EHyAMEIX', 553, 598, 584, '1,2,3,4'),
(276, 'sBgkPqAr', '315764.00', 'GyOImXSg', 554, 599, 585, '1,2,3,4'),
(277, 'HOtSKHSa', '902261.00', 'zhUDOAQU', 555, 600, 586, '1,2,3,4'),
(278, 'kzSxyvUM', '742127.00', 'dbEJpIma', 556, 601, 589, '1,2,3,4'),
(279, 'bLGhfpsI', '310334.00', 'HGNlULRa', 557, 602, 590, '1,2,3,4'),
(281, 'IIsATVqJ', '762897.00', 'DnJprJxG', 560, 605, 593, '1,2,3,4'),
(282, 'tCINOWKZ', '455269.00', 'mZazoSLU', 561, 606, 594, '1,2,3,4'),
(283, 'ZjEhRQWb', '129642.00', 'zOrAWhFQ', 562, 607, 595, '1,2,3,4'),
(284, 'WoWULMVr', '634157.00', 'rPASwTOe', 563, 608, 596, '1,2,3,4'),
(285, 'SirlyVeM', '373909.00', 'sOXXEqCG', 564, 609, 599, '1,2,3,4'),
(286, 'buPfVSeH', '341372.00', 'bThCAEdq', 565, 610, 600, '1,2,3,4'),
(288, 'DoRyNNLF', '852361.00', 'HxJpZnBz', 568, 613, 603, '1,2,3,4'),
(289, 'XswxxMnu', '264403.00', 'hgvmiwvu', 569, 614, 604, '1,2,3,4'),
(290, 'bxLuCCSR', '243757.00', 'KJCUvTCi', 570, 615, 605, '1,2,3,4'),
(291, 'DQjkXHwK', '967168.00', 'clWYOPBZ', 571, 616, 606, '1,2,3,4'),
(292, 'mvgBQQcA', '285194.00', 'EVTdiMUi', 572, 617, 609, '1,2,3,4'),
(293, 'SawNybMS', '187357.00', 'wFaAFmYo', 573, 618, 610, '1,2,3,4'),
(295, 'fenIpATo', '291179.00', 'YvtvhlDA', 576, 621, 613, '1,2,3,4'),
(296, 'vdtQatiI', '255473.00', 'rcNaCGJp', 577, 622, 614, '1,2,3,4'),
(297, 'qkmQMVZU', '425798.00', 'yDtEWNXD', 578, 623, 615, '1,2,3,4'),
(298, 'HUQZxoXl', '972156.00', 'xbWPwZYh', 579, 624, 616, '1,2,3,4'),
(299, 'iekYYJOh', '960761.00', 'AbPXWaQH', 580, 625, 619, '1,2,3,4'),
(300, 'TnuAONHN', '413251.00', 'LRyMikBf', 581, 626, 620, '1,2,3,4'),
(302, 'oVXumpiq', '846507.00', 'ClwYUrFO', 584, 629, 623, '1,2,3,4'),
(303, 'mRAokueQ', '715170.00', 'EDuppVtD', 585, 630, 624, '1,2,3,4'),
(304, 'GzAvAofg', '367376.00', 'gHhubOZV', 586, 631, 625, '1,2,3,4'),
(305, 'uAZImqXl', '298793.00', 'fzxkqvMm', 587, 632, 626, '1,2,3,4'),
(306, 'urqcifxB', '283949.00', 'TdwzjNUc', 588, 633, 629, '1,2,3,4'),
(307, 'VwWRydXS', '579078.00', 'mOJDfyVn', 589, 634, 630, '1,2,3,4'),
(309, 'asuOWQFs', '544149.00', 'aCAKkwin', 592, 637, 633, '1,2,3,4'),
(310, 'mewlOoov', '189908.00', 'xGytiTAy', 593, 638, 634, '1,2,3,4'),
(311, 'OUNxEnzI', '239412.00', 'WoAOHSSz', 594, 639, 635, '1,2,3,4'),
(312, 'qUsHVuSZ', '487410.00', 'RRpHVBek', 595, 640, 636, '1,2,3,4'),
(313, 'BRxtYoxa', '186858.00', 'tgUmryKO', 596, 641, 639, '1,2,3,4'),
(314, 'RCXCbuzq', '345117.00', 'WqRiWsIL', 597, 642, 640, '1,2,3,4'),
(315, 'test', '1000.00', 'Дизайнерская обувь дольчигабиба', 171, 216, 170, '214,215');

-- --------------------------------------------------------

--
-- Структура таблицы `product_characteristics`
--

CREATE TABLE IF NOT EXISTS `product_characteristics` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `characteristic_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `product_characteristics`
--

INSERT IGNORE INTO `product_characteristics` (`id`, `product_id`, `characteristic_id`, `value`) VALUES
(1, 25, 111, 'qRXZmJlM'),
(2, 28, 113, 'HlQWnBYq');

-- --------------------------------------------------------

--
-- Структура таблицы `product_comments`
--

CREATE TABLE IF NOT EXISTS `product_comments` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `product_comments`
--

INSERT IGNORE INTO `product_comments` (`id`, `product_id`, `user_id`, `comment`, `created_at`, `image_id`) VALUES
(1, 95, 374, 'SlBjCMcD', '2024-09-01 22:04:53', '1,2,3,4'),
(2, 100, 379, 'ilJJjwcZ', '2024-09-01 22:04:54', '1,2,3,4'),
(3, 105, 385, 'gKhpVvcg', '2024-09-01 22:06:15', '1,2,3,4'),
(4, 110, 390, 'nOTuCwHj', '2024-09-01 22:06:16', '1,2,3,4'),
(5, 115, 396, 'IMFqcERQ', '2024-09-01 22:08:08', '1,2,3,4'),
(6, 120, 401, 'xiWZDcUD', '2024-09-01 22:08:09', '1,2,3,4');

-- --------------------------------------------------------

--
-- Структура таблицы `promotions`
--

CREATE TABLE IF NOT EXISTS `promotions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `promotions`
--

INSERT IGNORE INTO `promotions` (`id`, `name`, `quantity`, `sale`) VALUES
(216, 'PpBXGVNH', 933248, 348770),
(218, 'jCjBCtuq', 174908, 568153),
(220, 'zFrgIyJK', 996445, 65477),
(222, 'mqynIKOe', 354483, 753360),
(224, 'QDUkmdDP', 448121, 238350),
(226, 'ZFOWULAJ', 355997, 969260),
(228, 'CaGBLmHq', 17594, 166956),
(230, 'oPUPfpWc', 609218, 867083),
(232, 'UrDhpBCS', 586024, 822924),
(234, 'QGgrcoDB', 677881, 221120),
(236, 'OtyLioAN', 59511, 397388),
(238, 'hJrleTPa', 465554, 950473),
(240, 'OpmJuvHp', 311971, 536525),
(242, 'OWDxgmVd', 446596, 114043),
(244, 'KFqNYgwK', 724004, 365188),
(246, 'RUkONRDU', 984034, 894123),
(248, 'WmMYVozk', 139407, 944442),
(250, 'KCXbtLjS', 29775, 880412),
(252, 'ZBrzmcgT', 374740, 945012),
(254, 'JHGhXrPa', 413599, 585392),
(256, 'XZSiqvUi', 511830, 936624),
(257, 'ySrtvRpy', 88687, 655870),
(258, 'bZuwOIUj', 626918, 217477),
(260, 'XqniFNOF', 795387, 870728),
(261, 'ZxreHWDq', 529887, 158177),
(262, 'YhvrORgt', 571139, 463656),
(264, 'zSUlxOMB', 883065, 889361),
(265, 'wIjGNzFe', 826695, 270931),
(266, 'snUnAsQg', 604096, 582720),
(268, 'tIozZLev', 500250, 931305),
(269, 'FZsiNjaj', 49394, 44842),
(270, 'RuonLRlH', 69777, 385961),
(272, 'VlssPwFr', 257554, 577705),
(273, 'kYcBMyTw', 634773, 746887),
(274, 'gUpwnagI', 202778, 575201),
(276, 'dnMvgTBo', 431235, 894699),
(278, 'PlVZGPvr', 463240, 339700),
(280, 'EAlJZior', 625931, 140677),
(281, 'aEftGNOR', 976337, 687094),
(283, 'ORPzXwMA', 539979, 832982),
(284, 'OygpjSyC', 128732, 633474),
(286, 'KEWZFBXx', 45776, 986692),
(287, 'zSnXxEkZ', 496385, 956443),
(289, 'SshqkmUY', 565972, 237937),
(290, 'jRwDGbwi', 124049, 37390),
(292, 'iyUUTRtf', 493973, 591365),
(293, 'VXhrKxFs', 332209, 961426),
(294, 'FtEXmtvD', 564110, 384606),
(296, 'sTFOexje', 83218, 783435),
(297, 'jnWZueJY', 262454, 436375),
(298, 'jpQvFVfq', 247101, 544928),
(300, 'SmezyZxI', 412749, 26819),
(301, 'YejNDbgx', 911813, 366022),
(302, 'fJebbzqJ', 590124, 244859),
(304, 'lTqAkSuE', 997695, 786016),
(305, 'MeppKcaY', 182899, 817523),
(306, 'hXSasIVW', 673398, 934704),
(308, 'NINDVmia', 633999, 456147),
(309, 'ibhagtLJ', 227811, 859937),
(310, 'ldUoeujc', 680933, 718255),
(312, 'jxnhSIAS', 803527, 536673),
(313, 'pKQwzTYc', 205379, 961678),
(314, 'zbngNZQG', 774084, 885600),
(316, 'unbqFYIz', 909277, 472437),
(317, 'RqLcACLY', 193231, 352184),
(318, 'xIDMLsOi', 985717, 651679),
(320, 'RBnQtAGA', 869433, 453404),
(321, 'LSqBJajO', 209075, 375727),
(322, 'aPFvsJMB', 218056, 186896),
(324, 'rTzxKBdy', 291882, 420139),
(325, 'uYcYoaRF', 869037, 724821),
(326, 'IOyiGRly', 735181, 847140),
(328, 'dFgRNffx', 210149, 698042),
(329, 'kHiMOMwy', 10976, 114396),
(330, 'XfktdgzU', 267905, 582834),
(332, 'CADUtJxw', 74322, 805442),
(333, 'nZWOWLJo', 254442, 726586),
(334, 'xxEkXkwW', 99326, 869716),
(336, 'OrfuYATV', 34075, 958784),
(337, 'XppfvsGv', 628565, 170315),
(338, 'dkXszItx', 486969, 578983),
(339, 'OnEkbSeU', 213519, 567005),
(340, 'UboLNMMv', 267382, 74086),
(342, 'iMdcoAHR', 676037, 133885),
(343, 'vqgSKNWs', 195053, 313337),
(344, 'IvcOyFvI', 814344, 513330),
(346, 'pOakXOnp', 341424, 394717),
(347, 'bZYQlYpM', 420758, 836827),
(348, 'sUIwsxln', 157752, 164197),
(350, 'jnMbrOXk', 307582, 980085),
(351, 'DDAdzLkL', 468042, 71801),
(352, 'hnhgjyWN', 378984, 6232),
(353, 'FKDOQugz', 371216, 589469),
(355, 'abWJIPre', 820552, 302292),
(356, 'cMBisBNi', 434624, 428954),
(357, 'kLlotIXC', 898734, 152411),
(358, 'MFkMYrZQ', 76802, 441901),
(360, 'hvjcZRjG', 159658, 848616),
(361, 'RzTzGjTU', 680016, 647498),
(362, 'VUpDQHVR', 290578, 426167),
(363, 'GDMWHLkU', 371769, 311953),
(365, 'mONyVHQx', 395343, 653931),
(366, 'PebCqtZo', 989138, 640272),
(367, 'hOrFEBDs', 781971, 597430),
(368, 'laZHfptY', 590582, 830104),
(370, 'FIBwinPf', 299468, 709621),
(371, 'DEpszfts', 187362, 119047),
(372, 'pgnewmYJ', 576014, 729663),
(373, 'bIJUoFDf', 863272, 5272),
(374, 'UzasAais', 129314, 566575),
(376, 'lNxctOfP', 767839, 570556),
(377, 'xznIzdnN', 612872, 752301),
(378, 'GcLGlChJ', 868078, 791484),
(379, 'nYzchRlb', 790568, 459204),
(380, 'FTVMbkSb', 850140, 963719),
(382, 'KkSLRRoQ', 659525, 974422),
(383, 'KkNetQpc', 846052, 889766),
(384, 'QJXdsYwx', 272157, 3287),
(385, 'mzOmEOqL', 97059, 659923),
(386, 'DtOkQGTO', 792223, 463883),
(388, 'XlmCkkxF', 821076, 935194),
(389, 'wGproYct', 114335, 278396),
(390, 'rCaMAOBH', 438053, 133869),
(391, 'dimOwVbU', 731695, 225125),
(392, 'MQjoxqON', 133460, 290582),
(394, 'QEIixTOW', 855056, 723805),
(395, 'zAOcukuO', 341515, 749873),
(396, 'CjAtzgWO', 564582, 414854),
(397, 'gUVitEKN', 695580, 890110),
(398, 'JPnExFji', 142598, 161417),
(400, 'LZaKpNCL', 325818, 391013),
(401, 'gUXWnmhh', 263527, 138998),
(402, 'MAUCklnp', 141413, 139775),
(403, 'adCGbkBl', 860380, 45218),
(404, 'arTQOpyW', 592867, 357647),
(406, 'wcaBacak', 658604, 374279),
(407, 'fRlbPhCX', 150767, 895099),
(408, 'LHjWqRTz', 667614, 464489),
(409, 'IyGeDLFR', 799204, 690017),
(410, 'LZQIeUWf', 278270, 939590),
(412, 'sbmROItr', 904088, 260615),
(413, 'KDXPBxrz', 554003, 12875),
(414, 'SnTrgbho', 436609, 800292),
(415, 'hDKEsPxU', 968050, 667965),
(416, 'INwOCDcU', 124370, 654323),
(418, 'CrklxTju', 224740, 926249),
(419, 'cLMMOZdf', 934611, 407300),
(420, 'TqvaMfTi', 204780, 737826),
(421, 'BBfGqdSn', 393390, 215157),
(422, 'qFrdZvoK', 988995, 232970),
(424, 'zLNmlfHK', 385788, 696349),
(425, 'UWqiirLH', 681355, 710257),
(426, 'mxYBJxHj', 247628, 857586),
(427, 'bmFziYPJ', 647453, 815363),
(428, 'bJmATgvl', 251678, 560267),
(430, 'OVKZoUyO', 573853, 29559),
(431, 'MQryPgwB', 943752, 966726),
(432, 'sWUfosyI', 93224, 832984),
(433, 'aYTunxQh', 406113, 506450),
(434, 'ogvvhPph', 574867, 770639),
(436, 'irpYECSd', 716143, 177649),
(437, 'uydDXRGk', 131892, 371536),
(438, 'rsgZxktB', 807911, 563101),
(439, 'arvjSPSt', 306805, 710087),
(440, 'yKhIplli', 76201, 52130),
(442, 'WFRwdTBr', 990496, 444757),
(443, 'FYJhimyN', 568302, 451724),
(444, 'UIlJhkDq', 882032, 327604),
(445, 'RrzLUPTU', 141301, 584057),
(446, 'NTpbhsNI', 267023, 549800),
(448, 'UOiClrxi', 658955, 65914),
(449, 'EvbjGWIp', 456180, 914090),
(450, 'eJFtxKbO', 263097, 64340),
(451, 'XfTHKTwU', 976588, 357797),
(452, 'MTDGJjBz', 878677, 70043),
(454, 'dDuefyuR', 676639, 868375),
(455, 'WGDHIfuI', 301023, 692574),
(456, 'ulOlhCJi', 62243, 204795),
(457, 'SpjhmgqD', 383538, 330446),
(458, 'hkOdGUkX', 371128, 146795),
(460, 'ZyYZGseB', 775367, 223074),
(461, 'rMvIefwA', 523517, 208069),
(462, 'sAItzYlw', 890900, 988137),
(463, 'RSoPnDWx', 611243, 482903),
(464, 'cxHdoOgC', 318441, 262275),
(466, 'WsSWjXqv', 204493, 274687),
(467, 'onqFIPkx', 7676, 975033),
(468, 'lZVELjzA', 955725, 382190),
(469, 'IOnXURfN', 285106, 57354),
(470, 'KUZXpqLp', 109182, 276510),
(472, 'FNoPmMpu', 804079, 701784),
(473, 'XBeMCHso', 747313, 410533),
(474, 'RNETtPQx', 209914, 530244),
(475, 'RiJlQqiN', 316898, 926829),
(476, 'VOefsDej', 382151, 267120),
(478, 'YLmPdzbY', 954368, 556269),
(479, 'TVyMvaCD', 702718, 703055),
(480, 'GiugFKKV', 56335, 943079),
(481, 'StkqkUJJ', 434053, 271394),
(482, 'krKQZlAy', 470254, 127967),
(484, 'QHVcPATr', 794544, 606238),
(485, 'blhyiDXN', 364577, 310015),
(486, 'XSCLaUsW', 142343, 240472),
(487, 'sOPJZzhx', 935566, 785092),
(488, 'FEZQnujZ', 543645, 581337),
(490, 'vXTnuLfy', 433342, 937202),
(491, 'XUjIwJjR', 648132, 257180),
(492, 'WpZclOJU', 339878, 574001),
(493, 'nDzXaBgK', 203613, 787233),
(494, 'qfrarxFh', 620920, 31877),
(496, 'HwwVoXfw', 580372, 520831),
(497, 'BuCUYDXw', 352444, 788738),
(498, 'kWtjoPcH', 227895, 293461),
(499, 'DhgguEZd', 202193, 407469),
(500, 'NzahdRDz', 378263, 536592),
(502, 'MiOKoWbt', 333747, 533555),
(503, 'jRfXUWXF', 111619, 182926),
(504, 'naAhiBbr', 737449, 796124),
(505, 'pNVQYNpL', 630370, 671341),
(506, 'MWyLECZf', 602689, 541302),
(507, 'NfWfEAwS', 764531, 990757),
(509, 'BYahhScy', 449722, 317463),
(510, 'sorOPpIx', 329401, 167093),
(511, 'WfMCpIFN', 739489, 448293),
(512, 'zhBKXCAJ', 147998, 587798),
(513, 'WNrTaJFW', 15784, 628386),
(514, 'JrFLaqXC', 167825, 415913),
(516, 'TaFQSLFJ', 51703, 687296),
(517, 'sOVEaxOD', 162022, 268877),
(518, 'iUpqkmAr', 964609, 462474),
(519, 'dcGxaIsE', 594032, 449145),
(520, 'yswtaXma', 709380, 893482),
(521, 'fuZMbaBD', 364874, 967338),
(522, 'gmkLJFov', 710611, 155865),
(524, 'awcxJluw', 930068, 406292),
(525, 'ZpzcUonH', 699033, 107430),
(526, 'jQeDQwNa', 34706, 712458),
(527, 'mPDTQKVj', 704686, 858558),
(528, 'QbnWQEOB', 543876, 247233),
(529, 'TrKAdkKQ', 617416, 204171),
(530, 'WtTfEKOr', 157698, 339828),
(532, 'MkLTOAJR', 929979, 323648),
(533, 'QjGpNDPU', 894593, 654867),
(534, 'DbpjyNGT', 832849, 327906),
(535, 'pshlvLUi', 763993, 702619),
(536, 'cfIcSXfQ', 866609, 281173),
(537, 'zCxhxUkK', 388440, 333517),
(538, 'VaUbqhzN', 47406, 595394),
(540, 'BXwGfwsK', 413424, 910841),
(541, 'rHWfmWAE', 820601, 619871),
(542, 'qMMvBKiH', 68720, 841735),
(543, 'mzddIoNE', 636281, 564362),
(544, 'BXCZcYHG', 30975, 477199),
(545, 'cXxmnlKn', 771423, 548300),
(546, 'jXnVPpsM', 435870, 917790),
(548, 'MTHVxULl', 146820, 643630),
(549, 'Zihxtzzs', 942218, 201348),
(550, 'IKEnBqdd', 505087, 759874),
(551, 'DHyBoTHx', 885643, 357135),
(552, 'PBADCpqr', 415694, 434906),
(553, 'epAROKop', 434993, 16347),
(554, 'Xextsahb', 216452, 852671),
(556, 'DebjmMVL', 346217, 897060),
(557, 'kecxlCee', 612087, 511744),
(558, 'gmxvFZDM', 726026, 502255),
(559, 'cvRKrTcV', 449295, 127296),
(560, 'jHiAsPCe', 396774, 65972),
(561, 'KEIQeaxy', 448416, 861991),
(562, 'tFuIyPrC', 187163, 59539),
(564, 'fWGsuTlB', 974366, 9408),
(565, 'zsHxOqeE', 809944, 505913),
(566, 'cfcdPTmX', 167860, 992382),
(567, 'beMmCFqZ', 537343, 567392),
(568, 'FmfnLyFW', 291698, 266944),
(569, 'KtUfGEZQ', 231625, 270841),
(570, 'CsqGvJrC', 565198, 352888),
(572, 'QSZaKeFD', 85870, 577575),
(573, 'FIThVznC', 241658, 336788),
(574, 'GRFDJCTv', 170548, 579059),
(575, 'NNWvGpFu', 640987, 574198),
(576, 'nWpcrfWZ', 23524, 225763),
(577, 'lsZdrQCn', 69016, 801925),
(578, 'RVoWZuAM', 660803, 103949),
(580, 'JGVKDGwY', 971379, 418909),
(581, 'VqLXzsZe', 996721, 313103),
(582, 'gqsNkJZZ', 66106, 519582),
(583, 'OeCEUmIv', 665400, 677436),
(584, 'fpxXMQTQ', 61104, 383072),
(585, 'remqbsIE', 72653, 930365),
(586, 'xLXwNRBD', 690553, 908035),
(588, 'MbKvGIuO', 29630, 323322),
(589, 'ZNkTtGAO', 111703, 97651),
(590, 'yDYVluac', 951678, 463137),
(591, 'rHqjlDWD', 246014, 957662),
(592, 'AzHWXzYc', 937299, 787023),
(593, 'oiFDVgCi', 795185, 461501),
(594, 'sefznEBo', 827330, 59286),
(596, 'YpfFwDDo', 183261, 692528),
(597, 'ebQEyrVe', 248061, 943507),
(598, 'kdrdkoFN', 748678, 16647),
(599, 'sMNUJvUB', 749468, 577002),
(600, 'zKvDitjP', 568769, 627126),
(601, 'ySzlZcwW', 294407, 480296),
(602, 'WUywiOYo', 421910, 370186),
(604, 'dLOpQKsn', 723105, 468682),
(605, 'QZiBxPEI', 523141, 954527),
(606, 'cjNkZyMH', 225423, 393483),
(607, 'KgAweIMu', 108966, 414416),
(608, 'lcuKiZIx', 367353, 857212),
(609, 'szqnkLqX', 465012, 959427),
(610, 'CRmrgQIx', 21612, 905932),
(612, 'tiWVrLTG', 855254, 2780),
(613, 'xPWeAdbW', 443636, 134109),
(614, 'NXLaCyux', 897051, 202190),
(615, 'yIaSjkhy', 426758, 127866),
(616, 'zIRNgNFh', 841464, 69860),
(617, 'DWuobrXU', 133279, 763383),
(618, 'NjxlpenW', 441977, 265311),
(620, 'yXYLcNbx', 824991, 258502),
(621, 'kBBSKVOV', 445373, 706266),
(622, 'VzolEcQK', 889481, 281767),
(623, 'VloRkYqg', 43919, 484599),
(624, 'zmnaeJss', 978485, 766471),
(625, 'BGpqsBom', 411618, 617158),
(626, 'sBTAZDLz', 109068, 212935),
(628, 'xHYGydRI', 287743, 271515),
(629, 'FkTLZCTk', 71714, 267883),
(630, 'DqAXjQrW', 488874, 255751),
(631, 'swFsSdCy', 594244, 88741),
(632, 'uhTbzxAL', 463408, 910522),
(633, 'ZCzjPpml', 915211, 319783),
(634, 'hYamVmKp', 340916, 246516),
(636, 'uNYNFNMu', 686080, 421611),
(637, 'VlWnSaVT', 143072, 3188),
(638, 'bYfxuyLk', 911085, 407989),
(639, 'FalQjBaS', 200426, 839361),
(640, 'KIxcPmZF', 621312, 918569),
(641, 'KlRLOwSm', 775179, 864463),
(642, 'DLSTPfVU', 127117, 985322),
(643, 'Скидка 8 процентов', 2, 15);

-- --------------------------------------------------------

--
-- Структура таблицы `question_answers`
--

CREATE TABLE IF NOT EXISTS `question_answers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `receipts`
--

CREATE TABLE IF NOT EXISTS `receipts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `type_users`
--

CREATE TABLE IF NOT EXISTS `type_users` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `type_users`
--

INSERT IGNORE INTO `type_users` (`id`, `type`) VALUES
(97, 'QEccxrLX'),
(99, 'sAsqarjT'),
(101, 'lPrSfmhY'),
(103, 'JTSpeirx'),
(105, 'EAURJIOu'),
(124, 'OLpWqkFE'),
(125, 'xzbKXVSD');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `telegram_id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT IGNORE INTO `users` (`id`, `first_name`, `last_name`, `telegram_id`, `type_id`, `role`) VALUES
(228, 'fcfILwmF', 'EtclZgtq', 321448, NULL, 'admin'),
(231, 'MbhrVnIT', 'tKqbPPqo', 168031, NULL, 'admin'),
(234, 'OaWmtuWK', 'aRgoRikx', 502039, NULL, 'admin'),
(237, 'nDewTAfN', 'ORKUaoVV', 399169, NULL, 'admin'),
(240, 'thuzcBgm', 'iObvmgQB', 873647, NULL, 'admin'),
(243, 'bmIrdNyx', 'OMhWwSFg', 634349, NULL, 'admin'),
(246, 'GDgYsKzJ', 'oglTTVNc', 197349, NULL, 'admin'),
(249, 'LqQORwPB', 'WKcbdOTC', 24727, NULL, 'admin'),
(252, 'VgiddHtv', 'yuBVWARr', 536615, NULL, 'admin'),
(255, 'hTccVLWh', 'cKsiiZPL', 344180, NULL, 'admin'),
(258, 'DYHdntKN', 'aenlDWBB', 401862, NULL, 'admin'),
(261, 'lZUneJaG', 'JyRWTuWI', 424015, NULL, 'admin'),
(263, 'VPThUfyQ', 'GOoJCuGN', 544844, NULL, 'admin'),
(264, 'eezLzxHI', 'ZcomVTwr', 354259, NULL, 'admin'),
(266, 'tqfSrsQi', 'NJWxXeUK', 204753, NULL, 'admin'),
(267, 'bxRGVWic', 'EmHYAqMJ', 513629, NULL, 'admin'),
(269, 'CUqcIUQJ', 'wqwXnmfA', 443842, NULL, 'admin'),
(270, 'FIqBWCwM', 'YDQDgiVH', 901395, NULL, 'admin'),
(272, 'CRCClsjw', 'dNqzVGpa', 660532, NULL, 'admin'),
(273, 'pEUzSmMC', 'iPkHqmrL', 70169, NULL, 'admin'),
(275, 'FhNEVSiq', 'ktljvgBN', 415426, NULL, 'admin'),
(276, 'fchGjZoh', 'wvwowffm', 659185, NULL, 'admin'),
(279, 'IANxJBFe', 'YHtUohMX', 174352, NULL, 'admin'),
(281, 'iaLsfqkW', 'nGWZQGny', 60096, NULL, 'admin'),
(283, 'EpZSsYCQ', 'aVgdRUwc', 340837, NULL, 'admin'),
(284, 'OelUOODb', 'YhPELeKA', 342638, NULL, 'admin'),
(286, 'PlGXieXz', 'oIvPSuwF', 283567, NULL, 'admin'),
(288, 'DeAVAUiA', 'PJnrIcSw', 437354, NULL, 'admin'),
(289, 'qaTUxCrc', 'CzXvviFw', 494303, NULL, 'admin'),
(291, 'rtKfQFlA', 'OIKHjXLi', 326553, NULL, 'admin'),
(293, 'elrrKMxi', 'QiZtCpcr', 164020, NULL, 'admin'),
(294, 'FKuiajJH', 'goOIGyVD', 476981, NULL, 'admin'),
(296, 'OQEaskEq', 'sAcQRCdz', 114441, NULL, 'admin'),
(298, 'YIsnHTQt', 'ZUAqGdgN', 735213, NULL, 'admin'),
(299, 'oOfsAqdg', 'NRfTHcxj', 520132, NULL, 'admin'),
(301, 'PaHpDhEI', 'oHWhDipn', 966130, NULL, 'admin'),
(302, 'aNTYbEsd', 'yhdUCXyJ', 22851, NULL, 'admin'),
(304, 'ohqSLqkP', 'xWsDLafP', 710917, NULL, 'admin'),
(305, 'TMGjfodV', 'SZPTDVzu', 59762, NULL, 'admin'),
(306, 'ImyEYuEm', 'EhAleoUI', 986796, NULL, 'admin'),
(307, 'uyIAEHRn', 'aVpsoqHG', 682442, NULL, 'admin'),
(309, 'PECTrsHO', 'wszZzIoj', 7370, NULL, 'admin'),
(310, 'QUDSRsXR', 'zGeLxgzZ', 215504, NULL, 'admin'),
(312, 'mvNQIxCB', 'KieuFyeP', 829211, NULL, 'admin'),
(313, 'VLqfBTkY', 'pshRscIh', 414031, NULL, 'admin'),
(314, 'pecjvJQq', 'gzHaUAAa', 586335, NULL, 'admin'),
(316, 'ZJameDpO', 'EgOjIIlO', 383265, NULL, 'admin'),
(317, 'PuIjqUmI', 'JiVcQwIR', 462219, NULL, 'admin'),
(319, 'ZMAyktfk', 'kOYwiUIs', 682347, NULL, 'admin'),
(320, 'pKkYNEbW', 'vKgMborw', 176793, NULL, 'admin'),
(321, 'YpJVaTbY', 'bIgoheCg', 88836, NULL, 'admin'),
(323, 'SjbosHBf', 'EzmJOVXG', 715617, NULL, 'admin'),
(324, 'DHxSuIBl', 'NDdAXuhI', 799058, NULL, 'admin'),
(326, 'Eaisjncz', 'gYHFmPhi', 180702, NULL, 'admin'),
(327, 'UnGZhQvf', 'PRhkFDSR', 459110, NULL, 'admin'),
(328, 'xPVTZsZY', 'uvVoXbPW', 71992, NULL, 'admin'),
(329, 'VqSMHXnQ', 'PkaXduBo', 496797, NULL, 'admin'),
(330, 'urHBZcxb', 'uHEOGoEN', 70470, NULL, 'admin'),
(331, 'gIrnclkm', 'OqhhLcje', 598181, NULL, 'admin'),
(332, 'HpiefIFs', 'JeNQObuf', 215497, NULL, 'admin'),
(333, 'zgtOwyrQ', 'dYmGUvQl', 76213, NULL, 'admin'),
(335, 'YMBBHkuM', 'zvYoyceF', 490878, NULL, 'admin'),
(336, 'NIflLINa', 'hEZmyjvc', 637679, NULL, 'admin'),
(338, 'gBGAbBgG', 'jnYlVfKG', 293093, NULL, 'admin'),
(339, 'sFbQvAAE', 'ovocLpIt', 400630, NULL, 'admin'),
(340, 'OvWVQwbh', 'rVLVKOga', 878733, NULL, 'admin'),
(342, 'uaphFAys', 'rqrLWVCW', 249146, NULL, 'admin'),
(343, 'SKycoOJq', 'SVzMbEtU', 591857, NULL, 'admin'),
(344, 'KDvjYpzy', 'nytsVxsT', 50961, NULL, 'admin'),
(346, 'YreAKKLN', 'KwyVnlHi', 424392, NULL, 'admin'),
(347, 'cRuJmDoF', 'etwYWbeK', 387153, NULL, 'admin'),
(348, 'pkNAlJnY', 'zoFSRxPQ', 687417, NULL, 'admin'),
(349, 'WpHbMQVz', 'OnDDCxSY', 903855, NULL, 'admin'),
(351, 'XWWhGiCA', 'ZxrtNxAI', 348961, NULL, 'admin'),
(352, 'bCCjYaAr', 'dRPyxSmV', 652980, NULL, 'admin'),
(353, 'UxRwtOGQ', 'GgreSfoy', 871850, NULL, 'admin'),
(355, 'oHFuIsqA', 'RySbQaRE', 575671, NULL, 'admin'),
(356, 'gpjAtDDP', 'MjNZmnJl', 837949, NULL, 'admin'),
(357, 'zzzyXOTo', 'fztgIKVg', 443269, NULL, 'admin'),
(358, 'LEtCEYdT', 'AmLuEFdF', 13953, NULL, 'admin'),
(360, 'IcpYrsTa', 'JlArMbts', 411040, NULL, 'admin'),
(361, 'YezNfVjJ', 'alLTfYRW', 855259, NULL, 'admin'),
(362, 'zSfHtghX', 'kcVQFRoG', 379719, NULL, 'admin'),
(363, 'pfNmzAEG', 'oNSmraFU', 223363, NULL, 'admin'),
(365, 'vzAVkthQ', 'SexKglIh', 162671, NULL, 'admin'),
(366, 'arachisP', 'tSRbkmnd', 685403, NULL, 'admin'),
(367, 'NEOvZZLh', 'fYskYgFx', 57853, NULL, 'admin'),
(368, 'jleqtrWO', 'aeoSYABy', 704955, NULL, 'admin'),
(369, 'GDzdxCNA', 'NSnoKozj', 337070, NULL, 'admin'),
(371, 'gLjmBBww', 'cPhDqsKF', 911114, NULL, 'admin'),
(372, 'EzdXbobG', 'WfREXavF', 725364, NULL, 'admin'),
(373, 'clJyGjQo', 'HwDsXVDe', 696758, NULL, 'admin'),
(374, 'dDBDnUSH', 'dNNQhXog', 496900, NULL, 'admin'),
(376, 'ysOpZCmG', 'ahyQLsoH', 21167, NULL, 'admin'),
(377, 'KulsCJvF', 'eYwEIviD', 848427, NULL, 'admin'),
(378, 'SbyhccHj', 'JwvuFrcN', 421883, NULL, 'admin'),
(379, 'GONifDjE', 'AIzOQEQS', 92932, NULL, 'admin'),
(380, 'gZJbXWMi', 'CQnCzwPn', 437236, NULL, 'admin'),
(382, 'iMkbrjrP', 'ENUSPSrS', 392302, NULL, 'admin'),
(383, 'hMeJrWan', 'MPXgebGY', 413610, NULL, 'admin'),
(384, 'sLvYgYir', 'PKEhzrVo', 479098, NULL, 'admin'),
(385, 'NThAePNP', 'HveEYofj', 2186, NULL, 'admin'),
(387, 'zPOOfIya', 'xTcPtQyp', 384702, NULL, 'admin'),
(388, 'AGMGeDtO', 'YUqfACFb', 264656, NULL, 'admin'),
(389, 'AFjUOXFW', 'XaxcNVHk', 661134, NULL, 'admin'),
(390, 'HJglTFBx', 'TASiuvca', 249755, NULL, 'admin'),
(391, 'olosqQsz', 'WbPYiHQo', 864412, NULL, 'admin'),
(393, 'cRDQcGLa', 'ciYDcoNz', 993393, NULL, 'admin'),
(394, 'dZtZsyKd', 'NRtadbjB', 499289, NULL, 'admin'),
(395, 'fJrBGAjl', 'fRbIrsgZ', 396239, NULL, 'admin'),
(396, 'UoigBznG', 'UXKZIUhQ', 962694, NULL, 'admin'),
(398, 'bLyGLeds', 'wIPLtPwj', 717536, NULL, 'admin'),
(399, 'ZWuejtSg', 'ubOdOLCD', 948361, NULL, 'admin'),
(400, 'iUpRmGlX', 'xEptqLNP', 3319, NULL, 'admin'),
(401, 'DwZImEWi', 'UpmpiwnI', 83294, NULL, 'admin'),
(402, 'XnGcAvfM', 'IlHIzqWi', 452544, NULL, 'admin'),
(404, 'MDtUrLEc', 'YPsgmPTU', 332591, NULL, 'admin'),
(405, 'ryiVdiAs', 'QMjLRZvK', 895942, NULL, 'admin'),
(406, 'TwtGZQsu', 'NegmXkDs', 230960, NULL, 'admin'),
(407, 'rLtOcfFk', 'eZVfjbuO', 513232, NULL, 'admin'),
(409, 'tfyfnlqu', 'rUBenSrb', 627597, NULL, 'admin'),
(410, 'lcrcRqdy', 'bkmwGcCD', 127561, NULL, 'admin'),
(411, 'eblojAOz', 'pqMVxWuB', 31558, NULL, 'admin'),
(412, 'WMrTXPXg', 'bgbvDbph', 815043, NULL, 'admin'),
(413, 'UwFSNdML', 'GBJwbRcP', 558345, NULL, 'admin'),
(415, 'GNTzvCnk', 'xghzPIjk', 652337, NULL, 'admin'),
(416, 'jGvNFdbw', 'QFgsYyCp', 768829, NULL, 'admin'),
(417, 'uRCrqaqh', 'gWKgUqHk', 640013, NULL, 'admin'),
(418, 'rqeeHvqt', 'pvvFQIAA', 627590, NULL, 'admin'),
(420, 'iUqxiArb', 'idnvtctc', 879113, NULL, 'admin'),
(421, 'ZCvkYSsd', 'sSeGtZyr', 788695, NULL, 'admin'),
(422, 'kvpkcuTc', 'FSecFGOD', 848333, NULL, 'admin'),
(423, 'CdasiVKv', 'bUydupcm', 368581, NULL, 'admin'),
(424, 'VPWsjeTM', 'MShPMarg', 547564, NULL, 'admin'),
(426, 'nQHRtMSm', 'WzMcxQML', 178192, NULL, 'admin'),
(427, 'pQWytpeB', 'cUnexgFV', 910928, NULL, 'admin'),
(428, 'FamEHCgz', 'eOgMzNGf', 157298, NULL, 'admin'),
(429, 'hIgFrtIW', 'YYViNGaK', 860316, NULL, 'admin'),
(431, 'SEwEgfFV', 'uBNzEUCu', 138691, NULL, 'admin'),
(432, 'sjvKqEqI', 'QZXSoUNs', 231812, NULL, 'admin'),
(433, 'wJEWLnaW', 'kfQiSXZN', 546060, NULL, 'admin'),
(434, 'BWKNvKpl', 'eVHpSHAw', 950839, NULL, 'admin'),
(435, 'tpBSLxVZ', 'PeZZGsSh', 897070, NULL, 'admin'),
(437, 'twNRNlJg', 'APCEklwe', 161593, NULL, 'admin'),
(438, 'SsaiGfyt', 'aqiwWrlU', 744947, NULL, 'admin'),
(439, 'WkrovIUH', 'hbgvPSDy', 310568, NULL, 'admin'),
(440, 'JSPPaGcm', 'ToMFmzRf', 280736, NULL, 'admin'),
(441, 'XlwWlTGz', 'PYfvuluf', 383424, NULL, 'admin'),
(443, 'fHYtCYeq', 'AweaZWPr', 585929, NULL, 'admin'),
(444, 'vlwxaJkr', 'DtybiLBJ', 670179, NULL, 'admin'),
(445, 'HYZRDcDJ', 'ZDZQwEkL', 910614, NULL, 'admin'),
(446, 'rEKQDYcn', 'wmjSERLC', 360529, NULL, 'admin'),
(447, 'NJnerLEL', 'FKtbNnum', 567106, NULL, 'admin'),
(448, 'ujJboMuA', 'leVUBoOQ', 29859, NULL, 'admin'),
(450, 'VaqiRmQS', 'QIEMCBSw', 999039, NULL, 'admin'),
(451, 'BGNxPVcz', 'nEGasZYA', 747791, NULL, 'admin'),
(452, 'uKAXUMqF', 'TgcgmRkb', 298864, NULL, 'admin'),
(453, 'ALViEEHb', 'AFNYVMSy', 225854, NULL, 'admin'),
(454, 'gpWLespD', 'VKoWawAr', 960543, NULL, 'admin'),
(456, 'SYtnIZRw', 'tBEYbPwb', 499872, NULL, 'admin'),
(457, 'XkazwaoS', 'dcRybqlg', 954076, NULL, 'admin'),
(458, 'suLgspyK', 'HDwhtdoS', 305149, NULL, 'admin'),
(459, 'gKILsmQT', 'NDXjNamC', 853215, NULL, 'admin'),
(460, 'KvTQumYG', 'jQVEfBFz', 114217, NULL, 'admin'),
(461, 'mbHqzbvb', 'eTrsEOMg', 347283, NULL, 'admin'),
(463, 'SjLsmBxY', 'albxqyVZ', 977429, NULL, 'admin'),
(464, 'mWkobqOO', 'oNaTFmYh', 881392, NULL, 'admin'),
(465, 'wElqZrOv', 'tQuCjFNk', 328309, NULL, 'admin'),
(466, 'twmVxjaN', 'mABOHBFD', 713784, NULL, 'admin'),
(467, 'iyJGmZgI', 'fdWLlsSg', 993004, NULL, 'admin'),
(469, 'RIGSAslP', 'eLpNHorz', 3709, NULL, 'admin'),
(470, 'MmwsoPSk', 'GfsJLDXl', 404305, NULL, 'admin'),
(471, 'ZwzxyNNO', 'VNscwThI', 709931, NULL, 'admin'),
(472, 'euYXLiiP', 'XjClDBtx', 396333, NULL, 'admin'),
(473, 'TlXLlffH', 'omBwcUzR', 282415, NULL, 'admin'),
(474, 'GKTUBmGL', 'ORfnJTuo', 543997, NULL, 'admin'),
(476, 'CQyhNuSn', 'aCeXQLPp', 53670, NULL, 'admin'),
(477, 'lhIhGSSe', 'ydngIxJL', 84555, NULL, 'admin'),
(478, 'WbWVRwOQ', 'ZDxHDxuQ', 888410, NULL, 'admin'),
(479, 'iGgoFpVA', 'ogUYSYJz', 578220, NULL, 'admin'),
(480, 'KFcjGVkM', 'fnGjosDd', 609407, NULL, 'admin'),
(482, 'WwvmpXQQ', 'MwAnWyDN', 101941, NULL, 'admin'),
(483, 'etHWALrI', 'ldVskOHd', 566946, NULL, 'admin'),
(484, 'PkeMQpiC', 'QrmnkfrZ', 608038, NULL, 'admin'),
(485, 'RXXWfKfL', 'GGAONERA', 556117, NULL, 'admin'),
(486, 'cVJUheGG', 'DlUuFIUi', 213023, NULL, 'admin'),
(487, 'ZLBPmzaO', 'pQuhbMEY', 325957, NULL, 'admin'),
(489, 'eRYfYFXP', 'XYHhGgqS', 827965, NULL, 'admin'),
(490, 'EZyoDpiV', 'MfptcEHr', 195921, NULL, 'admin'),
(491, 'sLJJQExJ', 'yVmkjLWY', 561388, NULL, 'admin'),
(492, 'gpWwPkQL', 'sHxoxbtX', 333610, NULL, 'admin'),
(493, 'XwuTLAYh', 'qNetjEjB', 56226, NULL, 'admin'),
(495, 'AlpGBOOp', 'oRncmvZD', 845099, NULL, 'admin'),
(496, 'QRzZjsgd', 'NRqUsHyp', 881993, NULL, 'admin'),
(497, 'DmkjhJzc', 'NvARsfUB', 377162, NULL, 'admin'),
(498, 'xRtVFClH', 'vXAUpaCA', 43925, NULL, 'admin'),
(499, 'eVQyJUkC', 'MsJhNeSI', 417321, NULL, 'admin'),
(500, 'PofLZkUH', 'pcpdBJXE', 235957, NULL, 'admin'),
(502, 'kCQGJfrv', 'FHrOSvZx', 916238, NULL, 'admin'),
(503, 'zIRldxrB', 'qJRiZZdE', 67049, NULL, 'admin'),
(504, 'jEtRbfqI', 'epxUoqwK', 435730, NULL, 'admin'),
(505, 'wUZXQKvV', 'eubCwnRD', 211311, NULL, 'admin'),
(506, 'ZglzuOkV', 'OFmsQjEs', 933797, NULL, 'admin'),
(508, 'jVIcWgtM', 'YSyPQtEw', 767850, NULL, 'admin'),
(509, 'UUEDDnYJ', 'CwossQly', 317716, NULL, 'admin'),
(510, 'oQtAwDOY', 'EwmkuhdL', 750380, NULL, 'admin'),
(511, 'pxyUsWOx', 'MahfSSiB', 845902, NULL, 'admin'),
(512, 'TowmSLjg', 'JvWvrpjh', 45796, NULL, 'admin'),
(513, 'IJXGWaFq', 'wExtkDjQ', 487668, NULL, 'admin'),
(515, 'jRZDWErq', 'uFnBeXpL', 816344, NULL, 'admin'),
(516, 'GYIKUVFq', 'ghHwOClh', 617300, NULL, 'admin'),
(517, 'bYnAoOxY', 'kKNLQrka', 488714, NULL, 'admin'),
(518, 'lzmSqbsr', 'mBxXABxG', 362761, NULL, 'admin'),
(519, 'ugbFIrBF', 'EDCaUfNB', 787665, NULL, 'admin'),
(521, 'GmykeIPZ', 'PWnRXSyF', 507838, NULL, 'admin'),
(522, 'wreDUehs', 'bTShNmeg', 456494, NULL, 'admin'),
(523, 'dQYRbFwu', 'ZASnsBmv', 1292, NULL, 'admin'),
(524, 'UeaOqhpr', 'clyYtlus', 57146, NULL, 'admin'),
(525, 'mzEootGn', 'hQGowZIc', 843033, NULL, 'admin'),
(526, 'jJfSxkxK', 'WPffCADv', 503806, NULL, 'admin'),
(528, 'mqoYNWBw', 'YcKdkeAA', 863163, NULL, 'admin'),
(529, 'ZMUQoAuy', 'GXYXXsMg', 392544, NULL, 'admin'),
(530, 'pnOoOCqe', 'LtOjISCW', 157608, NULL, 'admin'),
(531, 'BgcbBPSa', 'GxgtMkBG', 581423, NULL, 'admin'),
(532, 'caKuzRZN', 'ZXqEQELS', 699532, NULL, 'admin'),
(533, 'qNEkyIHF', 'MPvcOcOt', 791381, NULL, 'admin'),
(535, 'ptIVQZaI', 'vototNfS', 915198, NULL, 'admin'),
(536, 'JXmVAmFb', 'qkveRXcN', 490238, NULL, 'admin'),
(537, 'GDtZNCmx', 'JPIBwfzq', 837891, NULL, 'admin'),
(538, 'kPEHLuiv', 'JcYZTdeS', 569250, NULL, 'admin'),
(539, 'JVEyLPzR', 'amQGeCJT', 53138, NULL, 'admin'),
(540, 'DYQnjvCc', 'HxYjYbEv', 590618, NULL, 'admin'),
(541, 'vMdTouVV', 'EYFPquwb', 519740, NULL, 'admin'),
(543, 'qSXCwVxA', 'kUqjrpkn', 613973, NULL, 'admin'),
(544, 'wQNXhfzc', 'rYsXVDMe', 339201, NULL, 'admin'),
(545, 'LlehQSWH', 'GEuzXXZa', 92209, NULL, 'admin'),
(546, 'pglhbNiM', 'hlxsQFaS', 618867, NULL, 'admin'),
(547, 'wMxhzNjH', 'IgCjFZew', 75965, NULL, 'admin'),
(548, 'RZrDHrAN', 'LwKifzPO', 241020, NULL, 'admin'),
(550, 'AAkbojlr', 'jBExrGFY', 50686, NULL, 'admin'),
(551, 'msIabAFP', 'mtqxElmd', 457661, NULL, 'admin'),
(552, 'MINqytFT', 'FcbiychL', 991107, NULL, 'admin'),
(553, 'iXXIydkF', 'wPKFQczQ', 223727, NULL, 'admin'),
(554, 'xLKlskTL', 'hisKgFfm', 190295, NULL, 'admin'),
(555, 'vkczTgTr', 'HVMvdcun', 937345, NULL, 'admin'),
(556, 'APSaoZSd', 'kzMVbPSj', 776815, NULL, 'admin'),
(558, 'oMWXZvlO', 'KPbVCMIX', 483347, NULL, 'admin'),
(559, 'cxUloQOG', 'flrfGGNE', 517531, NULL, 'admin'),
(560, 'NgJqQLgz', 'cwGeEIWk', 792463, NULL, 'admin'),
(561, 'NsjmZVTP', 'OZeIiaJn', 987916, NULL, 'admin'),
(562, 'tGzhSUUW', 'gHzhqOEO', 659392, NULL, 'admin'),
(563, 'fOejQmdy', 'GbtSSShG', 902289, NULL, 'admin'),
(565, 'xbqpHhUt', 'RTJWXfKm', 93982, NULL, 'admin'),
(566, 'zTqbYeQD', 'nZkAnBLq', 832464, NULL, 'admin'),
(567, 'dvmwDrID', 'tZTrdWPn', 648981, NULL, 'admin'),
(568, 'YdVEvuOp', 'XIOzvCfm', 52893, NULL, 'admin'),
(569, 'EkwsWKvw', 'ynCtLVpX', 594051, NULL, 'admin'),
(570, 'rAYBpOgS', 'OIdbrZTC', 451581, NULL, 'admin'),
(571, 'IjxeAeie', 'WqeEoRQF', 510735, NULL, 'admin'),
(573, 'gWSsSXFb', 'KaUaHoKo', 256562, NULL, 'admin'),
(574, 'TDybwSrw', 'HBVSmzZZ', 560307, NULL, 'admin'),
(575, 'cBlggePs', 'yvgtLINZ', 878928, NULL, 'admin'),
(576, 'zDCjopBK', 'htrSvlyg', 922732, NULL, 'admin'),
(577, 'OwJJUopf', 'TEnVKSRa', 279905, NULL, 'admin'),
(578, 'bPZCjFHW', 'tJLItGCa', 512624, NULL, 'admin'),
(580, 'gRqbMAcC', 'UoqGUTRJ', 374961, NULL, 'admin'),
(581, 'TrraFdMa', 'YIxABNkY', 301234, NULL, 'admin'),
(582, 'iHxnbwfZ', 'rKyMTsTM', 901563, NULL, 'admin'),
(583, 'cokLScKw', 'UJvQzSBy', 340761, NULL, 'admin'),
(584, 'xfqIhPZc', 'IqtEwNbW', 775654, NULL, 'admin'),
(585, 'JEVLhmDL', 'eBQIGcSx', 427590, NULL, 'admin'),
(586, 'gbvOvhNp', 'UlvLGAeN', 719828, NULL, 'admin'),
(588, 'mxKZQJkq', 'DhAucRXi', 274237, NULL, 'admin'),
(589, 'KPUvhoun', 'oQpujZPS', 796687, NULL, 'admin'),
(590, 'YrPmMdNd', 'WXYUAJHD', 826165, NULL, 'admin'),
(591, 'cKhcRyDx', 'sArFHUwB', 881594, NULL, 'admin'),
(592, 'jQmfQxsd', 'MpXYOtWU', 135240, NULL, 'admin'),
(593, 'KMhIliyv', 'wkEcpiIs', 254457, NULL, 'admin'),
(595, 'LHWlPYrx', 'FRNYhrcZ', 485289, NULL, 'admin'),
(596, 'BkbNwbKJ', 'BBbYqUOv', 630882, NULL, 'admin'),
(597, 'TjbJmQNV', 'nasbWtue', 389823, NULL, 'admin'),
(598, 'ysspAqVN', 'QlPeVGtM', 50420, NULL, 'admin'),
(599, 'xzFWecIX', 'CVwksfPO', 805511, NULL, 'admin'),
(600, 'slYJNtNX', 'ulCxZGef', 354509, NULL, 'admin'),
(601, 'gIRCBZyK', 'EQAQWMZc', 231599, NULL, 'admin'),
(603, 'AoqxrHta', 'RHxrWYRn', 228686, NULL, 'admin'),
(604, 'dAjlwKJP', 'PBioyMti', 684370, NULL, 'admin'),
(605, 'tQSuwgMm', 'rBsgZbbV', 318839, NULL, 'admin'),
(606, 'suRixUWS', 'gOOLPiyv', 88311, NULL, 'admin'),
(607, 'EuBIuuav', 'XdSaJaPI', 622877, NULL, 'admin'),
(608, 'EtMhFgqH', 'rrUSOqJE', 598374, NULL, 'admin'),
(610, 'zfFlqoMD', 'fXcBxgBZ', 304385, NULL, 'admin'),
(611, 'ktxDTstO', 'cmQPGHwD', 158314, NULL, 'admin'),
(612, 'JswzPblO', 'PPkLqSQV', 489429, NULL, 'admin'),
(613, 'BVGePUMk', 'RLGegfSk', 652354, NULL, 'admin'),
(614, 'AGAczmlw', 'QWXEFVUE', 994166, NULL, 'admin'),
(615, 'jHAOLCiH', 'qSwGkTlj', 907297, NULL, 'admin'),
(617, 'Коля', 'Ермолин', 32, NULL, 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `write_offs`
--

CREATE TABLE IF NOT EXISTS `write_offs` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `characteristics`
--
ALTER TABLE `characteristics`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `company_comments`
--
ALTER TABLE `company_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Индексы таблицы `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`,`order_id`,`product_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `promotion_id` (`promotion_id`);

--
-- Индексы таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  ADD PRIMARY KEY (`id`,`product_id`,`characteristic_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `characteristic_id` (`characteristic_id`);

--
-- Индексы таблицы `product_comments`
--
ALTER TABLE `product_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `question_answers`
--
ALTER TABLE `question_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Индексы таблицы `type_users`
--
ALTER TABLE `type_users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Индексы таблицы `write_offs`
--
ALTER TABLE `write_offs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=599;

--
-- AUTO_INCREMENT для таблицы `characteristics`
--
ALTER TABLE `characteristics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT для таблицы `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=641;

--
-- AUTO_INCREMENT для таблицы `company_comments`
--
ALTER TABLE `company_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT для таблицы `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=316;

--
-- AUTO_INCREMENT для таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT для таблицы `product_comments`
--
ALTER TABLE `product_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=644;

--
-- AUTO_INCREMENT для таблицы `question_answers`
--
ALTER TABLE `question_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `type_users`
--
ALTER TABLE `type_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=618;

--
-- AUTO_INCREMENT для таблицы `write_offs`
--
ALTER TABLE `write_offs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `company_comments`
--
ALTER TABLE `company_comments`
  ADD CONSTRAINT `company_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `company_comments_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_characteristics`
--
ALTER TABLE `product_characteristics`
  ADD CONSTRAINT `product_characteristics_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_characteristics_ibfk_2` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristics` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_comments`
--
ALTER TABLE `product_comments`
  ADD CONSTRAINT `product_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_comments_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `question_answers`
--
ALTER TABLE `question_answers`
  ADD CONSTRAINT `question_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `receipts_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type_users` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `write_offs`
--
ALTER TABLE `write_offs`
  ADD CONSTRAINT `write_offs_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
