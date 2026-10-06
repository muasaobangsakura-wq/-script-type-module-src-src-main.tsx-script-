import { Unit } from '../types';

export const CURRICULUM_GRADE_1: Unit[] = [
  {
    id: 'g1-unit-1',
    title: 'Unit 1: In the School Playground',
    vietnameseTitle: 'Bài 1: Trong sân trường (Âm /b/)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'School & Letters',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v1', word: 'Bill', phonetic: '/bɪl/', vietnamese: 'Bạn Bill', exampleSentence: 'Hello, Bill!', emoji: '👦🏼', category: 'Names' },
      { id: 'g1-v2', word: 'Ba', phonetic: '/baː/', vietnamese: 'Bạn Ba', exampleSentence: 'Hi, Ba!', emoji: '👦🏻', category: 'Names' },
      { id: 'g1-v3', word: 'Book', phonetic: '/bʊk/', vietnamese: 'Quyển sách', exampleSentence: 'A red book.', emoji: '📖', category: 'School' },
      { id: 'g1-v4', word: 'Ball', phonetic: '/bɔːl/', vietnamese: 'Quả bóng', exampleSentence: 'A blue ball.', emoji: '⚽', category: 'Toys' },
      { id: 'g1-v5', word: 'Bike', phonetic: '/baɪk/', vietnamese: 'Xe đạp', exampleSentence: 'Ride a bike.', emoji: '🚲', category: 'Toys' }
    ],
    sentences: [
      { pattern: 'Hello, Bill.', vietnamese: 'Xin chào bạn Bill.', dialogue: 'A: Hello, Bill! \nB: Hi, Ba!' },
      { pattern: 'Bye, Ba.', vietnamese: 'Tạm biệt bạn Ba.', dialogue: 'A: Bye, Bill! \nB: Bye, Ba!' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq1',
        audioScript: 'Listen and find the letter sound: /b/ - Ball, Book, Bike.',
        question: 'Âm đầu của từ "Ball" (quả bóng) là chữ cái nào?',
        options: ['Letter A', 'Letter B', 'Letter C', 'Letter D'],
        correctIndex: 1
      },
      {
        id: 'g1-lq2',
        audioScript: 'Hello, Bill! Look at my book!',
        question: 'Bạn nhỏ trong câu đang cầm đồ vật gì?',
        options: ['Ball (Quả bóng)', 'Bike (Xe đạp)', 'Book (Quyển sách)', 'Pen (Bút)'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'In the Playground',
      text: 'Ba and Bill are in the school playground. Bill has a red ball. Ba has a big book. They play happily together under the warm sun.',
      questions: [
        { question: 'Who is in the playground?', options: ['Ben', 'Tom and Jerry', 'Lucy and Mary', 'Ba and Bill'], correctIndex: 3 },
        { question: 'What does Bill have?', options: ['A red ball', 'A blue bike', 'A kitten', 'A school bag'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: B _ L L (Quả bóng)', answer: 'A', maskedWord: 'B _ L L' },
      { type: 'missing_letter', prompt: 'Điền chữ cái: B _ _ K (Quyển sách)', answer: 'O, O', maskedWord: 'B _ _ K' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: K - I - B - E (Xe đạp)', answer: 'BIKE', scrambledTokens: ['B', 'I', 'K', 'E'] }
    ],
    speechPrompts: [
      { phrase: 'Hello Bill', vietnamese: 'Xin chào Bill', phoneticTip: 'Bật nhẹ âm /b/' },
      { phrase: 'A red ball', vietnamese: 'Một quả bóng màu đỏ', phoneticTip: 'Chú ý âm /ɔːl/' }
    ],
    oddWords: [
      { words: ['Ball', 'Cat', 'Bike', 'Book'], oddIndex: 1, explanation: 'Cat là con mèo, các từ còn lại bắt đầu bằng chữ B!' }
    ]
  },
  {
    id: 'g1-unit-2',
    title: 'Unit 2: In the Dining Room',
    vietnameseTitle: 'Bài 2: Trong phòng ăn (Âm /k/ - Chữ C)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Food & Dining',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v21', word: 'Cake', phonetic: '/keɪk/', vietnamese: 'Bánh ngọt', exampleSentence: 'A sweet cake.', emoji: '🍰', category: 'Food' },
      { id: 'g1-v22', word: 'Car', phonetic: '/kɑː(r)/', vietnamese: 'Xe ô tô', exampleSentence: 'A small toy car.', emoji: '🚗', category: 'Toys' },
      { id: 'g1-v23', word: 'Cat', phonetic: '/kæt/', vietnamese: 'Con mèo', exampleSentence: 'The cat is cute.', emoji: '🐱', category: 'Animals' },
      { id: 'g1-v24', word: 'Cup', phonetic: '/kʌp/', vietnamese: 'Cái cốc / tách', exampleSentence: 'A cup of milk.', emoji: '☕', category: 'Things' }
    ],
    sentences: [
      { pattern: 'I have a cake.', vietnamese: 'Mình có một chiếc bánh ngọt.', dialogue: 'A: I have a cake. \nB: I have a cup.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq21',
        audioScript: 'Yummy! Look, I have a big birthday cake!',
        question: 'Bạn nhỏ có món gì ngon?',
        options: ['Cup (Cái tách)', 'Car (Ô tô)', 'Cake (Bánh ngọt)', 'Cat (Con mèo)'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'In the Dining Room',
      text: 'Look at the table! There is a sweet cake and a warm cup of milk. The little white cat is sitting near the red toy car.',
      questions: [
        { question: 'What is on the table?', options: ['Three apples', 'A bicycle', 'A big box', 'A cake and a cup'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: C _ K E (Bánh ngọt)', answer: 'A', maskedWord: 'C _ K E' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: T - A - C (Con mèo)', answer: 'CAT', scrambledTokens: ['C', 'A', 'T'] }
    ],
    speechPrompts: [
      { phrase: 'I have a cake', vietnamese: 'Mình có một cái bánh ngọt', phoneticTip: 'Bật âm /k/ ở cuối từ cake' }
    ],
    oddWords: [
      { words: ['Cake', 'Cup', 'Ball', 'Cat'], oddIndex: 2, explanation: 'Ball bắt đầu bằng B, các từ còn lại bắt đầu bằng C!' }
    ]
  },
  {
    id: 'g1-unit-3',
    title: 'Unit 3: At the Birthday Party',
    vietnameseTitle: 'Bài 3: Trong bữa tiệc sinh nhật (Số đếm 1-5)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Numbers & Party',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v31', word: 'One', phonetic: '/wʌn/', vietnamese: 'Số một (1)', exampleSentence: 'One candle.', emoji: '1️⃣', category: 'Numbers' },
      { id: 'g1-v32', word: 'Two', phonetic: '/tuː/', vietnamese: 'Số hai (2)', exampleSentence: 'Two gifts.', emoji: '2️⃣', category: 'Numbers' },
      { id: 'g1-v33', word: 'Three', phonetic: '/θriː/', vietnamese: 'Số ba (3)', exampleSentence: 'Three balloons.', emoji: '3️⃣', category: 'Numbers' },
      { id: 'g1-v34', word: 'Four', phonetic: '/fɔː(r)/', vietnamese: 'Số bốn (4)', exampleSentence: 'Four cakes.', emoji: '4️⃣', category: 'Numbers' },
      { id: 'g1-v35', word: 'Five', phonetic: '/faɪv/', vietnamese: 'Số năm (5)', exampleSentence: 'Five friends.', emoji: '5️⃣', category: 'Numbers' }
    ],
    sentences: [
      { pattern: 'How old are you? - I am eight years old.', vietnamese: 'Bạn mấy tuổi? - Mình tám tuổi.', dialogue: 'A: How old are you? \nB: I am six.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq31',
        audioScript: 'Happy birthday to you! Look, one, two, three candles on the cake!',
        question: 'Có bao nhiêu cây nến trên bánh sinh nhật?',
        options: ['One (1 cây)', 'Three (3 cây nến)', 'Five (5 cây)', 'Ten (10 cây)'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Birthday Party',
      text: 'Today is Mai birthday party. She has four colorful balloons and five lovely friends around her. Everyone sings Happy Birthday cheerfully.',
      questions: [
        { question: 'Whose birthday party is it?', options: ['Mai', 'Peter', 'John', 'Tony'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: O N _ (Số 1)', answer: 'E', maskedWord: 'O N _' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: E - V - I - F (Số 5)', answer: 'FIVE', scrambledTokens: ['F', 'I', 'V', 'E'] }
    ],
    speechPrompts: [
      { phrase: 'Happy birthday', vietnamese: 'Chúc mừng sinh nhật', phoneticTip: 'Phát âm rõ âm /p/ trong happy' }
    ],
    oddWords: [
      { words: ['Red', 'Two', 'Three', 'One'], oddIndex: 0, explanation: 'Red là màu sắc, còn lại là các số đếm!' }
    ]
  },
  {
    id: 'g1-unit-4',
    title: 'Unit 4: In the Bedroom',
    vietnameseTitle: 'Bài 4: Trong phòng ngủ (Âm /d/ - Chữ D)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Home & Bedroom',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v41', word: 'Desk', phonetic: '/desk/', vietnamese: 'Bàn học', exampleSentence: 'A clean desk.', emoji: '🪑', category: 'Furniture' },
      { id: 'g1-v42', word: 'Door', phonetic: '/dɔː(r)/', vietnamese: 'Cửa ra vào', exampleSentence: 'Open the door.', emoji: '🚪', category: 'Home' },
      { id: 'g1-v43', word: 'Duck', phonetic: '/dʌk/', vietnamese: 'Con vịt', exampleSentence: 'A yellow duck.', emoji: '🦆', category: 'Animals' },
      { id: 'g1-v44', word: 'Dog', phonetic: '/dɒɡ/', vietnamese: 'Con chó', exampleSentence: 'A playful dog.', emoji: '🐶', category: 'Animals' }
    ],
    sentences: [
      { pattern: 'Point to the door.', vietnamese: 'Hãy chỉ vào cánh cửa.', dialogue: 'A: Point to the desk. \nB: Here it is!' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq41',
        audioScript: 'Quack, quack! Look at the little yellow duck by the door!',
        question: 'Con vật nào đang đứng gần cửa ra vào?',
        options: ['Bird (Con chim)', 'Dog (Con chó)', 'Cat (Con mèo)', 'Duck (Con vịt)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'My Clean Bedroom',
      text: 'This is my bedroom. Near the door, there is a brown desk. On the desk, there is a cute toy duck. My little dog is sleeping on the rug.',
      questions: [
        { question: 'Where is the toy duck?', options: ['In the kitchen', 'On the desk', 'Under the bed', 'Outside'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: D _ S K (Bàn học)', answer: 'E', maskedWord: 'D _ S K' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: G - O - D (Con chó)', answer: 'DOG', scrambledTokens: ['D', 'O', 'G'] }
    ],
    speechPrompts: [
      { phrase: 'Open the door', vietnamese: 'Mở cửa ra vào', phoneticTip: 'Bật âm /d/ ở đầu từ door' }
    ],
    oddWords: [
      { words: ['Desk', 'Door', 'Duck', 'Pencil'], oddIndex: 3, explanation: 'Pencil bắt đầu bằng P, các từ còn lại bắt đầu bằng chữ D!' }
    ]
  },
  {
    id: 'g1-unit-5',
    title: 'Unit 5: At the Fish and Chip Shop',
    vietnameseTitle: 'Bài 5: Tại tiệm cá và khoai tây (Âm /f/ - Chữ F)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Food & Animals',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v51', word: 'Fish', phonetic: '/fɪʃ/', vietnamese: 'Con cá', exampleSentence: 'A gold fish.', emoji: '🐟', category: 'Animals' },
      { id: 'g1-v52', word: 'Chips', phonetic: '/tʃɪps/', vietnamese: 'Khoai tây chiên', exampleSentence: 'Crispy chips.', emoji: '🍟', category: 'Food' },
      { id: 'g1-v53', word: 'Face', phonetic: '/feɪs/', vietnamese: 'Gương mặt', exampleSentence: 'Wash your face.', emoji: '😀', category: 'Body' },
      { id: 'g1-v54', word: 'Foot', phonetic: '/fʊt/', vietnamese: 'Bàn chân', exampleSentence: 'Stamp your foot.', emoji: '🦶', category: 'Body' }
    ],
    sentences: [
      { pattern: 'I like fish.', vietnamese: 'Mình thích ăn cá.', dialogue: 'A: I like fish. \nB: I like chips.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq51',
        audioScript: 'I am hungry! I like fish and chips very much!',
        question: 'Bạn nhỏ thích ăn món gì?',
        options: ['Fish and chips (Cá và khoai tây chiên)', 'Ice cream', 'Apples', 'Bread'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Lunch Time',
      text: 'Nam and his sister have lunch. They order delicious fish and hot chips. Nam smiles with a happy face.',
      questions: [
        { question: 'What do they order?', options: ['Milk', 'Pizza', 'Fish and hot chips', 'Cake'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: F _ S H (Con cá)', answer: 'I', maskedWord: 'F _ S H' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: F - A - C - E', answer: 'FACE', scrambledTokens: ['F', 'A', 'C', 'E'] }
    ],
    speechPrompts: [
      { phrase: 'I like fish', vietnamese: 'Mình thích cá', phoneticTip: 'Chú ý âm /ʃ/ ở cuối từ fish' }
    ],
    oddWords: [
      { words: ['Fish', 'Chips', 'Ball', 'Face'], oddIndex: 2, explanation: 'Ball bắt đầu bằng B, các từ còn lại bắt đầu bằng chữ F hoặc âm Ch!' }
    ]
  },
  {
    id: 'g1-unit-6',
    title: 'Unit 6: In the Classroom',
    vietnameseTitle: 'Bài 6: Trong lớp học (Âm /g/ - Chữ G)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Classroom & Friends',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v61', word: 'Girl', phonetic: '/ɡɜːl/', vietnamese: 'Bạn nữ', exampleSentence: 'A smart girl.', emoji: '👧🏻', category: 'People' },
      { id: 'g1-v62', word: 'Gate', phonetic: '/ɡeɪt/', vietnamese: 'Cổng', exampleSentence: 'At the school gate.', emoji: '🚪', category: 'School' },
      { id: 'g1-v63', word: 'Garden', phonetic: '/ˈɡɑːdn/', vietnamese: 'Khu vườn', exampleSentence: 'A green garden.', emoji: '🌻', category: 'Places' },
      { id: 'g1-v64', word: 'Game', phonetic: '/ɡeɪm/', vietnamese: 'Trò chơi', exampleSentence: 'Play a game.', emoji: '🎮', category: 'Fun' }
    ],
    sentences: [
      { pattern: 'There is a green garden.', vietnamese: 'Có một khu vườn xanh mát.', dialogue: 'A: There is a girl. \nB: She is playing a game.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq61',
        audioScript: 'Look at the classroom window! There is a green garden outside.',
        question: 'Có gì ở bên ngoài cửa sổ lớp học?',
        options: ['A car', 'A green garden (Khu vườn xanh)', 'A dog', 'A river'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Classroom',
      text: 'In our classroom, there are many friendly boys and girls. We play fun English games together every day.',
      questions: [
        { question: 'What do students play together?', options: ['English games', 'Football', 'Chess', 'Guitar'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: G _ R L (Bạn nữ)', answer: 'I', maskedWord: 'G _ R L' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: G - A - T - E (Cổng)', answer: 'GATE', scrambledTokens: ['G', 'A', 'T', 'E'] }
    ],
    speechPrompts: [
      { phrase: 'There is a girl', vietnamese: 'Có một bạn nữ', phoneticTip: 'Bật âm /g/ chuẩn xác' }
    ],
    oddWords: [
      { words: ['Book', 'Gate', 'Garden', 'Girl'], oddIndex: 0, explanation: 'Book bắt đầu bằng B, các từ còn lại bắt đầu bằng chữ G!' }
    ]
  },
  {
    id: 'g1-unit-7',
    title: 'Unit 7: In the Garden',
    vietnameseTitle: 'Bài 7: Trong khu vườn (Âm /h/ - Chữ H)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Nature & Garden',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v71', word: 'Hat', phonetic: '/hæt/', vietnamese: 'Cái mũ', exampleSentence: 'Wear a hat.', emoji: '🧢', category: 'Clothes' },
      { id: 'g1-v72', word: 'Hand', phonetic: '/hænd/', vietnamese: 'Bàn tay', exampleSentence: 'Clap your hands.', emoji: '✋', category: 'Body' },
      { id: 'g1-v73', word: 'Hair', phonetic: '/heə(r)/', vietnamese: 'Mái tóc', exampleSentence: 'Black hair.', emoji: '💇', category: 'Body' },
      { id: 'g1-v74', word: 'Horse', phonetic: '/hɔːs/', vietnamese: 'Con ngựa', exampleSentence: 'A big horse.', emoji: '🐴', category: 'Animals' }
    ],
    sentences: [
      { pattern: 'Touch your hair.', vietnamese: 'Hãy chạm vào mái tóc của bạn.', dialogue: 'A: Touch your hat. \nB: Touch your hair.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq71',
        audioScript: 'It is sunny in the garden! Put on your blue hat!',
        question: 'Đồ vật nào được nhắc đến khi trời nắng?',
        options: ['Coat', 'Shoes', 'Blue hat (Mũ màu xanh)', 'Bag'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'In Grandma Garden',
      text: 'Grandma has a large garden. A brown horse stands near the tall green trees. Mai wears a yellow hat and waves her hand.',
      questions: [
        { question: 'What does Mai wear?', options: ['Boots', 'A red coat', 'Glasses', 'A yellow hat'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: H _ T (Cái mũ)', answer: 'A', maskedWord: 'H _ T' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: H - A - N - D', answer: 'HAND', scrambledTokens: ['H', 'A', 'N', 'D'] }
    ],
    speechPrompts: [
      { phrase: 'Touch your hair', vietnamese: 'Chạm vào mái tóc của bạn', phoneticTip: 'Âm /h/ bật hơi nhẹ' }
    ],
    oddWords: [
      { words: ['Hat', 'Hand', 'Horse', 'Car'], oddIndex: 3, explanation: 'Car bắt đầu bằng C, các từ còn lại bắt đầu bằng chữ H!' }
    ]
  },
  {
    id: 'g1-unit-8',
    title: 'Unit 8: In the Park',
    vietnameseTitle: 'Bài 8: Trong công viên (Âm /p/ - Chữ P)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Park & Outdoors',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v81', word: 'Pen', phonetic: '/pen/', vietnamese: 'Cây bút mực', exampleSentence: 'A blue pen.', emoji: '🖊️', category: 'School' },
      { id: 'g1-v82', word: 'Pencil', phonetic: '/ˈpensl/', vietnamese: 'Bút chì', exampleSentence: 'Draw with a pencil.', emoji: '✏️', category: 'School' },
      { id: 'g1-v83', word: 'Park', phonetic: '/pɑːk/', vietnamese: 'Công viên', exampleSentence: 'Run in the park.', emoji: '🏞️', category: 'Places' },
      { id: 'g1-v84', word: 'Popcorn', phonetic: '/ˈpɒpkɔːn/', vietnamese: 'Bỏng ngô', exampleSentence: 'Eat sweet popcorn.', emoji: '🍿', category: 'Food' }
    ],
    sentences: [
      { pattern: 'This is my pen.', vietnamese: 'Đây là chiếc bút mực của mình.', dialogue: 'A: This is my pen. \nB: And this is my pencil.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq81',
        audioScript: 'We are in the park. Look! I have delicious popcorn!',
        question: 'Món ăn vặt bạn nhỏ có trong công viên là gì?',
        options: ['Apple', 'Cake', 'Popcorn (Bỏng ngô)', 'Chips'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'A Sunday in the Park',
      text: 'On Sunday, children go to the park. Tom draws a green tree with his pencil. Mary eats crunchy popcorn.',
      questions: [
        { question: 'Where do children go on Sunday?', options: ['To the zoo', 'To the park', 'To school', 'To bed'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P _ N (Bút mực)', answer: 'E', maskedWord: 'P _ N' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: P - A - R - K', answer: 'PARK', scrambledTokens: ['P', 'A', 'R', 'K'] }
    ],
    speechPrompts: [
      { phrase: 'This is my pen', vietnamese: 'Đây là bút của mình', phoneticTip: 'Bật mạnh âm /p/' }
    ],
    oddWords: [
      { words: ['Pen', 'Dog', 'Park', 'Pencil'], oddIndex: 1, explanation: 'Dog là con chó, các từ còn lại bắt đầu bằng chữ P!' }
    ]
  },
  {
    id: 'g1-unit-9',
    title: 'Unit 9: In the Grocery Shop',
    vietnameseTitle: 'Bài 9: Trong tiệm tạp hóa (Âm /m/ - Chữ M)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Shopping & Food',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v91', word: 'Milk', phonetic: '/mɪlk/', vietnamese: 'Sữa tươi', exampleSentence: 'Drink fresh milk.', emoji: '🥛', category: 'Drinks' },
      { id: 'g1-v92', word: 'Mango', phonetic: '/ˈmæŋɡəʊ/', vietnamese: 'Quả xoài', exampleSentence: 'A sweet yellow mango.', emoji: '🥭', category: 'Fruits' },
      { id: 'g1-v93', word: 'Mother', phonetic: '/ˈmʌðə(r)/', vietnamese: 'Mẹ', exampleSentence: 'My lovely mother.', emoji: '👩', category: 'Family' },
      { id: 'g1-v94', word: 'Money', phonetic: '/ˈmʌni/', vietnamese: 'Tiền', exampleSentence: 'Count the money.', emoji: '💵', category: 'General' }
    ],
    sentences: [
      { pattern: 'I want some milk.', vietnamese: 'Mình muốn uống một ít sữa tươi.', dialogue: 'A: I want some milk. \nB: Here you are.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq91',
        audioScript: 'Good morning! Can I have a glass of fresh milk, please?',
        question: 'Khách hàng muốn mua đồ uống gì?',
        options: ['Milk (Sữa tươi)', 'Water', 'Tea', 'Juice'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Shopping with Mother',
      text: 'Mai goes to the grocery shop with her mother. They buy sweet mangoes and a big bottle of fresh milk.',
      questions: [
        { question: 'Who goes to the shop with Mai?', options: ['Her friend', 'Her brother', 'Her teacher', 'Her mother'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: M _ L K (Sữa tươi)', answer: 'I', maskedWord: 'M _ L K' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: M - A - N - G - O', answer: 'MANGO', scrambledTokens: ['M', 'A', 'N', 'G', 'O'] }
    ],
    speechPrompts: [
      { phrase: 'I want some milk', vietnamese: 'Mình muốn uống sữa', phoneticTip: 'Khép môi phát âm /m/' }
    ],
    oddWords: [
      { words: ['Hat', 'Mango', 'Mother', 'Milk'], oddIndex: 0, explanation: 'Hat bắt đầu bằng H, các từ còn lại bắt đầu bằng chữ M!' }
    ]
  },
  {
    id: 'g1-unit-10',
    title: 'Unit 10: At the Zoo',
    vietnameseTitle: 'Bài 10: Tại vườn bách thú (Âm /z/ - Chữ Z & Động vật)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Zoo & Animals',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v101', word: 'Zoo', phonetic: '/zuː/', vietnamese: 'Sở thú', exampleSentence: 'Go to the zoo.', emoji: '🦁', category: 'Places' },
      { id: 'g1-v102', word: 'Zebra', phonetic: '/ˈzebrə/', vietnamese: 'Ngựa vằn', exampleSentence: 'A black and white zebra.', emoji: '🦓', category: 'Animals' },
      { id: 'g1-v103', word: 'Monkey', phonetic: '/ˈmʌŋki/', vietnamese: 'Con khỉ', exampleSentence: 'A funny monkey.', emoji: '🐒', category: 'Animals' },
      { id: 'g1-v104', word: 'Tiger', phonetic: '/ˈtaɪɡə(r)/', vietnamese: 'Con hổ', exampleSentence: 'A fierce tiger.', emoji: '🐯', category: 'Animals' }
    ],
    sentences: [
      { pattern: 'Look at the zebra.', vietnamese: 'Hãy nhìn con ngựa vằn kìa.', dialogue: 'A: Look at the zebra! \nB: Wow, it is big!' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq101',
        audioScript: 'Look over there! That zebra has black and white stripes!',
        question: 'Con vật có sọc đen trắng là con gì?',
        options: ['Monkey (Khỉ)', 'Zebra (Ngựa vằn)', 'Lion', 'Elephant'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Day at the Zoo',
      text: 'Today our family visits the city zoo. We see striped zebras eating grass and playful monkeys swinging on branches.',
      questions: [
        { question: 'Where does the family visit today?', options: ['The garden', 'The beach', 'The museum', 'The city zoo'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: Z _ O (Sở thú)', answer: 'O', maskedWord: 'Z _ O' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: Z - E - B - R - A', answer: 'ZEBRA', scrambledTokens: ['Z', 'E', 'B', 'R', 'A'] }
    ],
    speechPrompts: [
      { phrase: 'Look at the zebra', vietnamese: 'Nhìn con ngựa vằn kìa', phoneticTip: 'Rung dây thanh âm /z/' }
    ],
    oddWords: [
      { words: ['Zoo', 'Zebra', 'Tiger', 'Book'], oddIndex: 3, explanation: 'Book là quyển sách, các từ còn lại là động vật và sở thú!' }
    ]
  },
  {
    id: 'g1-unit-11',
    title: 'Unit 11: At the Bus Stop',
    vietnameseTitle: 'Bài 11: Tại trạm xe buýt (Âm /s/ - Chữ S)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Travel & Streets',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v111', word: 'Sun', phonetic: '/sʌn/', vietnamese: 'Mặt trời', exampleSentence: 'The sun is bright.', emoji: '☀️', category: 'Nature' },
      { id: 'g1-v112', word: 'Bus', phonetic: '/bʌs/', vietnamese: 'Xe buýt', exampleSentence: 'Get on the bus.', emoji: '🚌', category: 'Vehicles' },
      { id: 'g1-v113', word: 'Stop', phonetic: '/stɒp/', vietnamese: 'Dừng lại', exampleSentence: 'Wait at the bus stop.', emoji: '🛑', category: 'Actions' },
      { id: 'g1-v114', word: 'Star', phonetic: '/stɑː(r)/', vietnamese: 'Ngôi sao', exampleSentence: 'A shining star.', emoji: '⭐', category: 'Nature' }
    ],
    sentences: [
      { pattern: 'The bus is coming.', vietnamese: 'Xe buýt đang tới rồi.', dialogue: 'A: The bus is coming! \nB: Let us get on!' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq111',
        audioScript: 'Look at the sky! The warm yellow sun is shining bright above the bus stop.',
        question: 'Hình ảnh nào chiếu sáng trên bầu trời?',
        options: ['Clouds', 'The moon', 'The sun (Mặt trời)', 'Rain'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Waiting for the Bus',
      text: 'Nam and his sister wait at the bus stop. The bright sun is shining. Soon, a big yellow bus stops for them.',
      questions: [
        { question: 'What color is the bus?', options: ['Yellow', 'Blue', 'Pink', 'Black'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S _ N (Mặt trời)', answer: 'U', maskedWord: 'S _ N' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: B - U - S', answer: 'BUS', scrambledTokens: ['B', 'U', 'S'] }
    ],
    speechPrompts: [
      { phrase: 'The bus is coming', vietnamese: 'Xe buýt đang tới rồi', phoneticTip: 'Xì nhẹ âm /s/' }
    ],
    oddWords: [
      { words: ['Sun', 'Cake', 'Star', 'Bus'], oddIndex: 1, explanation: 'Cake là bánh, các từ còn lại có âm /s/!' }
    ]
  },
  {
    id: 'g1-unit-12',
    title: 'Unit 12: At the Lake',
    vietnameseTitle: 'Bài 12: Bên bờ hồ (Âm /l/ - Chữ L)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Nature & Lakes',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v121', word: 'Lake', phonetic: '/leɪk/', vietnamese: 'Hồ nước', exampleSentence: 'A peaceful lake.', emoji: '🌊', category: 'Nature' },
      { id: 'g1-v122', word: 'Lemon', phonetic: '/ˈlemən/', vietnamese: 'Quả chanh', exampleSentence: 'A sour lemon.', emoji: '🍋', category: 'Fruits' },
      { id: 'g1-v123', word: 'Leaf', phonetic: '/liːf/', vietnamese: 'Chiếc lá', exampleSentence: 'A green leaf.', emoji: '🍃', category: 'Nature' },
      { id: 'g1-v124', word: 'Lucy', phonetic: '/ˈluːsi/', vietnamese: 'Bạn Lucy', exampleSentence: 'This is Lucy.', emoji: '👧🏼', category: 'Names' }
    ],
    sentences: [
      { pattern: 'Look at the leaf by the lake.', vietnamese: 'Hãy nhìn chiếc lá bên bờ hồ.', dialogue: 'A: Look at the green leaf! \nB: It floats on the lake.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq121',
        audioScript: 'Lucy is sitting by the calm lake. She holds a juicy yellow lemon in her hand.',
        question: 'Bạn Lucy đang cầm quả gì?',
        options: ['Lemon (Quả chanh vàng)', 'Apple', 'Banana', 'Orange'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'A Walk by the Lake',
      text: 'Lucy walks near the blue lake with her family. Green leaves fall softly into the water.',
      questions: [
        { question: 'Where does Lucy walk?', options: ['In the classroom', 'In the kitchen', 'Near the blue lake', 'At the bus stop'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: L _ K E (Hồ nước)', answer: 'A', maskedWord: 'L _ K E' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: L - E - A - F (Chiếc lá)', answer: 'LEAF', scrambledTokens: ['L', 'E', 'A', 'F'] }
    ],
    speechPrompts: [
      { phrase: 'Look at the lake', vietnamese: 'Nhìn vào hồ nước kìa', phoneticTip: 'Uốn cong đầu lưỡi phát âm /l/' }
    ],
    oddWords: [
      { words: ['Lake', 'Lemon', 'Pen', 'Leaf'], oddIndex: 2, explanation: 'Pen bắt đầu bằng P, các từ còn lại bắt đầu bằng chữ L!' }
    ]
  },
  {
    id: 'g1-unit-13',
    title: 'Unit 13: In the School Canteen',
    vietnameseTitle: 'Bài 13: Trong căng tin trường (Âm /n/ - Chữ N)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Canteen & Food',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v131', word: 'Noodles', phonetic: '/ˈnuːdlz/', vietnamese: 'Mì sợi / Phở', exampleSentence: 'Hot yummy noodles.', emoji: '🍜', category: 'Food' },
      { id: 'g1-v132', word: 'Nuts', phonetic: '/nʌts/', vietnamese: 'Hạt dinh dưỡng', exampleSentence: 'Crunchy nuts.', emoji: '🥜', category: 'Food' },
      { id: 'g1-v133', word: 'Nine', phonetic: '/naɪn/', vietnamese: 'Số chín (9)', exampleSentence: 'Nine bowls.', emoji: '9️⃣', category: 'Numbers' },
      { id: 'g1-v134', word: 'Nam', phonetic: '/nʌm/', vietnamese: 'Bạn Nam', exampleSentence: 'Hello Nam!', emoji: '👦🏻', category: 'Names' }
    ],
    sentences: [
      { pattern: 'Have some noodles, please.', vietnamese: 'Mời bạn dùng bát mì sợi nhé.', dialogue: 'A: Have some noodles, please. \nB: Thank you!' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq131',
        audioScript: 'In the canteen, Nam has a big bowl of warm noodles.',
        question: 'Nam đang ăn món gì trong căng tin?',
        options: ['Bread', 'Noodles (Mì sợi)', 'Pizza', 'Rice'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Break Time at the Canteen',
      text: 'At noon, students visit the school canteen. Nam eats a bowl of tasty noodles and shares nuts with his friends.',
      questions: [
        { question: 'What does Nam share with his friends?', options: ['Toys', 'Candies', 'Apples', 'Nuts'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: N _ N E (Số 9)', answer: 'I', maskedWord: 'N _ N E' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: N - U - T - S', answer: 'NUTS', scrambledTokens: ['N', 'U', 'T', 'S'] }
    ],
    speechPrompts: [
      { phrase: 'Have some noodles', vietnamese: 'Mời bạn ăn mì', phoneticTip: 'Phát âm rõ âm mũi /n/' }
    ],
    oddWords: [
      { words: ['Noodles', 'Nuts', 'Nine', 'Cat'], oddIndex: 3, explanation: 'Cat bắt đầu bằng C, các từ còn lại bắt đầu bằng chữ N!' }
    ]
  },
  {
    id: 'g1-unit-14',
    title: 'Unit 14: In the Toy Shop',
    vietnameseTitle: 'Bài 14: Trong cửa hàng đồ chơi (Âm /t/ - Chữ T)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Toys & Fun',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v141', word: 'Toy', phonetic: '/tɔɪ/', vietnamese: 'Đồ chơi', exampleSentence: 'A favorite toy.', emoji: '🧸', category: 'Toys' },
      { id: 'g1-v142', word: 'Tiger', phonetic: '/ˈtaɪɡə(r)/', vietnamese: 'Con hổ', exampleSentence: 'A toy tiger.', emoji: '🐯', category: 'Toys' },
      { id: 'g1-v143', word: 'Top', phonetic: '/tɒp/', vietnamese: 'Con quay', exampleSentence: 'Spin the top.', emoji: '🪀', category: 'Toys' },
      { id: 'g1-v144', word: 'Teddy bear', phonetic: '/ˈtedi beə(r)/', vietnamese: 'Gấu bông', exampleSentence: 'A soft teddy bear.', emoji: '🧸', category: 'Toys' }
    ],
    sentences: [
      { pattern: 'I have a top.', vietnamese: 'Mình có một con quay đồ chơi.', dialogue: 'A: I have a top. \nB: I have a teddy bear.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq141',
        audioScript: 'Look at the toy shop window! That brown teddy bear is so cute!',
        question: 'Món đồ chơi trong cửa sổ tiệm là gì?',
        options: ['Ball', 'Car', 'Kite', 'Teddy bear (Gấu bông)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Toy Shop Trip',
      text: 'Tom visits the toy shop. He chooses a colorful spinning top and a little stuffed tiger.',
      questions: [
        { question: 'What does Tom choose?', options: ['A spinning top and a tiger', 'A bicycle', 'A book', 'A robot'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: T _ Y (Đồ chơi)', answer: 'O', maskedWord: 'T _ Y' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: T - O - P', answer: 'TOP', scrambledTokens: ['T', 'O', 'P'] }
    ],
    speechPrompts: [
      { phrase: 'I have a teddy bear', vietnamese: 'Mình có một con gấu bông', phoneticTip: 'Bật nhẹ âm /t/' }
    ],
    oddWords: [
      { words: ['Toy', 'Apple', 'Top', 'Tiger'], oddIndex: 1, explanation: 'Apple là trái cây, các từ còn lại là đồ chơi chữ T!' }
    ]
  },
  {
    id: 'g1-unit-15',
    title: 'Unit 15: At the Football Match',
    vietnameseTitle: 'Bài 15: Tại trận đấu bóng đá (Âm /f/ & Động tác thể thao)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Sports & Games',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v151', word: 'Football', phonetic: '/ˈfʊtbɔːl/', vietnamese: 'Bóng đá', exampleSentence: 'Play football.', emoji: '⚽', category: 'Sports' },
      { id: 'g1-v152', word: 'Kick', phonetic: '/kɪk/', vietnamese: 'Đá bóng', exampleSentence: 'Kick the ball.', emoji: '👟', category: 'Actions' },
      { id: 'g1-v153', word: 'Goal', phonetic: '/ɡəʊl/', vietnamese: 'Khung thành / Bàn thắng', exampleSentence: 'Score a goal!', emoji: '🥅', category: 'Sports' },
      { id: 'g1-v154', word: 'Pass', phonetic: '/pɑːs/', vietnamese: 'Chuyền bóng', exampleSentence: 'Pass the ball to me.', emoji: '🏃', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'Let us kick the ball.', vietnamese: 'Chúng mình cùng đá bóng nào.', dialogue: 'A: Kick the ball! \nB: Goal! Great kick!' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq151',
        audioScript: 'Kick the ball into the goal! Hurrah, we won the football match!',
        question: 'Hành động nào được hô vang?',
        options: ['Sleep', 'Catch the ball', 'Kick the ball (Đá bóng)', 'Eat'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Our School Match',
      text: 'Today is our school football match. Bill kicks the ball hard and scores a wonderful goal.',
      questions: [
        { question: 'Who scores a goal?', options: ['Tom', 'Bill', 'Peter', 'Mary'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: K _ C K (Đá bóng)', answer: 'I', maskedWord: 'K _ C K' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: G - O - A - L', answer: 'GOAL', scrambledTokens: ['G', 'O', 'A', 'L'] }
    ],
    speechPrompts: [
      { phrase: 'Kick the ball', vietnamese: 'Hãy đá quả bóng', phoneticTip: 'Bật âm /k/ rõ ràng' }
    ],
    oddWords: [
      { words: ['Football', 'Kick', 'Table', 'Goal'], oddIndex: 2, explanation: 'Table là cái bàn, các từ còn lại là bóng đá!' }
    ]
  },
  {
    id: 'g1-unit-16',
    title: 'Unit 16: At Home',
    vietnameseTitle: 'Bài 16: Tại ngôi nhà thân yêu (Âm /h/ & Gia đình)',
    grade: 1,
    bookSeries: 'Global Success',
    theme: 'Home & Family',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g1-v161', word: 'Home', phonetic: '/həʊm/', vietnamese: 'Ngôi nhà', exampleSentence: 'Welcome home!', emoji: '🏡', category: 'Places' },
      { id: 'g1-v162', word: 'House', phonetic: '/haʊs/', vietnamese: 'Căn nhà', exampleSentence: 'A pretty house.', emoji: '🏠', category: 'Places' },
      { id: 'g1-v163', word: 'Living room', phonetic: '/ˈlɪvɪŋ ruːm/', vietnamese: 'Phòng khách', exampleSentence: 'Sit in the living room.', emoji: '🛋️', category: 'Home' },
      { id: 'g1-v164', word: 'Happy', phonetic: '/ˈhæpi/', vietnamese: 'Vui vẻ / Hạnh phúc', exampleSentence: 'A happy family.', emoji: '😊', category: 'Feelings' }
    ],
    sentences: [
      { pattern: 'I am at home.', vietnamese: 'Mình đang ở nhà.', dialogue: 'A: Where are you? \nB: I am at home with my family.' }
    ],
    listeningQuestions: [
      {
        id: 'g1-lq161',
        audioScript: 'I love my cozy home. My parents and I are very happy together.',
        question: 'Gia đình bạn nhỏ cảm thấy thế nào khi ở nhà?',
        options: ['Sad', 'Happy (Vui vẻ, hạnh phúc)', 'Angry', 'Tired'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Sunday at Home',
      text: 'On Sunday, our family gathers at home. We sit in the living room and listen to funny stories.',
      questions: [
        { question: 'Where does the family sit?', options: ['At the bus stop', 'In the park', 'In the living room', 'At school'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: H _ M E (Ngôi nhà)', answer: 'O', maskedWord: 'H _ M E' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: H - A - P - P - Y', answer: 'HAPPY', scrambledTokens: ['H', 'A', 'P', 'P', 'Y'] }
    ],
    speechPrompts: [
      { phrase: 'I am at home', vietnamese: 'Mình đang ở nhà', phoneticTip: 'Nối âm am at home' }
    ],
    oddWords: [
      { words: ['Pencil', 'House', 'Living room', 'Home'], oddIndex: 0, explanation: 'Pencil là bút chì, các từ còn lại liên quan đến ngôi nhà!' }
    ]
  }
];
