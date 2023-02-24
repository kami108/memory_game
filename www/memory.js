// カードの裏の画像
const BG_IMAGE_SRC = "./images/publicdomainq-0002513fdjbwb.jpg";
// カードの表の画像
let memoryImages = [
  "./images/memory1_a.PNG",
  "./images/memory1_b.PNG",
  "./images/memory2_a.PNG",
  "./images/memory2_b.PNG",
  "./images/memory3_a.PNG",
  "./images/memory3_b.PNG",
  "./images/memory4_a.PNG",
  "./images/memory4_b.PNG",
  "./images/memory5_a.PNG",
  "./images/memory5_b.PNG",
  "./images/memory6_a.PNG",
  "./images/memory6_b.PNG",
  "./images/memory7_a.PNG",
  "./images/memory7_b.PNG",
  "./images/memory8_a.PNG",
  "./images/memory8_b.PNG",
  "./images/memory9_a.PNG",
  "./images/memory9_b.PNG",
  "./images/memory10_a.PNG",
  "./images/memory10_b.PNG"
];




// グローバル変数
// 1枚目のカードの後ろを切り取るときに使う
let cutFirst = "";
// 2枚目のカードの後ろを切り取るときに使う
let cutSecond = "";
// 1枚目のカードだったときに格納するため
let storageFirst = "";
// 2枚目のカードだったときに格納するため
let storageSecond = "";
// 1回目の条件分岐で値を参照する際に使う
let imgInDiv = "";
// 一致したペアの数を数える
let countPair = 0;
// 2回目の条件分岐で不一致だったとき、1枚目を非表示にする
let displayFirst = "";
// 1枚目か2枚目かをチェックするときに使う
let subjectClass = "";

// カードに番号を割り振って、その配列をシャッフル
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// この配列の番号がカードに割り振られている。
let frontOfCard = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "10",
  "11",
  "12",
  "13",
  "14",
  "20",
  "21",
  "22",
  "23",
  "24",
  "30",
  "31",
  "32",
  "33",
  "34",
];
shuffle(frontOfCard);


// 現在のそろえたペア数
const pairLook = () => {
  let pair = document.getElementsByClassName("pair");
  pair[0].innerHTML = countPair + "ペア" ;
  pair[0].style.color = "black";
  pair[0].style.textAlign = "center";
  pair[0].style.fontWeight = "bold" ;
  pair[0].style.backgroundColor = "#e0dddd";
  pair[0].style.margin = "50px auto";
  pair[0].style.border = "1px solid #afadad";
  pair[0].style.borderRadius = "5px";
  pair[0].style.padding = "10px";
  pair[0].style.width = "300px";
  pair[0].style.top = "500px";
}


// 表の画像をシャッフルしてそれぞれのカードにくばる
for (let i = 0; 19 >= i; i++) {
  // frontOfCardに対応するカードのIdを取得しここに画像を設定する
  const targetFrontCardDiv = document.getElementById(`card_name-${frontOfCard[i]}`);
  // 元からあるimg要素を利用し、src属性にシャッフルした表の画像を設定
  const targetImg = targetFrontCardDiv.querySelectorAll('.card_img')[0];
  targetImg.src = memoryImages[i];
}

// すべてのカードの表の画像を取得し、初めは見えないようにしておく
for (let j = 0; 19 >= j; j++) {
  let turnBackCard = document.getElementById(`card_name-${frontOfCard[j]}`).children[0];
  turnBackCard.style.display = "none";
}

// クリックイベントを登録する関数を定義
const addClickEvent = () => {
  backCardList = document.getElementsByClassName("backCard");
  for (let cardCount = 0; cardCount < backCardList.length; cardCount++) {
    const chooseCard = backCardList[cardCount];
    chooseCard.addEventListener('click', clickCard );
  }
}

// クリックイベントを登録する関数を実行
addClickEvent();


// クリックイベントを解除するための関数を定義
const removeClickEvent = () => {
  backCardList = document.getElementsByClassName("backCard");
  for (let cardCount = 0; cardCount < backCardList.length; cardCount++) {
    const chooseCard = backCardList[cardCount];
    chooseCard.removeEventListener('click', clickCard);
  }
}



// クリックしたときの関数を定義
function clickCard ( event ) {

  // クリック時、imgの親要素の div を取得（正誤判断のために、めくった表の画像のURLが必要）
  let cT = event.currentTarget;

  // めくる前に、既に表になっているのかをチェックする（inline かどうか）
  let judgment = event.currentTarget.children[0].style.display;
  // true ならめくれない、false ならめくれる
  if (judgment === "inline") {
    // めくれない
    return;
  } else {
    // めくれる
    event.currentTarget.children[0].style.display = "inline";
    // すべてのカードにクラス "first" を追加する
    subjectClass = document.querySelector(".card_img");
    let addFirst = subjectClass.classList.toggle("first");
  }
  
  // クラス "first" があれば1枚目、なければ2枚目
  if (subjectClass.classList.contains("first") == true) {
    // 1枚目のURLを取得し、_までで切り取り、格納しておく
    cutFirst = event.currentTarget.children[0].src;
    let delimit1 = cutFirst.indexOf("_");
    storageFirst = cutFirst.substring(0, delimit1);
    // 2回目の条件分岐で不一致だったとき、1枚目を非表示にする
    displayFirst = event.currentTarget.children[0];
  } else {
    // 2枚目のURLを取得し、_までで切り取り、格納しておく
    cutSecond = event.currentTarget.children[0].src;
    let delimit2 = cutSecond.indexOf("_");
    storageSecond = cutSecond.substring(0, delimit2);
    // 1枚目と2枚目を比べる
    if (storageFirst.startsWith(storageSecond)) {
      // 一致のとき1ずつ増える
      countPair++;
      // 10以下なら続ける、10ペアでゲーム終了
      if (countPair < 10) {
        // そろったペア数を数えて表示
        pairLook();

      } else {
        pairLook();
        setTimeout(function () {
          window.alert("クリア！おめでとう！");
          location.reload();
        }, 1000);
      }
    } else {
      // 不一致のとき
      let clickTarget = event.currentTarget.children[0];
      // クリックイベントを解除する関数を実行する（2秒経つまでなにもクリックできない）
      removeClickEvent();
      // めくったカードを再度伏せ、クリックイベントを再登録
      setTimeout(function () {
        clickTarget.style.display = "none";
        displayFirst.style.display = "none";
        addClickEvent();
      }, 1500);

    }

  }

};