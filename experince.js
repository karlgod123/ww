const searchtems = [
    ['РЗН 2021/1439', "bvvn"],
    ['РЗН 2016/4721', 'faf'],
    ['РЗН 2016/5001', 'sadasd'],
    ['РЗН 2016/5073', 'adada'],
    ['РЗН 2016/5073', 'iuog'],
    ['РЗН 2016/5073']
];

for ( item of searchtems) {
    let newitem = item[0].replace(/\//g, '-');
    console.log(newitem);
    newitem = item[1];
    console.log(newitem);
};
   


// // Ночь перед Рождеством, Xmas - сокращение для Christmas
// var str = "Twas the night before Xmas...";
// var newstr = str.replace(/xmas/g, "Christmas");
// console.log(newstr); // Twas the night before Christmas...
