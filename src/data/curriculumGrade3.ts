import { Unit } from '../types';

export const CURRICULUM_GRADE_3: Unit[] = [
  {
    id: 'g3-unit-1',
    title: 'Unit 1: Hello & Friends',
    vietnameseTitle: 'Bài 1: Xin chào & Những người bạn',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Greetings & Introductions',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v1', word: 'Hello', phonetic: '/həˈləʊ/', vietnamese: 'Xin chào', exampleSentence: 'Hello, my name is Nam.', emoji: '👋', category: 'Greetings' },
      { id: 'g3-v2', word: 'Friend', phonetic: '/frend/', vietnamese: 'Bạn bè', exampleSentence: 'She is my good friend.', emoji: '🧑‍🤝‍🧑', category: 'People' },
      { id: 'g3-v3', word: 'Teacher', phonetic: '/ˈtiːtʃə(r)/', vietnamese: 'Thầy/Cô giáo', exampleSentence: 'Good morning, teacher!', emoji: '👩‍🏫', category: 'People' },
      { id: 'g3-v4', word: 'Name', phonetic: '/neɪm/', vietnamese: 'Tên gọi', exampleSentence: 'What is your name?', emoji: '🏷️', category: 'General' },
      { id: 'g3-v5', word: 'Goodbye', phonetic: '/ˌɡʊdˈbaɪ/', vietnamese: 'Tạm biệt', exampleSentence: 'Goodbye, see you tomorrow!', emoji: '👋', category: 'Greetings' }
    ],
    sentences: [
      { pattern: 'Hello! I am Bill.', vietnamese: 'Xin chào! Mình là Bill.', dialogue: 'A: Hello! I am Lucy. \nB: Hi Lucy! I am Ben.' },
      { pattern: 'What is your name? - My name is Bill.', vietnamese: 'Bạn tên là gì? - Tên mình là Bill.', dialogue: 'A: What is your name? \nB: My name is Mai.' },
      { pattern: 'Nice to meet you!', vietnamese: 'Rất vui được gặp bạn!', dialogue: 'A: Nice to meet you! \nB: Nice to meet you, too!' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq1',
        audioScript: 'Hello, my name is Mary. Nice to meet you all!',
        question: 'Cô bé trong đoạn audio tên là gì?',
        options: ['Linda', 'Lucy', 'Mai', 'Mary'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our New Classroom',
      text: 'Hello everyone! My name is Nam. I am in class 3A1. This is my school. My teacher is Miss Mai. She is very kind. Minh and Phong are my good friends. We love studying English together!',
      questions: [
        { question: 'Nam học ở lớp nào?', options: ['Class 3A1', 'Class 4A2', 'Class 5B', 'Class 2C'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái còn thiếu vào từ: H _ L L O', answer: 'E', maskedWord: 'H _ L L O' },
      { type: 'unscramble', prompt: 'Sắp xếp lại chữ cái: R - I - F - E - N - D', answer: 'FRIEND', scrambledTokens: ['F', 'R', 'I', 'E', 'N', 'D'] },
      { type: 'sentence_builder', prompt: 'Ghép câu: my / name / is / Nam', answer: 'My name is Nam', scrambledTokens: ['Nam', 'My', 'is', 'name'] }
    ],
    speechPrompts: [
      { phrase: 'Hello, my name is Linh', vietnamese: 'Xin chào, tên mình là Linh', phoneticTip: 'Chú ý phát âm âm /h/ ở đầu từ Hello' },
      { phrase: 'Nice to meet you', vietnamese: 'Rất vui được gặp bạn', phoneticTip: 'Nối âm nhẹ giữa meet và you' }
    ],
    oddWords: [
      { words: ['Apple', 'Hi', 'Goodbye', 'Hello'], oddIndex: 0, explanation: 'Apple là trái cây, các từ còn lại là lời chào hỏi!' }
    ]
  },
  {
    id: 'g3-unit-2',
    title: 'Unit 2: Our Names & Spelling',
    vietnameseTitle: 'Bài 2: Tên của chúng mình (Đánh vần tên)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Spelling Names',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v21', word: 'Spell', phonetic: '/spel/', vietnamese: 'Đánh vần', exampleSentence: 'How do you spell your name?', emoji: '🔤', category: 'General' },
      { id: 'g3-v22', word: 'Alphabet', phonetic: '/ˈælfəbet/', vietnamese: 'Bảng chữ cái', exampleSentence: 'Sing the alphabet song.', emoji: '🔡', category: 'General' },
      { id: 'g3-v23', word: 'Letter', phonetic: '/ˈletə(r)/', vietnamese: 'Chữ cái', exampleSentence: 'The letter A.', emoji: '✉️', category: 'General' },
      { id: 'g3-v24', word: 'Write', phonetic: '/raɪt/', vietnamese: 'Viết', exampleSentence: 'Write your name here.', emoji: '✍️', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'How do you spell your name? - M - A - I.', vietnamese: 'Bạn đánh vần tên như thế nào? - M - A - I.', dialogue: 'A: How do you spell your name? \nB: N-A-M.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq21',
        audioScript: 'My name is Peter. P-E-T-E-R. Peter.',
        question: 'Tên của bạn nhỏ được đánh vần thế nào?',
        options: ['T-O-N-Y', 'P-E-T-E-R', 'L-U-C-Y', 'M-A-R-Y'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Spelling in Class',
      text: 'Today Miss Hien teaches the class how to spell their English names. Peter spells P-E-T-E-R. Linda spells L-I-N-D-A. The whole class claps happily.',
      questions: [
        { question: 'Who teaches the class today?', options: ['Miss Mai', 'Mr Loc', 'Miss Hien', 'Mr Brown'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S P _ L L (Đánh vần)', answer: 'E', maskedWord: 'S P _ L L' },
      { type: 'sentence_builder', prompt: 'Ghép câu: How / you / do / spell / it?', answer: 'How do you spell it?', scrambledTokens: ['spell', 'How', 'do', 'you', 'it?'] }
    ],
    speechPrompts: [
      { phrase: 'How do you spell your name', vietnamese: 'Bạn đánh vần tên thế nào', phoneticTip: 'Lên giọng ở cuối câu hỏi' }
    ],
    oddWords: [
      { words: ['Spell', 'Letter', 'Alphabet', 'Banana'], oddIndex: 3, explanation: 'Banana là quả chuối, các từ còn lại liên quan đến chữ cái!' }
    ]
  },
  {
    id: 'g3-unit-3',
    title: 'Unit 3: Our Friends & Introductions',
    vietnameseTitle: 'Bài 3: Giới thiệu bạn bè (This is / That is)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Friends & Introductions',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v31', word: 'This', phonetic: '/ðɪs/', vietnamese: 'Đây là (gần)', exampleSentence: 'This is Tony.', emoji: '👉', category: 'Grammar' },
      { id: 'g3-v32', word: 'That', phonetic: '/ðæt/', vietnamese: 'Kia là (xa)', exampleSentence: 'That is Linda.', emoji: '👉', category: 'Grammar' },
      { id: 'g3-v33', word: 'Boy', phonetic: '/bɔɪ/', vietnamese: 'Bạn nam', exampleSentence: 'A smart boy.', emoji: '👦', category: 'People' },
      { id: 'g3-v34', word: 'Girl', phonetic: '/ɡɜːl/', vietnamese: 'Bạn nữ', exampleSentence: 'A lovely girl.', emoji: '👧', category: 'People' }
    ],
    sentences: [
      { pattern: 'This is my friend, Bill.', vietnamese: 'Đây là bạn của mình, bạn Bill.', dialogue: 'A: This is my friend, Mai. \nB: Hi Mai, nice to meet you!' },
      { pattern: 'Is that Bill? - Yes, it is. / No, it is not.', vietnamese: 'Kia có phải bạn Bill không? - Đúng vậy. / Không phải.', dialogue: 'A: Is that Peter? \nB: Yes, it is.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq31',
        audioScript: 'Look over there, Nam! That is my new friend, Tony!',
        question: 'Người bạn mới ở đằng kia tên là gì?',
        options: ['Tony', 'Bill', 'Ba', 'Tom'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Meeting New Friends',
      text: 'Mai introduces her friend to Mary. This is Nam. He is nine years old. That boy over there is Quan. They all study together in primary school.',
      questions: [
        { question: 'How old is Nam?', options: ['Ten years old', 'Nine years old', 'Seven years old', 'Five years old'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: T H _ S (Đây là)', answer: 'I', maskedWord: 'T H _ S' },
      { type: 'sentence_builder', prompt: 'Ghép câu: my / This / is / friend / Mai', answer: 'This is my friend Mai', scrambledTokens: ['is', 'This', 'friend', 'my', 'Mai'] }
    ],
    speechPrompts: [
      { phrase: 'This is my friend Mary', vietnamese: 'Đây là bạn của mình, Mary', phoneticTip: 'Đặt lưỡi giữa hai hàm răng phát âm /ð/' }
    ],
    oddWords: [
      { words: ['This', 'Pencil', 'These', 'That'], oddIndex: 1, explanation: 'Pencil là bút chì, các từ còn lại là đại từ chỉ định!' }
    ]
  },
  {
    id: 'g3-unit-4',
    title: 'Unit 4: Our Classroom and School Things',
    vietnameseTitle: 'Bài 4: Đồ dùng học tập trong lớp',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Classroom Objects',
    status: 'approved',
    updatedAt: '2026-10-02',
    vocabularies: [
      { id: 'g3-v41', word: 'Book', phonetic: '/bʊk/', vietnamese: 'Quyển sách', exampleSentence: 'Open your book, please.', emoji: '📖', category: 'School' },
      { id: 'g3-v42', word: 'Pen', phonetic: '/pen/', vietnamese: 'Bút mực', exampleSentence: 'I write with a blue pen.', emoji: '🖊️', category: 'School' },
      { id: 'g3-v43', word: 'Pencil', phonetic: '/ˈpensl/', vietnamese: 'Bút chì', exampleSentence: 'My pencil is yellow.', emoji: '✏️', category: 'School' },
      { id: 'g3-v44', word: 'Ruler', phonetic: '/ˈruːlə(r)/', vietnamese: 'Cây thước kẻ', exampleSentence: 'The ruler is straight.', emoji: '📏', category: 'School' },
      { id: 'g3-v45', word: 'School bag', phonetic: '/ˈskuːl bæɡ/', vietnamese: 'Cặp sách', exampleSentence: 'This is my heavy school bag.', emoji: '🎒', category: 'School' },
      { id: 'g3-v46', word: 'Eraser', phonetic: '/ɪˈreɪsə(r)/', vietnamese: 'Cục tẩy', exampleSentence: 'Can I use your eraser?', emoji: '🧼', category: 'School' }
    ],
    sentences: [
      { pattern: 'What is this? - It is a pen.', vietnamese: 'Đây là cái gì? - Nó là một cái bút.', dialogue: 'A: What is this? \nB: It is a ruler.' },
      { pattern: 'Is this your school bag? - Yes, it is.', vietnamese: 'Đây có phải cặp của bạn không? - Đúng vậy.', dialogue: 'A: Is this your bag? \nB: Yes, it is.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq41',
        audioScript: 'Look at my desk! I have two pencils, one blue pen, and a long yellow ruler.',
        question: 'Bạn nhỏ có chiếc thước kẻ màu gì?',
        options: ['Black', 'Red', 'Pink', 'Yellow (Màu vàng)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'In My School Bag',
      text: 'This is my yellow school bag. Inside, I have an English book, three pencils, and a ruler. I love keeping my school things neat and tidy.',
      questions: [
        { question: 'What color is the school bag?', options: ['Blue', 'Red', 'Yellow', 'Green'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P _ N C I L', answer: 'E', maskedWord: 'P _ N C I L' },
      { type: 'unscramble', prompt: 'Xếp lại chữ cái: R - U - L - E - R', answer: 'RULER', scrambledTokens: ['E', 'R', 'L', 'U', 'R'] },
      { type: 'sentence_builder', prompt: 'Ghép câu: is / this / What?', answer: 'What is this?', scrambledTokens: ['What', 'this?', 'is'] }
    ],
    speechPrompts: [
      { phrase: 'What is this? It is a book', vietnamese: 'Đây là cái gì? Đây là quyển sách', phoneticTip: 'Bật nhẹ âm /k/ trong book' }
    ],
    oddWords: [
      { words: ['Pen', 'Pencil', 'Cat', 'Ruler'], oddIndex: 2, explanation: 'Cat là con mèo, các từ còn lại là đồ dùng học tập!' }
    ]
  },
  {
    id: 'g3-unit-5',
    title: 'Unit 5: Our Hobbies & Free Time',
    vietnameseTitle: 'Bài 5: Sở thích của chúng mình (Singing, Dancing...)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Hobbies & Leisure',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v51', word: 'Singing', phonetic: '/ˈsɪŋɪŋ/', vietnamese: 'Ca hát', exampleSentence: 'My hobby is singing.', emoji: '🎤', category: 'Hobbies' },
      { id: 'g3-v52', word: 'Dancing', phonetic: '/ˈdɑːnsɪŋ/', vietnamese: 'Nhảy múa', exampleSentence: 'She loves dancing.', emoji: '💃', category: 'Hobbies' },
      { id: 'g3-v53', word: 'Drawing', phonetic: '/ˈdrɔːɪŋ/', vietnamese: 'Vẽ tranh', exampleSentence: 'He enjoys drawing.', emoji: '🎨', category: 'Hobbies' },
      { id: 'g3-v54', word: 'Cooking', phonetic: '/ˈkʊkɪŋ/', vietnamese: 'Nấu ăn', exampleSentence: 'Cooking is fun.', emoji: '🍳', category: 'Hobbies' },
      { id: 'g3-v55', word: 'Reading', phonetic: '/ˈriːdɪŋ/', vietnamese: 'Đọc sách', exampleSentence: 'Reading fairy tales.', emoji: '📚', category: 'Hobbies' }
    ],
    sentences: [
      { pattern: 'What is your hobby? - It is singing.', vietnamese: 'Sở thích của bạn là gì? - Đó là ca hát.', dialogue: 'A: What is your hobby? \nB: It is singing. I like music!' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq51',
        audioScript: 'I listen to pop music every evening. My favorite hobby is singing!',
        question: 'Sở thích yêu thích của bạn nhỏ là gì?',
        options: ['Cooking', 'Singing (Ca hát)', 'Drawing', 'Swimming'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Class Hobbies',
      text: 'In our class, each student has a special hobby. Lan loves singing English songs. Nam likes drawing planes. Peter enjoys reading mystery books in the library.',
      questions: [
        { question: 'What does Lan love doing?', options: ['Sleeping', 'Cooking', 'Running', 'Singing English songs'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S _ N G I N G', answer: 'I', maskedWord: 'S _ N G I N G' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: D - A - N - C - I - N - G', answer: 'DANCING', scrambledTokens: ['D', 'A', 'N', 'C', 'I', 'N', 'G'] },
      { type: 'sentence_builder', prompt: 'Ghép câu: hobby / My / is / reading', answer: 'My hobby is reading', scrambledTokens: ['is', 'reading', 'My', 'hobby'] }
    ],
    speechPrompts: [
      { phrase: 'My hobby is singing', vietnamese: 'Sở thích của mình là hát', phoneticTip: 'Chú ý phát âm đuôi -ing' }
    ],
    oddWords: [
      { words: ['Singing', 'Desk', 'Drawing', 'Dancing'], oddIndex: 1, explanation: 'Desk là bàn học, các từ còn lại là sở thích!' }
    ]
  },
  {
    id: 'g3-unit-6',
    title: 'Unit 6: Our School & Facilities',
    vietnameseTitle: 'Bài 6: Ngôi trường của chúng em (Phòng học, Thư viện...)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'School Facilities',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v61', word: 'School', phonetic: '/skuːl/', vietnamese: 'Trường học', exampleSentence: 'My primary school.', emoji: '🏫', category: 'Places' },
      { id: 'g3-v62', word: 'Classroom', phonetic: '/ˈklɑːsruːm/', vietnamese: 'Phòng học', exampleSentence: 'A bright classroom.', emoji: '🚪', category: 'Places' },
      { id: 'g3-v63', word: 'Library', phonetic: '/ˈlaɪbrəri/', vietnamese: 'Thư viện', exampleSentence: 'Read books in the library.', emoji: '📚', category: 'Places' },
      { id: 'g3-v64', word: 'Gym', phonetic: '/dʒɪm/', vietnamese: 'Phòng thể dục', exampleSentence: 'Exercise in the gym.', emoji: '🏀', category: 'Places' },
      { id: 'g3-v65', word: 'Playground', phonetic: '/ˈpleɪɡraʊnd/', vietnamese: 'Sân chơi', exampleSentence: 'Play in the playground.', emoji: '🛝', category: 'Places' }
    ],
    sentences: [
      { pattern: 'Is that the music room? - Yes, it is. / No, it is not.', vietnamese: 'Kia có phải là phòng âm nhạc không? - Đúng vậy.', dialogue: 'A: Is that our school library? \nB: Yes, it is. It has many books.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq61',
        audioScript: 'Be quiet, please! We are reading interesting science books in the library.',
        question: 'Các bạn nhỏ đang ở đâu?',
        options: ['Playground', 'Gym', 'Library (Thư viện)', 'Garden'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Our Beautiful School',
      text: 'Welcome to Thang Long Primary School! Our school is very big and modern. We have a spacious playground, a quiet library, and a computer room.',
      questions: [
        { question: 'What is the school name?', options: ['Thang Long Primary School', 'Kim Dong School', 'Hoa Sen School', 'Nguyen Du School'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: L _ B R A R Y', answer: 'I', maskedWord: 'L _ B R A R Y' },
      { type: 'unscramble', prompt: 'Sắp xếp chữ cái: S - C - H - O - O - L', answer: 'SCHOOL', scrambledTokens: ['S', 'C', 'H', 'O', 'O', 'L'] }
    ],
    speechPrompts: [
      { phrase: 'This is my school library', vietnamese: 'Đây là thư viện trường em', phoneticTip: 'Chú ý trọng âm li-bra-ry' }
    ],
    oddWords: [
      { words: ['Library', 'Gym', 'Tiger', 'Playground'], oddIndex: 2, explanation: 'Tiger là con hổ, các từ còn lại là khu vực trường học!' }
    ]
  },
  {
    id: 'g3-unit-7',
    title: 'Unit 7: Classroom Instructions',
    vietnameseTitle: 'Bài 7: Lệnh và hiệu lệnh trong lớp học',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Classroom Commands',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v71', word: 'Stand up', phonetic: '/stænd ʌp/', vietnamese: 'Đứng lên', exampleSentence: 'Stand up, please.', emoji: '🧍', category: 'Commands' },
      { id: 'g3-v72', word: 'Sit down', phonetic: '/sɪt daʊn/', vietnamese: 'Ngồi xuống', exampleSentence: 'Sit down, please.', emoji: '🪑', category: 'Commands' },
      { id: 'g3-v73', word: 'Be quiet', phonetic: '/bi ˈkwaɪət/', vietnamese: 'Giữ trật tự', exampleSentence: 'Be quiet in class.', emoji: '🤫', category: 'Commands' },
      { id: 'g3-v74', word: 'Ask a question', phonetic: '/ɑːsk ə ˈkwestʃən/', vietnamese: 'Hỏi một câu', exampleSentence: 'May I ask a question?', emoji: '🙋', category: 'Commands' },
      { id: 'g3-v75', word: 'Come in', phonetic: '/kʌm ɪn/', vietnamese: 'Đi vào lớp', exampleSentence: 'May I come in?', emoji: '🚪', category: 'Commands' }
    ],
    sentences: [
      { pattern: 'May I come in, please? - Yes, you can. / No, you cannot.', vietnamese: 'Em xin phép cô cho em vào lớp được không ạ? - Được, em vào đi.', dialogue: 'A: May I come in, teacher? \nB: Yes, you can. Come in!' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq71',
        audioScript: 'Good morning, teacher! May I come in, please?',
        question: 'Học sinh đang xin phép cô giáo điều gì?',
        options: ['May I play', 'May I go out', 'May I sleep', 'May I come in (Xin vào lớp)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Polite In Class',
      text: 'In our class, we are very polite. When we arrive late, we ask: May I come in, please? When we want to answer, we raise our hand.',
      questions: [
        { question: 'What do students do when they want to answer?', options: ['Stand on the table', 'Shout out loud', 'Raise their hand', 'Run outside'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S T _ N D   U P', answer: 'A', maskedWord: 'S T _ N D   U P' },
      { type: 'sentence_builder', prompt: 'Ghép câu: May / I / come / in, / please?', answer: 'May I come in, please?', scrambledTokens: ['come', 'May', 'please?', 'I', 'in,'] }
    ],
    speechPrompts: [
      { phrase: 'May I ask a question', vietnamese: 'Em xin phép hỏi một câu ạ', phoneticTip: 'Lên giọng ở cuối câu hỏi lịch sự' }
    ],
    oddWords: [
      { words: ['Stand up', 'Sit down', 'Be quiet', 'Apple'], oddIndex: 3, explanation: 'Apple là trái cây, các từ còn lại là hiệu lệnh lớp học!' }
    ]
  },
  {
    id: 'g3-unit-8',
    title: 'Unit 8: Age & Birthday',
    vietnameseTitle: 'Bài 8: Tuổi tác và ngày sinh nhật (Số đếm 1-10)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Age & Numbers',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v81', word: 'Six', phonetic: '/sɪks/', vietnamese: 'Số 6', exampleSentence: 'Six years old.', emoji: '6️⃣', category: 'Numbers' },
      { id: 'g3-v82', word: 'Seven', phonetic: '/ˈsevn/', vietnamese: 'Số 7', exampleSentence: 'Seven candles.', emoji: '7️⃣', category: 'Numbers' },
      { id: 'g3-v83', word: 'Eight', phonetic: '/eɪt/', vietnamese: 'Số 8', exampleSentence: 'Eight gifts.', emoji: '8️⃣', category: 'Numbers' },
      { id: 'g3-v84', word: 'Nine', phonetic: '/naɪn/', vietnamese: 'Số 9', exampleSentence: 'I am nine.', emoji: '9️⃣', category: 'Numbers' },
      { id: 'g3-v85', word: 'Ten', phonetic: '/ten/', vietnamese: 'Số 10', exampleSentence: 'Ten friends.', emoji: '🔟', category: 'Numbers' }
    ],
    sentences: [
      { pattern: 'How old are you? - I am eight years old.', vietnamese: 'Bạn bao nhiêu tuổi? - Mình tám tuổi.', dialogue: 'A: How old are you, Mai? \nB: I am eight years old.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq81',
        audioScript: 'Hello, I am Tony. I am eight years old. Today is my birthday!',
        question: 'Tony bao nhiêu tuổi?',
        options: ['Eight years old (8 tuổi)', 'Seven years old', 'Nine years old', 'Ten years old'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our Birthdays',
      text: 'Most students in grade 3 are eight or nine years old. Today is Phong birthday. He blows out eight colorful candles on his cake.',
      questions: [
        { question: 'How many candles does Phong blow out?', options: ['Five candles', 'Eight candles', 'Two candles', 'Twelve candles'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: E _ G H T (Số 8)', answer: 'I', maskedWord: 'E _ G H T' },
      { type: 'sentence_builder', prompt: 'Ghép câu: How / are / old / you?', answer: 'How old are you?', scrambledTokens: ['are', 'How', 'you?', 'old'] }
    ],
    speechPrompts: [
      { phrase: 'I am eight years old', vietnamese: 'Mình 8 tuổi', phoneticTip: 'Bật âm /t/ ở cuối từ eight' }
    ],
    oddWords: [
      { words: ['Red', 'Seven', 'Eight', 'Six'], oddIndex: 0, explanation: 'Red là màu sắc, các từ còn lại là số đếm tuổi tác!' }
    ]
  },
  {
    id: 'g3-unit-9',
    title: 'Unit 9: Our Colours & Art',
    vietnameseTitle: 'Bài 9: Thế giới sắc màu rực rỡ (Màu sắc)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Colors & Description',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v91', word: 'Red', phonetic: '/red/', vietnamese: 'Màu đỏ', exampleSentence: 'A red apple.', emoji: '🔴', category: 'Colors' },
      { id: 'g3-v92', word: 'Blue', phonetic: '/bluː/', vietnamese: 'Màu xanh da trời', exampleSentence: 'Blue sky.', emoji: '🔵', category: 'Colors' },
      { id: 'g3-v93', word: 'Yellow', phonetic: '/ˈjeləʊ/', vietnamese: 'Màu vàng', exampleSentence: 'A yellow sunflower.', emoji: '🟡', category: 'Colors' },
      { id: 'g3-v94', word: 'Green', phonetic: '/ɡriːn/', vietnamese: 'Màu xanh lá', exampleSentence: 'Green grass.', emoji: '🟢', category: 'Colors' },
      { id: 'g3-v95', word: 'Orange', phonetic: '/ˈɒrɪndʒ/', vietnamese: 'Màu cam', exampleSentence: 'An orange ball.', emoji: '🟠', category: 'Colors' }
    ],
    sentences: [
      { pattern: 'What colour is it? - It is yellow.', vietnamese: 'Nó có màu gì? - Nó có màu xanh dương.', dialogue: 'A: What colour is your pencil case? \nB: It is green.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq91',
        audioScript: 'Look at my new school bag! It is bright red with yellow stars!',
        question: 'Chiếc cặp sách mới có màu chủ đạo là gì?',
        options: ['White', 'Black', 'Bright red (Màu đỏ tươi)', 'Purple'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Painting the Rainbow',
      text: 'In art class, Linda and Ben paint a picture of a rainbow. They use red, orange, yellow, green, and blue paints.',
      questions: [
        { question: 'What do Linda and Ben paint?', options: ['A racing car', 'A picture of a rainbow', 'A robot', 'A football stadium'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: Y _ L L O W', answer: 'E', maskedWord: 'Y _ L L O W' },
      { type: 'sentence_builder', prompt: 'Ghép câu: What / is / colour / it?', answer: 'What colour is it?', scrambledTokens: ['it?', 'What', 'is', 'colour'] }
    ],
    speechPrompts: [
      { phrase: 'What colour is your book? It is blue', vietnamese: 'Sách bạn màu gì? Nó màu xanh', phoneticTip: 'Chú ý âm /bl/ trong blue' }
    ],
    oddWords: [
      { words: ['Red', 'Blue', 'Door', 'Yellow'], oddIndex: 2, explanation: 'Door là cánh cửa, các từ còn lại là màu sắc!' }
    ]
  },
  {
    id: 'g3-unit-10',
    title: 'Unit 10: Break Time Activities & Sports',
    vietnameseTitle: 'Bài 10: Giờ ra chơi và các môn thể thao yêu thích',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Break Time & Games',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v101', word: 'Football', phonetic: '/ˈfʊtbɔːl/', vietnamese: 'Bóng đá', exampleSentence: 'Play football.', emoji: '⚽', category: 'Sports' },
      { id: 'g3-v102', word: 'Badminton', phonetic: '/ˈbædmɪntən/', vietnamese: 'Cầu lông', exampleSentence: 'Play badminton.', emoji: '🏸', category: 'Sports' },
      { id: 'g3-v103', word: 'Chess', phonetic: '/tʃes/', vietnamese: 'Cờ vua', exampleSentence: 'Play chess quietly.', emoji: '♟️', category: 'Games' },
      { id: 'g3-v104', word: 'Table tennis', phonetic: '/ˈteɪbl tenɪs/', vietnamese: 'Bóng bàn', exampleSentence: 'Fast table tennis.', emoji: '🏓', category: 'Sports' },
      { id: 'g3-v105', word: 'Hide-and-seek', phonetic: '/ˌhaɪd n ˈsiːk/', vietnamese: 'Trốn tìm', exampleSentence: 'Play hide-and-seek.', emoji: '🙈', category: 'Games' }
    ],
    sentences: [
      { pattern: 'What do you do at break time? - I play badminton.', vietnamese: 'Bạn làm gì vào giờ ra chơi? - Mình chơi Môn thể thao.', dialogue: 'A: What do you do at break time? \nB: I play badminton with Mai.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq101',
        audioScript: 'The bell rings! Let us go to the school yard and play football together!',
        question: 'Các bạn rủ nhau chơi môn thể thao nào?',
        options: ['Football (Bóng đá)', 'Chess', 'Basketball', 'Swimming'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our School Break Time',
      text: 'When the school bell rings, students rush to the sunny playground. Boys play football on the lawn while girls play badminton.',
      questions: [
        { question: 'What do girls play during break time?', options: ['Hide-and-seek', 'Football', 'Video games', 'Badminton'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: C H _ S S (Cờ vua)', answer: 'E', maskedWord: 'C H _ S S' },
      { type: 'sentence_builder', prompt: 'Ghép câu: play / I / badminton / break time / at', answer: 'I play badminton at break time', scrambledTokens: ['badminton', 'I', 'break time', 'play', 'at'] }
    ],
    speechPrompts: [
      { phrase: 'I play football at break time', vietnamese: 'Mình chơi bóng đá vào giờ ra chơi', phoneticTip: 'Chú ý âm /ʊt/ trong football' }
    ],
    oddWords: [
      { words: ['Football', 'Pencil', 'Chess', 'Badminton'], oddIndex: 1, explanation: 'Pencil là bút chì, các từ còn lại là trò chơi giờ ra chơi!' }
    ]
  },
  {
    id: 'g3-unit-11',
    title: 'Unit 11: My Family & Relatives',
    vietnameseTitle: 'Bài 11: Gia đình thân yêu của em',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Family Members',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v111', word: 'Father', phonetic: '/ˈfɑːðə(r)/', vietnamese: 'Bố / Ba', exampleSentence: 'My loving father.', emoji: '👨', category: 'Family' },
      { id: 'g3-v112', word: 'Mother', phonetic: '/ˈmʌðə(r)/', vietnamese: 'Mẹ', exampleSentence: 'My kind mother.', emoji: '👩', category: 'Family' },
      { id: 'g3-v113', word: 'Brother', phonetic: '/ˈbrʌðə(r)/', vietnamese: 'Anh / Em trai', exampleSentence: 'My older brother.', emoji: '👦', category: 'Family' },
      { id: 'g3-v114', word: 'Sister', phonetic: '/ˈsɪstə(r)/', vietnamese: 'Chị / Em gái', exampleSentence: 'My little sister.', emoji: '👧', category: 'Family' },
      { id: 'g3-v115', word: 'Grandmother', phonetic: '/ˈɡrænmʌðə(r)/', vietnamese: 'Bà', exampleSentence: 'My dear grandmother.', emoji: '👵', category: 'Family' }
    ],
    sentences: [
      { pattern: 'Who is that? - It is my mother.', vietnamese: 'Đó là ai? - Đó là Thành viên gia đình của mình.', dialogue: 'A: Who is that man? \nB: That is my father.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq111',
        audioScript: 'Look at this family photo! That tall man smiling next to mother is my father.',
        question: 'Người đàn ông cao ráo trong bức ảnh là ai?',
        options: ['My father (Bố của bạn)', 'My brother', 'My grandfather', 'My uncle'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'My Loving Family',
      text: 'There are four people in my family: my father, my mother, my little brother, and me. We love having dinner together every evening.',
      questions: [
        { question: 'How many people are there in the family?', options: ['Six people', 'Three people', 'Five people', 'Four people'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: F _ T H E R', answer: 'A', maskedWord: 'F _ T H E R' },
      { type: 'sentence_builder', prompt: 'Ghép câu: is / That / my / mother', answer: 'That is my mother', scrambledTokens: ['my', 'is', 'That', 'mother'] }
    ],
    speechPrompts: [
      { phrase: 'That is my mother', vietnamese: 'Kia là mẹ của mình', phoneticTip: 'Âm /ð/ rung trong mother' }
    ],
    oddWords: [
      { words: ['Ruler', 'Mother', 'Brother', 'Father'], oddIndex: 0, explanation: 'Ruler là cây thước kẻ, các từ còn lại là thành viên gia đình!' }
    ]
  },
  {
    id: 'g3-unit-12',
    title: 'Unit 12: Jobs & Professions',
    vietnameseTitle: 'Bài 12: Nghề nghiệp trong xã hội (Teacher, Doctor...)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Jobs & Professions',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v121', word: 'Teacher', phonetic: '/ˈtiːtʃə(r)/', vietnamese: 'Giáo viên', exampleSentence: 'She is a dedicated teacher.', emoji: '👩‍🏫', category: 'Jobs' },
      { id: 'g3-v122', word: 'Doctor', phonetic: '/ˈdɒktə(r)/', vietnamese: 'Bác sĩ', exampleSentence: 'A caring doctor.', emoji: '👨‍⚕️', category: 'Jobs' },
      { id: 'g3-v123', word: 'Nurse', phonetic: '/nɜːs/', vietnamese: 'Y tá', exampleSentence: 'A gentle nurse.', emoji: '👩‍⚕️', category: 'Jobs' },
      { id: 'g3-v124', word: 'Driver', phonetic: '/ˈdraɪvə(r)/', vietnamese: 'Tài xế', exampleSentence: 'A bus driver.', emoji: '🧑‍✈️', category: 'Jobs' },
      { id: 'g3-v125', word: 'Farmer', phonetic: '/ˈfɑːmə(r)/', vietnamese: 'Nông dân', exampleSentence: 'A hardworking farmer.', emoji: '👨‍🌾', category: 'Jobs' }
    ],
    sentences: [
      { pattern: 'What is his job? - He is a doctor.', vietnamese: 'Nghề nghiệp của chú ấy là gì? - Chú ấy là một bác sĩ.', dialogue: 'A: What is your mother job? \nB: She is a doctor at the hospital.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq121',
        audioScript: 'My uncle works at the green farm every day. He is a hardworking farmer.',
        question: 'Chú của bạn nhỏ làm nghề gì?',
        options: ['A teacher', 'A farmer (Nông dân)', 'A doctor', 'A driver'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Parents Jobs',
      text: 'My father is a careful bus driver. My mother is an English teacher at primary school. They work hard and love their jobs.',
      questions: [
        { question: 'What does the mother do?', options: ['A cook', 'A nurse', 'An English teacher', 'A pilot'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: D _ C T O R', answer: 'O', maskedWord: 'D _ C T O R' },
      { type: 'sentence_builder', prompt: 'Ghép câu: is / She / a / doctor', answer: 'She is a doctor', scrambledTokens: ['She', 'doctor', 'is', 'a'] }
    ],
    speechPrompts: [
      { phrase: 'My mother is a teacher', vietnamese: 'Mẹ mình là một giáo viên', phoneticTip: 'Chú ý âm /tʃ/ trong teacher' }
    ],
    oddWords: [
      { words: ['Teacher', 'Doctor', 'Driver', 'Chair'], oddIndex: 3, explanation: 'Chair là cái ghế, các từ còn lại là nghề nghiệp!' }
    ]
  },
  {
    id: 'g3-unit-13',
    title: 'Unit 13: My House & Rooms',
    vietnameseTitle: 'Bài 13: Ngôi nhà và các căn phòng (Living room, Bedroom...)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'House & Rooms',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v131', word: 'Living room', phonetic: '/ˈlɪvɪŋ ruːm/', vietnamese: 'Phòng khách', exampleSentence: 'Watch TV in the living room.', emoji: '🛋️', category: 'Rooms' },
      { id: 'g3-v132', word: 'Bedroom', phonetic: '/ˈbedruːm/', vietnamese: 'Phòng ngủ', exampleSentence: 'Sleep in the bedroom.', emoji: '🛏️', category: 'Rooms' },
      { id: 'g3-v133', word: 'Kitchen', phonetic: '/ˈkɪtʃɪn/', vietnamese: 'Phòng bếp', exampleSentence: 'Cook in the kitchen.', emoji: '🍳', category: 'Rooms' },
      { id: 'g3-v134', word: 'Bathroom', phonetic: '/ˈbɑːθruːm/', vietnamese: 'Phòng tắm', exampleSentence: 'Wash in the bathroom.', emoji: '🚿', category: 'Rooms' },
      { id: 'g3-v135', word: 'Garden', phonetic: '/ˈɡɑːdn/', vietnamese: 'Khu vườn', exampleSentence: 'Flowers in the garden.', emoji: '🌻', category: 'Places' }
    ],
    sentences: [
      { pattern: 'Where is Peter? - He is in the living room.', vietnamese: 'Bạn Peter đang ở đâu? - Cậu ấy đang ở trong phòng khách.', dialogue: 'A: Where is father? \nB: He is in the living room.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq131',
        audioScript: 'Where is mother? Oh, she is cooking dinner in the kitchen.',
        question: 'Mẹ đang ở căn phòng nào?',
        options: ['The bedroom', 'The kitchen (Phòng bếp)', 'The bathroom', 'The garden'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Cozy House',
      text: 'Our house is not very big, but it is cozy and clean. It has a bright living room, two quiet bedrooms, and a blooming garden behind.',
      questions: [
        { question: 'How many bedrooms are there in the house?', options: ['Two bedrooms', 'One bedroom', 'Four bedrooms', 'Three bedrooms'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: K _ T C H E N', answer: 'I', maskedWord: 'K _ T C H E N' },
      { type: 'sentence_builder', prompt: 'Ghép câu: is / He / in / bedroom / the', answer: 'He is in the bedroom', scrambledTokens: ['bedroom', 'is', 'He', 'in', 'the'] }
    ],
    speechPrompts: [
      { phrase: 'He is in the living room', vietnamese: 'Anh ấy đang ở phòng khách', phoneticTip: 'Chú ý phát âm living room' }
    ],
    oddWords: [
      { words: ['Living room', 'Bedroom', 'Kitchen', 'Tiger'], oddIndex: 3, explanation: 'Tiger là con hổ, các từ còn lại là các phòng trong nhà!' }
    ]
  },
  {
    id: 'g3-unit-14',
    title: 'Unit 14: My Bedroom & Furniture',
    vietnameseTitle: 'Bài 14: Phòng ngủ của em và đồ đạc nội thất',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Furniture & Bedroom',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v141', word: 'Bed', phonetic: '/bed/', vietnamese: 'Cái giường', exampleSentence: 'A comfortable bed.', emoji: '🛏️', category: 'Furniture' },
      { id: 'g3-v142', word: 'Desk', phonetic: '/desk/', vietnamese: 'Bàn học', exampleSentence: 'Study at the desk.', emoji: '🪑', category: 'Furniture' },
      { id: 'g3-v143', word: 'Lamp', phonetic: '/læmp/', vietnamese: 'Cây đèn bàn', exampleSentence: 'A reading lamp.', emoji: '💡', category: 'Furniture' },
      { id: 'g3-v144', word: 'Wardrobe', phonetic: '/ˈwɔːdrəʊb/', vietnamese: 'Tủ quần áo', exampleSentence: 'Hang clothes in the wardrobe.', emoji: '🚪', category: 'Furniture' }
    ],
    sentences: [
      { pattern: 'There is a bed in my bedroom.', vietnamese: 'Có một chiếc giường trong phòng ngủ của mình.', dialogue: 'A: What is in your bedroom? \nB: There is a small bed and a study desk.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq141',
        audioScript: 'On my study desk, there is a modern blue desk lamp for reading.',
        question: 'Đồ vật nào nằm trên bàn học?',
        options: ['A wardrobe', 'A bed', 'Desk lamp (Đèn bàn)', 'A sofa'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'My Little Room',
      text: 'I love my little bedroom. There is a cozy bed near the window. Next to the bed is my desk with a lamp where I do my homework.',
      questions: [
        { question: 'Where is the bed?', options: ['Outside', 'Under the stairs', 'In the kitchen', 'Near the window'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: L _ M P (Đèn bàn)', answer: 'A', maskedWord: 'L _ M P' },
      { type: 'sentence_builder', prompt: 'Ghép câu: is / There / a / bed / here', answer: 'There is a bed here', scrambledTokens: ['here', 'There', 'is', 'bed', 'a'] }
    ],
    speechPrompts: [
      { phrase: 'There is a desk in my room', vietnamese: 'Có một chiếc bàn trong phòng mình', phoneticTip: 'Bật nhẹ âm /sk/ trong desk' }
    ],
    oddWords: [
      { words: ['Apple', 'Desk', 'Lamp', 'Bed'], oddIndex: 0, explanation: 'Apple là trái cây, các từ còn lại là đồ nội thất phòng ngủ!' }
    ]
  },
  {
    id: 'g3-unit-15',
    title: 'Unit 15: At the Dining Table & Food',
    vietnameseTitle: 'Bài 15: Trên bàn ăn gia đình (Đồ ăn thức uống)',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Food & Dining',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v151', word: 'Rice', phonetic: '/raɪs/', vietnamese: 'Cơm trắng', exampleSentence: 'Eat delicious rice.', emoji: '🍚', category: 'Food' },
      { id: 'g3-v152', word: 'Meat', phonetic: '/miːt/', vietnamese: 'Thịt', exampleSentence: 'Tasty meat.', emoji: '🥩', category: 'Food' },
      { id: 'g3-v153', word: 'Fish', phonetic: '/fɪʃ/', vietnamese: 'Cá', exampleSentence: 'Grilled fish.', emoji: '🐟', category: 'Food' },
      { id: 'g3-v154', word: 'Bread', phonetic: '/bred/', vietnamese: 'Bánh mì', exampleSentence: 'Crispy bread.', emoji: '🍞', category: 'Food' },
      { id: 'g3-v155', word: 'Juice', phonetic: '/dʒuːs/', vietnamese: 'Nước hoa quả', exampleSentence: 'Orange juice.', emoji: '🧃', category: 'Drinks' }
    ],
    sentences: [
      { pattern: 'Would you like some fish? - Yes, please. / No, thanks.', vietnamese: 'Bạn có muốn dùng một ít món cá không? - Vâng / Không, cảm ơn.', dialogue: 'A: Would you like some rice? \nB: Yes, please. I am hungry!' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq151',
        audioScript: 'Would you like some orange juice? Yes, please! It is refreshing.',
        question: 'Bạn nhỏ chọn đồ uống gì?',
        options: ['Tea', 'Milk', 'Orange juice (Nước cam)', 'Water'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Dinner Time',
      text: 'At dinner, our table is full of yummy food: hot white rice, roasted meat, vegetable soup, and fruit juice.',
      questions: [
        { question: 'What is on the dining table?', options: ['Toys', 'Books and pens', 'Shoes and shirts', 'Rice, meat, soup, and juice'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: R _ C E (Cơm)', answer: 'I', maskedWord: 'R _ C E' },
      { type: 'sentence_builder', prompt: 'Ghép câu: some / Would / you / like / bread?', answer: 'Would you like some bread?', scrambledTokens: ['you', 'bread?', 'Would', 'some', 'like'] }
    ],
    speechPrompts: [
      { phrase: 'Would you like some milk', vietnamese: 'Bạn có muốn uống một ít sữa không', phoneticTip: 'Lên giọng ở cuối câu hỏi mời lịch sự' }
    ],
    oddWords: [
      { words: ['Rice', 'Meat', 'Ruler', 'Fish'], oddIndex: 2, explanation: 'Ruler là thước kẻ, các từ còn lại là thức ăn!' }
    ]
  },
  {
    id: 'g3-unit-16',
    title: 'Unit 16: My Pets & Animals',
    vietnameseTitle: 'Bài 16: Những con thú cưng đáng yêu của em',
    grade: 3,
    bookSeries: 'Global Success',
    theme: 'Pets & Animals',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g3-v161', word: 'Dog', phonetic: '/dɒɡ/', vietnamese: 'Con chó', exampleSentence: 'A friendly dog.', emoji: '🐶', category: 'Pets' },
      { id: 'g3-v162', word: 'Cat', phonetic: '/kæt/', vietnamese: 'Con mèo', exampleSentence: 'A playful cat.', emoji: '🐱', category: 'Pets' },
      { id: 'g3-v163', word: 'Bird', phonetic: '/bɜːd/', vietnamese: 'Con chim', exampleSentence: 'A singing bird.', emoji: '🐦', category: 'Pets' },
      { id: 'g3-v164', word: 'Rabbit', phonetic: '/ˈræbɪt/', vietnamese: 'Con thỏ', exampleSentence: 'A soft white rabbit.', emoji: '🐰', category: 'Pets' },
      { id: 'g3-v165', word: 'Goldfish', phonetic: '/ˈɡəʊldfɪʃ/', vietnamese: 'Cá vàng', exampleSentence: 'Goldfish in the bowl.', emoji: '🐠', category: 'Pets' }
    ],
    sentences: [
      { pattern: 'Do you have any pets? - Yes, I have a puppy.', vietnamese: 'Bạn có nuôi thú cưng không? - Có, mình có một chú cún con.', dialogue: 'A: Do you have any pets? \nB: Yes, I have two cats and a goldfish.' }
    ],
    listeningQuestions: [
      {
        id: 'g3-lq161',
        audioScript: 'I love animals! I have a fluffy white rabbit with long ears.',
        question: 'Bạn nhỏ nuôi con thú cưng nào?',
        options: ['A parrot', 'A rabbit (Con thỏ trắng)', 'A tiger', 'A monkey'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Lovely Pets',
      text: 'Tom has a smart brown dog named Lucky. Lucky runs fast and fetches the ball. Linda has a yellow goldfish that swims gently in a glass bowl.',
      questions: [
        { question: 'What pet does Tom have?', options: ['A smart brown dog', 'A white cat', 'A green parrot', 'A turtle'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: R _ B B I T', answer: 'A', maskedWord: 'R _ B B I T' },
      { type: 'sentence_builder', prompt: 'Ghép câu: have / I / a / dog / pet', answer: 'I have a pet dog', scrambledTokens: ['pet', 'dog', 'I', 'a', 'have'] }
    ],
    speechPrompts: [
      { phrase: 'I have a cute rabbit', vietnamese: 'Mình có một con thỏ dễ thương', phoneticTip: 'Chú ý phát âm rõ rabbit' }
    ],
    oddWords: [
      { words: ['Dog', 'Pencil case', 'Rabbit', 'Cat'], oddIndex: 1, explanation: 'Pencil case là hộp bút, các từ còn lại là thú cưng!' }
    ]
  }
];
