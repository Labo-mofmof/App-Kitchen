var foodList = [{"id":"01146","name":"お好み焼き粉","location":"1","unit":"g"},{"id":"01024","name":"ホットケーキミックス","location":"1","unit":"g"},{"id":"01147","name":"から揚げ粉","location":"1","unit":"g"},{"id":"01025","name":"天ぷら粉","location":"1","unit":"g"},{"id":"01026","name":"食パン","location":"1","unit":"枚"},{"id":"01028","name":"コッペパン","location":"1","unit":"個"},{"id":"01031","name":"フランスパン","location":"1","unit":"個"},{"id":"01032","name":"ライ麦パン","location":"1","unit":"個"},{"id":"01034","name":"ロールパン","location":"1","unit":"個"},{"id":"01035","name":"クロワッサン","location":"1","unit":"個"},{"id":"01036","name":"イングリッシュマフィン","location":"1","unit":"個"},{"id":"01037","name":"ナン","location":"1","unit":"枚"},{"id":"01148","name":"ベーグル","location":"1","unit":"個"},{"id":"01039","name":"うどん","location":"1","unit":"人前"},{"id":"01043","name":"そうめん","location":"1","unit":"人前"},{"id":"01047","name":"中華めん","location":"1","unit":"袋"},{"id":"01057","name":"インスタントラーメン","location":"1","unit":"袋"},{"id":"01059","name":"カップラーメン","location":"1","unit":"個"},{"id":"01060","name":"カップラーメン（焼きそば）","location":"1","unit":"個"},{"id":"01061","name":"カップラーメン（ノンフライ）","location":"1","unit":"個"},{"id":"01063","name":"マカロニ","location":"1","unit":"g"},{"id":"01064","name":"パスタ","location":"1","unit":"g"},{"id":"01074","name":"ぎょうざの皮","location":"1","unit":"枚"},{"id":"01075","name":"しゅうまいの皮","location":"1","unit":"枚"},{"id":"01076","name":"ピザ生地","location":"1","unit":"枚"},{"id":"01069","name":"ちくわぶ","location":"1","unit":"個"},{"id":"01077","name":"生パン粉","location":"1","unit":"g"},{"id":"01079","name":"パン粉","location":"1","unit":"g"},{"id":"01088","name":"米","location":"1","unit":"g"},{"id":"01093","name":"おかゆ","location":"1","unit":"g"},{"id":"01114","name":"上新粉","location":"1","unit":"g"},{"id":"01158","name":"米粉","location":"1","unit":"g"},{"id":"01159","name":"米粉パン","location":"1","unit":"個"},{"id":"01115","name":"ビーフン","location":"1","unit":"g"},{"id":"01117","name":"もち","location":"1","unit":"個"},{"id":"01118","name":"赤飯","location":"1","unit":"g"},{"id":"01128","name":"そば","location":"1","unit":"人前"},{"id":"01131","name":"とうもろこし","location":"1","unit":"g"},{"id":"01136","name":"ポップコーン","location":"1","unit":"g"},{"id":"01137","name":"コーンフレーク","location":"1","unit":"g"},{"id":"02003","name":"こんにゃく","location":"2","unit":"個"},{"id":"02005","name":"しらたき","location":"2","unit":"個"},{"id":"02007","name":"さつまいも","location":"2","unit":"個"},{"id":"02049","name":"むらさきいも","location":"2","unit":"個"},{"id":"02011","name":"さといも","location":"2","unit":"個"},{"id":"02019","name":"じゃがいも","location":"2","unit":"個"},{"id":"02024","name":"ながいも","location":"2","unit":"個"},{"id":"02062","name":"春雨","location":"2","unit":"個"},{"id":"03022","name":"はちみつ","location":"3","unit":"g"},{"id":"03023","name":"メープルシロップ","location":"3","unit":"g"},{"id":"04002","name":"あずき","location":"4","unit":"g"},{"id":"04004","name":"こしあん","location":"4","unit":"g"},{"id":"04006","name":"つぶあん","location":"4","unit":"g"},{"id":"04014","name":"グリーンピース","location":"4","unit":"g"},{"id":"04028","name":"大豆（水煮）","location":"4","unit":"g"},{"id":"04029","name":"きな粉","location":"4","unit":"g"},{"id":"04032","name":"木綿豆腐","location":"4","unit":"個"},{"id":"04033","name":"絹ごし豆腐","location":"4","unit":"個"},{"id":"04038","name":"焼き豆腐","location":"4","unit":"個"},{"id":"04039","name":"厚揚げ","location":"4","unit":"個"},{"id":"04040","name":"油揚げ","location":"4","unit":"個"},{"id":"04085","name":"焼き豆腐","location":"4","unit":"個"},{"id":"04041","name":"がんもどき","location":"4","unit":"個"},{"id":"04046","name":"納豆","location":"4","unit":"個"},{"id":"04051","name":"おから（生）","location":"4","unit":"g"},{"id":"04089","name":"おから（乾燥）","location":"4","unit":"g"},{"id":"04052","name":"豆乳","location":"4","unit":"ml"},{"id":"05001","name":"アーモンド","location":"5","unit":"g"},{"id":"05005","name":"カシューナッツ","location":"5","unit":"g"},{"id":"05009","name":"ぎんなん","location":"5","unit":"g"},{"id":"05011","name":"栗","location":"5","unit":"g"},{"id":"05012","name":"くり（甘露煮）","location":"5","unit":"g"},{"id":"05013","name":"甘栗","location":"5","unit":"g"},{"id":"05014","name":"くるみ","location":"5","unit":"g"},{"id":"05016","name":"ココナッツパウダー","location":"5","unit":"g"},{"id":"05018","name":"いりごま","location":"5","unit":"g"},{"id":"05042","name":"すりごま","location":"5","unit":"g"},{"id":"05029","name":"ヘーゼルナッツ","location":"5","unit":"g"},{"id":"05031","name":"マカダミアナッツ","location":"5","unit":"g"},{"id":"05037","name":"ピーナッツバター","location":"5","unit":"g"},{"id":"06003","name":"あさつき","location":"6","unit":"g"},{"id":"06008","name":"アスパラガス","location":"6","unit":"本"},{"id":"06011","name":"さやいんげん","location":"6","unit":"個"},{"id":"06016","name":"えだまめ","location":"6","unit":"個"},{"id":"06019","name":"豆苗","location":"6","unit":"個"},{"id":"06021","name":"さやえんどう","location":"6","unit":"個"},{"id":"06024","name":"グリーンピース","location":"6","unit":"g"},{"id":"06033","name":"オクラ","location":"6","unit":"個"},{"id":"06035","name":"かぶ","location":"6","unit":"個"},{"id":"06047","name":"かぼちゃ","location":"6","unit":"個"},{"id":"06055","name":"カリフラワー","location":"6","unit":"本"},{"id":"06061","name":"きゃべつ","location":"6","unit":"個"},{"id":"06065","name":"きゅうり","location":"6","unit":"本"},{"id":"06085","name":"ごぼう","location":"6","unit":"本"},{"id":"06087","name":"こまつな","location":"6","unit":"束"},{"id":"06088","name":"ザーサイ","location":"6","unit":"g"},{"id":"06094","name":"ししとう","location":"6","unit":"個"},{"id":"06095","name":"しそ","location":"6","unit":"枚"},{"id":"06100","name":"春菊","location":"6","unit":"個"},{"id":"06103","name":"生姜","location":"6","unit":"個"},{"id":"06116","name":"ズッキーニ","location":"6","unit":"本"},{"id":"06119","name":"セロリ","location":"6","unit":"個"},{"id":"06128","name":"かいわれ","location":"6","unit":"個"},{"id":"06130","name":"大根の葉","location":"6","unit":"個"},{"id":"06134","name":"大根","location":"6","unit":"本"},{"id":"06334","name":"切干しだいこん","location":"6","unit":"個"},{"id":"06138","name":"たくあん","location":"6","unit":"本"},{"id":"06143","name":"福神漬","location":"6","unit":"個"},{"id":"06148","name":"高菜","location":"6","unit":"個"},{"id":"06151","name":"たけのこ","location":"6","unit":"個"},{"id":"06152","name":"たけのこめんま塩蔵塩抜き","location":"6","unit":"個"},{"id":"06153","name":"玉ねぎ","location":"6","unit":"個"},{"id":"06156","name":"紫玉ねぎ","location":"6","unit":"個"},{"id":"06338","name":"チンゲンサイ","location":"6","unit":"束"},{"id":"06170","name":"とうがらし","location":"6","unit":"個"},{"id":"06174","name":"冬瓜","location":"6","unit":"個"},{"id":"06180","name":"スイートコーン","location":"6","unit":"個"},{"id":"06181","name":"ヤングコーン","location":"6","unit":"個"},{"id":"06182","name":"トマト","location":"6","unit":"個"},{"id":"06183","name":"ミニトマト","location":"6","unit":"個"},{"id":"06184","name":"トマト缶","location":"6","unit":"個"},{"id":"06185","name":"トマトジュース","location":"6","unit":"本"},{"id":"06342","name":"なす","location":"6","unit":"個"},{"id":"06194","name":"べいなす","location":"6","unit":"個"},{"id":"06344","name":"にら","location":"6","unit":"個"},{"id":"06215","name":"にんじん","location":"6","unit":"個"},{"id":"06349","name":"にんにく","location":"6","unit":"個"},{"id":"06226","name":"長ねぎ","location":"6","unit":"本"},{"id":"06227","name":"青ねぎ","location":"6","unit":"本"},{"id":"06228","name":"万能ねぎ","location":"6","unit":"本"},{"id":"06230","name":"野沢菜","location":"6","unit":"個"},{"id":"06234","name":"白菜","location":"6","unit":"個"},{"id":"06236","name":"キムチ","location":"6","unit":"個"},{"id":"06238","name":"バジル","location":"6","unit":"個"},{"id":"06239","name":"パセリ","location":"6","unit":"個"},{"id":"06246","name":"ピーマン","location":"6","unit":"個"},{"id":"06248","name":"パプリカ（赤）","location":"6","unit":"個"},{"id":"06250","name":"パプリカ（黄）","location":"6","unit":"個"},{"id":"06264","name":"ブロッコリー","location":"6","unit":"個"},{"id":"06354","name":"ブロッコリースプラウト","location":"6","unit":"個"},{"id":"06268","name":"ほうれんそう","location":"6","unit":"束"},{"id":"06072","name":"水菜","location":"6","unit":"束"},{"id":"06274","name":"みつば","location":"6","unit":"束"},{"id":"06280","name":"みょうが","location":"6","unit":"個"},{"id":"06284","name":"芽キャベツ","location":"6","unit":"個"},{"id":"06288","name":"もやし","location":"6","unit":"個"},{"id":"06312","name":"レタス","location":"6","unit":"個"},{"id":"06314","name":"リーフレタス","location":"6","unit":"個"},{"id":"06315","name":"サニーレタス","location":"6","unit":"個"},{"id":"06362","name":"サンチュ","location":"6","unit":"個"},{"id":"06318","name":"れんこん","location":"6","unit":"個"},{"id":"07006","name":"アボカド","location":"7","unit":"個"},{"id":"07012","name":"いちご","location":"7","unit":"個"},{"id":"07022","name":"梅干し","location":"7","unit":"個"},{"id":"07037","name":"グリーンオリーブ","location":"7","unit":"個"},{"id":"07038","name":"ブラックオリーブ","location":"7","unit":"個"},{"id":"07049","name":"柿","location":"7","unit":"個"},{"id":"07018","name":"いよかん","location":"7","unit":"個"},{"id":"07027","name":"みかん","location":"7","unit":"個"},{"id":"07030","name":"みかんジュース","location":"7","unit":"個"},{"id":"07035","name":"みかん（缶詰）","location":"7","unit":"個"},{"id":"07062","name":"グレープフルーツ","location":"7","unit":"個"},{"id":"07164","name":"ピンクグレープフルーツ","location":"7","unit":"個"},{"id":"07063","name":"グレープフルーツ","location":"7","unit":"個"},{"id":"07079","name":"すだち","location":"7","unit":"個"},{"id":"07142","name":"ゆず","location":"7","unit":"個"},{"id":"07145","name":"ライム","location":"7","unit":"個"},{"id":"07155","name":"レモン","location":"7","unit":"個"},{"id":"07054","name":"キウイ","location":"7","unit":"個"},{"id":"07168","name":"ゴールデンキウイ","location":"7","unit":"個"},{"id":"07158","name":"ココナッツミルク","location":"7","unit":"個"},{"id":"07170","name":"ナタデココ","location":"7","unit":"個"},{"id":"07070","name":"さくらんぼ","location":"7","unit":"個"},{"id":"07071","name":"アメリカンチェリー","location":"7","unit":"個"},{"id":"07077","name":"スイカ","location":"7","unit":"個"},{"id":"07081","name":"プルーン","location":"7","unit":"個"},{"id":"07088","name":"梨","location":"7","unit":"個"},{"id":"07097","name":"パイナップル","location":"7","unit":"個"},{"id":"07107","name":"バナナ","location":"7","unit":"個"},{"id":"07116","name":"ぶどう","location":"7","unit":"個"},{"id":"07124","name":"ブルーベリー","location":"7","unit":"個"},{"id":"07125","name":"ブルーベリージャム","location":"7","unit":"個"},{"id":"07132","name":"マンゴー","location":"7","unit":"個"},{"id":"07134","name":"メロン","location":"7","unit":"個"},{"id":"07136","name":"もも","location":"7","unit":"個"},{"id":"07176","name":"りんご","location":"7","unit":"個"},{"id":"08002","name":"えのきたけ","location":"8","unit":"個"},{"id":"08007","name":"きくらげ","location":"8","unit":"個"},{"id":"08041","name":"しいたけ","location":"8","unit":"個"},{"id":"08014","name":"乾燥しいたけ","location":"8","unit":"個"},{"id":"08046","name":"しめじ","location":"8","unit":"個"},{"id":"08021","name":"なめこ","location":"8","unit":"個"},{"id":"08050","name":"エリンギ","location":"8","unit":"個"},{"id":"08027","name":"ひらたけ","location":"8","unit":"個"},{"id":"08051","name":"まいたけ","location":"8","unit":"個"},{"id":"08052","name":"マッシュルーム","location":"8","unit":"個"},{"id":"09004","name":"焼きのり","location":"9","unit":"個"},{"id":"09005","name":"味付けのり","location":"9","unit":"個"},{"id":"09052","name":"ひじき","location":"9","unit":"g"},{"id":"09038","name":"もずく","location":"9","unit":"個"},{"id":"09041","name":"わかめ","location":"9","unit":"g"},{"id":"10389","name":"あじ","location":"10","unit":"個"},{"id":"10007","name":"あじの開き","location":"10","unit":"個"},{"id":"10016","name":"あなご","location":"10","unit":"個"},{"id":"10026","name":"あゆ","location":"10","unit":"個"},{"id":"10396","name":"生しらす","location":"10","unit":"g"},{"id":"10055","name":"しらす干し","location":"10","unit":"g"},{"id":"10398","name":"めかじき","location":"10","unit":"個"},{"id":"10086","name":"かつお","location":"10","unit":"個"},{"id":"10091","name":"鰹節","location":"10","unit":"g"},{"id":"10131","name":"鮭","location":"10","unit":"個"},{"id":"10155","name":"さば","location":"10","unit":"個"},{"id":"10161","name":"塩さば","location":"10","unit":"個"},{"id":"10163","name":"しめさば","location":"10","unit":"個"},{"id":"10164","name":"さば缶（水煮）","location":"10","unit":"個"},{"id":"10165","name":"さば缶（みそ煮）","location":"10","unit":"個"},{"id":"10174","name":"さんま","location":"10","unit":"個"},{"id":"10193","name":"まだい","location":"10","unit":"個"},{"id":"10205","name":"たら","location":"10","unit":"個"},{"id":"10208","name":"塩たら","location":"10","unit":"個"},{"id":"10241","name":"ぶり","location":"10","unit":"個"},{"id":"10243","name":"はまち","location":"10","unit":"個"},{"id":"10412","name":"ほっけ","location":"10","unit":"個"},{"id":"10253","name":"まぐろ（赤身）","location":"10","unit":"個"},{"id":"10255","name":"びんちょうまぐろ","location":"10","unit":"個"},{"id":"10262","name":"ツナ缶","location":"10","unit":"個"},{"id":"10281","name":"あさり","location":"10","unit":"個"},{"id":"10285","name":"あわび","location":"10","unit":"個"},{"id":"10286","name":"あわび（干し）","location":"10","unit":"個"},{"id":"10292","name":"かき","location":"10","unit":"個"},{"id":"10297","name":"しじみ","location":"10","unit":"個"},{"id":"10319","name":"あまえび","location":"10","unit":"個"},{"id":"10320","name":"いせえび","location":"10","unit":"個"},{"id":"10321","name":"くるまえび","location":"10","unit":"個"},{"id":"10324","name":"さくらえび","location":"10","unit":"個"},{"id":"10415","name":"バナメイエビ","location":"10","unit":"個"},{"id":"10329","name":"ブラックタイガー","location":"10","unit":"個"},{"id":"10339","name":"たらばがに","location":"10","unit":"個"},{"id":"10345","name":"いか","location":"10","unit":"個"},{"id":"10358","name":"塩辛","location":"10","unit":"個"},{"id":"10361","name":"たこ","location":"10","unit":"個"},{"id":"10365","name":"うに","location":"10","unit":"個"},{"id":"10376","name":"かにかま","location":"10","unit":"個"},{"id":"10379","name":"かまぼこ","location":"10","unit":"本"},{"id":"10381","name":"ちくわ","location":"10","unit":"個"},{"id":"10382","name":"だて巻","location":"10","unit":"個"},{"id":"10383","name":"つみれ","location":"10","unit":"個"},{"id":"10384","name":"なると","location":"10","unit":"個"},{"id":"10385","name":"はんぺん","location":"10","unit":"個"},{"id":"10386","name":"さつま揚げ","location":"10","unit":"個"},{"id":"10388","name":"魚肉ソーセージ","location":"10","unit":"個"},{"id":"11064","name":"牛肩ロース","location":"11","unit":"g"},{"id":"11268","name":"リブロース","location":"11","unit":"g"},{"id":"11071","name":"サーロイン","location":"11","unit":"g"},{"id":"11074","name":"カルビ","location":"11","unit":"g"},{"id":"11082","name":"ランプ","location":"11","unit":"g"},{"id":"11085","name":"牛ヒレ","location":"11","unit":"g"},{"id":"11272","name":"牛ひき肉","location":"11","unit":"g"},{"id":"11273","name":"牛タン","location":"11","unit":"g"},{"id":"11091","name":"はつ","location":"11","unit":"g"},{"id":"11092","name":"レバー","location":"11","unit":"g"},{"id":"11094","name":"みの","location":"11","unit":"g"},{"id":"11095","name":"はちのす","location":"11","unit":"g"},{"id":"11103","name":"牛テール","location":"11","unit":"g"},{"id":"11274","name":"はらみ","location":"11","unit":"g"},{"id":"11104","name":"ローストビーフ","location":"11","unit":"g"},{"id":"11105","name":"コンビーフ缶詰","location":"11","unit":"g"},{"id":"11107","name":"ビーフジャーキー","location":"11","unit":"g"},{"id":"11108","name":"スモークタン","location":"11","unit":"g"},{"id":"11119","name":"豚肩ロース","location":"11","unit":"g"},{"id":"11124","name":"豚ロース","location":"11","unit":"g"},{"id":"11277","name":"豚バラ","location":"11","unit":"g"},{"id":"11278","name":"豚ヒレ","location":"11","unit":"g"},{"id":"11280","name":"豚ひき肉","location":"11","unit":"g"},{"id":"11175","name":"ボンレスハム","location":"11","unit":"枚"},{"id":"11176","name":"ロースハム","location":"11","unit":"枚"},{"id":"11181","name":"生ハム","location":"11","unit":"枚"},{"id":"11183","name":"ベーコン","location":"11","unit":"個"},{"id":"11186","name":"ソーセージ","location":"11","unit":"袋"},{"id":"11189","name":"フランクフルト","location":"11","unit":"袋"},{"id":"11195","name":"焼き豚","location":"11","unit":"袋"},{"id":"11196","name":"レバーペースト","location":"11","unit":"個"},{"id":"11213","name":"鶏むね肉","location":"11","unit":"g"},{"id":"11215","name":"鶏もも肉","location":"11","unit":"g"},{"id":"11217","name":"ささみ","location":"11","unit":"g"},{"id":"11285","name":"手羽先","location":"11","unit":"g"},{"id":"11286","name":"手羽元","location":"11","unit":"g"},{"id":"11291","name":"鶏ひき肉","location":"11","unit":"g"},{"id":"11231","name":"鶏はつ","location":"11","unit":"g"},{"id":"11232","name":"鶏レバー","location":"11","unit":"g"},{"id":"11233","name":"砂肝","location":"11","unit":"g"},{"id":"11235","name":"鶏皮","location":"11","unit":"g"},{"id":"11236","name":"鶏軟骨","location":"11","unit":"g"},{"id":"11237","name":"焼き鳥缶詰","location":"11","unit":"個"},{"id":"11292","name":"チキンナゲット","location":"11","unit":"袋"},{"id":"11293","name":"つくね","location":"11","unit":"個"},{"id":"12003","name":"うずら卵","location":"12","unit":"個"},{"id":"12004","name":"卵","location":"12","unit":"個"},{"id":"12017","name":"たまご豆腐","location":"12","unit":"個"},{"id":"12018","name":"厚焼きたまご","location":"12","unit":"個"},{"id":"12019","name":"だし巻きたまご","location":"12","unit":"個"},{"id":"13003","name":"牛乳","location":"13","unit":"本"},{"id":"13007","name":"コーヒー牛乳","location":"13","unit":"本"},{"id":"13014","name":"生クリーム","location":"13","unit":"個"},{"id":"13017","name":"ホイップクリーム","location":"13","unit":"個"},{"id":"13025","name":"ヨーグルト","location":"13","unit":"個"},{"id":"13033","name":"カッテージチーズ","location":"13","unit":"個"},{"id":"13034","name":"カマンベールチーズ","location":"13","unit":"個"},{"id":"13035","name":"クリームチーズ","location":"13","unit":"個"},{"id":"13036","name":"ゴーダチーズ","location":"13","unit":"個"},{"id":"13037","name":"チェダーチーズ","location":"13","unit":"個"},{"id":"13038","name":"パルメザンチーズ","location":"13","unit":"個"},{"id":"13039","name":"ブルーチーズ","location":"13","unit":"個"},{"id":"13055","name":"マスカルポーネチーズ","location":"13","unit":"個"},{"id":"13056","name":"モッツァレラチーズ","location":"13","unit":"個"},{"id":"13058","name":"リコッタチーズ","location":"13","unit":"個"},{"id":"13043","name":"アイスクリーム","location":"13","unit":"個"}];
var seasoningList = [{id:'01015',name:'薄力粉'},{id:'01018',name:'中力粉'},{id:'01020',name:'強力粉'},{id:'03001',name:'黒砂糖'},{id:'03003',name:'砂糖'},{id:'03005',name:'グラニュー糖'},{id:'14001',name:'オリーブオイル'},{id:'14002',name:'ごま油'},{id:'16001',name:'酒'},{id:'16006',name:'ビール'},{id:'16010',name:'白ワイン'},{id:'16011',name:'赤ワイン'},{id:'16012',name:'ロゼワイン'},{id:'16013',name:'紹興酒'},{id:'16014',name:'焼酎'},{id:'16016',name:'ウイスキー'},{id:'16017',name:'ブランデー'},{id:'16018',name:'ウオッカ'},{id:'16019',name:'ジン'},{id:'16020',name:'ラム'},{id:'16022',name:'梅酒'},{id:'16043',name:'紅茶（茶葉）'},{id:'16044',name:'紅茶'},{id:'16045',name:'コーヒー'},{id:'16046',name:'インスタントコーヒー'},{id:'16048',name:'純ココア'},{id:'16049',name:'ミルクココア'},{id:'16050',name:'甘酒'},{id:'16053',name:'コーラ'},{id:'16054',name:'サイダー'},{id:'16055',name:'麦茶'},{id:'17001',name:'ウスターソース'},{id:'17002',name:'中濃ソース'},{id:'17085',name:'お好み焼きソース'},{id:'17004',name:'豆板醤'},{id:'17005',name:'タバスコ'},{id:'17006',name:'ラー油'},{id:'17007',name:'しょうゆ'},{id:'17008',name:'うすくちしょうゆ'},{id:'17012',name:'塩'},{id:'17090',name:'黒酢'},{id:'17015',name:'酢'},{id:'17016',name:'米酢'},{id:'17091',name:'バルサミコ酢'},{id:'17017',name:'ぶどう酢'},{id:'17018',name:'りんご酢'},{id:'17019',name:'かつおだし'},{id:'17020',name:'昆布だし'},{id:'17021',name:'だし'},{id:'17027',name:'固形コンソメ'},{id:'17092',name:'顆粒おでん用'},{id:'17093',name:'だし顆粒（中華だし）'},{id:'17028',name:'だし顆粒（和風だし）'},{id:'17030',name:'めんつゆ'},{id:'17094',name:'甘酢'},{id:'17095',name:'エビチリの素'},{id:'17031',name:'オイスターソース'},{id:'17098',name:'ごまだれ'},{id:'17099',name:'三杯酢'},{id:'17101',name:'すし酢'},{id:'17105',name:'デミグラスソース'},{id:'17106',name:'甜麺醤'},{id:'17107',name:'ナンプラー'},{id:'17108',name:'冷やし中華のたれ'},{id:'17109',name:'ホワイトソース'},{id:'17110',name:'ぽん酢'},{id:'17032',name:'マーボー豆腐の素'},{id:'17111',name:'マリネ液'},{id:'17033',name:'ミートソース'},{id:'17113',name:'焼き肉のたれ'},{id:'17115',name:'ゆずこしょう'},{id:'17035',name:'トマトペースト'},{id:'17036',name:'ケチャップ'},{id:'17038',name:'チリソース'},{id:'17039',name:'和風ノンオイルドレッシング'},{id:'17040',name:'フレンチドレッシング'},{id:'17116',name:'和風ドレッシング'},{id:'17117',name:'ごまドレッシング'},{id:'17041',name:'サウザンアイランドドレッシング'},{id:'17042',name:'マヨネーズ'},{id:'17120',name:'味噌'},{id:'17051',name:'カレールウ'},{id:'17052',name:'ハヤシルウ'},{id:'17054',name:'みりん'},{id:'17058',name:'からし'},{id:'17059',name:'フレンチマスタード'},{id:'17060',name:'あらびきマスタード'},{id:'17061',name:'カレー粉'},{id:'17063',name:'黒こしょう'},{id:'17064',name:'白こしょう'},{id:'17065',name:'こしょう'},{id:'17066',name:'山椒'},{id:'17067',name:'シナモン'},{id:'17069',name:'しょうが'},{id:'17070',name:'セージ'},{id:'17071',name:'タイム'},{id:'17072',name:'チリパウダー'},{id:'17073',name:'一味唐辛子 '},{id:'17074',name:'ナツメ'},{id:'17128',name:'ガーリックパウダー'},{id:'17076',name:'おろしにんにく'},{id:'17077',name:'バジル'},{id:'17078',name:'パセリ'},{id:'17081',name:'わさび'},{id:'17083',name:'ドライイースト'},{id:'17084',name:'ベーキングパウダー'}];
/**
 * メニューセット(主食または主菜＋副菜)取得
 * @param {object} option 検索オプション
 *        {number} days 日数
 *        {number} people 人数
 */
