const envKey = 'lit_original_web_W3SdvhiaQ7NzSchw';
const dataTables = [
  {
    "id": 45449,
    "label": "診断機能",
    "value": [
      {
        "result": "はちみつパン、はちみつフランス、クリームホール",
        "answer1": "はい",
        "answer2": "はい",
        "answer3": "はい"
      },
      {
        "result": "クッキーサンド、ピーナッツクリーム、チョコサンド",
        "answer1": "はい",
        "answer2": "はい",
        "answer3": "いいえ"
      },
      {
        "result": "フラワー系、あんぱん、クリームパン",
        "answer1": "はい",
        "answer2": "いいえ",
        "answer3": "はい"
      },
      {
        "result": "クロワッサン系、メロンパン系",
        "answer1": "はい",
        "answer2": "いいえ",
        "answer3": "いいえ"
      },
      {
        "result": "めんたいフランス、ピザハーフ",
        "answer1": "いいえ",
        "answer2": "はい",
        "answer3": "はい"
      },
      {
        "result": "とろりんハムチーズ、やきそばロール",
        "answer1": "いいえ",
        "answer2": "はい",
        "answer3": "いいえ"
      },
      {
        "result": "ベーコンポテトパン、キング、めんたいフランスパン",
        "answer1": "いいえ",
        "answer2": "いいえ",
        "answer3": "はい"
      },
      {
        "result": "ロール系、エビかつロールおすすめです！！",
        "answer1": "いいえ",
        "answer2": "いいえ",
        "answer3": "いいえ"
      }
    ]
  },
  {
    "id": 45450,
    "label": "コメント機能",
    "value": [
      {
        "likes": 20,
        "author": "tsusaaaaaaan",
        "content": "iijyanai",
        "createdAt": "2026/2/16 8:43"
      },
      {
        "likes": 8,
        "author": "Snnnnnnn",
        "content": "すごぉーい",
        "createdAt": "2026/2/17 7:39"
      },
      {
        "likes": 4,
        "author": "ああ",
        "content": "💙",
        "createdAt": "2026/2/17 13:37"
      },
      {
        "likes": 8,
        "author": "heart",
        "content": "かわいい💘\n",
        "createdAt": "2026/2/17 13:38"
      },
      {
        "likes": 2,
        "author": "♡",
        "content": "♡",
        "createdAt": "2026/2/17 13:40"
      },
      {
        "likes": 0,
        "author": "tsusaaaaaaan",
        "content": "おぉ",
        "createdAt": "2026/2/17 13:41"
      }
    ]
  }
]

const storage = window.localStorage;

const keys = {
  "検索機能": 'breadList',
  "コメント機能": 'comments',
  "診断機能": 'checkList',
  "予約機能": 'reservations',
};

function getData(key) {
  const storageKey = `${envKey}_${keys[key]}`;
  const item = storage.getItem(storageKey);
  const parsed = item ? JSON.parse(item) : [];
  return parsed;
}

function setData(key, data) {
  const storageKey = `${envKey}_${keys[key]}`;
  storage.setItem(storageKey, JSON.stringify(data));
}

function getBreadList() {
  return getData('検索機能');
}

function getComments() {
  return getData('コメント機能');
}

function postComment(comment) {
  const comments = getComments();
  comments.push({ ...comment, id: Date.now() });
  setData('コメント機能', comments);
}

function patchComment(index, value) {
  const comments = getComments();
  if (comments[index]) {
    comments[index] = { ...comments[index], ...value };
    setData('コメント機能', comments);
  } else {
    console.warn(`指定された index（${index}）に該当するコメントが見つかりません`);
  }
}

function getCheckList() {
  return getData('診断機能');
}

function getReservations() {
  return getData('予約機能');
}

function postReservation(reservation) {
  const reservations = getReservations();
  reservations.push({ ...reservation, id: Date.now() });
  setData('予約機能', reservations);
}

function patchReservation(index, value) {
  const reservations = getReservations();
  if (reservations[index]) {
    reservations[index] = { ...reservations[index], ...value };
    setData('予約機能', reservations);
  } else {
    console.warn(`指定された index（${index}）に該当する予約が見つかりません`);
  }
}

function hasInitializedData() {
  return Object.values(keys).some(key => storage.getItem(`${envKey}_${key}`) !== null);
}

function initialize() {
  try {
    // 既存データがある場合は初期化をスキップ
    if (hasInitializedData()) {
      console.log('既存のデータが存在するため、初期化をスキップします');
      return;
    }

    Object.entries(keys).forEach(([label, storageKey]) => {
      const tableData = dataTables.find(table => table.label === label);
      if (tableData) {
        setData(label, tableData.value);
      }
    });
  } catch (error) {
    console.error('データの初期化中にエラーが発生しました:', error);
  }
}

initialize();
