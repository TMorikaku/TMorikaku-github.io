'use strict'
// 1行目に記載している 'use strict' は削除しないでください
//-------------------------------------------------------------------------------
//処理用変数
let globalresult=[];
let globalcounter=0;

//-------------------------------------------------------------------------------
//ボタン処理用
function namelistClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    const inputarray = inputtext.split(getSplit());
    //出力先の指定
    const place=document.getElementById("resultperson");
    //F 関数呼び出し
    const outputtext = nameListDistplay(inputarray);
    place.innerHTML="結果：<br>" + outputtext;
    console.log(globalresult);
}

//
function appointOfPersonClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    const inputarray = inputtext.split(',');
    //出力先の指定
    const place=document.getElementById("resultperson");
    //F 関数呼び出し
    const outputtext = randPerson(inputarray);
    place.innerText="結果：" + outputtext;
    console.log(globalresult);
}

function appointOfPersonUniqueClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    const inputarray = inputtext.split(',');
    //出力先の指定
    const place=document.getElementById("resultperson");
    //関数呼び出し
    const outputtext = randPersonUnique(inputarray);
    place.innerText="結果：" + outputtext;
    console.log(globalresult);
}

function groupCreateClick(){
    //textboxの値を取得
    const inputtext = document.getElementById("textlist").value;
    //配列に変換
    const inputarray = inputtext.split(',');
    //出力先の指定
    const place=document.getElementById("rGroup");
    //F 関数呼び出し
    const outputarray = groupCreate(inputarray);
    //表示文字列作成
    place.innerHTML="結果：<br>" + outputarray;

}

//--------------------------------------------------------------------------------
//内部処理用

//区切り文字取得
function getSplit(){
    const splitM =document.getElementById("splits").value
    return splitM;
}

//グループの人数取得
function groupNum(){
    const gNum = parseInt(document.getElementById("groupN").value)
    if (!gNum >0){
        window.alert("正の整数を入力してください");
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
        if ((i+1)%5===0){
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