function getMenu(option) {
    var days = option.days,
        people = option.people;
    var menuList = [];
    var r = 0;
    var role = '';
	var mainType = -1;
	var mainMenu;
	var sideMenu;
	for (var i=0; i<days; i++) {
		var menu = {
			food: null,
			main: null,
			side: null,
			soup: null,
		};
		if(Math.random() < 0.4) {
			role = 'food';
		} else{
			role = 'main';
		}
		// 主食または主菜
		while(menu.food === null && menu.main === null) {
			mainMenu = getDish(role);
			if(1 < i && !mainMenu.canFrozen){
				continue;
			}
			if(role === 'main') {
				menu.main = mainMenu;
				menu.food = 0;
			} else {
				menu.main = 0;
				menu.food = mainMenu;
			}
			if(!mainMenu.hasSoup){
				menu.soup = 0;
			}
			mainType = mainMenu.type;
		}

		// 副菜
		while(menu.side === null) {
			sideMenu = getDish('side');
			if(mainType != sideMenu.type){
				menu.side = sideMenu;
			}
		}
		menuList.push(menu);
	}
	return menuList;
};
/**
 * メニュー(1品)取得
 * @param {text} _role 種類(food, main, sideのいずれか)
 * @param {array} _blackList 除外するメニューID
 */
