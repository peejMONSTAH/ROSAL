import { Learner, TermGradeRecord, LearnerAttendance, SchoolProfile, CommentBankItem } from '@/types';

export const INITIAL_SCHOOL_PROFILE: SchoolProfile = {
  "schoolName": "Koronadal National Comprehensive High School",
  "schoolId": "304595",
  "region": "Region XII (SOCCSKSARGEN)",
  "division": "City Schools Division of Koronadal",
  "district": "District IX",
  "schoolYear": "2026-2027",
  "gradeLevel": "Grade 7",
  "section": "ROSAL",
  "adviserName": "KATHY ARANDALLO GARCIA",
  "adviserTitle": "Master Teacher II",
  "schoolHeadName": "MA. FE LITA S. YPARRAGUIRRE",
  "schoolHeadTitle": "Principal IV",
  "departmentHeadName": "MARK ANTHONY M. OCAMPO",
  "departmentHeadTitle": "OIC, Araling Panlipunan Dept. Head",
  "schoolAddress": "Rizal St., Brgy. Zone IV, City of Koronadal"
};

export const INITIAL_LEARNERS: Learner[] = [
  {
    "id": "learner-1",
    "lrn": "136452190313",
    "name": "ACIBAR, LOUIE JR. LAGUNDAY",
    "lastName": "ACIBAR",
    "firstName": "LOUIE JR.",
    "middleName": "LAGUNDAY",
    "extensionName": "",
    "sex": "M",
    "birthdate": "08-03-2014",
    "age": 12,
    "motherTongue": "Tagalog",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE IV (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "ACIBAR, LOUIE ROTONE",
    "motherName": "LAGUNDAY,RICHEL,VILLAVER,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-2",
    "lrn": "471025190009",
    "name": "ADANZA, ELIJAH LOUIS MARQUEZ",
    "lastName": "ADANZA",
    "firstName": "ELIJAH LOUIS",
    "middleName": "MARQUEZ",
    "extensionName": "",
    "sex": "M",
    "birthdate": "11-27-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SAN FELIPE",
    "city": "TANTANGAN",
    "province": "SOUTH COTABATO",
    "fatherName": "ADANZA, AMIEL FERNADEZ",
    "motherName": "MARQUEZ,MICHELLE,PALMERA,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-3",
    "lrn": "131408190012",
    "name": "ARELLANO, BREXEN GREY MIGUEL",
    "lastName": "ARELLANO",
    "firstName": "BREXEN GREY",
    "middleName": "MIGUEL",
    "extensionName": "",
    "sex": "M",
    "birthdate": "05-21-2014",
    "age": 12,
    "motherTongue": "Cebuano / Sinugbuanong Binisay",
    "religion": "Christianity",
    "street": "",
    "barangay": "MAMBUCAL",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "ARELLANO, RYAN BAUTISTA",
    "motherName": "MIGUEL,KAREN MAE,MORALDE,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-4",
    "lrn": "131394190136",
    "name": "BABAO, JAYDEN DALE TAJORES",
    "lastName": "BABAO",
    "firstName": "JAYDEN DALE",
    "middleName": "TAJORES",
    "extensionName": "",
    "sex": "M",
    "birthdate": "08-27-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "GENERAL PAULINO SANTOS (BO. 1)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "",
    "motherName": "TAJORES,DEIANIRA,HULIGANGA,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-5",
    "lrn": "131157190034",
    "name": "BARADAS, MCLIAME DWYT QUILLAMOR",
    "lastName": "BARADAS",
    "firstName": "MCLIAME DWYT",
    "middleName": "QUILLAMOR",
    "extensionName": "",
    "sex": "M",
    "birthdate": "03-08-2014",
    "age": 12,
    "motherTongue": "Ilongot",
    "religion": "Christianity",
    "street": "",
    "barangay": "BLINGKONG",
    "city": "LUTAYAN",
    "province": "SULTAN KUDARAT",
    "fatherName": "BARADAS, DWYT LANGURAYAN",
    "motherName": "QUILLAMOR,MELANIE,ESTABILLO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-6",
    "lrn": "471016190030",
    "name": "BARREDO, ALISTAIR KAYLE PALMEJAR",
    "lastName": "BARREDO",
    "firstName": "ALISTAIR KAYLE",
    "middleName": "PALMEJAR",
    "extensionName": "",
    "sex": "M",
    "birthdate": "08-01-2013",
    "age": 13,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SAN ISIDRO",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "BARREDO, ALOYSIUS GARCIA",
    "motherName": "PALMEJAR,KADRINA MALAYA,DURON,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-7",
    "lrn": "131394190141",
    "name": "BONILLA, RHINE KYLE LUMANGTAD",
    "lastName": "BONILLA",
    "firstName": "RHINE KYLE",
    "middleName": "LUMANGTAD",
    "extensionName": "",
    "sex": "M",
    "birthdate": "05-03-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "GENERAL PAULINO SANTOS (BO. 1)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "BONILLA, RAFFY BONILLA",
    "motherName": "LUMANGTAF,IRENE,PAYOT,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-8",
    "lrn": "131406190072",
    "name": "CORPUS, CYRUS JHON FUNDAL",
    "lastName": "CORPUS",
    "firstName": "CYRUS JHON",
    "middleName": "FUNDAL",
    "extensionName": "",
    "sex": "M",
    "birthdate": "09-19-2012",
    "age": 13,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SANTA CRUZ",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "CORPUS, RAYMUNDO CASTOR SR",
    "motherName": "FUNDAL,MARY JEAN,GALVE,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-9",
    "lrn": "131399190012",
    "name": "DABA, IAN JOHN BERDEN",
    "lastName": "DABA",
    "firstName": "IAN JOHN",
    "middleName": "BERDEN",
    "extensionName": "",
    "sex": "M",
    "birthdate": "02-23-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "GENERAL PAULINO SANTOS (BO. 1)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "DABA, JOHN SOLINAP",
    "motherName": "BERDEN,CHIRREZ DYAN,PONCARDAS,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-10",
    "lrn": "405896190059",
    "name": "DURAN, TYRICK GALVIN AUSTRIA",
    "lastName": "DURAN",
    "firstName": "TYRICK GALVIN",
    "middleName": "AUSTRIA",
    "extensionName": "",
    "sex": "M",
    "birthdate": "04-26-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SANTA CRUZ",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "DURAN, HENRY DELA CRUZ JR",
    "motherName": "AUSTRIA,SHAINALYN,TABABA,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-11",
    "lrn": "471016190006",
    "name": "GULAY, JOHN PAUL NAVARRO",
    "lastName": "GULAY",
    "firstName": "JOHN PAUL",
    "middleName": "NAVARRO",
    "extensionName": "",
    "sex": "M",
    "birthdate": "07-24-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SAN ISIDRO",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "GULAY, MANUEL DECATORIA",
    "motherName": "NAVARRO,GRACE,LAYO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-12",
    "lrn": "131400190026",
    "name": "LASANAS, ISAIAH ZAYN OSING",
    "lastName": "LASANAS",
    "firstName": "ISAIAH ZAYN",
    "middleName": "OSING",
    "extensionName": "",
    "sex": "M",
    "birthdate": "05-06-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SANTO NINO (BO. 2)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "LASANAS, LEO MARAÑON",
    "motherName": "OSING,JOVILYN,NADERA,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-13",
    "lrn": "405896190122",
    "name": "MARZAN, BRAM YEOMAN CANSON",
    "lastName": "MARZAN",
    "firstName": "BRAM YEOMAN",
    "middleName": "CANSON",
    "extensionName": "",
    "sex": "M",
    "birthdate": "08-03-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "NEW PANGASINAN (BO. 4)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "MARZAN, VINCENT PAULO",
    "motherName": "CANSON,KRISTEL,NACIONAL,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-14",
    "lrn": "130762190060",
    "name": "NOTARTE, KEVIN CLARENCE VILLARE",
    "lastName": "NOTARTE",
    "firstName": "KEVIN CLARENCE",
    "middleName": "VILLARE",
    "extensionName": "",
    "sex": "M",
    "birthdate": "11-24-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "AVANCEÃ‘A (BO. 3)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "NOTARTE, ELIAQUIM VISTAL",
    "motherName": "VILLARE,GINA,MANDAMLAY,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-15",
    "lrn": "131407190109",
    "name": "OMAR, MUHAMMAD AIMAN AKILAN",
    "lastName": "OMAR",
    "firstName": "MUHAMMAD AIMAN",
    "middleName": "AKILAN",
    "extensionName": "",
    "sex": "M",
    "birthdate": "08-05-2014",
    "age": 12,
    "motherTongue": "Maguindanaoan",
    "religion": "Islam",
    "street": "",
    "barangay": "GENERAL PAULINO SANTOS (BO. 1)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "",
    "motherName": "AKILAN,BAILEN,ALFONSO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-16",
    "lrn": "131394190228",
    "name": "PANAGUITON, PETER CLIEN BALBON",
    "lastName": "PANAGUITON",
    "firstName": "PETER CLIEN",
    "middleName": "BALBON",
    "extensionName": "",
    "sex": "M",
    "birthdate": "08-14-2013",
    "age": 13,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "AVANCEÃ‘A (BO. 3)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "PANAGUITON, PERNAN DIONSON",
    "motherName": "BALBON,JOY MAY,SELOTERION,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-17",
    "lrn": "131406190171",
    "name": "PAULITE, JAEL KHAIZER SISON",
    "lastName": "PAULITE",
    "firstName": "JAEL KHAIZER",
    "middleName": "SISON",
    "extensionName": "",
    "sex": "M",
    "birthdate": "03-30-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SANTA CRUZ",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "PAULITE, MICHAEL CABANTUD",
    "motherName": "SISON,EASTER JEAN,PAGINAG,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-18",
    "lrn": "405896190232",
    "name": "PERONO, AIDEN NATHAN BORJA",
    "lastName": "PERONO",
    "firstName": "AIDEN NATHAN",
    "middleName": "BORJA",
    "extensionName": "",
    "sex": "M",
    "birthdate": "01-07-2014",
    "age": 12,
    "motherTongue": "Tagalog",
    "religion": "Christianity",
    "street": "",
    "barangay": "ESPERANZA",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "PERONO, ARDEN ISLA",
    "motherName": "BORJA,AUDREY MARIE,CALDEA,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Blended",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-19",
    "lrn": "131397190072",
    "name": "RAMOS, BRIGHT ACHIVAR",
    "lastName": "RAMOS",
    "firstName": "BRIGHT",
    "middleName": "ACHIVAR",
    "extensionName": "",
    "sex": "M",
    "birthdate": "07-29-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE II (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "RAMOS, JECKRON AYROSO",
    "motherName": "ACHIVAR,JUDITH,SALGADO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "Pending TI "
  },
  {
    "id": "learner-20",
    "lrn": "131409190022",
    "name": "ROBLES, THIRDY -",
    "lastName": "ROBLES",
    "firstName": "THIRDY",
    "middleName": "-",
    "extensionName": "",
    "sex": "M",
    "birthdate": "11-23-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "PARAISO",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "",
    "motherName": "ROBLES,AILEEN MAE,MARCIAL,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-21",
    "lrn": "405896190192",
    "name": "SOBEJANA, RYNE JARRED REGUA",
    "lastName": "SOBEJANA",
    "firstName": "RYNE JARRED",
    "middleName": "REGUA",
    "extensionName": "",
    "sex": "M",
    "birthdate": "09-26-2013",
    "age": 12,
    "motherTongue": "Tagalog",
    "religion": "Christianity",
    "street": "",
    "barangay": "GENERAL PAULINO SANTOS (BO. 1)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "SOBEJANA, LAZARO ESPIRITU II",
    "motherName": "REGUA,DOMILY,PUYLONG,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-22",
    "lrn": "409431190007",
    "name": "SORIANO, CHRISEON XANDREI MERISCO",
    "lastName": "SORIANO",
    "firstName": "CHRISEON XANDREI",
    "middleName": "MERISCO",
    "extensionName": "",
    "sex": "M",
    "birthdate": "12-19-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "CARPENTER HILL",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "SORIANO, REYNALDO TENEZA REYNALDO",
    "motherName": "MERISCO,VICKY,VILLARIAL,VICKY",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "Pending TI "
  },
  {
    "id": "learner-23",
    "lrn": "131382190014",
    "name": "TORIBIO, EDWARD LIAM CATALUÑA",
    "lastName": "TORIBIO",
    "firstName": "EDWARD LIAM",
    "middleName": "CATALUÑA",
    "extensionName": "",
    "sex": "M",
    "birthdate": "01-10-2014",
    "age": 12,
    "motherTongue": "Tagalog",
    "religion": "Christianity",
    "street": "",
    "barangay": "NAMNAMA",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "TORIBIO, EDDIE TEMPLADO JR",
    "motherName": "CATALUÑA,JAILEN,VERDADERO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-24",
    "lrn": "405887190008",
    "name": "YAHYA, KHALID CESAR MATIVO",
    "lastName": "YAHYA",
    "firstName": "KHALID CESAR",
    "middleName": "MATIVO",
    "extensionName": "",
    "sex": "M",
    "birthdate": "05-27-2014",
    "age": 12,
    "motherTongue": "Tagalog",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE I (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "",
    "motherName": "MATIVO,RUBY JEAN,GOLBEQUE,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-25",
    "lrn": "130639190004",
    "name": "AGANOS, MEARL ROSE SUARNABA",
    "lastName": "AGANOS",
    "firstName": "MEARL ROSE",
    "middleName": "SUARNABA",
    "extensionName": "",
    "sex": "F",
    "birthdate": "11-04-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "POBLACION",
    "city": "TUPI",
    "province": "SOUTH COTABATO",
    "fatherName": "AGANOS, FLORDICANTE REGANION",
    "motherName": "SUARNABA,THERESA MAE,SEVILLO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-26",
    "lrn": "405885190017",
    "name": "CALIZAR, CHRISTINA PAULA ALMACIN",
    "lastName": "CALIZAR",
    "firstName": "CHRISTINA PAULA",
    "middleName": "ALMACIN",
    "extensionName": "",
    "sex": "F",
    "birthdate": "09-03-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SAN ISIDRO",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "CALIZAR, CHRISTIAN MARK NAZARENO",
    "motherName": "ALMACIN,JANICE,PACLIBAR,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-27",
    "lrn": "405896190057",
    "name": "CAMPANIEL, JOANNA RENEE ALEJANO",
    "lastName": "CAMPANIEL",
    "firstName": "JOANNA RENEE",
    "middleName": "ALEJANO",
    "extensionName": "",
    "sex": "F",
    "birthdate": "02-14-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE IV (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "CAMPANIEL, RENEN NAVARRO",
    "motherName": "ALEJANO,MARY JOY,GAMBOA,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-28",
    "lrn": "470522190005",
    "name": "CANSON, ALJANNE DIRECTO",
    "lastName": "CANSON",
    "firstName": "ALJANNE",
    "middleName": "DIRECTO",
    "extensionName": "",
    "sex": "F",
    "birthdate": "12-20-2013",
    "age": 12,
    "motherTongue": "Cebuano / Sinugbuanong Binisay",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE IV (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "CANSON, ROMEL PASON",
    "motherName": "DIRECTO,LOUIES BELLE,FABIAN,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-29",
    "lrn": "471020160007",
    "name": "CARBONILLA, JHAYRA OLINOY",
    "lastName": "CARBONILLA",
    "firstName": "JHAYRA",
    "middleName": "OLINOY",
    "extensionName": "",
    "sex": "F",
    "birthdate": "03-05-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "GENERAL PAULINO SANTOS (BO. 1)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "CARBONILLA, JUNRYL CELESTE",
    "motherName": "OLINOY,ARIANNE MAY,MONTEJO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "Pending TI "
  },
  {
    "id": "learner-30",
    "lrn": "131409190027",
    "name": "CASTILLON, VIVIAN GRACE PUYONG",
    "lastName": "CASTILLON",
    "firstName": "VIVIAN GRACE",
    "middleName": "PUYONG",
    "extensionName": "",
    "sex": "F",
    "birthdate": "03-06-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "PARAISO",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "CASTILLON, VICTORIO JR ELLECA",
    "motherName": "PUYONG,MELINDA,SALARDA,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-31",
    "lrn": "131407190075",
    "name": "DAWA, PATRICE BRIELLE JIMENEZ",
    "lastName": "DAWA",
    "firstName": "PATRICE BRIELLE",
    "middleName": "JIMENEZ",
    "extensionName": "",
    "sex": "F",
    "birthdate": "08-24-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE IV (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "DAWA, JERALD DAYEN",
    "motherName": "JIMENEZ,MARY ANN,PONDOC,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-32",
    "lrn": "131397190079",
    "name": "DOMINGO, CHARITY JADE PEÑALOSA",
    "lastName": "DOMINGO",
    "firstName": "CHARITY JADE",
    "middleName": "PEÑALOSA",
    "extensionName": "",
    "sex": "F",
    "birthdate": "01-02-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE II (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "DOMINGO, JUVEL LUMASAG",
    "motherName": "PEÑALOSA,JENNIE,LIBOON,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-33",
    "lrn": "131387190003",
    "name": "DUMADAG, ALLEYAH KHATE ACOSTA",
    "lastName": "DUMADAG",
    "firstName": "ALLEYAH KHATE",
    "middleName": "ACOSTA",
    "extensionName": "",
    "sex": "F",
    "birthdate": "09-04-2013",
    "age": 12,
    "motherTongue": "Ilocano",
    "religion": "Christianity",
    "street": "",
    "barangay": "CALOOCAN",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "DUMADAG, ARGIE -",
    "motherName": "ACOSTA,JUVY,ANGELO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-34",
    "lrn": "471016190038",
    "name": "ESPORTUNO, XAMANTHA ERICA LAVILLES",
    "lastName": "ESPORTUNO",
    "firstName": "XAMANTHA ERICA",
    "middleName": "LAVILLES",
    "extensionName": "",
    "sex": "F",
    "birthdate": "10-25-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "NEW LAMBUNAO",
    "city": "TANTANGAN",
    "province": "SOUTH COTABATO",
    "fatherName": "ESPORTUNO, ERIC LEBRILLA",
    "motherName": "LAVILLES,MAILA,LECHONSITO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-35",
    "lrn": "130642190019",
    "name": "FACUNLA, LEANNE GEBRELLE MAGNO",
    "lastName": "FACUNLA",
    "firstName": "LEANNE GEBRELLE",
    "middleName": "MAGNO",
    "extensionName": "",
    "sex": "F",
    "birthdate": "09-03-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "RIZAL (BARRIO 3)",
    "city": "BANGA",
    "province": "SOUTH COTABATO",
    "fatherName": "FACUNLA, EXEQUIEL EUROPA",
    "motherName": "MAGNO,LADY LOT,PIMENTEL,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-36",
    "lrn": "405896190170",
    "name": "MALUTO, KRISTINE JOY CARTAGENA",
    "lastName": "MALUTO",
    "firstName": "KRISTINE JOY",
    "middleName": "CARTAGENA",
    "extensionName": "",
    "sex": "F",
    "birthdate": "01-01-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "ROTONDA",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "MALUTO, EDWIN CASTRO",
    "motherName": "CARTAGENA,MARY JOY,JANTACUTAN,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-37",
    "lrn": "405896190121",
    "name": "NAVAL, ANNECHKA LINUELLE SANTIAGO",
    "lastName": "NAVAL",
    "firstName": "ANNECHKA LINUELLE",
    "middleName": "SANTIAGO",
    "extensionName": "",
    "sex": "F",
    "birthdate": "10-22-2013",
    "age": 12,
    "motherTongue": "Tagalog",
    "religion": "Christianity",
    "street": "",
    "barangay": "SANTA CRUZ",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "NAVAL, MANUEL MANGIDUYOS JR",
    "motherName": "SANTIAGO,LILIBETH,TOQUILLO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-38",
    "lrn": "131382190025",
    "name": "OSOTEO, JOHANNA JULATON",
    "lastName": "OSOTEO",
    "firstName": "JOHANNA",
    "middleName": "JULATON",
    "extensionName": "",
    "sex": "F",
    "birthdate": "07-21-2014",
    "age": 12,
    "motherTongue": "Filipino",
    "religion": "Christianity",
    "street": "",
    "barangay": "NAMNAMA",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "OSOTEO, DESIDERIO ABANILLA JR",
    "motherName": "JULATON,SYLVIA,LUIS,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-39",
    "lrn": "131414190088",
    "name": "PABILONA, QUEENZEL ALVAREZ",
    "lastName": "PABILONA",
    "firstName": "QUEENZEL",
    "middleName": "ALVAREZ",
    "extensionName": "",
    "sex": "F",
    "birthdate": "09-16-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SANTA CRUZ",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "PABILONA, ALLAN MADICLUM",
    "motherName": "ALVAREZ,JUDILYN,WICAS,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Blended",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-40",
    "lrn": "131388190032",
    "name": "PEÑOLVO, KHATE NATHALIE ROXAS",
    "lastName": "PEÑOLVO",
    "firstName": "KHATE NATHALIE",
    "middleName": "ROXAS",
    "extensionName": "",
    "sex": "F",
    "birthdate": "05-14-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "GENERAL PAULINO SANTOS (BO. 1)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "PEÑOLVO, MICHAEL ALERTA",
    "motherName": "ROJAS,JOPHEL,RELANO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-41",
    "lrn": "131414190062",
    "name": "PERPO, CHEALSY JEAL TAPANG",
    "lastName": "PERPO",
    "firstName": "CHEALSY JEAL",
    "middleName": "TAPANG",
    "extensionName": "",
    "sex": "F",
    "birthdate": "06-13-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "SANTA CRUZ",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "PERPO, ALBERT TUBATO",
    "motherName": "TAPANG,JEANETTE,BELLO,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-42",
    "lrn": "405896190141",
    "name": "SOMODIO, QUINTANA BLESSIE DOMALOGDOG",
    "lastName": "SOMODIO",
    "firstName": "QUINTANA BLESSIE",
    "middleName": "DOMALOGDOG",
    "extensionName": "",
    "sex": "F",
    "birthdate": "04-22-2014",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE IV (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "SOMODIO, ELMER SOLLESTA",
    "motherName": "DOMALOGDOG,BEVELYN,AMENE,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08"
  },
  {
    "id": "learner-43",
    "lrn": "130162190080",
    "name": "TRAGO, CZARINA BERTULFO",
    "lastName": "TRAGO",
    "firstName": "CZARINA",
    "middleName": "BERTULFO",
    "extensionName": "",
    "sex": "F",
    "birthdate": "06-25-2013",
    "age": 13,
    "motherTongue": "Cebuano / Sinugbuanong Binisay",
    "religion": "Christianity",
    "street": "",
    "barangay": "CARPENTER HILL",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "TRAGO, JASSON DAGUPAN",
    "motherName": "BERTULFO,MARESSA,BILLONES,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "T/I DATE:2026-06-08T/O DATE:2026/08/03"
  },
  {
    "id": "learner-44",
    "lrn": "131397190023",
    "name": "TUPAS, DAÑELLA BILBAO",
    "lastName": "TUPAS",
    "firstName": "DAÑELLA",
    "middleName": "BILBAO",
    "extensionName": "",
    "sex": "F",
    "birthdate": "10-02-2013",
    "age": 12,
    "motherTongue": "Hiligaynon",
    "religion": "Christianity",
    "street": "",
    "barangay": "ZONE II (POB.)",
    "city": "CITY OF KORONADAL (Capital)",
    "province": "SOUTH COTABATO",
    "fatherName": "TUPAS, DANTE ALANES",
    "motherName": "BILBAO,NERISSA,BURGOS,",
    "guardianName": "",
    "guardianRelationship": "",
    "contactNumber": "09123456789",
    "learningModality": "Face to Face",
    "remarks": "Pending TI "
  }
];

export const INITIAL_TERM1_GRADES: TermGradeRecord[] = [
  {
    "learnerId": "learner-39",
    "lrn": "131414190088",
    "name": "PABILONA, QUEENZEL ALVAREZ",
    "sex": "F",
    "grades": {
      "filipino": 92,
      "english": 96,
      "math": 91,
      "science": 93,
      "ap": 91,
      "values": 92,
      "tle": 94,
      "music_arts": 92,
      "pe_health": 92,
      "mapeh": 92
    },
    "average": 92.63,
    "rank": 1,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Academic performance is satisfactory, but the student should aim to become more independent and responsible in their studies.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-12",
    "lrn": "131400190026",
    "name": "LASANAS, ISAIAH ZAYN OSING",
    "sex": "M",
    "grades": {
      "filipino": 90,
      "english": 93,
      "math": 92,
      "science": 92,
      "ap": 90,
      "values": 95,
      "tle": 91,
      "music_arts": 92,
      "pe_health": 93,
      "mapeh": 93
    },
    "average": 92,
    "rank": 2,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Shows some good understanding but needs to strengthen knowledge through regular practice and revision.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-14",
    "lrn": "130762190060",
    "name": "NOTARTE, KEVIN CLARENCE VILLARE",
    "sex": "M",
    "grades": {
      "filipino": 88,
      "english": 95,
      "math": 90,
      "science": 90,
      "ap": 91,
      "values": 93,
      "tle": 91,
      "music_arts": 90,
      "pe_health": 91,
      "mapeh": 91
    },
    "average": 91.13,
    "rank": 3,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has the potential to improve academically. A more organized approach to studying would be beneficial.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-17",
    "lrn": "131406190171",
    "name": "PAULITE, JAEL KHAIZER SISON",
    "sex": "M",
    "grades": {
      "filipino": 89,
      "english": 96,
      "math": 93,
      "science": 85,
      "ap": 92,
      "values": 94,
      "tle": 91,
      "music_arts": 86,
      "pe_health": 90,
      "mapeh": 88
    },
    "average": 91,
    "rank": 4,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has made some progress this term but needs to put more effort into completing and reviewing academic work.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-31",
    "lrn": "131407190075",
    "name": "DAWA, PATRICE BRIELLE JIMENEZ",
    "sex": "F",
    "grades": {
      "filipino": 88,
      "english": 95,
      "math": 82,
      "science": 87,
      "ap": 95,
      "values": 94,
      "tle": 91,
      "music_arts": 91,
      "pe_health": 91,
      "mapeh": 91
    },
    "average": 90.38,
    "rank": 5,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has made a satisfactory start to the academic year. Greater consistency in study habits is needed.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-37",
    "lrn": "405896190121",
    "name": "NAVAL, ANNECHKA LINUELLE SANTIAGO",
    "sex": "F",
    "grades": {
      "filipino": 89,
      "english": 89,
      "math": 89,
      "science": 85,
      "ap": 93,
      "values": 93,
      "tle": 94,
      "music_arts": 89,
      "pe_health": 90,
      "mapeh": 90
    },
    "average": 90.25,
    "rank": 6,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Results are acceptable but could be improved through greater commitment to daily study.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-44",
    "lrn": "131397190023",
    "name": "TUPAS, DAÑELLA BILBAO",
    "sex": "F",
    "grades": {
      "filipino": 89,
      "english": 87,
      "math": 90,
      "science": 89,
      "ap": 90,
      "values": 94,
      "tle": 92,
      "music_arts": 94,
      "pe_health": 87,
      "mapeh": 91
    },
    "average": 90.25,
    "rank": 7,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has the potential to improve academically. A more organized approach to studying would be beneficial.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-19",
    "lrn": "131397190072",
    "name": "RAMOS, BRIGHT ACHIVAR",
    "sex": "M",
    "grades": {
      "filipino": 87,
      "english": 90,
      "math": 90,
      "science": 88,
      "ap": 92,
      "values": 92,
      "tle": 90,
      "music_arts": 91,
      "pe_health": 92,
      "mapeh": 92
    },
    "average": 90.13,
    "rank": 8,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Results are acceptable but could be improved through greater commitment to daily study.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-29",
    "lrn": "471020160007",
    "name": "CARBONILLA, JHAYRA OLINOY",
    "sex": "F",
    "grades": {
      "filipino": 90,
      "english": 93,
      "math": 83,
      "science": 88,
      "ap": 94,
      "values": 92,
      "tle": 89,
      "music_arts": 90,
      "pe_health": 93,
      "mapeh": 92
    },
    "average": 90.13,
    "rank": 9,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has the potential to improve academically. A more organized approach to studying would be beneficial.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-8",
    "lrn": "131406190072",
    "name": "CORPUS, CYRUS JHON FUNDAL",
    "sex": "M",
    "grades": {
      "filipino": 90,
      "english": 90,
      "math": 90,
      "science": 88,
      "ap": 91,
      "values": 93,
      "tle": 89,
      "music_arts": 85,
      "pe_health": 93,
      "mapeh": 89
    },
    "average": 90,
    "rank": 10,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Shows some good understanding but needs to strengthen knowledge through regular practice and revision.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-22",
    "lrn": "409431190007",
    "name": "SORIANO, CHRISEON XANDREI MERISCO",
    "sex": "M",
    "grades": {
      "filipino": 90,
      "english": 92,
      "math": 88,
      "science": 88,
      "ap": 90,
      "values": 92,
      "tle": 89,
      "music_arts": 88,
      "pe_health": 94,
      "mapeh": 91
    },
    "average": 90,
    "rank": 11,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Academic performance is satisfactory, but the student should aim to become more independent and responsible in their studies.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-40",
    "lrn": "131388190032",
    "name": "PEÑOLVO, KHATE NATHALIE ROXAS",
    "sex": "F",
    "grades": {
      "filipino": 93,
      "english": 91,
      "math": 83,
      "science": 86,
      "ap": 93,
      "values": 95,
      "tle": 90,
      "music_arts": 85,
      "pe_health": 92,
      "mapeh": 89
    },
    "average": 90,
    "rank": 12,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has made a satisfactory start to the academic year. Greater consistency in study habits is needed.",
    "coreValues": {
      "makaDiyos": "AO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-16",
    "lrn": "131394190228",
    "name": "PANAGUITON, PETER CLIEN BALBON",
    "sex": "M",
    "grades": {
      "filipino": 91,
      "english": 89,
      "math": 88,
      "science": 86,
      "ap": 91,
      "values": 93,
      "tle": 90,
      "music_arts": 88,
      "pe_health": 91,
      "mapeh": 90
    },
    "average": 89.75,
    "rank": 13,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has achieved reasonable results this term but has room for improvement. More effort and regular revision are recommended.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-27",
    "lrn": "405896190057",
    "name": "CAMPANIEL, JOANNA RENEE ALEJANO",
    "sex": "F",
    "grades": {
      "filipino": 88,
      "english": 94,
      "math": 85,
      "science": 90,
      "ap": 90,
      "values": 92,
      "tle": 87,
      "music_arts": 91,
      "pe_health": 92,
      "mapeh": 92
    },
    "average": 89.75,
    "rank": 14,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has achieved reasonable results this term but has room for improvement. More effort and regular revision are recommended.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-30",
    "lrn": "131409190027",
    "name": "CASTILLON, VIVIAN GRACE PUYONG",
    "sex": "F",
    "grades": {
      "filipino": 85,
      "english": 92,
      "math": 84,
      "science": 91,
      "ap": 90,
      "values": 92,
      "tle": 93,
      "music_arts": 91,
      "pe_health": 90,
      "mapeh": 91
    },
    "average": 89.75,
    "rank": 15,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Has achieved reasonable results this term but has room for improvement. More effort and regular revision are recommended.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-4",
    "lrn": "131394190136",
    "name": "BABAO, JAYDEN DALE TAJORES",
    "sex": "M",
    "grades": {
      "filipino": 85,
      "english": 92,
      "math": 86,
      "science": 92,
      "ap": 91,
      "values": 90,
      "tle": 93,
      "music_arts": 87,
      "pe_health": 89,
      "mapeh": 88
    },
    "average": 89.63,
    "rank": 16,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Demonstrates an adequate understanding of most concepts but needs to become more consistent with academic work.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-6",
    "lrn": "471016190030",
    "name": "BARREDO, ALISTAIR KAYLE PALMEJAR",
    "sex": "M",
    "grades": {
      "filipino": 83,
      "english": 92,
      "math": 94,
      "science": 88,
      "ap": 90,
      "values": 88,
      "tle": 92,
      "music_arts": 90,
      "pe_health": 90,
      "mapeh": 90
    },
    "average": 89.63,
    "rank": 17,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Academic performance is satisfactory, but the student should aim to become more independent and responsible in their studies.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-42",
    "lrn": "405896190141",
    "name": "SOMODIO, QUINTANA BLESSIE DOMALOGDOG",
    "sex": "F",
    "grades": {
      "filipino": 90,
      "english": 89,
      "math": 89,
      "science": 80,
      "ap": 94,
      "values": 92,
      "tle": 93,
      "music_arts": 89,
      "pe_health": 90,
      "mapeh": 90
    },
    "average": 89.63,
    "rank": 18,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "Academic performance is satisfactory, but the student should aim to become more independent and responsible in their studies.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-21",
    "lrn": "405896190192",
    "name": "SOBEJANA, RYNE JARRED REGUA",
    "sex": "M",
    "grades": {
      "filipino": 83,
      "english": 93,
      "math": 88,
      "science": 91,
      "ap": 90,
      "values": 89,
      "tle": 92,
      "music_arts": 87,
      "pe_health": 92,
      "mapeh": 90
    },
    "average": 89.5,
    "rank": 19,
    "descriptor": "Advancing",
    "honors": "With Honors",
    "comment": "The student is capable of achieving better results but needs to demonstrate greater effort and consistency.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-23",
    "lrn": "131382190014",
    "name": "TORIBIO, EDWARD LIAM CATALUÑA",
    "sex": "M",
    "grades": {
      "filipino": 85,
      "english": 92,
      "math": 92,
      "science": 83,
      "ap": 90,
      "values": 94,
      "tle": 90,
      "music_arts": 87,
      "pe_health": 91,
      "mapeh": 89
    },
    "average": 89.38,
    "rank": 20,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student is capable of achieving better results but needs to demonstrate greater effort and consistency.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-33",
    "lrn": "131387190003",
    "name": "DUMADAG, ALLEYAH KHATE ACOSTA",
    "sex": "F",
    "grades": {
      "filipino": 87,
      "english": 91,
      "math": 83,
      "science": 92,
      "ap": 91,
      "values": 94,
      "tle": 90,
      "music_arts": 86,
      "pe_health": 88,
      "mapeh": 87
    },
    "average": 89.38,
    "rank": 21,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Has the ability to achieve excellent results but needs to maintain consistent effort across all subjects.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-38",
    "lrn": "131382190025",
    "name": "OSOTEO, JOHANNA JULATON",
    "sex": "F",
    "grades": {
      "filipino": 85,
      "english": 96,
      "math": 83,
      "science": 88,
      "ap": 93,
      "values": 93,
      "tle": 88,
      "music_arts": 87,
      "pe_health": 91,
      "mapeh": 89
    },
    "average": 89.38,
    "rank": 22,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Has the potential to perform at a higher level. Greater effort, preparation, and follow-through are required.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-36",
    "lrn": "405896190170",
    "name": "MALUTO, KRISTINE JOY CARTAGENA",
    "sex": "F",
    "grades": {
      "filipino": 89,
      "english": 94,
      "math": 80,
      "science": 84,
      "ap": 87,
      "values": 94,
      "tle": 94,
      "music_arts": 89,
      "pe_health": 93,
      "mapeh": 91
    },
    "average": 89.13,
    "rank": 23,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Has achieved reasonable results this term but has room for improvement. More effort and regular revision are recommended.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-5",
    "lrn": "131157190034",
    "name": "BARADAS, MCLIAME DWYT QUILLAMOR",
    "sex": "M",
    "grades": {
      "filipino": 86,
      "english": 91,
      "math": 89,
      "science": 84,
      "ap": 91,
      "values": 93,
      "tle": 88,
      "music_arts": 88,
      "pe_health": 92,
      "mapeh": 90
    },
    "average": 89,
    "rank": 24,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Needs to take greater responsibility for their own learning and make a more consistent effort.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-9",
    "lrn": "131399190012",
    "name": "DABA, IAN JOHN BERDEN",
    "sex": "M",
    "grades": {
      "filipino": 88,
      "english": 90,
      "math": 93,
      "science": 83,
      "ap": 88,
      "values": 93,
      "tle": 87,
      "music_arts": 87,
      "pe_health": 90,
      "mapeh": 89
    },
    "average": 88.88,
    "rank": 25,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Needs to make better use of their abilities by becoming more focused and consistent in their studies.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-3",
    "lrn": "131408190012",
    "name": "ARELLANO, BREXEN GREY MIGUEL",
    "sex": "M",
    "grades": {
      "filipino": 89,
      "english": 89,
      "math": 86,
      "science": 85,
      "ap": 91,
      "values": 92,
      "tle": 89,
      "music_arts": 85,
      "pe_health": 90,
      "mapeh": 88
    },
    "average": 88.63,
    "rank": 26,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Shows the ability to succeed but does not always apply sufficient effort to academic tasks.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-7",
    "lrn": "131394190141",
    "name": "BONILLA, RHINE KYLE LUMANGTAD",
    "sex": "M",
    "grades": {
      "filipino": 84,
      "english": 90,
      "math": 92,
      "science": 88,
      "ap": 92,
      "values": 88,
      "tle": 87,
      "music_arts": 86,
      "pe_health": 90,
      "mapeh": 88
    },
    "average": 88.63,
    "rank": 27,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student can achieve much more with a more serious and consistent approach to academic work.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-13",
    "lrn": "405896190122",
    "name": "MARZAN, BRAM YEOMAN CANSON",
    "sex": "M",
    "grades": {
      "filipino": 85,
      "english": 92,
      "math": 90,
      "science": 86,
      "ap": 90,
      "values": 90,
      "tle": 88,
      "music_arts": 89,
      "pe_health": 87,
      "mapeh": 88
    },
    "average": 88.63,
    "rank": 28,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student can achieve much more with a more serious and consistent approach to academic work.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-34",
    "lrn": "471016190038",
    "name": "ESPORTUNO, XAMANTHA ERICA LAVILLES",
    "sex": "F",
    "grades": {
      "filipino": 85,
      "english": 92,
      "math": 81,
      "science": 84,
      "ap": 92,
      "values": 93,
      "tle": 91,
      "music_arts": 90,
      "pe_health": 91,
      "mapeh": 91
    },
    "average": 88.63,
    "rank": 29,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Needs to make better use of their abilities by becoming more focused and consistent in their studies.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-35",
    "lrn": "130642190019",
    "name": "FACUNLA, LEANNE GEBRELLE MAGNO",
    "sex": "F",
    "grades": {
      "filipino": 87,
      "english": 92,
      "math": 91,
      "science": 81,
      "ap": 89,
      "values": 93,
      "tle": 88,
      "music_arts": 85,
      "pe_health": 88,
      "mapeh": 87
    },
    "average": 88.5,
    "rank": 30,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "A capable student who has produced good results. Greater attention to detail would further improve academic performance.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-26",
    "lrn": "405885190017",
    "name": "CALIZAR, CHRISTINA PAULA ALMACIN",
    "sex": "F",
    "grades": {
      "filipino": 85,
      "english": 91,
      "math": 82,
      "science": 85,
      "ap": 90,
      "values": 92,
      "tle": 92,
      "music_arts": 89,
      "pe_health": 89,
      "mapeh": 89
    },
    "average": 88.25,
    "rank": 31,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Shows the ability to succeed but does not always apply sufficient effort to academic tasks.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-2",
    "lrn": "471025190009",
    "name": "ADANZA, ELIJAH LOUIS MARQUEZ",
    "sex": "M",
    "grades": {
      "filipino": 82,
      "english": 93,
      "math": 87,
      "science": 86,
      "ap": 86,
      "values": 90,
      "tle": 89,
      "music_arts": 92,
      "pe_health": 92,
      "mapeh": 92
    },
    "average": 88.13,
    "rank": 32,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student is capable of achieving better results but needs to demonstrate greater effort and consistency.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-11",
    "lrn": "471016190006",
    "name": "GULAY, JOHN PAUL NAVARRO",
    "sex": "M",
    "grades": {
      "filipino": 86,
      "english": 90,
      "math": 88,
      "science": 80,
      "ap": 89,
      "values": 90,
      "tle": 88,
      "music_arts": 90,
      "pe_health": 98,
      "mapeh": 94
    },
    "average": 88.13,
    "rank": 33,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Needs to make better use of their abilities by becoming more focused and consistent in their studies.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-32",
    "lrn": "131397190079",
    "name": "DOMINGO, CHARITY JADE PEÑALOSA",
    "sex": "F",
    "grades": {
      "filipino": 85,
      "english": 91,
      "math": 86,
      "science": 81,
      "ap": 85,
      "values": 94,
      "tle": 92,
      "music_arts": 86,
      "pe_health": 93,
      "mapeh": 90
    },
    "average": 88,
    "rank": 34,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "A capable student who has produced good results. Greater attention to detail would further improve academic performance.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-28",
    "lrn": "470522190005",
    "name": "CANSON, ALJANNE DIRECTO",
    "sex": "F",
    "grades": {
      "filipino": 88,
      "english": 92,
      "math": 80,
      "science": 88,
      "ap": 86,
      "values": 92,
      "tle": 88,
      "music_arts": 90,
      "pe_health": 88,
      "mapeh": 89
    },
    "average": 87.88,
    "rank": 35,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Has made good progress this term. More independent study and regular practice are encouraged.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-25",
    "lrn": "130639190004",
    "name": "AGANOS, MEARL ROSE SUARNABA",
    "sex": "F",
    "grades": {
      "filipino": 87,
      "english": 92,
      "math": 86,
      "science": 80,
      "ap": 90,
      "values": 91,
      "tle": 88,
      "music_arts": 86,
      "pe_health": 90,
      "mapeh": 88
    },
    "average": 87.75,
    "rank": 36,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student can achieve much more with a more serious and consistent approach to academic work.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-41",
    "lrn": "131414190062",
    "name": "PERPO, CHEALSY JEAL TAPANG",
    "sex": "F",
    "grades": {
      "filipino": 86,
      "english": 91,
      "math": 86,
      "science": 81,
      "ap": 90,
      "values": 93,
      "tle": 86,
      "music_arts": 86,
      "pe_health": 89,
      "mapeh": 88
    },
    "average": 87.63,
    "rank": 37,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student is capable of better results. A stronger work ethic and greater attention to academic responsibilities are needed next term.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-1",
    "lrn": "136452190313",
    "name": "ACIBAR, LOUIE JR. LAGUNDAY",
    "sex": "M",
    "grades": {
      "filipino": 85,
      "english": 88,
      "math": 87,
      "science": 84,
      "ap": 86,
      "values": 93,
      "tle": 87,
      "music_arts": 92,
      "pe_health": 88,
      "mapeh": 90
    },
    "average": 87.5,
    "rank": 38,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student is capable of achieving better results but needs to demonstrate greater effort and consistency.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-20",
    "lrn": "131409190022",
    "name": "ROBLES, THIRDY -",
    "sex": "M",
    "grades": {
      "filipino": 85,
      "english": 88,
      "math": 86,
      "science": 85,
      "ap": 87,
      "values": 91,
      "tle": 88,
      "music_arts": 89,
      "pe_health": 90,
      "mapeh": 90
    },
    "average": 87.5,
    "rank": 39,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Demonstrates good academic ability. More regular revision would help the student reach their full potential.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-24",
    "lrn": "405887190008",
    "name": "YAHYA, KHALID CESAR MATIVO",
    "sex": "M",
    "grades": {
      "filipino": 81,
      "english": 91,
      "math": 85,
      "science": 80,
      "ap": 88,
      "values": 85,
      "tle": 89,
      "music_arts": 86,
      "pe_health": 86,
      "mapeh": 86
    },
    "average": 85.63,
    "rank": 40,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Needs to take greater responsibility for their own learning and make a more consistent effort.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-15",
    "lrn": "131407190109",
    "name": "OMAR, MUHAMMAD AIMAN AKILAN",
    "sex": "M",
    "grades": {
      "filipino": 83,
      "english": 88,
      "math": 83,
      "science": 80,
      "ap": 88,
      "values": 91,
      "tle": 85,
      "music_arts": 85,
      "pe_health": 86,
      "mapeh": 86
    },
    "average": 85.5,
    "rank": 41,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "The student is capable of better results. A stronger work ethic and greater attention to academic responsibilities are needed next term.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-18",
    "lrn": "405896190232",
    "name": "PERONO, AIDEN NATHAN BORJA",
    "sex": "M",
    "grades": {
      "filipino": 81,
      "english": 89,
      "math": 85,
      "science": 82,
      "ap": 85,
      "values": 90,
      "tle": 88,
      "music_arts": 81,
      "pe_health": 85,
      "mapeh": 83
    },
    "average": 85.38,
    "rank": 42,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Needs to make better use of their abilities by becoming more focused and consistent in their studies.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-43",
    "lrn": "130162190080",
    "name": "TRAGO, CZARINA BERTULFO",
    "sex": "F",
    "grades": {
      "filipino": 85,
      "english": 85,
      "math": 85,
      "science": 85,
      "ap": 85,
      "values": 85,
      "tle": 85,
      "music_arts": 88,
      "pe_health": 88,
      "mapeh": 88
    },
    "average": 85.38,
    "rank": 43,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Has made good progress this term.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  },
  {
    "learnerId": "learner-10",
    "lrn": "405896190059",
    "name": "DURAN, TYRICK GALVIN AUSTRIA",
    "sex": "M",
    "grades": {
      "filipino": 82,
      "english": 86,
      "math": 85,
      "science": 80,
      "ap": 87,
      "values": 88,
      "tle": 85,
      "music_arts": 85,
      "pe_health": 85,
      "mapeh": 85
    },
    "average": 84.75,
    "rank": 44,
    "descriptor": "Benchmarking",
    "honors": null,
    "comment": "Should avoid relying on ability alone and develop stronger study habits and greater perseverance.",
    "coreValues": {
      "makaDiyos": "SO",
      "makatao": "AO",
      "makakalikasan": "AO",
      "makabansa": "AO"
    }
  }
];

export const INITIAL_ATTENDANCE: LearnerAttendance[] = [
  {
    "learnerId": "learner-1",
    "lrn": "136452190313",
    "name": "ACIBAR, LOUIE JR. LAGUNDAY",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-2",
    "lrn": "471025190009",
    "name": "ADANZA, ELIJAH LOUIS MARQUEZ",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-3",
    "lrn": "131408190012",
    "name": "ARELLANO, BREXEN GREY MIGUEL",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-4",
    "lrn": "131394190136",
    "name": "BABAO, JAYDEN DALE TAJORES",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 18,
        "absent": 2
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 202,
    "totalAbsent": 2,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-5",
    "lrn": "131157190034",
    "name": "BARADAS, MCLIAME DWYT QUILLAMOR",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 15,
        "absent": 1
      },
      "july": {
        "present": 22,
        "absent": 1
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 202,
    "totalAbsent": 2,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-6",
    "lrn": "471016190030",
    "name": "BARREDO, ALISTAIR KAYLE PALMEJAR",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-7",
    "lrn": "131394190141",
    "name": "BONILLA, RHINE KYLE LUMANGTAD",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-8",
    "lrn": "131406190072",
    "name": "CORPUS, CYRUS JHON FUNDAL",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-9",
    "lrn": "131399190012",
    "name": "DABA, IAN JOHN BERDEN",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-10",
    "lrn": "405896190059",
    "name": "DURAN, TYRICK GALVIN AUSTRIA",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-11",
    "lrn": "471016190006",
    "name": "GULAY, JOHN PAUL NAVARRO",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-12",
    "lrn": "131400190026",
    "name": "LASANAS, ISAIAH ZAYN OSING",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-13",
    "lrn": "405896190122",
    "name": "MARZAN, BRAM YEOMAN CANSON",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-14",
    "lrn": "130762190060",
    "name": "NOTARTE, KEVIN CLARENCE VILLARE",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 19,
        "absent": 1
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 203,
    "totalAbsent": 1,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-15",
    "lrn": "131407190109",
    "name": "OMAR, MUHAMMAD AIMAN AKILAN",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 22,
        "absent": 1
      },
      "aug": {
        "present": 19,
        "absent": 1
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 202,
    "totalAbsent": 2,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-16",
    "lrn": "131394190228",
    "name": "PANAGUITON, PETER CLIEN BALBON",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-17",
    "lrn": "131406190171",
    "name": "PAULITE, JAEL KHAIZER SISON",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-18",
    "lrn": "405896190232",
    "name": "PERONO, AIDEN NATHAN BORJA",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 18,
        "absent": 2
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 202,
    "totalAbsent": 2,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-19",
    "lrn": "131397190072",
    "name": "RAMOS, BRIGHT ACHIVAR",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-20",
    "lrn": "131409190022",
    "name": "ROBLES, THIRDY -",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-21",
    "lrn": "405896190192",
    "name": "SOBEJANA, RYNE JARRED REGUA",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-22",
    "lrn": "409431190007",
    "name": "SORIANO, CHRISEON XANDREI MERISCO",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 22,
        "absent": 1
      },
      "aug": {
        "present": 19,
        "absent": 1
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 202,
    "totalAbsent": 2,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-23",
    "lrn": "131382190014",
    "name": "TORIBIO, EDWARD LIAM CATALUÑA",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-24",
    "lrn": "405887190008",
    "name": "YAHYA, KHALID CESAR MATIVO",
    "sex": "M",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-25",
    "lrn": "130639190004",
    "name": "AGANOS, MEARL ROSE SUARNABA",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 19,
        "absent": 3
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 201,
    "totalAbsent": 3,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": false,
      "term3": true
    }
  },
  {
    "learnerId": "learner-26",
    "lrn": "405885190017",
    "name": "CALIZAR, CHRISTINA PAULA ALMACIN",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 21,
        "absent": 1
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 203,
    "totalAbsent": 1,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": false,
      "term3": true
    }
  },
  {
    "learnerId": "learner-27",
    "lrn": "405896190057",
    "name": "CAMPANIEL, JOANNA RENEE ALEJANO",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 21,
        "absent": 1
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 203,
    "totalAbsent": 1,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": false,
      "term3": true
    }
  },
  {
    "learnerId": "learner-28",
    "lrn": "470522190005",
    "name": "CANSON, ALJANNE DIRECTO",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 21,
        "absent": 2
      },
      "aug": {
        "present": 19,
        "absent": 1
      },
      "sept": {
        "present": 21,
        "absent": 1
      },
      "oct": {
        "present": 21,
        "absent": 1
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 199,
    "totalAbsent": 5,
    "consecutiveAbsences": 5,
    "interventionNeeded": true,
    "perfectAttendance": {
      "term1": false,
      "term2": false,
      "term3": true
    }
  },
  {
    "learnerId": "learner-29",
    "lrn": "471020160007",
    "name": "CARBONILLA, JHAYRA OLINOY",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 19,
        "absent": 1
      },
      "sept": {
        "present": 21,
        "absent": 1
      },
      "oct": {
        "present": 20,
        "absent": 2
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 200,
    "totalAbsent": 4,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": false,
      "term3": true
    }
  },
  {
    "learnerId": "learner-30",
    "lrn": "131409190027",
    "name": "CASTILLON, VIVIAN GRACE PUYONG",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-31",
    "lrn": "131407190075",
    "name": "DAWA, PATRICE BRIELLE JIMENEZ",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 21,
        "absent": 1
      },
      "oct": {
        "present": 20,
        "absent": 2
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 201,
    "totalAbsent": 3,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": false,
      "term3": true
    }
  },
  {
    "learnerId": "learner-32",
    "lrn": "131397190079",
    "name": "DOMINGO, CHARITY JADE PEÑALOSA",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 21,
        "absent": 2
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 21,
        "absent": 1
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 201,
    "totalAbsent": 3,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": false,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-33",
    "lrn": "131387190003",
    "name": "DUMADAG, ALLEYAH KHATE ACOSTA",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-34",
    "lrn": "471016190038",
    "name": "ESPORTUNO, XAMANTHA ERICA LAVILLES",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-35",
    "lrn": "130642190019",
    "name": "FACUNLA, LEANNE GEBRELLE MAGNO",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-36",
    "lrn": "405896190170",
    "name": "MALUTO, KRISTINE JOY CARTAGENA",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-37",
    "lrn": "405896190121",
    "name": "NAVAL, ANNECHKA LINUELLE SANTIAGO",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-38",
    "lrn": "131382190025",
    "name": "OSOTEO, JOHANNA JULATON",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-39",
    "lrn": "131414190088",
    "name": "PABILONA, QUEENZEL ALVAREZ",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-40",
    "lrn": "131388190032",
    "name": "PEÑOLVO, KHATE NATHALIE ROXAS",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-41",
    "lrn": "131414190062",
    "name": "PERPO, CHEALSY JEAL TAPANG",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-42",
    "lrn": "405896190141",
    "name": "SOMODIO, QUINTANA BLESSIE DOMALOGDOG",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-43",
    "lrn": "130162190080",
    "name": "TRAGO, CZARINA BERTULFO",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  },
  {
    "learnerId": "learner-44",
    "lrn": "131397190023",
    "name": "TUPAS, DAÑELLA BILBAO",
    "sex": "F",
    "monthly": {
      "june": {
        "present": 16,
        "absent": 0
      },
      "july": {
        "present": 23,
        "absent": 0
      },
      "aug": {
        "present": 20,
        "absent": 0
      },
      "sept": {
        "present": 22,
        "absent": 0
      },
      "oct": {
        "present": 22,
        "absent": 0
      },
      "nov": {
        "present": 20,
        "absent": 0
      },
      "dec": {
        "present": 14,
        "absent": 0
      },
      "jan": {
        "present": 20,
        "absent": 0
      },
      "feb": {
        "present": 20,
        "absent": 0
      },
      "mar": {
        "present": 21,
        "absent": 0
      },
      "apr": {
        "present": 6,
        "absent": 0
      }
    },
    "totalSchoolDays": 204,
    "totalPresent": 204,
    "totalAbsent": 0,
    "consecutiveAbsences": 0,
    "interventionNeeded": false,
    "perfectAttendance": {
      "term1": true,
      "term2": true,
      "term3": true
    }
  }
];

