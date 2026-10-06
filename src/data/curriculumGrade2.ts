import { Unit } from '../types';

export const CURRICULUM_GRADE_2: Unit[] = [
  {
    id: 'g2-unit-1',
    title: 'Unit 1: At My School Gate',
    vietnameseTitle: 'Bài 1: Trước cổng trường em (Chào hỏi & Chữ G)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'School Gate & Greetings',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v1', word: 'Gate', phonetic: '/ɡeɪt/', vietnamese: 'Cổng trường', exampleSentence: 'Meet me at the gate.', emoji: '🚪', category: 'Places' },
      { id: 'g2-v2', word: 'Girl', phonetic: '/ɡɜːl/', vietnamese: 'Bạn nữ', exampleSentence: 'A cheerful girl.', emoji: '👧🏻', category: 'People' },
      { id: 'g2-v3', word: 'Garden', phonetic: '/ˈɡɑːdn/', vietnamese: 'Khu vườn', exampleSentence: 'Flowers in the garden.', emoji: '🌻', category: 'Places' },
      { id: 'g2-v4', word: 'Game', phonetic: '/ɡeɪm/', vietnamese: 'Trò chơi', exampleSentence: 'Let us play a game.', emoji: '🎮', category: 'Activities' }
    ],
    sentences: [
      { pattern: 'Good morning! Nice to see you again.', vietnamese: 'Chào buổi sáng! Rất vui được gặp lại bạn.', dialogue: 'A: Good morning, Nam! \nB: Good morning, Mai!' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq1',
        audioScript: 'Good morning! The little girl is waiting near the school gate.',
        question: 'Bạn nữ đang đợi ở vị trí nào?',
        options: ['On the tree', 'In the classroom', 'School gate (Cổng trường)', 'At home'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Morning at School',
      text: 'It is seven oclock in the morning. Many boys and girls walk through the school gate. They smile happily and say Good morning to their teachers.',
      questions: [
        { question: 'When do students arrive at school?', options: ['Twelve oclock', 'At night', 'In the afternoon', 'Seven oclock in the morning'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: G _ T E (Cổng trường)', answer: 'A', maskedWord: 'G _ T E' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: G - I - L - R (Bé gái)', answer: 'GIRL', scrambledTokens: ['G', 'I', 'R', 'L'] }
    ],
    speechPrompts: [
      { phrase: 'Good morning teacher', vietnamese: 'Chào buổi sáng cô giáo', phoneticTip: 'Âm /g/ ở đầu rõ ràng' }
    ],
    oddWords: [
      { words: ['Gate', 'Girl', 'Tiger', 'Garden'], oddIndex: 2, explanation: 'Tiger là con hổ, các từ còn lại bắt đầu bằng chữ G!' }
    ]
  },
  {
    id: 'g2-unit-2',
    title: 'Unit 2: In the Toy Shop',
    vietnameseTitle: 'Bài 2: Trong tiệm đồ chơi (Đồ chơi yêu thích)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Toys & Fun',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v21', word: 'Car', phonetic: '/kɑː(r)/', vietnamese: 'Xe ô tô', exampleSentence: 'A fast red car.', emoji: '🏎️', category: 'Toys' },
      { id: 'g2-v22', word: 'Doll', phonetic: '/dɒl/', vietnamese: 'Búp bê', exampleSentence: 'A lovely doll.', emoji: '🪆', category: 'Toys' },
      { id: 'g2-v23', word: 'Teddy bear', phonetic: '/ˈtedi beə(r)/', vietnamese: 'Gấu bông', exampleSentence: 'My brown teddy bear.', emoji: '🧸', category: 'Toys' },
      { id: 'g2-v24', word: 'Robot', phonetic: '/ˈrəʊbɒt/', vietnamese: 'Người máy', exampleSentence: 'The robot can walk.', emoji: '🤖', category: 'Toys' },
      { id: 'g2-v25', word: 'Kite', phonetic: '/kaɪt/', vietnamese: 'Cái diều', exampleSentence: 'Fly a kite in the wind.', emoji: '🪁', category: 'Toys' }
    ],
    sentences: [
      { pattern: 'What toy do you have? - I have a car.', vietnamese: 'Bạn có đồ chơi gì? - Mình có một xe ô tô.', dialogue: 'A: What do you have? \nB: I have a robot.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq21',
        audioScript: 'Look at that big brown teddy bear in the toy shop window!',
        question: 'Món đồ chơi được nhắc tới trong cửa sổ tiệm là gì?',
        options: ['A teddy bear (Gấu bông)', 'A green car', 'A pink kite', 'A small train'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our Toy Shop Visit',
      text: 'Tom and Linda visit the toy shop with their father. Tom chooses a blue robot. Linda chooses a soft brown teddy bear. They are very excited.',
      questions: [
        { question: 'What does Tom choose?', options: ['A red kite', 'A blue robot', 'A ball', 'A bicycle'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: R _ B O T', answer: 'O', maskedWord: 'R _ B O T' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: L - O - L - D', answer: 'DOLL', scrambledTokens: ['D', 'O', 'L', 'L'] }
    ],
    speechPrompts: [
      { phrase: 'I have a robot', vietnamese: 'Mình có một con người máy', phoneticTip: 'Phát âm rõ hai âm tiết ro-bot' }
    ],
    oddWords: [
      { words: ['Apple', 'Doll', 'Car', 'Robot'], oddIndex: 0, explanation: 'Apple là trái cây, các từ còn lại là đồ chơi!' }
    ]
  },
  {
    id: 'g2-unit-3',
    title: 'Unit 3: At the Seaside',
    vietnameseTitle: 'Bài 3: Bên bờ biển xanh (Âm /s/ & Cảnh biển)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Seaside & Travel',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v31', word: 'Sea', phonetic: '/siː/', vietnamese: 'Biển', exampleSentence: 'The blue sea.', emoji: '🌊', category: 'Nature' },
      { id: 'g2-v32', word: 'Sand', phonetic: '/sænd/', vietnamese: 'Bãi cát', exampleSentence: 'Play in the sand.', emoji: '🏖️', category: 'Nature' },
      { id: 'g2-v33', word: 'Sail', phonetic: '/seɪl/', vietnamese: 'Cánh buồm', exampleSentence: 'Sail a boat.', emoji: '⛵', category: 'Vehicles' },
      { id: 'g2-v34', word: 'Shell', phonetic: '/ʃel/', vietnamese: 'Vỏ sò', exampleSentence: 'A pretty shell.', emoji: '🐚', category: 'Nature' }
    ],
    sentences: [
      { pattern: 'What can you see? - I can see the sea.', vietnamese: 'Bạn nhìn thấy gì? - Mình nhìn thấy biển.', dialogue: 'A: What can you see? \nB: I can see the sea.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq31',
        audioScript: 'I am at the seaside. I can see a big white sailboat on the water!',
        question: 'Bạn nhỏ nhìn thấy vật gì trên mặt nước?',
        options: ['A house', 'A car', 'A bicycle', 'A sailboat (Thuyền buồm)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Trip to the Beach',
      text: 'Last weekend, we went to the seaside. The sun was warm and the sea was blue. We collected white shells on the sand.',
      questions: [
        { question: 'What did they collect on the sand?', options: ['White shells', 'Apples', 'Leaves', 'Books'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S _ A (Biển)', answer: 'E', maskedWord: 'S _ A' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: S - A - N - D', answer: 'SAND', scrambledTokens: ['S', 'A', 'N', 'D'] }
    ],
    speechPrompts: [
      { phrase: 'I can see the sea', vietnamese: 'Mình nhìn thấy biển', phoneticTip: 'Chú ý âm /s/ và /iː/' }
    ],
    oddWords: [
      { words: ['Sea', 'Sand', 'Sail', 'Pen'], oddIndex: 3, explanation: 'Pen là bút viết, các từ còn lại gắn với bãi biển!' }
    ]
  },
  {
    id: 'g2-unit-4',
    title: 'Unit 4: In the Countryside',
    vietnameseTitle: 'Bài 4: Ở vùng thôn quê yên bình (Âm /r/ - Chữ R)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Countryside & Nature',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v41', word: 'River', phonetic: '/ˈrɪvə(r)/', vietnamese: 'Dòng sông', exampleSentence: 'A winding river.', emoji: '🏞️', category: 'Nature' },
      { id: 'g2-v42', word: 'Road', phonetic: '/rəʊd/', vietnamese: 'Con đường', exampleSentence: 'Walk along the road.', emoji: '🛣️', category: 'Places' },
      { id: 'g2-v43', word: 'Rainbow', phonetic: '/ˈreɪnbəʊ/', vietnamese: 'Cầu vồng', exampleSentence: 'A colorful rainbow.', emoji: '🌈', category: 'Nature' },
      { id: 'g2-v44', word: 'Red', phonetic: '/red/', vietnamese: 'Màu đỏ', exampleSentence: 'A red flower.', emoji: '🔴', category: 'Colors' }
    ],
    sentences: [
      { pattern: 'There is a river in the countryside.', vietnamese: 'Có một dòng sông ở vùng quê.', dialogue: 'A: Look at the sky! \nB: There is a beautiful rainbow!' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq41',
        audioScript: 'After the summer rain, look high in the sky! There is a bright rainbow!',
        question: 'Hiện tượng thiên nhiên nào xuất hiện sau cơn mưa?',
        options: ['Fog', 'Snow', 'Rainbow (Cầu vồng)', 'Wind'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Visiting Grandpa Village',
      text: 'My grandfather lives in the countryside. Near his wooden house, there is a clear blue river and a quiet road lined with flowers.',
      questions: [
        { question: 'What is near grandpa house?', options: ['A big airport', 'A clear blue river and a road', 'A tall skyscraper', 'A cinema'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: R _ V E R', answer: 'I', maskedWord: 'R _ V E R' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: R - O - A - D', answer: 'ROAD', scrambledTokens: ['R', 'O', 'A', 'D'] }
    ],
    speechPrompts: [
      { phrase: 'There is a rainbow', vietnamese: 'Có một chiếc cầu vồng', phoneticTip: 'Cuộn lưỡi phát âm /r/' }
    ],
    oddWords: [
      { words: ['River', 'Cake', 'Rainbow', 'Road'], oddIndex: 1, explanation: 'Cake là bánh, các từ còn lại bắt đầu bằng chữ R!' }
    ]
  },
  {
    id: 'g2-unit-5',
    title: 'Unit 5: In the Classroom',
    vietnameseTitle: 'Bài 5: Trong phòng học (Đồ dùng học tập & Hành động)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Classroom & Learning',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v51', word: 'Board', phonetic: '/bɔːd/', vietnamese: 'Cái bảng lớp', exampleSentence: 'Look at the board.', emoji: '📋', category: 'Classroom' },
      { id: 'g2-v52', word: 'Chair', phonetic: '/tʃeə(r)/', vietnamese: 'Cái ghế ngồi', exampleSentence: 'Sit on the chair.', emoji: '🪑', category: 'Classroom' },
      { id: 'g2-v53', word: 'Pencil case', phonetic: '/ˈpensl keɪs/', vietnamese: 'Hộp bút', exampleSentence: 'A pink pencil case.', emoji: '👝', category: 'School' },
      { id: 'g2-v54', word: 'Open', phonetic: '/ˈəʊpən/', vietnamese: 'Mở ra', exampleSentence: 'Open your book.', emoji: '📖', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'Open your book, please.', vietnamese: 'Xin mời bạn mở sách ra.', dialogue: 'A: Open your book, please. \nB: Yes, teacher.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq51',
        audioScript: 'Class, please look at the big board at the front of the room!',
        question: 'Cô giáo yêu cầu cả lớp nhìn vào đâu?',
        options: ['The board (Cái bảng)', 'The door', 'The window', 'The floor'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'English Class Begins',
      text: 'Miss Hoa walks into class 2B. Students sit politely on their chairs. Miss Hoa says: Open your books, please!',
      questions: [
        { question: 'What does Miss Hoa say?', options: ['Eat lunch', 'Go to sleep', 'Open your books, please', 'Run outside'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: C H _ I R', answer: 'A', maskedWord: 'C H _ I R' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: B - O - A - R - D', answer: 'BOARD', scrambledTokens: ['B', 'O', 'A', 'R', 'D'] }
    ],
    speechPrompts: [
      { phrase: 'Open your book please', vietnamese: 'Xin mời mở sách ra', phoneticTip: 'Lên giọng lịch sự ở cuối câu' }
    ],
    oddWords: [
      { words: ['Board', 'Chair', 'Pencil case', 'Tiger'], oddIndex: 3, explanation: 'Tiger là con hổ, các từ còn lại là đồ dùng lớp học!' }
    ]
  },
  {
    id: 'g2-unit-6',
    title: 'Unit 6: On the Farm',
    vietnameseTitle: 'Bài 6: Trên nông trại vui vẻ (Động vật nông trại)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Farm & Animals',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v61', word: 'Cow', phonetic: '/kaʊ/', vietnamese: 'Con bò sữa', exampleSentence: 'A black and white cow.', emoji: '🐄', category: 'Animals' },
      { id: 'g2-v62', word: 'Horse', phonetic: '/hɔːs/', vietnamese: 'Con ngựa', exampleSentence: 'A galloping horse.', emoji: '🐎', category: 'Animals' },
      { id: 'g2-v63', word: 'Duck', phonetic: '/dʌk/', vietnamese: 'Con vịt', exampleSentence: 'A swimming duck.', emoji: '🦆', category: 'Animals' },
      { id: 'g2-v64', word: 'Sheep', phonetic: '/ʃiːp/', vietnamese: 'Con cừu', exampleSentence: 'A woolly sheep.', emoji: '🐑', category: 'Animals' }
    ],
    sentences: [
      { pattern: 'What is that? - It is a zebra.', vietnamese: 'Đó là con gì vậy? - Đó là con ngựa vằn.', dialogue: 'A: What is that? \nB: It is a cow. Moo!' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq61',
        audioScript: 'Moo! Look at the big cow eating green grass on the farm!',
        question: 'Con vật đang gặm cỏ trên nông trại là con gì?',
        options: ['Cat', 'Cow (Con bò)', 'Dog', 'Tiger'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'A Weekend on the Farm',
      text: 'Peter spends Saturday on his uncle farm. He feeds the white sheep and watches horses run across the meadow.',
      questions: [
        { question: 'What does Peter feed?', options: ['The lions', 'The fishes', 'The birds', 'The white sheep'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: C _ W (Con bò)', answer: 'O', maskedWord: 'C _ W' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: S - H - E - E - P', answer: 'SHEEP', scrambledTokens: ['S', 'H', 'E', 'E', 'P'] }
    ],
    speechPrompts: [
      { phrase: 'It is a cow', vietnamese: 'Đó là một con bò', phoneticTip: 'Âm /aʊ/ tròn môi' }
    ],
    oddWords: [
      { words: ['Cow', 'Ruler', 'Sheep', 'Horse'], oddIndex: 1, explanation: 'Ruler là cây thước, các từ còn lại là gia súc nông trại!' }
    ]
  },
  {
    id: 'g2-unit-7',
    title: 'Unit 7: In the Kitchen',
    vietnameseTitle: 'Bài 7: Trong gian bếp ấm cúng (Đồ ăn thức uống)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Kitchen & Cooking',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v71', word: 'Kitchen', phonetic: '/ˈkɪtʃɪn/', vietnamese: 'Nhà bếp', exampleSentence: 'Cook in the kitchen.', emoji: '🍳', category: 'Home' },
      { id: 'g2-v72', word: 'Kettle', phonetic: '/ˈketl/', vietnamese: 'Ấm đun nước', exampleSentence: 'A hot kettle.', emoji: '🫖', category: 'Kitchen' },
      { id: 'g2-v73', word: 'Kite', phonetic: '/kaɪt/', vietnamese: 'Cái diều', exampleSentence: 'Fly a kite.', emoji: '🪁', category: 'Toys' },
      { id: 'g2-v74', word: 'Water', phonetic: '/ˈwɔːtə(r)/', vietnamese: 'Nước uống', exampleSentence: 'Drink cool water.', emoji: '💧', category: 'Drinks' }
    ],
    sentences: [
      { pattern: 'The cat is in the kitchen.', vietnamese: 'Chú mèo đang ở trong phòng bếp.', dialogue: 'A: Where is mother? \nB: She is in the kitchen.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq71',
        audioScript: 'Mother is making tea. The silver kettle on the stove is boiling water.',
        question: 'Dụng cụ nào đang đun nước sôi trên bếp?',
        options: ['Fork', 'Spoon', 'Kettle (Ấm đun nước)', 'Knife'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Helping in the Kitchen',
      text: 'Mai loves helping her mother in the kitchen. She washes the cups while mother prepares warm soup.',
      questions: [
        { question: 'What does Mai wash?', options: ['The clothes', 'The cups', 'The car', 'The floor'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: K _ T T L E', answer: 'E', maskedWord: 'K _ T T L E' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: W - A - T - E - R', answer: 'WATER', scrambledTokens: ['W', 'A', 'T', 'E', 'R'] }
    ],
    speechPrompts: [
      { phrase: 'She is in the kitchen', vietnamese: 'Mẹ đang ở trong nhà bếp', phoneticTip: 'Chú ý âm /tʃ/ trong kitchen' }
    ],
    oddWords: [
      { words: ['Zebra', 'Kettle', 'Water', 'Kitchen'], oddIndex: 0, explanation: 'Zebra là ngựa vằn, các từ còn lại liên quan đến gian bếp!' }
    ]
  },
  {
    id: 'g2-unit-8',
    title: 'Unit 8: In the Village',
    vietnameseTitle: 'Bài 8: Trong ngôi làng quê hương (Âm /v/ - Chữ V)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Village & Homes',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v81', word: 'Village', phonetic: '/ˈvɪlɪdʒ/', vietnamese: 'Ngôi làng', exampleSentence: 'A peaceful village.', emoji: '🏡', category: 'Places' },
      { id: 'g2-v82', word: 'Van', phonetic: '/væn/', vietnamese: 'Xe tải nhỏ', exampleSentence: 'A blue van.', emoji: '🚐', category: 'Vehicles' },
      { id: 'g2-v83', word: 'Violin', phonetic: '/ˌvaɪəˈlɪn/', vietnamese: 'Đàn vi-ô-lông', exampleSentence: 'Play the violin.', emoji: '🎻', category: 'Music' },
      { id: 'g2-v84', word: 'Volleyball', phonetic: '/ˈvɒlibɔːl/', vietnamese: 'Bóng chuyền', exampleSentence: 'Play volleyball.', emoji: '🏐', category: 'Sports' }
    ],
    sentences: [
      { pattern: 'I live in a peaceful village.', vietnamese: 'Mình sống ở một ngôi làng thanh bình.', dialogue: 'A: Where do you live? \nB: I live in a green village.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq81',
        audioScript: 'Listen to the beautiful music! Someone is playing the violin in the village.',
        question: 'Nhạc cụ nào đang phát ra âm thanh du dương?',
        options: ['Piano', 'Drum', 'Guitar', 'Violin (Đàn vi-ô-lông)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Lovely Village',
      text: 'Nam lives in a quiet village with many green bamboo trees. Children play volleyball in the afternoon field.',
      questions: [
        { question: 'What sport do children play?', options: ['Volleyball', 'Tennis', 'Golf', 'Swimming'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: V _ N (Xe tải)', answer: 'A', maskedWord: 'V _ N' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: V - I - L - L - A - G - E', answer: 'VILLAGE', scrambledTokens: ['V', 'I', 'L', 'L', 'A', 'G', 'E'] }
    ],
    speechPrompts: [
      { phrase: 'I live in a village', vietnamese: 'Mình sống trong một ngôi làng', phoneticTip: 'Rung môi dưới phát âm /v/' }
    ],
    oddWords: [
      { words: ['Village', 'Van', 'Book', 'Violin'], oddIndex: 2, explanation: 'Book bắt đầu bằng B, các từ còn lại bắt đầu bằng chữ V!' }
    ]
  },
  {
    id: 'g2-unit-9',
    title: 'Unit 9: In the Grocery Store',
    vietnameseTitle: 'Bài 9: Trong tiệm bách hóa (Hoa quả & Rau củ)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Shopping & Groceries',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v91', word: 'Apple', phonetic: '/ˈæpl/', vietnamese: 'Quả táo', exampleSentence: 'A sweet red apple.', emoji: '🍎', category: 'Fruits' },
      { id: 'g2-v92', word: 'Banana', phonetic: '/bəˈnɑːnə/', vietnamese: 'Quả chuối', exampleSentence: 'A yellow banana.', emoji: '🍌', category: 'Fruits' },
      { id: 'g2-v93', word: 'Orange', phonetic: '/ˈɒrɪndʒ/', vietnamese: 'Quả cam', exampleSentence: 'Juicy orange.', emoji: '🍊', category: 'Fruits' },
      { id: 'g2-v94', word: 'Buy', phonetic: '/baɪ/', vietnamese: 'Mua sắm', exampleSentence: 'Buy fresh fruits.', emoji: '🛒', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'How many apples do you want? - Three apples, please.', vietnamese: 'Bạn muốn bao nhiêu quả táo? - Xin cho ba quả táo, làm ơn.', dialogue: 'A: How many apples? \nB: Three apples, please.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq91',
        audioScript: 'I would like to buy five sweet bananas and two red apples.',
        question: 'Khách hàng muốn mua mấy quả chuối?',
        options: ['Ten bananas', 'Five bananas (5 quả chuối)', 'One banana', 'Two bananas'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Fruit Shopping',
      text: 'Lan goes to the grocery store with her grandma. They buy six fresh oranges and three yellow bananas.',
      questions: [
        { question: 'How many oranges do they buy?', options: ['Four oranges', 'Two oranges', 'Six oranges', 'Ten oranges'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: A P P L _', answer: 'E', maskedWord: 'A P P L _' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: B - A - N - A - N - A', answer: 'BANANA', scrambledTokens: ['B', 'A', 'N', 'A', 'N', 'A'] }
    ],
    speechPrompts: [
      { phrase: 'I want an apple please', vietnamese: 'Mình muốn một quả táo', phoneticTip: 'Nối âm want an apple' }
    ],
    oddWords: [
      { words: ['Apple', 'Pencil', 'Orange', 'Banana'], oddIndex: 1, explanation: 'Pencil là bút chì, các từ còn lại là hoa quả!' }
    ]
  },
  {
    id: 'g2-unit-10',
    title: 'Unit 10: At the Zoo',
    vietnameseTitle: 'Bài 10: Tham quan vườn thú (Động vật hoang dã)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Wild Animals',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v101', word: 'Elephant', phonetic: '/ˈelɪfənt/', vietnamese: 'Con voi', exampleSentence: 'A huge elephant.', emoji: '🐘', category: 'Animals' },
      { id: 'g2-v102', word: 'Giraffe', phonetic: '/dʒəˈrɑːf/', vietnamese: 'Hươu cao cổ', exampleSentence: 'A tall giraffe.', emoji: '🦒', category: 'Animals' },
      { id: 'g2-v103', word: 'Bear', phonetic: '/beə(r)/', vietnamese: 'Con gấu', exampleSentence: 'A big furry bear.', emoji: '🐻', category: 'Animals' },
      { id: 'g2-v104', word: 'Big', phonetic: '/bɪɡ/', vietnamese: 'To lớn', exampleSentence: 'The elephant is big.', emoji: '🐘', category: 'Adjectives' }
    ],
    sentences: [
      { pattern: 'The kitten is cute.', vietnamese: 'Chú mèo con rất dễ thương.', dialogue: 'A: Look at the giraffe! \nB: Wow, it is very tall!' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq101',
        audioScript: 'Look at the long neck! The giraffe is eating tender leaves on the tall branch.',
        question: 'Động vật nào có chiếc cổ rất dài?',
        options: ['Cat', 'Elephant (Voi)', 'Bear (Gấu)', 'Giraffe (Hươu cao cổ)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Zoo Adventure',
      text: 'Ben visits the zoo on Saturday. He loves seeing the giant gray elephant spraying water with its long trunk.',
      questions: [
        { question: 'What does the elephant spray water with?', options: ['Its long trunk', 'Its ears', 'Its feet', 'Its tail'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: B _ A R (Con gấu)', answer: 'E', maskedWord: 'B _ A R' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: G - I - R - A - F - F - E', answer: 'GIRAFFE', scrambledTokens: ['G', 'I', 'R', 'A', 'F', 'F', 'E'] }
    ],
    speechPrompts: [
      { phrase: 'The elephant is big', vietnamese: 'Con voi rất to lớn', phoneticTip: 'Bật âm /t/ ở cuối từ elephant' }
    ],
    oddWords: [
      { words: ['Chair', 'Giraffe', 'Bear', 'Elephant'], oddIndex: 0, explanation: 'Chair là cái ghế, các từ còn lại là động vật hoang dã!' }
    ]
  },
  {
    id: 'g2-unit-11',
    title: 'Unit 11: In the Playground',
    vietnameseTitle: 'Bài 11: Trên sân chơi trường em (Trò chơi vận động)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Playground & Activities',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v111', word: 'Slide', phonetic: '/slaɪd/', vietnamese: 'Cầu trượt', exampleSentence: 'Go down the slide.', emoji: '🛝', category: 'Playground' },
      { id: 'g2-v112', word: 'Swing', phonetic: '/swɪŋ/', vietnamese: 'Xích đu', exampleSentence: 'Fly high on the swing.', emoji: '🪑', category: 'Playground' },
      { id: 'g2-v113', word: 'Seesaw', phonetic: '/ˈsiːsɔː/', vietnamese: 'Bập bênh', exampleSentence: 'Play on the seesaw.', emoji: '⚖️', category: 'Playground' },
      { id: 'g2-v114', word: 'Jump', phonetic: '/dʒʌmp/', vietnamese: 'Nhảy', exampleSentence: 'Jump with a rope.', emoji: '🦘', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'Let us play on the slide.', vietnamese: 'Chúng mình cùng chơi cầu trượt nhé.', dialogue: 'A: Let us play on the slide! \nB: Yes, it is fun!' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq111',
        audioScript: 'Up and down, up and down! Two happy children are on the seesaw.',
        question: 'Hai bạn nhỏ đang chơi trò gì?',
        options: ['Swing (Xích đu)', 'Slide (Cầu trượt)', 'Seesaw (Bập bênh)', 'Football'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Break Time Fun',
      text: 'At recess, children run to the colorful playground. Mai loves swinging high on the swing while Nam slides down the red slide.',
      questions: [
        { question: 'What does Mai love doing?', options: ['Swinging high on the swing', 'Sleeping', 'Reading books', 'Writing homework'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S L _ D E', answer: 'I', maskedWord: 'S L _ D E' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: S - W - I - N - G', answer: 'SWING', scrambledTokens: ['S', 'W', 'I', 'N', 'G'] }
    ],
    speechPrompts: [
      { phrase: 'Let us play on the slide', vietnamese: 'Cùng chơi cầu trượt nào', phoneticTip: 'Phát âm chuẩn từ slide' }
    ],
    oddWords: [
      { words: ['Slide', 'Swing', 'Milk', 'Seesaw'], oddIndex: 2, explanation: 'Milk là sữa uống, các từ còn lại là trò chơi sân trường!' }
    ]
  },
  {
    id: 'g2-unit-12',
    title: 'Unit 12: At the Campsite',
    vietnameseTitle: 'Bài 12: Tại khu cắm trại dã ngoại (Âm /t/ & Lều trại)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Camping & Adventure',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v121', word: 'Tent', phonetic: '/tent/', vietnamese: 'Cái lều', exampleSentence: 'Sleep in a green tent.', emoji: '⛺', category: 'Camping' },
      { id: 'g2-v122', word: 'Campfire', phonetic: '/ˈkæmpfaɪə(r)/', vietnamese: 'Lửa trại', exampleSentence: 'Sit around the campfire.', emoji: '🔥', category: 'Camping' },
      { id: 'g2-v123', word: 'Torch', phonetic: '/tɔːtʃ/', vietnamese: 'Đèn pin', exampleSentence: 'Turn on the torch.', emoji: '🔦', category: 'Equipment' },
      { id: 'g2-v124', word: 'Star', phonetic: '/stɑː(r)/', vietnamese: 'Ngôi sao', exampleSentence: 'Look at the stars.', emoji: '⭐', category: 'Nature' }
    ],
    sentences: [
      { pattern: 'We sleep in a warm tent.', vietnamese: 'Chúng mình ngủ trong một chiếc lều ấm áp.', dialogue: 'A: Where do we sleep tonight? \nB: We sleep in a tent under the stars.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq121',
        audioScript: 'It is dark outside the tent. Turn on your bright torch to see the path!',
        question: 'Dụng cụ chiếu sáng nào được bật lên khi trời tối?',
        options: ['Candle', 'Torch (Đèn pin)', 'Clock', 'Radio'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Family Camping Trip',
      text: 'Last night, our family camped in the pine forest. Father put up a blue tent. We sang songs around the warm campfire.',
      questions: [
        { question: 'Where did the family camp?', options: ['At school', 'On a boat', 'In an office', 'In the pine forest'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: T _ N T (Cái lều)', answer: 'E', maskedWord: 'T _ N T' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: S - T - A - R', answer: 'STAR', scrambledTokens: ['S', 'T', 'A', 'R'] }
    ],
    speechPrompts: [
      { phrase: 'We sleep in a tent', vietnamese: 'Chúng mình ngủ trong lều', phoneticTip: 'Bật âm /t/ ở cuối từ tent' }
    ],
    oddWords: [
      { words: ['Tent', 'Campfire', 'Torch', 'Cat'], oddIndex: 3, explanation: 'Cat là con mèo, các từ còn lại là đồ cắm trại dã ngoại!' }
    ]
  },
  {
    id: 'g2-unit-13',
    title: 'Unit 13: In the Bakery',
    vietnameseTitle: 'Bài 13: Trong tiệm bánh thơm nức (Bánh mì & Bánh ngọt)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Bakery & Pastry',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v131', word: 'Bread', phonetic: '/bred/', vietnamese: 'Bánh mì', exampleSentence: 'Fresh warm bread.', emoji: '🍞', category: 'Food' },
      { id: 'g2-v132', word: 'Cake', phonetic: '/keɪk/', vietnamese: 'Bánh ngọt', exampleSentence: 'A chocolate cake.', emoji: '🎂', category: 'Food' },
      { id: 'g2-v133', word: 'Cookie', phonetic: '/ˈkʊki/', vietnamese: 'Bánh quy', exampleSentence: 'A crunchy cookie.', emoji: '🍪', category: 'Food' },
      { id: 'g2-v134', word: 'Baker', phonetic: '/ˈbeɪkə(r)/', vietnamese: 'Thợ làm bánh', exampleSentence: 'A friendly baker.', emoji: '👨‍🍳', category: 'Jobs' }
    ],
    sentences: [
      { pattern: 'I would like some fresh bread.', vietnamese: 'Mình muốn mua một ít bánh mì tươi.', dialogue: 'A: Can I help you? \nB: I would like some cookies, please.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq131',
        audioScript: 'Mmm, smell the fresh chocolate cookies coming straight out of the baker oven!',
        question: 'Món bánh quy nào vừa ra lò thơm phức?',
        options: ['Rice', 'Bread', 'Fish', 'Chocolate cookies (Bánh quy sô-cô-la)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Visiting the Bakery',
      text: 'Every morning, Mr Tan bakes delicious loaves of bread and sweet strawberry cakes. Children love his buttery cookies.',
      questions: [
        { question: 'What does Mr Tan bake?', options: ['Noodles', 'Bread and sweet cakes', 'Fish and chips', 'Vegetables'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: B R _ A D', answer: 'E', maskedWord: 'B R _ A D' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: C - O - O - K - I - E', answer: 'COOKIE', scrambledTokens: ['C', 'O', 'O', 'K', 'I', 'E'] }
    ],
    speechPrompts: [
      { phrase: 'I like chocolate cookies', vietnamese: 'Mình thích bánh quy sô-cô-la', phoneticTip: 'Chú ý âm /k/ trong cookie' }
    ],
    oddWords: [
      { words: ['Desk', 'Cake', 'Cookie', 'Bread'], oddIndex: 0, explanation: 'Desk là bàn học, các từ còn lại là bánh trong tiệm bánh!' }
    ]
  },
  {
    id: 'g2-unit-14',
    title: 'Unit 14: In the Art Room',
    vietnameseTitle: 'Bài 14: Trong phòng mĩ thuật (Màu sắc & Dụng cụ vẽ)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Art & Colors',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v141', word: 'Paint', phonetic: '/peɪnt/', vietnamese: 'Màu vẽ / Vẽ tranh', exampleSentence: 'Paint with brushes.', emoji: '🎨', category: 'Art' },
      { id: 'g2-v142', word: 'Brush', phonetic: '/brʌʃ/', vietnamese: 'Cây cọ vẽ', exampleSentence: 'Dip the brush in water.', emoji: '🖌️', category: 'Art' },
      { id: 'g2-v143', word: 'Picture', phonetic: '/ˈpɪktʃə(r)/', vietnamese: 'Bức tranh', exampleSentence: 'A pretty picture.', emoji: '🖼️', category: 'Art' },
      { id: 'g2-v144', word: 'Draw', phonetic: '/drɔː/', vietnamese: 'Vẽ nét', exampleSentence: 'Draw a sunny flower.', emoji: '✏️', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'What are you doing? - I am drawing a picture.', vietnamese: 'Bạn đang làm gì thế? - Mình đang vẽ một bức tranh.', dialogue: 'A: What are you doing? \nB: I am drawing a big rainbow.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq141',
        audioScript: 'In art class, Linda uses a thin brush to paint a lovely blue sea.',
        question: 'Linda dùng dụng cụ gì để vẽ bức tranh biển xanh?',
        options: ['A brush (Cây cọ vẽ)', 'A spoon', 'A knife', 'A ruler'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our Art Lesson',
      text: 'Today we have an art lesson. Nam draws a flying bird. Lan paints a blooming garden with bright watercolors.',
      questions: [
        { question: 'What does Nam draw?', options: ['A robot', 'A car', 'A flying bird', 'A ship'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P _ I N T', answer: 'A', maskedWord: 'P _ I N T' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: D - R - A - W', answer: 'DRAW', scrambledTokens: ['D', 'R', 'A', 'W'] }
    ],
    speechPrompts: [
      { phrase: 'I am drawing a picture', vietnamese: 'Mình đang vẽ một bức tranh', phoneticTip: 'Chú ý âm /dr/ trong draw' }
    ],
    oddWords: [
      { words: ['Paint', 'Brush', 'Dog', 'Picture'], oddIndex: 2, explanation: 'Dog là con chó, các từ còn lại là dụng cụ phòng mĩ thuật!' }
    ]
  },
  {
    id: 'g2-unit-15',
    title: 'Unit 15: In the Clothes Shop',
    vietnameseTitle: 'Bài 15: Trong cửa hàng trang phục (Quần áo & Trang phục)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Clothes & Shopping',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v151', word: 'Shirt', phonetic: '/ʃɜːt/', vietnamese: 'Áo sơ mi', exampleSentence: 'A white shirt.', emoji: '👔', category: 'Clothes' },
      { id: 'g2-v152', word: 'Dress', phonetic: '/dres/', vietnamese: 'Váy đầm', exampleSentence: 'A pretty pink dress.', emoji: '👗', category: 'Clothes' },
      { id: 'g2-v153', word: 'Hat', phonetic: '/hæt/', vietnamese: 'Cái mũ', exampleSentence: 'A sun hat.', emoji: '👒', category: 'Clothes' },
      { id: 'g2-v154', word: 'Shoes', phonetic: '/ʃuːz/', vietnamese: 'Đôi giày', exampleSentence: 'Clean sports shoes.', emoji: '👟', category: 'Clothes' }
    ],
    sentences: [
      { pattern: 'I am wearing a blue shirt.', vietnamese: 'Mình đang mặc một chiếc áo sơ mi màu xanh dương.', dialogue: 'A: What are you wearing? \nB: I am wearing a blue shirt.' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq151',
        audioScript: 'Look at Mai! She is wearing a lovely pink dress and white shoes.',
        question: 'Mai đang mặc chiếc váy màu gì?',
        options: ['Pink dress (Váy màu hồng)', 'Green dress', 'Black coat', 'Yellow hat'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Choosing New Clothes',
      text: 'Tom goes to the clothes shop with his parents. He chooses a smart blue shirt and comfortable brown shoes for school.',
      questions: [
        { question: 'What does Tom choose for school?', options: ['A scarf', 'A party dress', 'A football helmet', 'A blue shirt and shoes'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S H _ R T', answer: 'I', maskedWord: 'S H _ R T' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: D - R - E - S - S', answer: 'DRESS', scrambledTokens: ['D', 'R', 'E', 'S', 'S'] }
    ],
    speechPrompts: [
      { phrase: 'I am wearing a blue shirt', vietnamese: 'Mình đang mặc áo sơ mi xanh', phoneticTip: 'Chú ý âm /ʃ/ trong shirt' }
    ],
    oddWords: [
      { words: ['Shirt', 'Banana', 'Shoes', 'Dress'], oddIndex: 1, explanation: 'Banana là quả chuối, các từ còn lại là quần áo trang phục!' }
    ]
  },
  {
    id: 'g2-unit-16',
    title: 'Unit 16: At the Animal Park',
    vietnameseTitle: 'Bài 16: Tại công viên động vật (Tổng kết cả năm học)',
    grade: 2,
    bookSeries: 'Global Success',
    theme: 'Animals & Review',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g2-v161', word: 'Park', phonetic: '/pɑːk/', vietnamese: 'Công viên', exampleSentence: 'A lively animal park.', emoji: '🏞️', category: 'Places' },
      { id: 'g2-v162', word: 'Tiger', phonetic: '/ˈtaɪɡə(r)/', vietnamese: 'Con hổ', exampleSentence: 'A strong tiger.', emoji: '🐯', category: 'Animals' },
      { id: 'g2-v163', word: 'Monkey', phonetic: '/ˈmʌŋki/', vietnamese: 'Con khỉ', exampleSentence: 'A climbing monkey.', emoji: '🐒', category: 'Animals' },
      { id: 'g2-v164', word: 'Bird', phonetic: '/bɜːd/', vietnamese: 'Con chim', exampleSentence: 'A singing bird.', emoji: '🐦', category: 'Animals' }
    ],
    sentences: [
      { pattern: 'I love visiting the zoo.', vietnamese: 'Mình rất thích đi thăm vườn thú.', dialogue: 'A: Do you like the animal park? \nB: Yes, I love seeing all the animals!' }
    ],
    listeningQuestions: [
      {
        id: 'g2-lq161',
        audioScript: 'Tweet, tweet! Look up at the high branches, colorful birds are singing happily!',
        question: 'Loài vật nào đang hót líu lo trên cành cây?',
        options: ['Elephants', 'Tigers', 'Birds (Những chú chim)', 'Bears'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Our End of Year Trip',
      text: 'Grade 2 students visit the animal park today. They feed seeds to colorful birds and take photos near the playful monkeys.',
      questions: [
        { question: 'Where do Grade 2 students visit today?', options: ['The market', 'The animal park', 'The library', 'The post office'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: B _ R D', answer: 'I', maskedWord: 'B _ R D' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: M - O - N - K - E - Y', answer: 'MONKEY', scrambledTokens: ['M', 'O', 'N', 'K', 'E', 'Y'] }
    ],
    speechPrompts: [
      { phrase: 'I love the animal park', vietnamese: 'Mình yêu công viên động vật', phoneticTip: 'Nối âm love the animal park' }
    ],
    oddWords: [
      { words: ['Tiger', 'Monkey', 'Bird', 'Pencil case'], oddIndex: 3, explanation: 'Pencil case là hộp bút, các từ còn lại là các loài động vật!' }
    ]
  }
];