function getDish(_role, _blackList) {
    var recipeList = getRecipeList(_role);
    var blackList = _blackList || [];
    blackList = (',' + blackList.join(',') + ',');
    var menu = null;
	var r = 0;
	var len = recipeList.length;
	while(menu === null) {
		r = Math.floor(Math.random() * (len - 0));
		if(blackList.indexOf(',' + recipeList[r].id + ',') < 0) {
			menu = recipeList[r];
		}
	}
	return menu;
};
/**
 * レシピリスト取得
 * @param {text} _role 種類(food, main, sideのいずれか)
 */
function getRecipeList(_role) {
	var recipeList;
	if(typeof _role === "undefined") {
		recipeList = stapleFoodList.concat(mainDishList).concat(sideDishList);
	} else {
		switch (_role) {
			case 'food':
				recipeList = stapleFoodList;
			break;
			case 'main':
				recipeList = mainDishList;
			break;
			case 'side':
				recipeList = sideDishList;
			break;
		}
	}
	return recipeList;
};
/**
 * レシピ取得
 * @param {text} _id
 * @param {text} _role 種類(food, main, sideのいずれか)
 */
function getRecipe(_id, _role) {
    var recipeList = getRecipeList(_role);
    var recipe = recipeList.filter(function(item, index){
        if (item.id == _id) return true;
    });
	return recipe[0];
};
/**
 * 食材取得
 * @param {text} _id
 */
function getFood(_id) {
    var food = foodList.filter(function(item, index){
        if (item.id == _id) return true;
    });
	return food[0];
};