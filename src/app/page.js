'use client';

import { useState, useMemo } from "react";

const RAW_ENTRIES = [
  {code:"01001",short:"ACEH",isKanwil:true,kanwilCode:"01001",ig:"@bulogbisnis.aceh",tt:"@bulogbisnis.aceh"},
  {code:"01010",short:"LHOKSEUMAWE",isKanwil:false,kanwilCode:"01001",ig:"@bulogbisnis.lhokseumawe",tt:"@bulogbisnislhokseumawe"},
  {code:"01020",short:"LANGSA",isKanwil:false,kanwilCode:"01001",ig:null,tt:"@bulogbisnislangsa"},
  {code:"01030",short:"MEULABOH",isKanwil:false,kanwilCode:"01001",ig:"@bulogbisnis.meulaboh",tt:"@bulogbisnis.kcmeulaboh"},
  {code:"01040",short:"SIGLI",isKanwil:false,kanwilCode:"01001",ig:"@bulogbisnis.sigli",tt:null},
  {code:"01050",short:"KUTACANE",isKanwil:false,kanwilCode:"01001",ig:"@bulogbisnis.kutacane",tt:null},
  {code:"01060",short:"BLANG PIDIE",isKanwil:false,kanwilCode:"01001",ig:"@bulogbisnis.blangpidie",tt:null},
  {code:"01070",short:"TAKENGON",isKanwil:false,kanwilCode:"01001",ig:"@bulogbisnis.tkengon",tt:null},
  {code:"02001",short:"SUMUT",isKanwil:true,kanwilCode:"02001",ig:"@bulogbisnis.sumut",tt:"@bulogbisnis.sumut"},
  {code:"02010",short:"I MEDAN",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisnis.medan",tt:"@bulogbisnis.medan"},
  {code:"02020",short:"PEMATANG SIANTAR",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisnis.pematangsiantar",tt:null},
  {code:"02030",short:"ASAHAN",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisnis.asahan",tt:"@bulogbisnis.kcasahan"},
  {code:"02040",short:"PADANG SIDEMPUAN",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisnis.padangsidimpuan",tt:"@bulogbisnis_kc.pdsdmpuan"},
  {code:"02050",short:"LABUHAN BATU",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisnis.labuhanbatu",tt:null},
  {code:"02060",short:"NIAS",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisnis_nias",tt:null},
  {code:"02070",short:"KARO",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisniskaro",tt:"@bulog.bisniskaro"},
  {code:"02080",short:"SIBOLGA",isKanwil:false,kanwilCode:"02001",ig:"@bulogbisnis.sibolga",tt:"@bulogbisniskcpsibolga"},
  {code:"03001",short:"RIAU & KEPRI",isKanwil:true,kanwilCode:"03001",ig:"@bulogbisnis.riaukepri",tt:"@bulogbisnis.riaukepri"},
  {code:"03010",short:"TANJUNG PINANG",isKanwil:false,kanwilCode:"03001",ig:"@bulogbisnis.tanjungpinang",tt:"@bulogbisnis.tanjungpinang"},
  {code:"03020",short:"DUMAI",isKanwil:false,kanwilCode:"03001",ig:"@bulogbisnis.dumai",tt:null},
  {code:"03030",short:"BATAM",isKanwil:false,kanwilCode:"03001",ig:"@bulogbisnis.batam",tt:"@bulogbisnis.batam"},
  {code:"03040",short:"BENGKALIS",isKanwil:false,kanwilCode:"03001",ig:"@bulogbisnis.bengkalis",tt:"@bulogbisnis.bengkalis"},
  {code:"03050",short:"TEMBILAHAN",isKanwil:false,kanwilCode:"03001",ig:"@bulogbisnis.tembilahan",tt:null},
  {code:"03060",short:"RENGAT",isKanwil:false,kanwilCode:"03001",ig:"@bulogbisnis.rengat",tt:"@bulogbisnis.kcrengat"},
  {code:"03070",short:"KAMPAR",isKanwil:false,kanwilCode:"03001",ig:"@bulogbisnis.kampar",tt:"@bulogbisnis.kcpkampar"},
  {code:"03080",short:"NATUNA",isKanwil:false,kanwilCode:"03001",ig:"@bulog.natuna",tt:null},
  {code:"04001",short:"SUMBAR",isKanwil:true,kanwilCode:"04001",ig:"@bulogbisnis.sumbar",tt:"@bulogbisnis_sumbar"},
  {code:"04010",short:"BUKIT TINGGI",isKanwil:false,kanwilCode:"04001",ig:"@bulogbisnis.bukittinggi",tt:"@bulogbisnis.kcbukittinggi"},
  {code:"04020",short:"SOLOK",isKanwil:false,kanwilCode:"04001",ig:"@bulogbisnis.solok",tt:"@bulogbisnis.kcsolok"},
  {code:"05001",short:"JAMBI",isKanwil:true,kanwilCode:"05001",ig:"@bulogbisnis.jambi",tt:"@bulogbisnis_jambi"},
  {code:"05010",short:"KUALA TUNGKAL",isKanwil:false,kanwilCode:"05001",ig:"@bulogbisnis.kualatungkal",tt:"@bulogbisnis.tungkal"},
  {code:"05020",short:"MUARA BUNGO",isKanwil:false,kanwilCode:"05001",ig:"@bulogbisnis.bungo",tt:null},
  {code:"05030",short:"SUNGAI PENUH",isKanwil:false,kanwilCode:"05001",ig:"@bulogbisnis.sungaipenuh",tt:null},
  {code:"05040",short:"MERANGIN",isKanwil:false,kanwilCode:"05001",ig:"@bulogbisnis.merangi",tt:null},
  {code:"06001",short:"SUMSEL",isKanwil:true,kanwilCode:"06001",ig:"@bulogbisnis.sumsel",tt:"@bulogbisnis_kanwilsumsel"},
  {code:"06010",short:"LAHAT",isKanwil:false,kanwilCode:"06001",ig:"@bulogbisnis.lahat",tt:"@bulogbisnis.lahat"},
  {code:"06020",short:"BANGKA",isKanwil:false,kanwilCode:"06001",ig:"@bulogbisnis.bangka",tt:"@bulogbisnis.kcbangka"},
  {code:"06030",short:"OGAN KOMERING ULU",isKanwil:false,kanwilCode:"06001",ig:"@bulogbisnis.ogankomeringulu",tt:"@bulogbisnis.kcoku"},
  {code:"06040",short:"LUBUKLINGGAU",isKanwil:false,kanwilCode:"06001",ig:"@bulogbisnis.lubuklinggau",tt:null},
  {code:"06050",short:"BELITUNG",isKanwil:false,kanwilCode:"06001",ig:"@bulogbisnis.belitung",tt:"@bulogbisnis.kcbelitung"},
  {code:"07001",short:"BENGKULU",isKanwil:true,kanwilCode:"07001",ig:"@bulogbisnis.bengkulu",tt:"@bulog.bengkulu"},
  {code:"07010",short:"REJANG LEBONG",isKanwil:false,kanwilCode:"07001",ig:"@bulogbisnis.rejanglebong",tt:"@bulogbisnis.rejanglebong"},
  {code:"08001",short:"LAMPUNG",isKanwil:true,kanwilCode:"08001",ig:"@bulogbisnis.lampung",tt:"@bulogbisnis.lampung"},
  {code:"08010",short:"METRO",isKanwil:false,kanwilCode:"08001",ig:"@bulogbisnis.metro",tt:null},
  {code:"08020",short:"LAMPUNG UTARA",isKanwil:false,kanwilCode:"08001",ig:"@bulogbisnis.lampungutara",tt:null},
  {code:"08030",short:"LAMPUNG SELATAN",isKanwil:false,kanwilCode:"08001",ig:"@bulogbisnis_lampungselatan",tt:null},
  {code:"08040",short:"TULANG BAWANG BARAT",isKanwil:false,kanwilCode:"08001",ig:"@bulogbisnis.tulangbawangbarat",tt:null},
  {code:"09001",short:"DKI JAKARTA",isKanwil:true,kanwilCode:"09001",ig:"@bulogbisnis.jakarta",tt:"@bulogbisnis.jakarta"},
  {code:"09010",short:"SERANG",isKanwil:false,kanwilCode:"09001",ig:"@bulogbisnis.serang",tt:"@bulogbisnis.serang"},
  {code:"09020",short:"TANGERANG",isKanwil:false,kanwilCode:"09001",ig:"@bulogbisnis.tangerang",tt:"@bulogbisnis.tangerang"},
  {code:"09030",short:"LEBAK",isKanwil:false,kanwilCode:"09001",ig:"@bulogbisnis.lebak",tt:"@bulogbisnis.kclebak"},
  {code:"10001",short:"JABAR",isKanwil:true,kanwilCode:"10001",ig:"@bulogbisnis.jabar",tt:"@bulogbisnis.jabar"},
  {code:"10010",short:"BANDUNG",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.bandung",tt:"@bulog.bandung"},
  {code:"10020",short:"CIANJUR",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.cianjur",tt:"@bulogbisniscianjur"},
  {code:"10030",short:"CIREBON",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.cirebon",tt:null},
  {code:"10040",short:"INDRAMAYU",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.indramayu",tt:"@bulogbisnis_kcindramayu"},
  {code:"10050",short:"KARAWANG",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.karawang",tt:"@bulogbisnis.kckarawang"},
  {code:"10060",short:"SUBANG",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.subang",tt:"@bulogbisnis.kcsubang"},
  {code:"10070",short:"CIAMIS",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.ciamis",tt:"@bulogbisnis.ciamis"},
  {code:"10080",short:"BOGOR",isKanwil:false,kanwilCode:"10001",ig:"@bulogbisnis.bogor",tt:"@bulogbisnis.bogor"},
  {code:"11001",short:"JATENG",isKanwil:true,kanwilCode:"11001",ig:"@bulogbisnis.jateng",tt:"@bulogbisnis.jateng"},
  {code:"11010",short:"SEMARANG",isKanwil:false,kanwilCode:"11001",ig:"@bulogbisnis.semarang",tt:"@bulogbisnis.seamarang"},
  {code:"11020",short:"PATI",isKanwil:false,kanwilCode:"11001",ig:"@bulogbisnis.pati",tt:"@bulogbisnis.kcpati"},
  {code:"11030",short:"SURAKARTA",isKanwil:false,kanwilCode:"11001",ig:"@bulogbisnis.surakarta",tt:"@bulogbisnis.surakarta"},
  {code:"11060",short:"TEGAL",isKanwil:false,kanwilCode:"11001",ig:"@bulogbisnis.tegal",tt:null},
  {code:"12001",short:"YOGYA",isKanwil:true,kanwilCode:"12001",ig:"@bulogbisnis.jogja",tt:"@bulogbisnis_kanwiljogja"},
  {code:"12010",short:"MAGELANG",isKanwil:false,kanwilCode:"12001",ig:"@bulogbisnis.magelang",tt:null},
  {code:"12020",short:"BANYUMAS",isKanwil:false,kanwilCode:"12001",ig:"@bulogbisnis.banyumas",tt:"@bulogbisnis.banyumas"},
  {code:"13001",short:"JATIM",isKanwil:true,kanwilCode:"13001",ig:"@bulogbisnis.jatim",tt:"@bulogbisnis.jatim"},
  {code:"13010",short:"SURABAYA",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.surabaya",tt:null},
  {code:"13020",short:"MOJOKERTO",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.mojokerto",tt:null},
  {code:"13030",short:"BOJONEGORO",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.bojonegoro",tt:null},
  {code:"13040",short:"MADIUN",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.madiun",tt:"@bulogbisnis.kcmadiun"},
  {code:"13050",short:"KEDIRI",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.kediri",tt:null},
  {code:"13060",short:"BONDOWOSO",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.bondowoso",tt:"@bulogbisnis.bondowoso"},
  {code:"13070",short:"MALANG",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.malang",tt:"@bulogbisnis.kcmalang"},
  {code:"13080",short:"PROBOLINGGO",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.probolinggo",tt:null},
  {code:"13090",short:"BANYUWANGI",isKanwil:false,kanwilCode:"13001",ig:null,tt:null},
  {code:"13100",short:"TULUNG AGUNG",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.tulungagung",tt:"@bulogbisnis_tulungagung"},
  {code:"13110",short:"JEMBER",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.jember",tt:null},
  {code:"13120",short:"MADURA",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.madura",tt:null},
  {code:"13130",short:"PONOROGO",isKanwil:false,kanwilCode:"13001",ig:"@bulogbisnis.ponorogo",tt:"@bulogbisnis.ponorogo"},
  {code:"14001",short:"KALBAR",isKanwil:true,kanwilCode:"14001",ig:"@bulogbisnis.kalbar",tt:"@bulogbisnis_kanwilkalbar"},
  {code:"14010",short:"SINGKAWANG",isKanwil:false,kanwilCode:"14001",ig:"@bulogbisnis.singkawang",tt:"@bulogbisnis.kcsingkawang"},
  {code:"14020",short:"KETAPANG",isKanwil:false,kanwilCode:"14001",ig:"@bulogbisnis.ketapang",tt:"@bulogbisnis_kcketapang"},
  {code:"14030",short:"SINTANG",isKanwil:false,kanwilCode:"14001",ig:"@bulogbisnis.sintang",tt:"@bulogbisnis.sintang"},
  {code:"14040",short:"PUTUSSIBAU",isKanwil:false,kanwilCode:"14001",ig:"@bulogbisnis.putussibau",tt:"@bulogbisniskcpputussibau"},
  {code:"14050",short:"SANGGAU",isKanwil:false,kanwilCode:"14001",ig:"@bulogbisnis.sanggau",tt:"@bulogbisnis.sanggau"},
  {code:"15001",short:"KALTIM",isKanwil:true,kanwilCode:"15001",ig:"@bulogbisnis.kaltimtara",tt:"@bulogbisnis_kaltimtara"},
  {code:"15010",short:"SAMARINDA",isKanwil:false,kanwilCode:"15001",ig:"@bulogbisnis.samarinda",tt:null},
  {code:"15020",short:"TARAKAN",isKanwil:false,kanwilCode:"15001",ig:"@bulogbisnis.tarakan",tt:"@bulogbisnis.tarakan"},
  {code:"15030",short:"BULUNGAN",isKanwil:false,kanwilCode:"15001",ig:"@bulogbisnis.bulungan",tt:null},
  {code:"15040",short:"PASER",isKanwil:false,kanwilCode:"15001",ig:"@bulogbisnis.paser",tt:null},
  {code:"15050",short:"BERAU",isKanwil:false,kanwilCode:"15001",ig:"@bulogbisnis.berau",tt:null},
  {code:"16001",short:"KALSEL",isKanwil:true,kanwilCode:"16001",ig:"@bulogbisniskalsel",tt:"@bulogbisnis.kalsel"},
  {code:"16010",short:"HULU SUNGAI TENGAH",isKanwil:false,kanwilCode:"16001",ig:"@bulog.bisnis.hst",tt:null},
  {code:"16020",short:"KOTABARU",isKanwil:false,kanwilCode:"16001",ig:null,tt:"@bulogbisnis.kcpkotabaru"},
  {code:"17001",short:"KALTENG",isKanwil:true,kanwilCode:"17001",ig:"@bulogbisnis.kalteng",tt:"@bulogbisnis.kalteng"},
  {code:"17010",short:"KAPUAS",isKanwil:false,kanwilCode:"17001",ig:"@bulogbisnis.kapuas",tt:"@bulogbisnis_kckapuas"},
  {code:"17020",short:"KOTAWARINGIN TIMUR",isKanwil:false,kanwilCode:"17001",ig:"@bulogbisnis.kotawaringintimur",tt:null},
  {code:"17030",short:"KOTAWARINGIN BARAT",isKanwil:false,kanwilCode:"17001",ig:"@bulogbisnis.kotawaringinbarat",tt:null},
  {code:"17040",short:"BARITO UTARA",isKanwil:false,kanwilCode:"17001",ig:"@bulogbisnis.baritoutara",tt:null},
  {code:"17050",short:"BARITO SELATAN",isKanwil:false,kanwilCode:"17001",ig:"@bulogbisnis.bariselatan",tt:null},
  {code:"18001",short:"SULUT",isKanwil:true,kanwilCode:"18001",ig:"@bulogbisnis.sulut",tt:"@bulogbisnis_sulut"},
  {code:"18010",short:"GORONTALO",isKanwil:false,kanwilCode:"18001",ig:"@bulogbisnis.gorontalo",tt:"@bulogbisnis_kcgorontalo"},
  {code:"18020",short:"TAHUNA",isKanwil:false,kanwilCode:"18001",ig:"@bulogbisnis.tahuna",tt:"@bulogbisnis_kctahuna"},
  {code:"18030",short:"BOLAANG MONGONDOW",isKanwil:false,kanwilCode:"18001",ig:"@bulogbisnis.bolaangmongondow",tt:null},
  {code:"19001",short:"SULTENG",isKanwil:true,kanwilCode:"19001",ig:"@bulogbisnis.sulteng",tt:"@bulogkanwilsulteng"},
  {code:"19010",short:"POSO",isKanwil:false,kanwilCode:"19001",ig:"@bulogbisnis.poso",tt:"@bulogbisnis.kcposo"},
  {code:"19020",short:"LUWUK",isKanwil:false,kanwilCode:"19001",ig:"@bulogbisnis.luwuk",tt:"@bulogbisnis.kcluwuk"},
  {code:"19030",short:"TOLI-TOLI",isKanwil:false,kanwilCode:"19001",ig:"@bulogbisnis.tolitoli",tt:"@bulogbisnis.tolitoli"},
  {code:"20001",short:"SULTRA",isKanwil:true,kanwilCode:"20001",ig:"@bulogbisnis.sultra",tt:"@bulogbisnis.sultra"},
  {code:"20010",short:"BAUBAU",isKanwil:false,kanwilCode:"20001",ig:"@bulogbisnis.baubau",tt:"@bulogbisnis.kcbaubau"},
  {code:"20020",short:"UNAAHA",isKanwil:false,kanwilCode:"20001",ig:"@bulogbisnis.unaaha",tt:"@bulogbisnis.kcunaaha"},
  {code:"20030",short:"BOMBANA",isKanwil:false,kanwilCode:"20001",ig:"@bulogbisnis.bombana",tt:"@bulogbisnis.bombana"},
  {code:"20040",short:"KOLAKA",isKanwil:false,kanwilCode:"20001",ig:"@bulogbisnis.kolaka",tt:"@bulogbisnis_kcpkolaka"},
  {code:"20050",short:"RAHA",isKanwil:false,kanwilCode:"20001",ig:"@bulogbisnis.raha",tt:null},
  {code:"21001",short:"SULSEL",isKanwil:true,kanwilCode:"21001",ig:"@bulogbisnis.sulselbar",tt:"@bulogbisnis_sulselbar"},
  {code:"21010",short:"POLMAN",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.polman",tt:null},
  {code:"21020",short:"PARE PARE",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.parepare",tt:"@bulogbisnis.kcparepare"},
  {code:"21030",short:"SIDRAP",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.sidrap",tt:"@bulogbisnis.kcsidrap"},
  {code:"21040",short:"WAJO",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.wajo",tt:"@bulogbisnis.kcwajo"},
  {code:"21050",short:"BULUKUMBA",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.bulukumba",tt:"@bulogbisnis.kcbulukumba"},
  {code:"21060",short:"PALOPO",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.palopo",tt:"@bulogbisnis.palopo"},
  {code:"21070",short:"MAKASSAR",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.makassar",tt:null},
  {code:"21080",short:"MAMUJU",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.mamuju",tt:"@bulogbisnis_kcmamuju"},
  {code:"21090",short:"PINRANG",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.pinrang",tt:null},
  {code:"21100",short:"SOPPENG",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.soppeng",tt:null},
  {code:"21110",short:"BONE",isKanwil:false,kanwilCode:"21001",ig:"@bulogbisnis.bone",tt:null},
  {code:"22001",short:"BALI",isKanwil:true,kanwilCode:"22001",ig:"@bulogbisnis.bali",tt:"@bulogbisnis.kanwilbali"},
  {code:"23001",short:"N.T.B",isKanwil:true,kanwilCode:"23001",ig:"@bulogbisnis.ntb",tt:null},
  {code:"23010",short:"SUMBAWA",isKanwil:false,kanwilCode:"23001",ig:"@bulogbisnis.sumbawa",tt:"@bulogbisnis.sumbawa"},
  {code:"23020",short:"BIMA",isKanwil:false,kanwilCode:"23001",ig:"@bulogbisnis.bima",tt:"@bulogbisnis.bima"},
  {code:"23030",short:"LOMBOK TIMUR",isKanwil:false,kanwilCode:"23001",ig:"@bulogbisnis.lomboktimur",tt:null},
  {code:"24001",short:"N.T.T",isKanwil:true,kanwilCode:"24001",ig:"@bulogbisnis.ntt",tt:"@bulogbisnis.ntt"},
  {code:"24010",short:"WAINGAPU",isKanwil:false,kanwilCode:"24001",ig:"@bulogbisnis.waingapu",tt:"@bulogbisnis.kc_waingapu"},
  {code:"24020",short:"ENDE",isKanwil:false,kanwilCode:"24001",ig:"@bulogbisnis.ende",tt:"@bulogbisnis_kcende"},
  {code:"24030",short:"LARANTUKA",isKanwil:false,kanwilCode:"24001",ig:null,tt:null},
  {code:"24040",short:"MAUMERE",isKanwil:false,kanwilCode:"24001",ig:null,tt:null},
  {code:"24050",short:"ATAMBUA",isKanwil:false,kanwilCode:"24001",ig:null,tt:null},
  {code:"24060",short:"WAIKABUBAK",isKanwil:false,kanwilCode:"24001",ig:"@bulogbisnis.waikabubak",tt:null},
  {code:"24070",short:"RUTENG",isKanwil:false,kanwilCode:"24001",ig:null,tt:"@bulogbisnis_ruteng"},
  {code:"24080",short:"BAJAWA",isKanwil:false,kanwilCode:"24001",ig:"@bulogbisnis.bajawa",tt:"@bulogbisnis_kcbajawa"},
  {code:"24090",short:"LABUAN BAJO",isKanwil:false,kanwilCode:"24001",ig:"@bulogbisnis.labuanbajo",tt:"@bulogbisnis_labuanbajo"},
  {code:"24100",short:"KALABAHI",isKanwil:false,kanwilCode:"24001",ig:"@bulogbisnis.kalabahi",tt:"@bulog.bisnis.kalabahi"},
  {code:"25001",short:"MALUKU",isKanwil:true,kanwilCode:"25001",ig:"@bulogbisnis.malukumalut",tt:"@bulogbisnis.maluku_malut"},
  {code:"25010",short:"TERNATE",isKanwil:false,kanwilCode:"25001",ig:"@bulogbisnis.ternate",tt:"@bulogbisnis.ternate"},
  {code:"25020",short:"LANGGUR",isKanwil:false,kanwilCode:"25001",ig:"@bulogbisnis.langgur",tt:"@bisniskclanggur"},
  {code:"26001",short:"PAPUA",isKanwil:true,kanwilCode:"26001",ig:"@bulogbisnis.papuapabar",tt:"@bulogbisnis_papuapabar"},
  {code:"26010",short:"BIAK",isKanwil:false,kanwilCode:"26001",ig:"@bulogbisnis.biak",tt:"@bulogbisnis.kcbiak"},
  {code:"26020",short:"MANOKWARI",isKanwil:false,kanwilCode:"26001",ig:"@bulogbisnis.manokwari",tt:"@bulogbisnis.kcmanokwari"},
  {code:"26030",short:"FAK-FAK",isKanwil:false,kanwilCode:"26001",ig:"@bulogbisnis.fakfak",tt:"@bulogbisnis_kcfakfak"},
  {code:"26040",short:"SORONG",isKanwil:false,kanwilCode:"26001",ig:"@bulogbisnis.sorong",tt:"@bulogbisnis_kcsorong"},
  {code:"26050",short:"MERAUKE",isKanwil:false,kanwilCode:"26001",ig:"@bulogbisnis.merauke",tt:null},
  {code:"26060",short:"WAMENA",isKanwil:false,kanwilCode:"26001",ig:null,tt:"@bulogbisnis.kcpwamena"},
  {code:"26070",short:"TIMIKA",isKanwil:false,kanwilCode:"26001",ig:"@bulogbisnistimika",tt:"@bulogbisnis.kcptimika"},
  {code:"26080",short:"SERUI",isKanwil:false,kanwilCode:"26001",ig:null,tt:"@bulogbisnis.kcpserui"},
  {code:"26090",short:"NABIRE",isKanwil:false,kanwilCode:"26001",ig:"@bulogbisnis.nabire",tt:"@bulogbisnis.kcpnabire"},
  {code:"26100",short:"TEMINABUAN",isKanwil:false,kanwilCode:"26001",ig:null,tt:"@kcpteminabuan"},
];

const KANWILS = RAW_ENTRIES.filter(e => e.isKanwil);
const CABANGS = RAW_ENTRIES.filter(e => !e.isKanwil);
const JUMPOST_LIST = ["Jumpost #1 Promosi","Jumpost #2 Edukasi","Jumpost #3 Kampanye","Jumpost #4 Lokal","Jumpost #5 Testimoni"];
const B = { blue:"#2B5DAD", gold:"#F5A623", midBlue:"#1A3F7A", lightBlue:"#E8F0FB", pale:"#F4F6FB" };
const C = { success:"#16A34A", warn:"#D97706", danger:"#DC2626" };

function r(seed) { let s=seed*9301+49297; s=(s*9301+49297)%233280; return s/233280; }
function generateData(platform) {
  return CABANGS.map((c,i) => {
    const base = i*31+(platform==="tiktok"?1000:0);
    const hasAcc = platform==="instagram"?c.ig:c.tt;
    const followers = hasAcc?Math.round((r(base)*15000+1500)/100)*100:0;
    const posts = hasAcc?Math.round(r(base+1)*50+5):0;
    const er = hasAcc?+((r(base+2)*7+1).toFixed(1)):0;
    const reach = hasAcc?Math.round(followers*(r(base+3)*2.5+0.5)):0;
    const growth = hasAcc?+((r(base+4)*8-2).toFixed(1)):0;
    const jumpost = {};
    JUMPOST_LIST.forEach((_,ji)=>{ jumpost[ji]=hasAcc&&r(base+10+ji)>0.25; });
    const contentType=["Reels","Feed/Foto","Video","Carousel"][Math.floor(r(base+5)*4)];
    return {...c,followers,posts,er,reach,growth,jumpost,contentType,hasAcc:!!hasAcc};
  });
}
const IG_DATA = generateData("instagram");
const TT_DATA = generateData("tiktok");
function fmt(n){if(n>=1e6)return(n/1e6).toFixed(1)+"Jt";if(n>=1e3)return(n/1e3).toFixed(1)+"Rb";return String(n);}

export default function Dashboard() {
  const [platform,setPlatform]=useState("instagram");
  const [selKanwil,setSelKanwil]=useState("all");
  const [tab,setTab]=useState("overview");
  const [sortBy,setSortBy]=useState("er");
  const [search,setSearch]=useState("");
  const data=platform==="instagram"?IG_DATA:TT_DATA;
  const filtered=useMemo(()=>{
    let d=data;
    if(selKanwil!=="all")d=d.filter(c=>c.kanwilCode===selKanwil);
    if(search)d=d.filter(c=>c.short.toLowerCase().includes(search.toLowerCase())||(c.ig||"").includes(search)||(c.tt||"").includes(search));
    return [...d].sort((a,b)=>b[sortBy]-a[sortBy]);
  },[data,selKanwil,search,sortBy]);
  const active=filtered.filter(c=>c.hasAcc);
  const totalFollowers=active.reduce((s,c)=>s+c.followers,0);
  const avgER=active.length?(active.reduce((s,c)=>s+c.er,0)/active.length).toFixed(1):0;
  const totalReach=active.reduce((s,c)=>s+c.reach,0);
  const jumpostStats=JUMPOST_LIST.map((j,ji)=>({label:j,done:active.filter(c=>c.jumpost[ji]).length,total:active.length}));
  const overallJumpost=active.length?Math.round(jumpostStats.reduce((s,j)=>s+j.done,0)/(JUMPOST_LIST.length*active.length||1)*100):0;
  const kanwilRanking=useMemo(()=>KANWILS.map(k=>{
    const cabs=data.filter(c=>c.kanwilCode===k.code&&c.hasAcc);
    const avgEr=cabs.length?(cabs.reduce((s,c)=>s+c.er,0)/cabs.length).toFixed(1):0;
    const totF=cabs.reduce((s,c)=>s+c.followers,0);
    return{...k,avgEr:+avgEr,totalFollowers:totF,cabAktif:cabs.length,cabTotal:CABANGS.filter(c=>c.kanwilCode===k.code).length};
  }).sort((a,b)=>b.avgEr-a.avgEr),[data]);
  const accentColor=platform==="instagram"?"#E1306C":"#111";
  const tabs=[{k:"overview",l:"Overview"},{k:"cabang",l:"Detail Cabang"},{k:"jumpost",l:"JUMPOST"},{k:"ranking",l:"Ranking"}];

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"system-ui,sans-serif",background:B.pale,fontSize:13,color:"#1a1a1a"}}>
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#f1f1f1;}::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px;}`}</style>
      {/* Sidebar */}
      <div style={{width:210,background:"#fff",borderRight:`1px solid ${B.lightBlue}`,display:"flex",flexDirection:"column",flexShrink:0,overflow:"hidden"}}>
        <div style={{padding:"14px 14px 10px",borderBottom:`1px solid ${B.lightBlue}`,display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${B.blue},${B.midBlue})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 12C3 7 7 3 12 3s9 4 9 9-4 9-9 9-9-4-9-9z" stroke="#fff" strokeWidth="2"/><path d="M8 12l2.5 2.5L16 9" stroke={B.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div style={{fontWeight:800,fontSize:13,color:B.midBlue}}>befood</div>
            <div style={{fontSize:10,color:"#aaa"}}>Sosmed Audit</div>
          </div>
        </div>
        <div style={{padding:"10px 10px 6px"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>Platform</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            {[["instagram","Instagram","#E1306C"],["tiktok","TikTok","#111"]].map(([p,l,col])=>(
              <button key={p} onClick={()=>setPlatform(p)} style={{padding:"6px 0",borderRadius:7,border:`1.5px solid`,borderColor:platform===p?col:"#E8E8E8",background:platform===p?col:"transparent",color:platform===p?"#fff":"#888",fontSize:11,fontWeight:700,cursor:"pointer"}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"10px 10px 3px",fontSize:10,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.07em"}}>Menu</div>
        {tabs.map(t=>(
          <div key={t.k} onClick={()=>setTab(t.k)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,margin:"1px 6px",fontSize:12,cursor:"pointer",fontWeight:tab===t.k?700:400,color:tab===t.k?B.blue:"#555",background:tab===t.k?B.lightBlue:"transparent"}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:tab===t.k?B.blue:"#ddd",flexShrink:0}}/>
            {t.l}
          </div>
        ))}
        <div style={{padding:"10px 10px 3px",fontSize:10,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.07em"}}>Kanwil</div>
        <div style={{flex:1,overflowY:"auto",padding:"4px 6px 8px"}}>
          {[{code:"all",short:"Semua Kanwil"},...KANWILS].map(k=>{
            const cnt=k.code==="all"?CABANGS.length:CABANGS.filter(c=>c.kanwilCode===k.code).length;
            return(
              <div key={k.code} onClick={()=>setSelKanwil(k.code)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",borderRadius:7,cursor:"pointer",fontSize:11,color:selKanwil===k.code?B.blue:"#555",fontWeight:selKanwil===k.code?700:400,background:selKanwil===k.code?B.lightBlue:"transparent",marginBottom:1}}>
                <span>{k.short}</span>
                <span style={{fontSize:10,fontWeight:700,padding:"1px 5px",borderRadius:99,background:B.lightBlue,color:B.blue}}>{cnt}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{background:"#fff",borderBottom:`1px solid ${B.lightBlue}`,padding:"10px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:B.midBlue}}>{selKanwil==="all"?"Overview Seluruh Kanwil":"Kanwil "+KANWILS.find(k=>k.code===selKanwil)?.short}</div>
            <div style={{fontSize:11,color:"#999",marginTop:1}}>{filtered.length} cabang · {active.length} aktif · {platform==="instagram"?"Instagram":"TikTok"}</div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{padding:"3px 9px",borderRadius:99,fontSize:10,fontWeight:700,background:accentColor+"22",color:accentColor}}>{platform==="instagram"?"Instagram":"TikTok"}</span>
            <span style={{padding:"3px 9px",borderRadius:99,fontSize:10,fontWeight:700,background:B.lightBlue,color:B.blue}}>Jun 2026</span>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:14}}>
          {tab==="overview"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
              {[
                {l:"Total Followers",v:fmt(totalFollowers),ch:"+2.8%",up:true,col:B.blue},
                {l:"Avg Engagement Rate",v:avgER+"%",ch:"+0.3%",up:true,col:B.gold},
                {l:"Total Reach",v:fmt(totalReach),ch:"-0.9%",up:false,col:B.blue},
                {l:"Kepatuhan JUMPOST",v:overallJumpost+"%",ch:`${active.filter(c=>Object.values(c.jumpost).every(Boolean)).length}/${active.length}`,up:overallJumpost>=80,col:C.success},
              ].map((m,i)=>(
                <div key={i} style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px",borderTop:`3px solid ${m.col}`}}>
                  <div style={{fontSize:11,color:"#999",fontWeight:600,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.04em"}}>{m.l}</div>
                  <div style={{fontSize:24,fontWeight:800,color:B.midBlue}}>{m.v}</div>
                  <div style={{fontSize:11,marginTop:3,fontWeight:600,color:m.up?C.success:C.danger}}>{m.up?"↑":"↓"} {m.ch}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px"}}>
                <div style={{fontSize:12,fontWeight:800,color:B.midBlue,marginBottom:11}}>Ranking Kanwil</div>
                {kanwilRanking.slice(0,8).map((k,i)=>{
                  const max=kanwilRanking[0].avgEr||1;
                  return(
                    <div key={k.code} onClick={()=>setSelKanwil(k.code)} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer"}}>
                      <span style={{width:16,textAlign:"right",fontSize:11,color:i<3?B.gold:"#ccc",fontWeight:700}}>{["①","②","③"][i]||i+1}</span>
                      <span style={{flex:1,fontSize:12,color:"#333",fontWeight:i<3?700:400}}>{k.short}</span>
                      <div style={{width:72,height:5,borderRadius:99,background:B.lightBlue}}>
                        <div style={{width:(k.avgEr/max*100)+"%",height:5,borderRadius:99,background:i<3?B.gold:B.blue}}/>
                      </div>
                      <span style={{fontSize:12,fontWeight:700,color:B.blue,width:34,textAlign:"right"}}>{k.avgEr}%</span>
                    </div>
                  );
                })}
              </div>
              <div style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px"}}>
                <div style={{fontSize:12,fontWeight:800,color:B.midBlue,marginBottom:11}}>Status JUMPOST</div>
                {jumpostStats.map((j,i)=>{
                  const pct=j.total?Math.round(j.done/j.total*100):0;
                  const col=pct>=90?C.success:pct>=70?C.warn:C.danger;
                  return(
                    <div key={i} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:11}}>
                        <span style={{color:"#444",fontWeight:500}}>{j.label}</span>
                        <span style={{fontWeight:700,color:col}}>{j.done}/{j.total}</span>
                      </div>
                      <div style={{height:5,background:B.lightBlue,borderRadius:99}}>
                        <div style={{width:pct+"%",height:5,borderRadius:99,background:col}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px"}}>
              <div style={{fontSize:12,fontWeight:800,color:B.midBlue,marginBottom:11}}>Top 10 Cabang — Engagement Rate</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr>{["#","Cabang","Kanwil","Akun","Followers","ER","Reach"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 8px",fontSize:10,fontWeight:700,color:"#aaa",borderBottom:`1.5px solid ${B.lightBlue}`}}>{h}</th>)}</tr></thead>
                <tbody>
                  {[...active].sort((a,b)=>b.er-a.er).slice(0,10).map((c,i)=>(
                    <tr key={c.code} style={{background:i%2?"#fff":B.pale}}>
                      <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,color:i<3?B.gold:"#ccc",fontWeight:800}}>{["①","②","③"][i]||i+1}</td>
                      <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontWeight:700,color:B.midBlue}}>KC {c.short}</td>
                      <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,color:"#888",fontSize:11}}>{KANWILS.find(k=>k.code===c.kanwilCode)?.short}</td>
                      <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,color:B.blue,fontSize:11}}>{platform==="instagram"?c.ig:c.tt}</td>
                      <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`}}>{fmt(c.followers)}</td>
                      <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontWeight:800,color:B.blue}}>{c.er}%</td>
                      <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`}}>{fmt(c.reach)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}
          {tab==="cabang"&&<>
            <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"space-between"}}>
              <input placeholder="Cari cabang / akun..." value={search} onChange={e=>setSearch(e.target.value)} style={{padding:"7px 12px",borderRadius:8,border:`1.5px solid ${B.lightBlue}`,fontSize:12,outline:"none",width:200,background:"#FAFBFF"}}/>
              <div style={{display:"flex",gap:2}}>
                <span style={{fontSize:11,color:"#aaa",marginRight:4}}>Urutkan:</span>
                {[["er","ER"],["followers","Followers"],["reach","Reach"],["posts","Posts"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setSortBy(k)} style={{padding:"4px 9px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer",border:"1.5px solid",borderColor:sortBy===k?B.blue:"#E8E8E8",background:sortBy===k?B.blue:"transparent",color:sortBy===k?"#fff":"#888"}}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr>{["Kode","Cabang","Kanwil","Akun","Followers","Tumbuh","ER","Reach","JUMPOST"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 8px",fontSize:10,fontWeight:700,color:"#aaa",borderBottom:`1.5px solid ${B.lightBlue}`}}>{h}</th>)}</tr></thead>
                <tbody>
                  {filtered.map((c,i)=>{
                    const jpDone=Object.values(c.jumpost).filter(Boolean).length;
                    const jpCol=jpDone===JUMPOST_LIST.length?C.success:jpDone>=3?C.warn:C.danger;
                    const acc=platform==="instagram"?c.ig:c.tt;
                    return(
                      <tr key={c.code} style={{background:i%2?"#fff":B.pale}}>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontSize:10,color:"#aaa",fontFamily:"monospace"}}>{c.code}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontWeight:700,color:B.midBlue}}>KC {c.short}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontSize:11,color:"#888"}}>{KANWILS.find(k=>k.code===c.kanwilCode)?.short}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontSize:11,color:acc?B.blue:"#ddd"}}>{acc||"—"}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`}}>{c.hasAcc?fmt(c.followers):"—"}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontWeight:700,color:c.growth>=0?C.success:C.danger}}>{c.hasAcc?(c.growth>=0?"+":"")+c.growth+"%":"—"}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontWeight:800,color:B.blue}}>{c.hasAcc?c.er+"%":"—"}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`}}>{c.hasAcc?fmt(c.reach):"—"}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`}}>{c.hasAcc?<span style={{padding:"2px 8px",borderRadius:99,fontSize:10,fontWeight:700,background:jpCol+"22",color:jpCol}}>{jpDone}/{JUMPOST_LIST.length}</span>:"—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>}
          {tab==="jumpost"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
              {jumpostStats.map((j,i)=>{
                const pct=j.total?Math.round(j.done/j.total*100):0;
                const col=pct>=90?C.success:pct>=70?C.warn:C.danger;
                return(
                  <div key={i} style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px",borderTop:`3px solid ${col}`}}>
                    <div style={{fontSize:11,color:"#999",fontWeight:600,marginBottom:5}}>{j.label}</div>
                    <div style={{fontSize:24,fontWeight:800,color:col}}>{pct}%</div>
                    <div style={{fontSize:11,color:"#aaa",marginTop:3}}>{j.done}/{j.total} cabang</div>
                  </div>
                );
              })}
            </div>
            <div style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr>
                  <th style={{textAlign:"left",padding:"6px 8px",fontSize:10,fontWeight:700,color:"#aaa",borderBottom:`1.5px solid ${B.lightBlue}`}}>Cabang</th>
                  <th style={{textAlign:"left",padding:"6px 8px",fontSize:10,fontWeight:700,color:"#aaa",borderBottom:`1.5px solid ${B.lightBlue}`}}>Kanwil</th>
                  {JUMPOST_LIST.map((_,ji)=><th key={ji} style={{textAlign:"center",padding:"6px 8px",fontSize:10,fontWeight:700,color:"#aaa",borderBottom:`1.5px solid ${B.lightBlue}`}}>#{ji+1}</th>)}
                  <th style={{textAlign:"left",padding:"6px 8px",fontSize:10,fontWeight:700,color:"#aaa",borderBottom:`1.5px solid ${B.lightBlue}`}}>Total</th>
                </tr></thead>
                <tbody>
                  {filtered.map((c,i)=>{
                    const done=Object.values(c.jumpost).filter(Boolean).length;
                    const col=done===JUMPOST_LIST.length?C.success:done>=3?C.warn:C.danger;
                    return(
                      <tr key={c.code} style={{background:i%2?"#fff":B.pale}}>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontWeight:700,color:B.midBlue}}>KC {c.short}</td>
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,fontSize:11,color:"#888"}}>{KANWILS.find(k=>k.code===c.kanwilCode)?.short}</td>
                        {JUMPOST_LIST.map((_,ji)=>(
                          <td key={ji} style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`,textAlign:"center"}}>
                            {c.hasAcc?(c.jumpost[ji]?<span style={{color:C.success,fontWeight:800}}>✓</span>:<span style={{color:C.danger,fontWeight:800}}>✗</span>):<span style={{color:"#ddd"}}>—</span>}
                          </td>
                        ))}
                        <td style={{padding:"7px 8px",borderBottom:`1px solid #F5F6FA`}}>{c.hasAcc?<span style={{padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:700,background:col+"22",color:col}}>{done}/{JUMPOST_LIST.length}</span>:"—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>}
          {tab==="ranking"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px"}}>
                <div style={{fontSize:12,fontWeight:800,color:B.midBlue,marginBottom:11}}>Ranking Kanwil</div>
                {kanwilRanking.map((k,i)=>{
                  const max=kanwilRanking[0].avgEr||1;
                  const medal=["🥇","🥈","🥉"][i]||"";
                  return(
                    <div key={k.code} onClick={()=>setSelKanwil(k.code)} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:`1px solid ${B.lightBlue}`,cursor:"pointer"}}>
                      <span style={{width:22,textAlign:"center",fontSize:i<3?15:11,color:"#ccc"}}>{medal||i+1}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:i<3?800:600,fontSize:12,color:B.midBlue}}>{k.short}</div>
                        <div style={{fontSize:10,color:"#aaa"}}>{k.cabAktif}/{k.cabTotal} aktif</div>
                      </div>
                      <div style={{width:70,height:5,borderRadius:99,background:B.lightBlue}}>
                        <div style={{width:(k.avgEr/max*100)+"%",height:5,borderRadius:99,background:i<3?B.gold:B.blue}}/>
                      </div>
                      <span style={{fontWeight:800,color:B.blue,width:36,textAlign:"right",fontSize:12}}>{k.avgEr}%</span>
                    </div>
                  );
                })}
              </div>
              <div style={{background:"#fff",border:`1px solid ${B.lightBlue}`,borderRadius:12,padding:"13px 15px"}}>
                <div style={{fontSize:12,fontWeight:800,color:B.midBlue,marginBottom:11}}>Top 20 Cabang</div>
                {[...active].sort((a,b)=>b.er-a.er).slice(0,20).map((c,i)=>{
                  const medal=["🥇","🥈","🥉"][i]||"";
                  return(
                    <div key={c.code} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${B.lightBlue}`}}>
                      <span style={{width:22,textAlign:"center",fontSize:i<3?14:11,color:"#ccc"}}>{medal||i+1}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:i<3?800:600,fontSize:12,color:B.midBlue}}>KC {c.short}</div>
                        <div style={{fontSize:10,color:"#aaa"}}>{KANWILS.find(k=>k.code===c.kanwilCode)?.short}</div>
                      </div>
                      <span style={{fontWeight:800,color:B.blue,fontSize:12}}>{c.er}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
