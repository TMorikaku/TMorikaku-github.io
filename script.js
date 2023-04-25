'use strict'
// 1行目に記載している 'use strict' は削除しないでください
//-------------------------------------------------------------------------------
//処理用変数
let globalresult=[];
let globalcounter=0;
let globalsizecounter=0;

//-------------------------------------------------------------------------------
//ボタン処理用
function namelistClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    let inputarray=[];
    if (getSplit()==="br"){
        inputarray = inputtext.split(/\n/);
    } else {
        inputarray = inputtext.split(getSplit());
    }
        //重複チェック
    console.log(inputarray)
    if (isDuplicated(inputarray)===true){
        window.alert("同じ名前の人がいます")
        return ;
    }
    //出力先の指定
    const place=document.getElementById("resultperson");
    //F 関数呼び出し
    const outputtext = nameListDistplay(inputarray);
    place.innerHTML= outputtext;

}

//
function appointOfPersonClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    let inputarray=[];
    if (getSplit()==="br"){
        inputarray = inputtext.split(/\n/);
    } else {
        inputarray = inputtext.split(getSplit());
    }
    //重複チェック
    if (isDuplicated(inputarray)===true){
        window.alert("同じ名前の人がいます")
        return ;
    }
    //出力先の指定
    const place=document.getElementById("resultperson");
    //F 関数呼び出し
    const outputtext = randPerson(inputarray);
    place.innerText= outputtext;
}

function appointOfPersonUniqueClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    let inputarray=[];
    if (getSplit()==="br"){
        inputarray = inputtext.split(/\n/);
    } else {
        inputarray = inputtext.split(getSplit());
    }
    //重複チェック
    if (isDuplicated(inputarray)===true){
        window.alert("同じ名前の人がいます")
        return ;
    }
    //出力先の指定
    const place=document.getElementById("resultperson");
    //関数呼び出し
    const outputtext = randPersonUnique(inputarray);
    place.innerText= outputtext;
}

function groupCreateClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    let inputarray=[];
    if (getSplit()==="br"){
        inputarray = inputtext.split(/\n/);
    } else {
        inputarray = inputtext.split(getSplit());
    }
    //重複チェック
    if (isDuplicated(inputarray)===true){
        window.alert("同じ名前の人がいます")
        return ;
    }
    //出力先の指定
    const place=document.getElementById("rGroup");
    //F 関数呼び出し
    const outputarray = groupCreate(inputarray);
    //表示文字列作成
    place.innerHTML= outputarray;

}

//--------------------------------------------------------------------------------
//内部処理用

//入力配列の重複チェック(ネットから引用)
function isDuplicated(array){
    const result =new Set(array);
    return result.size !== array.length;
}


//区切り文字取得
function getSplit(){
    const splitM =document.getElementById("splits").value
    console.log(splitM);
    return splitM;
}

//グループの人数取得
function groupNum(){
    const gNum = parseInt(document.getElementById("groupN").value)
    if (gNum >0 === false){
        window.alert("正の整数を入力してください");
        return false;
    }
    return gNum;
}

//ランダムな配列を作る
function randArray(array){
    const result=[];
    let counter =0;
    while(counter !== array.length){
        //インデックス用の乱数発生
        let num=Math.floor(Math.random()*(array.length));
        if (result.includes(array[num])===false){
            result.push(array[num]);
            //console.log("num:", num,"array[num]",array[num])
            counter =counter+1;
        }
    }
    //グローバル変数に結果を保管
    globalresult = result;
    return result
}

function sizeSmallClick(){
    const element= document.getElementById("resultperson")
    globalsizecounter ++;
    let sizevalue = 200-25*globalsizecounter+"%"
    element.style.fontSize=sizevalue
    if (globalsizecounter===7){
        globalsizecounter=-1;
    }
}

function sizeSmallClick2(){
    const element= document.getElementById("rGroup")
    globalsizecounter ++;
    let sizevalue = 200-25*globalsizecounter+"%"
    element.style.fontSize=sizevalue
    if (globalsizecounter===7){
        globalsizecounter=-1;
    }
}

//----------------------------------------------------------------------
//ボタンにかかわる関数

//指名順の表示用
function nameListDistplay(array){
    //順番を入れ替えた配列の取得
    let randomarray=randArray(array);
    let result=`【1】:${randomarray[0]}`;
    //2番目以降の表示
    for(let i=1 ;i<randomarray.length;i++){
        result =result+ `【${i+1}】: ${randomarray[i]} `;
        if ((i+1)%3===0){
            result = result + "<br>";
        }
    }
    globalresult=[];
    return result;
}


//完全ランダムな一人表示用
function randPerson(array){
    let result =randArray(array)[0];
    globalresult=[];
    return result; 
 }

//一度指名した人は出てこないランダムな一人表示用
function randPersonUnique(array){
    //作られていなければglobalresultを生成する
    if (globalresult.length===0){
        let a = randArray(array);
    }
    //表示用にglobalresultにある配列を1つ取得し、カウンターを進める
    let result;
    result=globalresult[globalcounter];
    globalcounter++;
    if (globalcounter>array.length){
        globalcounter=0;
        globalresult=[];
        return "一巡したので初期化しました。もう一度ボタンを押してください"  
    }
    return result;
}


function groupCreate(array){
    const randomarray =randArray(array);    
    const resultarray=[];
    //グループの人数
    const num = groupNum();
    if (num===false){
        return "グループ分け結果が表示されます";
    }
    //グループの数
    const divide =Math.floor(randomarray.length / num);
    //配列をグループの数だけ分ける
    for (let i=0;i<=divide;i++){
        if (randomarray.length % num === 0 && i ===divide){            
        } else {
            resultarray.push(randomarray.slice(i*num,(i+1)*num));
        }
    }
    console.log(resultarray);
    //表示用の結果準備
    let result="";
    for (let i=0;i<resultarray.length;i++){
            result = result + `【G${i+1}】:${resultarray[i]}<br>`;
    }
    globalresult=[];
    return result;
}
