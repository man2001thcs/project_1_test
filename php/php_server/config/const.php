<?php
ini_set('display_errors', true);
ini_set('error_reporting', E_ALL);

define('DS', DIRECTORY_SEPARATOR);
define('LIMIT', 10);

define('MSG_ERR_NOTEMPTY', 'Please enter this field');
define('MSG_ERR_EMAIL', 'Please enter correct email address');
define('MSG_ERR_NUMER', 'This field must be number');

define('USER_INFO', 'user_info');
define('LOGGED_IN', 'logged_in');
define('CART', 'cart');
define('CART_TOTAL', 'cart_total');

define('SERVER_URL', 'http://localhost/php_server/');
define('CLIENT_URL', 'http://localhost:3000/');

define('IMG_URL', '../../lib/images/medicine_img/');

define('M_COUNTRY', 'a:264:{s:2:"AF";s:11:"Afghanistan";s:2:"AL";s:7:"Albania";s:2:"DZ";s:7:"Algeria";s:2:"AS";s:14:"American Samoa";s:2:"AD";s:7:"Andorra";s:2:"AO";s:6:"Angola";s:2:"AI";s:8:"Anguilla";s:2:"AQ";s:10:"Antarctica";s:2:"AG";s:19:"Antigua and Barbuda";s:2:"AR";s:9:"Argentina";s:2:"AM";s:7:"Armenia";s:2:"AW";s:5:"Aruba";s:2:"AU";s:9:"Australia";s:2:"AT";s:7:"Austria";s:2:"AZ";s:10:"Azerbaijan";s:2:"BS";s:7:"Bahamas";s:2:"BH";s:7:"Bahrain";s:2:"BD";s:10:"Bangladesh";s:2:"BB";s:8:"Barbados";s:2:"BY";s:7:"Belarus";s:2:"BE";s:7:"Belgium";s:2:"BZ";s:6:"Belize";s:2:"BJ";s:5:"Benin";s:2:"BM";s:7:"Bermuda";s:2:"BT";s:6:"Bhutan";s:2:"BO";s:7:"Bolivia";s:2:"BA";s:22:"Bosnia and Herzegovina";s:2:"BW";s:8:"Botswana";s:2:"BV";s:13:"Bouvet Island";s:2:"BR";s:6:"Brazil";s:2:"BQ";s:27:"British Antarctic Territory";s:2:"IO";s:30:"British Indian Ocean Territory";s:2:"VG";s:22:"British Virgin Islands";s:2:"BN";s:6:"Brunei";s:2:"BG";s:8:"Bulgaria";s:2:"BF";s:12:"Burkina Faso";s:2:"BI";s:7:"Burundi";s:2:"KH";s:8:"Cambodia";s:2:"CM";s:8:"Cameroon";s:2:"CA";s:6:"Canada";s:2:"CT";s:28:"Canton and Enderbury Islands";s:2:"CV";s:10:"Cape Verde";s:2:"KY";s:14:"Cayman Islands";s:2:"CF";s:24:"Central African Republic";s:2:"TD";s:4:"Chad";s:2:"CL";s:5:"Chile";s:2:"CN";s:5:"China";s:2:"CX";s:16:"Christmas Island";s:2:"CC";s:23:"Cocos [Keeling] Islands";s:2:"CO";s:8:"Colombia";s:2:"KM";s:7:"Comoros";s:2:"CG";s:19:"Congo - Brazzaville";s:2:"CD";s:16:"Congo - Kinshasa";s:2:"CK";s:12:"Cook Islands";s:2:"CR";s:10:"Costa Rica";s:2:"HR";s:7:"Croatia";s:2:"CU";s:4:"Cuba";s:2:"CY";s:6:"Cyprus";s:2:"CZ";s:14:"Czech Republic";s:2:"CI";s:16:"Côte d’Ivoire";s:2:"DK";s:7:"Denmark";s:2:"DJ";s:8:"Djibouti";s:2:"DM";s:8:"Dominica";s:2:"DO";s:18:"Dominican Republic";s:2:"NQ";s:18:"Dronning Maud Land";s:2:"DD";s:12:"East Germany";s:2:"EC";s:7:"Ecuador";s:2:"EG";s:5:"Egypt";s:2:"SV";s:11:"El Salvador";s:2:"GQ";s:17:"Equatorial Guinea";s:2:"ER";s:7:"Eritrea";s:2:"EE";s:7:"Estonia";s:2:"ET";s:8:"Ethiopia";s:2:"FK";s:16:"Falkland Islands";s:2:"FO";s:13:"Faroe Islands";s:2:"FJ";s:4:"Fiji";s:2:"FI";s:7:"Finland";s:2:"FR";s:6:"France";s:2:"GF";s:13:"French Guiana";s:2:"PF";s:16:"French Polynesia";s:2:"TF";s:27:"French Southern Territories";s:2:"FQ";s:41:"French Southern and Antarctic Territories";s:2:"GA";s:5:"Gabon";s:2:"GM";s:6:"Gambia";s:2:"GE";s:7:"Georgia";s:2:"DE";s:7:"Germany";s:2:"GH";s:5:"Ghana";s:2:"GI";s:9:"Gibraltar";s:2:"GR";s:6:"Greece";s:2:"GL";s:9:"Greenland";s:2:"GD";s:7:"Grenada";s:2:"GP";s:10:"Guadeloupe";s:2:"GU";s:4:"Guam";s:2:"GT";s:9:"Guatemala";s:2:"GG";s:8:"Guernsey";s:2:"GN";s:6:"Guinea";s:2:"GW";s:13:"Guinea-Bissau";s:2:"GY";s:6:"Guyana";s:2:"HT";s:5:"Haiti";s:2:"HM";s:33:"Heard Island and McDonald Islands";s:2:"HN";s:8:"Honduras";s:2:"HK";s:19:"Hong Kong SAR China";s:2:"HU";s:7:"Hungary";s:2:"IS";s:7:"Iceland";s:2:"IN";s:5:"India";s:2:"ID";s:9:"Indonesia";s:2:"IR";s:4:"Iran";s:2:"IQ";s:4:"Iraq";s:2:"IE";s:7:"Ireland";s:2:"IM";s:11:"Isle of Man";s:2:"IL";s:6:"Israel";s:2:"IT";s:5:"Italy";s:2:"JM";s:7:"Jamaica";s:2:"JP";s:5:"Japan";s:2:"JE";s:6:"Jersey";s:2:"JT";s:15:"Johnston Island";s:2:"JO";s:6:"Jordan";s:2:"KZ";s:10:"Kazakhstan";s:2:"KE";s:5:"Kenya";s:2:"KI";s:8:"Kiribati";s:2:"KW";s:6:"Kuwait";s:2:"KG";s:10:"Kyrgyzstan";s:2:"LA";s:4:"Laos";s:2:"LV";s:6:"Latvia";s:2:"LB";s:7:"Lebanon";s:2:"LS";s:7:"Lesotho";s:2:"LR";s:7:"Liberia";s:2:"LY";s:5:"Libya";s:2:"LI";s:13:"Liechtenstein";s:2:"LT";s:9:"Lithuania";s:2:"LU";s:10:"Luxembourg";s:2:"MO";s:15:"Macau SAR China";s:2:"MK";s:9:"Macedonia";s:2:"MG";s:10:"Madagascar";s:2:"MW";s:6:"Malawi";s:2:"MY";s:8:"Malaysia";s:2:"MV";s:8:"Maldives";s:2:"ML";s:4:"Mali";s:2:"MT";s:5:"Malta";s:2:"MH";s:16:"Marshall Islands";s:2:"MQ";s:10:"Martinique";s:2:"MR";s:10:"Mauritania";s:2:"MU";s:9:"Mauritius";s:2:"YT";s:7:"Mayotte";s:2:"FX";s:19:"Metropolitan France";s:2:"MX";s:6:"Mexico";s:2:"FM";s:10:"Micronesia";s:2:"MI";s:14:"Midway Islands";s:2:"MD";s:7:"Moldova";s:2:"MC";s:6:"Monaco";s:2:"MN";s:8:"Mongolia";s:2:"ME";s:10:"Montenegro";s:2:"MS";s:10:"Montserrat";s:2:"MA";s:7:"Morocco";s:2:"MZ";s:10:"Mozambique";s:2:"MM";s:15:"Myanmar [Burma]";s:2:"NA";s:7:"Namibia";s:2:"NR";s:5:"Nauru";s:2:"NP";s:5:"Nepal";s:2:"NL";s:11:"Netherlands";s:2:"AN";s:20:"Netherlands Antilles";s:2:"NT";s:12:"Neutral Zone";s:2:"NC";s:13:"New Caledonia";s:2:"NZ";s:11:"New Zealand";s:2:"NI";s:9:"Nicaragua";s:2:"NE";s:5:"Niger";s:2:"NG";s:7:"Nigeria";s:2:"NU";s:4:"Niue";s:2:"NF";s:14:"Norfolk Island";s:2:"KP";s:11:"North Korea";s:2:"VD";s:13:"North Vietnam";s:2:"MP";s:24:"Northern Mariana Islands";s:2:"NO";s:6:"Norway";s:2:"OM";s:4:"Oman";s:2:"PC";s:31:"Pacific Islands Trust Territory";s:2:"PK";s:8:"Pakistan";s:2:"PW";s:5:"Palau";s:2:"PS";s:23:"Palestinian Territories";s:2:"PA";s:6:"Panama";s:2:"PZ";s:17:"Panama Canal Zone";s:2:"PG";s:16:"Papua New Guinea";s:2:"PY";s:8:"Paraguay";s:2:"YD";s:37:"People\'s Democratic Republic of Yemen";s:2:"PE";s:4:"Peru";s:2:"PH";s:11:"Philippines";s:2:"PN";s:16:"Pitcairn Islands";s:2:"PL";s:6:"Poland";s:2:"PT";s:8:"Portugal";s:2:"PR";s:11:"Puerto Rico";s:2:"QA";s:5:"Qatar";s:2:"RO";s:7:"Romania";s:2:"RU";s:6:"Russia";s:2:"RW";s:6:"Rwanda";s:2:"RE";s:8:"Réunion";s:2:"BL";s:17:"Saint Barthélemy";s:2:"SH";s:12:"Saint Helena";s:2:"KN";s:21:"Saint Kitts and Nevis";s:2:"LC";s:11:"Saint Lucia";s:2:"MF";s:12:"Saint Martin";s:2:"PM";s:25:"Saint Pierre and Miquelon";s:2:"VC";s:32:"Saint Vincent and the Grenadines";s:2:"WS";s:5:"Samoa";s:2:"SM";s:10:"San Marino";s:2:"SA";s:12:"Saudi Arabia";s:2:"SN";s:7:"Senegal";s:2:"RS";s:6:"Serbia";s:2:"CS";s:21:"Serbia and Montenegro";s:2:"SC";s:10:"Seychelles";s:2:"SL";s:12:"Sierra Leone";s:2:"SG";s:9:"Singapore";s:2:"SK";s:8:"Slovakia";s:2:"SI";s:8:"Slovenia";s:2:"SB";s:15:"Solomon Islands";s:2:"SO";s:7:"Somalia";s:2:"ZA";s:12:"South Africa";s:2:"GS";s:44:"South Georgia and the South Sandwich Islands";s:2:"KR";s:11:"South Korea";s:2:"ES";s:5:"Spain";s:2:"LK";s:9:"Sri Lanka";s:2:"SD";s:5:"Sudan";s:2:"SR";s:8:"Suriname";s:2:"SJ";s:22:"Svalbard and Jan Mayen";s:2:"SZ";s:9:"Swaziland";s:2:"SE";s:6:"Sweden";s:2:"CH";s:11:"Switzerland";s:2:"SY";s:5:"Syria";s:2:"ST";s:24:"São Tomé and Príncipe";s:2:"TW";s:6:"Taiwan";s:2:"TJ";s:10:"Tajikistan";s:2:"TZ";s:8:"Tanzania";s:2:"TH";s:8:"Thailand";s:2:"TL";s:11:"Timor-Leste";s:2:"TG";s:4:"Togo";s:2:"TK";s:7:"Tokelau";s:2:"TO";s:5:"Tonga";s:2:"TT";s:19:"Trinidad and Tobago";s:2:"TN";s:7:"Tunisia";s:2:"TR";s:6:"Turkey";s:2:"TM";s:12:"Turkmenistan";s:2:"TC";s:24:"Turks and Caicos Islands";s:2:"TV";s:6:"Tuvalu";s:2:"UM";s:27:"U.S. Minor Outlying Islands";s:2:"PU";s:34:"U.S. Miscellaneous Pacific Islands";s:2:"VI";s:19:"U.S. Virgin Islands";s:2:"UG";s:6:"Uganda";s:2:"UA";s:7:"Ukraine";s:2:"SU";s:35:"Union of Soviet Socialist Republics";s:2:"AE";s:20:"United Arab Emirates";s:2:"GB";s:14:"United Kingdom";s:2:"US";s:13:"United States";s:2:"ZZ";s:25:"Unknown or Invalid Region";s:2:"UY";s:7:"Uruguay";s:2:"UZ";s:10:"Uzbekistan";s:2:"VU";s:7:"Vanuatu";s:2:"VA";s:12:"Vatican City";s:2:"VE";s:9:"Venezuela";s:2:"VN";s:7:"Vietnam";s:2:"WK";s:11:"Wake Island";s:2:"WF";s:17:"Wallis and Futuna";s:2:"EH";s:14:"Western Sahara";s:2:"YE";s:5:"Yemen";s:2:"ZM";s:6:"Zambia";s:2:"ZW";s:8:"Zimbabwe";s:2:"AX";s:14:"Åland Islands";}');

define('M_TIME', serialize(array(
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
	'20:00',
	'20:30',
	'21:00',
	'21:30',
	'22:00',
	'22:30'
)));