export const INITIAL_COMMENTS_BANK: CommentBankItem[] = [
  {
    "id": "1",
    "tier": "Advancing",
    "text": "Demonstrates good academic ability. More regular revision would help the student reach their full potential."
  },
  {
    "id": "2",
    "tier": "Advancing",
    "text": "Has the ability to achieve excellent results but needs to maintain consistent effort across all subjects."
  },
  {
    "id": "3",
    "tier": "Advancing",
    "text": "Shows good understanding of the lessons but could improve performance through more careful preparation."
  },
  {
    "id": "4",
    "tier": "Advancing",
    "text": "A capable student who has produced good results. Greater attention to detail would further improve academic performance."
  },
  {
    "id": "5",
    "tier": "Advancing",
    "text": "Has made good progress this term. More independent study and regular practice are encouraged."
  },
  {
    "id": "6",
    "tier": "Benchmarking",
    "text": "Has made a satisfactory start to the academic year. Greater consistency in study habits is needed."
  },
  {
    "id": "7",
    "tier": "Benchmarking",
    "text": "The student is capable of achieving better results but needs to demonstrate greater effort and consistency."
  },
  {
    "id": "8",
    "tier": "Benchmarking",
    "text": "Has achieved reasonable results this term but has room for improvement. More effort and regular revision are recommended."
  },
  {
    "id": "9",
    "tier": "Benchmarking",
    "text": "Demonstrates an adequate understanding of most concepts but needs to become more consistent with academic work."
  },
  {
    "id": "10",
    "tier": "Connecting",
    "text": "Has experienced some difficulty with academic demands. Regular practice and revision are strongly encouraged."
  },
  {
    "id": "11",
    "tier": "Connecting",
    "text": "Needs to strengthen understanding of key concepts and should seek assistance whenever difficulties arise."
  },
  {
    "id": "12",
    "tier": "Developing",
    "text": "Academic performance this term has been below expectations. The student needs to develop more effective study habits."
  }
];
