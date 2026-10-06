import { Unit } from '../types';

export const CURRICULUM_GRADE_5: Unit[] = [
  {
    id: 'g5-unit-1',
    title: 'Unit 1: Summer Holidays & Trips',
    vietnameseTitle: 'Bài 1: Kỳ nghỉ hè và những chuyến du lịch',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Past Holidays & Places',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v1', word: 'Ha Long Bay', phonetic: '/hɑː lɒŋ beɪ/', vietnamese: 'Vịnh Hạ Long', exampleSentence: 'We visited Ha Long Bay.', emoji: '⛵', category: 'Places' },
      { id: 'g5-v2', word: 'Da Nang', phonetic: '/dɑː næŋ/', vietnamese: 'Thành phố Đà Nẵng', exampleSentence: 'The beaches in Da Nang are beautiful.', emoji: '🏖️', category: 'Places' },
      { id: 'g5-v3', word: 'Phu Quoc Island', phonetic: '/fuː kwɒk ˈaɪlənd/', vietnamese: 'Đảo Phú Quốc', exampleSentence: 'We took a trip to Phu Quoc.', emoji: '🏝️', category: 'Places' },
      { id: 'g5-v4', word: 'Boat trip', phonetic: '/bəʊt trɪp/', vietnamese: 'Chuyến đi thuyền', exampleSentence: 'We took a boat trip on the bay.', emoji: '🚤', category: 'Activities' },
      { id: 'g5-v5', word: 'Seafood', phonetic: '/ˈsiːfuːd/', vietnamese: 'Hải sản', exampleSentence: 'The seafood was delicious.', emoji: '🦞', category: 'Food' }
    ],
    sentences: [
      { pattern: 'Where did you go on holiday? - I went to Ha Long Bay.', vietnamese: 'Bạn đã đi đâu vào kỳ nghỉ? - Mình đã đi Vịnh Hạ Long.', dialogue: 'A: Where did you go on holiday? \nB: I went to Ha Long Bay with my family.' },
      { pattern: 'What did you do there? - We explored the caves.', vietnamese: 'Bạn đã làm gì ở đó? - Chúng mình đã khám phá các hang động.', dialogue: 'A: What did you do there? \nB: We took a boat trip around the islands.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq1',
        audioScript: 'Last summer, my family went to Da Nang city. We swam in the blue sea and ate tasty seafood.',
        question: 'Gia đình bạn nhỏ đã đi nghỉ mát ở thành phố nào?',
        options: ['Hue citadel', 'Ha Noi capital', 'Da Nang city', 'Nha Trang'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Our Summer in Ha Long Bay',
      text: 'Last August, Phong and his family had a wonderful holiday in Ha Long Bay. The weather was sunny and breezy. They took a boat trip to explore caves and took many photos. In the evening, they enjoyed fresh seafood together.',
      questions: [
        { question: 'When did Phong go to Ha Long Bay?', options: ['Last August', 'Last winter', 'Yesterday', 'Three years ago'], correctIndex: 0 },
        { question: 'What did they do on the bay?', options: ['Stayed at home', 'Rode bicycles', 'Climbed trees', 'Took a boat trip to explore caves'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: I S L _ N D (Hòn đảo)', answer: 'A', maskedWord: 'I S L _ N D' },
      { type: 'sentence_builder', prompt: 'Ghép câu: did / Where / go / you / on holiday?', answer: 'Where did you go on holiday?', scrambledTokens: ['on holiday?', 'Where', 'you', 'did', 'go'] }
    ],
    speechPrompts: [
      { phrase: 'Where did you go on holiday? I went to Ha Long Bay', vietnamese: 'Bạn đã đi đâu vào kỳ nghỉ? Mình đã đi Vịnh Hạ Long', phoneticTip: 'Chú ý phát âm thì quá khứ went to' }
    ],
    oddWords: [
      { words: ['Ha Long Bay', 'Pencil', 'Phu Quoc', 'Da Nang'], oddIndex: 1, explanation: 'Pencil là bút chì, các từ còn lại là danh lam thắng cảnh Việt Nam!' }
    ]
  },
  {
    id: 'g5-unit-2',
    title: 'Unit 2: Daily Life & How Often',
    vietnameseTitle: 'Bài 2: Cuộc sống hàng ngày và mức độ thường xuyên',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Adverbs of Frequency',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v21', word: 'Always', phonetic: '/ˈɔːlweɪz/', vietnamese: 'Luôn luôn (100%)', exampleSentence: 'I always brush my teeth.', emoji: '💯', category: 'Frequency' },
      { id: 'g5-v22', word: 'Usually', phonetic: '/ˈjuːʒuəli/', vietnamese: 'Thường thường (80%)', exampleSentence: 'I usually do my homework.', emoji: '📈', category: 'Frequency' },
      { id: 'g5-v23', word: 'Often', phonetic: '/ˈɒfn/', vietnamese: 'Thường xuyên (60%)', exampleSentence: 'We often play football.', emoji: '📊', category: 'Frequency' },
      { id: 'g5-v24', word: 'Sometimes', phonetic: '/ˈsʌmtaɪmz/', vietnamese: 'Thỉnh thoảng (30%)', exampleSentence: 'I sometimes watch TV.', emoji: '⏱️', category: 'Frequency' },
      { id: 'g5-v25', word: 'Never', phonetic: '/ˈnevə(r)/', vietnamese: 'Không bao giờ (0%)', exampleSentence: 'I never stay up late.', emoji: '⛔', category: 'Frequency' }
    ],
    sentences: [
      { pattern: 'How often do you read books? - I read books four times a week.', vietnamese: 'Bạn có thường đọc sách không? - Mình đọc sách bốn lần một tuần.', dialogue: 'A: How often do you study with a partner? \nB: I usually study with a partner on Tuesday.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq21',
        audioScript: 'Mai is a hard-working student. She always does her homework before watching cartoons.',
        question: 'Mai làm bài tập về nhà với tần suất thế nào?',
        options: ['Never (Không bao giờ)', 'Always (Luôn luôn)', 'Sometimes', 'Rarely'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Free Time Activities',
      text: 'During the week, Quan usually goes to the library to read science books. On weekends, he often plays badminton with his father in the park. He sometimes visits his grandparents in the countryside.',
      questions: [
        { question: 'What does Quan do on weekends?', options: ['Stays in bed', 'Plays badminton with his father', 'Watches movies all day', 'Goes fishing'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: A L W _ Y S', answer: 'A', maskedWord: 'A L W _ Y S' },
      { type: 'sentence_builder', prompt: 'Ghép câu: often / How / do / study / you?', answer: 'How often do you study?', scrambledTokens: ['study', 'How', 'do', 'often', 'you?'] }
    ],
    speechPrompts: [
      { phrase: 'I usually go to school by bicycle', vietnamese: 'Mình thường đi học bằng xe đạp', phoneticTip: 'Phát âm chuẩn từ usually /ˈjuːʒuəli/' }
    ],
    oddWords: [
      { words: ['Always', 'Usually', 'Often', 'Yellow'], oddIndex: 3, explanation: 'Yellow là màu vàng, các từ còn lại là trạng từ chỉ tần suất!' }
    ]
  },
  {
    id: 'g5-unit-3',
    title: 'Unit 3: Where Did You Go on Holiday?',
    vietnameseTitle: 'Bài 3: Phương tiện di chuyển trong kỳ nghỉ (By train, By plane...)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Travel & Transport',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v31', word: 'By train', phonetic: '/baɪ treɪn/', vietnamese: 'Bằng tàu hỏa', exampleSentence: 'We went by train.', emoji: '🚆', category: 'Transport' },
      { id: 'g5-v32', word: 'By plane', phonetic: '/baɪ pleɪn/', vietnamese: 'Bằng máy bay', exampleSentence: 'Fly by plane.', emoji: '✈️', category: 'Transport' },
      { id: 'g5-v33', word: 'By coach', phonetic: '/baɪ kəʊtʃ/', vietnamese: 'Bằng xe khách', exampleSentence: 'Travel by coach.', emoji: '🚌', category: 'Transport' },
      { id: 'g5-v34', word: 'By motorbike', phonetic: '/baɪ ˈməʊtəbaɪk/', vietnamese: 'Bằng xe máy', exampleSentence: 'Ride by motorbike.', emoji: '🏍️', category: 'Transport' },
      { id: 'g5-v35', word: 'Hometown', phonetic: '/ˈhəʊmtaʊn/', vietnamese: 'Quê hương', exampleSentence: 'Visit my hometown.', emoji: '🏡', category: 'Places' }
    ],
    sentences: [
      { pattern: 'How did you get there? - I went by train.', vietnamese: 'Bạn đã đến đó bằng phương tiện gì? - Mình đi bằng xe buýt.', dialogue: 'A: How did you get to Da Nang? \nB: I went by plane. It was very fast!' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq31',
        audioScript: 'Last Tet holiday, we visited our grandparents in Hue. We went by train and saw green rice fields along the way.',
        question: 'Gia đình bạn nhỏ đã đến Huế bằng phương tiện gì?',
        options: ['By bicycle', 'By plane (Máy bay)', 'By boat', 'By train (Tàu hỏa)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Trip to Nha Trang',
      text: 'Last summer, Tony family took a trip to Nha Trang. They traveled by plane from Ha Noi. The flight took only two hours, and the coastal views from the window were spectacular.',
      questions: [
        { question: 'How did Tony family travel to Nha Trang?', options: ['By plane', 'By motorbike', 'On foot', 'By coach'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P L _ N E (Máy bay)', answer: 'A', maskedWord: 'P L _ N E' },
      { type: 'sentence_builder', prompt: 'Ghép câu: did / get / How / you / there?', answer: 'How did you get there?', scrambledTokens: ['get', 'there?', 'did', 'you', 'How'] }
    ],
    speechPrompts: [
      { phrase: 'How did you get there? I went by train', vietnamese: 'Bạn đến đó bằng gì? Mình đi bằng tàu hỏa', phoneticTip: 'Chú ý phát âm train /treɪn/' }
    ],
    oddWords: [
      { words: ['Cake', 'Plane', 'Coach', 'Train'], oddIndex: 0, explanation: 'Cake là bánh, các từ còn lại là phương tiện giao thông!' }
    ]
  },
  {
    id: 'g5-unit-4',
    title: 'Unit 4: Did You Go to the Party?',
    vietnameseTitle: 'Bài 4: Bữa tiệc sinh nhật và các hoạt động quá khứ',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Parties & Past Events',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v41', word: 'Party', phonetic: '/ˈpɑːti/', vietnamese: 'Bữa tiệc', exampleSentence: 'A birthday party.', emoji: '🎂', category: 'Events' },
      { id: 'g5-v42', word: 'Ate food', phonetic: '/et fuːd/', vietnamese: 'Đã ăn đồ ăn (quá khứ)', exampleSentence: 'We ate nice food.', emoji: '🍕', category: 'Actions' },
      { id: 'g5-v43', word: 'Drank juice', phonetic: '/dræŋk dʒuːs/', vietnamese: 'Đã uống nước quả', exampleSentence: 'Drank fruit juice.', emoji: '🧃', category: 'Actions' },
      { id: 'g5-v44', word: 'Played games', phonetic: '/pleɪd ɡeɪmz/', vietnamese: 'Đã chơi các trò chơi', exampleSentence: 'Played fun games.', emoji: '🎮', category: 'Actions' },
      { id: 'g5-v45', word: 'Watched cartoons', phonetic: '/wɒtʃt kɑːˈtuːnz/', vietnamese: 'Đã xem phim hoạt hình', exampleSentence: 'Watched cartoons together.', emoji: '📺', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'Did you go to the party? - Yes, I did. / No, I did not.', vietnamese: 'Bạn đã đi dự tiệc phải không? - Đúng vậy. / Không.', dialogue: 'A: Did you go to Mai birthday party? \nB: Yes, I did. We had so much fun!' },
      { pattern: 'What did you do at the party? - We sang English songs.', vietnamese: 'Bạn đã làm gì ở bữa tiệc? - Chúng mình đã hát những bài hát tiếng Anh.', dialogue: 'A: What did you do there? \nB: We ate delicious cake and sang songs.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq41',
        audioScript: 'Did you enjoy the party, Nam? Yes, I did! We ate pizza, drank apple juice, and watched funny cartoons.',
        question: 'Các bạn nhỏ đã làm gì ở bữa tiệc?',
        options: ['Went to sleep early', 'Did homework all evening', 'Ate pizza, drank juice, and watched cartoons', 'Cleaned the yard'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Linda Birthday Celebration',
      text: 'Yesterday was Linda tenth birthday. Many classmates came to her house. They brought lovely gifts, played hide-and-seek in the garden, and sang the Happy Birthday song.',
      questions: [
        { question: 'What game did they play in the garden?', options: ['Basketball', 'Chess', 'Football', 'Hide-and-seek'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P _ R T Y', answer: 'A', maskedWord: 'P _ R T Y' },
      { type: 'sentence_builder', prompt: 'Ghép câu: go / Did / the / to / party? / you', answer: 'Did you go to the party?', scrambledTokens: ['you', 'Did', 'the', 'go', 'to', 'party?'] }
    ],
    speechPrompts: [
      { phrase: 'Did you go to the party? Yes I did', vietnamese: 'Bạn có đi dự tiệc không? Có, mình có đi', phoneticTip: 'Chú ý phát âm did you /dɪdʒu/' }
    ],
    oddWords: [
      { words: ['Ate', 'Drank', 'Tomorrow', 'Played'], oddIndex: 2, explanation: 'Tomorrow là ngày mai, các từ còn lại là động từ quá khứ!' }
    ]
  },
  {
    id: 'g5-unit-5',
    title: 'Unit 5: Where Will You Be This Weekend?',
    vietnameseTitle: 'Bài 5: Dự định cuối tuần (Thì tương lai đơn: Will be)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Future Plans & Places',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v51', word: 'At the seaside', phonetic: '/æt ðə ˈsiːsaɪd/', vietnamese: 'Ở bờ biển', exampleSentence: 'Be at the seaside.', emoji: '🏖️', category: 'Places' },
      { id: 'g5-v52', word: 'In the mountains', phonetic: '/ɪn ðə ˈmaʊntənz/', vietnamese: 'Ở trên núi', exampleSentence: 'Hike in the mountains.', emoji: '⛰️', category: 'Places' },
      { id: 'g5-v53', word: 'On the beach', phonetic: '/ɒn ðə biːtʃ/', vietnamese: 'Trên bãi biển', exampleSentence: 'Relax on the beach.', emoji: '🏖️', category: 'Places' },
      { id: 'g5-v54', word: 'By the sea', phonetic: '/baɪ ðə siː/', vietnamese: 'Bên bờ biển', exampleSentence: 'Stay by the sea.', emoji: '🌊', category: 'Places' },
      { id: 'g5-v55', word: 'Explore the caves', phonetic: '/ɪkˈsplɔː ðə keɪvz/', vietnamese: 'Thám hiểm hang động', exampleSentence: 'Explore the caves in Quang Binh.', emoji: '🧗', category: 'Activities' }
    ],
    sentences: [
      { pattern: 'Where will you be this weekend? - I think I will be in Ha Long Bay.', vietnamese: 'Cuối tuần này bạn sẽ ở đâu? - Mình nghĩ mình sẽ ở Vịnh Hạ Long.', dialogue: 'A: Where will you be this weekend? \nB: I think I will be in the mountains with my family.' },
      { pattern: 'What will you do there? - I will explore the caves.', vietnamese: 'Bạn sẽ làm gì ở đó? - Mình sẽ đi khám phá các hang động.', dialogue: 'A: What will you do in Ha Long Bay? \nB: I will explore the caves and swim in the sea.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq51',
        audioScript: 'Where will you be this Sunday, Mai? I think my family will be in the cool mountains in Sa Pa.',
        question: 'Mai dự định sẽ ở đâu vào Chủ Nhật này?',
        options: ['In the classroom', 'In the mountains in Sa Pa (Trên núi ở Sa Pa)', 'In the supermarket', 'At home'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Weekend Plans',
      text: 'Next weekend, our class will have two days off. Quan thinks he will be at the seaside in Da Nang. Mai and her parents will be in the mountains of Tam Dao to enjoy the fresh cool breeze.',
      questions: [
        { question: 'Where does Quan think he will be?', options: ['At school', 'In London', 'At the seaside in Da Nang', 'In the kitchen'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: M _ U N T A I N S', answer: 'O', maskedWord: 'M _ U N T A I N S' },
      { type: 'sentence_builder', prompt: 'Ghép câu: will / Where / this / be / you / weekend?', answer: 'Where will you be this weekend?', scrambledTokens: ['Where', 'weekend?', 'this', 'you', 'will', 'be'] }
    ],
    speechPrompts: [
      { phrase: 'I think I will be in the mountains', vietnamese: 'Mình nghĩ mình sẽ ở trên núi', phoneticTip: 'Chú ý phát âm think /θɪŋk/' }
    ],
    oddWords: [
      { words: ['Seaside', 'Mountains', 'Desk', 'Beach'], oddIndex: 2, explanation: 'Desk là bàn học, các từ còn lại là địa điểm nghỉ dưỡng!' }
    ]
  },
  {
    id: 'g5-unit-6',
    title: 'Unit 6: How Many Lessons Do You Have Today?',
    vietnameseTitle: 'Bài 6: Bạn có bao nhiêu tiết học hôm nay?',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'School Lessons & Numbers',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v61', word: 'Lesson', phonetic: '/ˈlesn/', vietnamese: 'Tiết học / Bài học', exampleSentence: 'Four lessons today.', emoji: '📖', category: 'School' },
      { id: 'g5-v62', word: 'Maths', phonetic: '/mæθs/', vietnamese: 'Môn Toán', exampleSentence: 'A challenging Maths lesson.', emoji: '📐', category: 'Subjects' },
      { id: 'g5-v63', word: 'IT (Informatics)', phonetic: '/ˌaɪ ˈtiː/', vietnamese: 'Tin học / Máy tính', exampleSentence: 'Computers in IT class.', emoji: '💻', category: 'Subjects' },
      { id: 'g5-v64', word: 'PE (Physical Education)', phonetic: '/ˌpiː ˈiː/', vietnamese: 'Giáo dục thể chất', exampleSentence: 'Exercise in PE.', emoji: '🏃', category: 'Subjects' },
      { id: 'g5-v65', word: 'Except', phonetic: '/ɪkˈsept/', vietnamese: 'Ngoại trừ', exampleSentence: 'Every day except Sunday.', emoji: '🚫', category: 'Prepositions' }
    ],
    sentences: [
      { pattern: 'How many lessons do you have today? - I have four: Maths, Vietnamese, English, and Music.', vietnamese: 'Hôm nay bạn có mấy tiết học? - Mình có bốn tiết: Toán, Tiếng Việt, Tiếng Anh và Âm nhạc.', dialogue: 'A: How many lessons do you have today? \nB: I have four: Maths, Vietnamese, English, and IT.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq61',
        audioScript: 'Good morning, class! Today is Monday. You have four lessons: Maths, Vietnamese, English, and Science.',
        question: 'Hôm nay học sinh có bao nhiêu tiết học?',
        options: ['Four lessons (4 tiết học)', 'Two lessons', 'Six lessons', 'One lesson'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our School Daily Schedule',
      text: 'Every school day, grade 5 students have four or five lessons. On Thursday, we have English, Maths, IT, and PE. We love IT lesson because we get to code funny animations.',
      questions: [
        { question: 'Why do students love the IT lesson?', options: ['Because they get to code funny animations', 'Because they sleep', 'Because they eat snacks', 'Because it is outside'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: L _ S S O N', answer: 'E', maskedWord: 'L _ S S O N' },
      { type: 'sentence_builder', prompt: 'Ghép câu: do / have / How many / you / lessons / today?', answer: 'How many lessons do you have today?', scrambledTokens: ['have', 'lessons', 'do', 'How many', 'today?', 'you'] }
    ],
    speechPrompts: [
      { phrase: 'How many lessons do you have today? I have four', vietnamese: 'Hôm nay bạn có mấy tiết? Mình có 4 tiết', phoneticTip: 'Chú ý phát âm lessons có số nhiều' }
    ],
    oddWords: [
      { words: ['Maths', 'Sandwich', 'PE', 'IT'], oddIndex: 1, explanation: 'Sandwich là món ăn, các từ còn lại là môn học ở trường!' }
    ]
  },
  {
    id: 'g5-unit-7',
    title: 'Unit 7: How Do You Learn English?',
    vietnameseTitle: 'Bài 7: Phương pháp học Tiếng Anh hiệu quả 4 kỹ năng',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'English Learning Strategies',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v71', word: 'Speak English', phonetic: '/spiːk ˈɪŋɡlɪʃ/', vietnamese: 'Nói tiếng Anh', exampleSentence: 'Speak English every day.', emoji: '🗣️', category: 'Skills' },
      { id: 'g5-v72', word: 'Watch English cartoons', phonetic: '/wɒtʃ ˈɪŋɡlɪʃ kɑːˈtuːnz/', vietnamese: 'Xem hoạt hình tiếng Anh', exampleSentence: 'Watch cartoons to improve listening.', emoji: '📺', category: 'Strategies' },
      { id: 'g5-v73', word: 'Read comic books', phonetic: '/riːd ˈkɒmɪk bʊks/', vietnamese: 'Đọc truyện tranh tiếng Anh', exampleSentence: 'Read comic books for vocabulary.', emoji: '📖', category: 'Strategies' },
      { id: 'g5-v74', word: 'Write emails to pen friends', phonetic: '/raɪt ˈiːmeɪlz/', vietnamese: 'Viết thư điện tử cho bạn', exampleSentence: 'Write emails to practice writing.', emoji: '✉️', category: 'Strategies' },
      { id: 'g5-v75', word: 'Practise', phonetic: '/ˈpræktɪs/', vietnamese: 'Luyện tập', exampleSentence: 'Practise pronunciation.', emoji: '🎯', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'How do you practise speaking English? - I speak with Sparky every day.', vietnamese: 'Bạn luyện tập kỹ năng nói tiếng Anh như thế nào? - Mình trò chuyện cùng bạn Sparky mỗi ngày.', dialogue: 'A: How do you practise speaking English? \nB: I talk with foreign tourists and speak with Sparky AI every day.' },
      { pattern: 'Why do you learn English? - Because I want to travel around the world.', vietnamese: 'Vì sao bạn học tiếng Anh? - Vì mình muốn đi du lịch vòng quanh thế giới.', dialogue: 'A: Why do you learn English? \nB: Because I want to travel around the world.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq71',
        audioScript: 'How do you learn vocabulary, Mai? I write new words in my notebook and read them aloud three times.',
        question: 'Mai học từ mới tiếng Anh bằng cách nào?',
        options: ['Only plays video games', 'Never writes anything', 'Writes new words in notebook and reads them aloud', 'Listens to loud music'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Our Secrets to Master English',
      text: 'To be good at English, Nam watches English cartoons on TV without subtitles. Lan writes emails to her Australian pen friend every Friday. Quan loves reading comic books in English to discover new idioms.',
      questions: [
        { question: 'What does Lan do every Friday?', options: ['Sleeps early', 'Writes emails to her Australian pen friend', 'Watches horror movies', 'Plays chess'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P R _ C T I S E', answer: 'A', maskedWord: 'P R _ C T I S E' },
      { type: 'sentence_builder', prompt: 'Ghép câu: practise / How / you / speaking? / do', answer: 'How do you practise speaking?', scrambledTokens: ['speaking?', 'How', 'practise', 'do', 'you'] }
    ],
    speechPrompts: [
      { phrase: 'I practice speaking English every day', vietnamese: 'Mình luyện nói tiếng Anh mỗi ngày', phoneticTip: 'Nối âm speak English' }
    ],
    oddWords: [
      { words: ['Speak', 'Listen', 'Read', 'Banana'], oddIndex: 3, explanation: 'Banana là quả chuối, các từ còn lại là 4 kỹ năng ngôn ngữ!' }
    ]
  },
  {
    id: 'g5-unit-8',
    title: 'Unit 8: What Are You Reading?',
    vietnameseTitle: 'Bài 8: Bạn đang đọc truyện gì? (Truyện cổ tích & Nhân vật)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Stories & Characters',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v81', word: 'Fairy tale', phonetic: '/ˈfeəri teɪl/', vietnamese: 'Truyện cổ tích', exampleSentence: 'A magic fairy tale.', emoji: '🧚', category: 'Literature' },
      { id: 'g5-v82', word: 'Ghost story', phonetic: '/ɡəʊst ˈstɔːri/', vietnamese: 'Truyện ma / ly kỳ', exampleSentence: 'A spooky ghost story.', emoji: '👻', category: 'Literature' },
      { id: 'g5-v83', word: 'Aladdin and the Magic Lamp', phonetic: '/əˈlædɪn/', vietnamese: 'Aladdin và cây đèn thần', exampleSentence: 'Read Aladdin and the Magic Lamp.', emoji: '🪔', category: 'Stories' },
      { id: 'g5-v84', word: 'Snow White and the Seven Dwarfs', phonetic: '/snəʊ waɪt/', vietnamese: 'Nàng Bạch Tuyết và 7 chú lùn', exampleSentence: 'Read Snow White.', emoji: '👸', category: 'Stories' },
      { id: 'g5-v85', word: 'Clever', phonetic: '/ˈklevə(r)/', vietnamese: 'Thông minh', exampleSentence: 'An Tam is clever.', emoji: '🧠', category: 'Characters' }
    ],
    sentences: [
      { pattern: 'What are you reading? - I am reading The Story of Mai An Tiem.', vietnamese: 'Bạn đang đọc sách gì thế? - Mình đang đọc Truyện Mai An Tiêm.', dialogue: 'A: What are you reading, Peter? \nB: I am reading The Story of Mai An Tiem.' },
      { pattern: 'What is the main character like? - He is clever and brave.', vietnamese: 'Nhân vật chính như thế nào? - Chàng ấy rất thông minh và dũng cảm.', dialogue: 'A: What is Snow White like? \nB: She is kind and gentle.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq81',
        audioScript: 'I am reading Aladdin and the Magic Lamp. The genie is powerful and Aladdin is very clever!',
        question: 'Aladdin là một nhân vật như thế nào?',
        options: ['Cowardly', 'Lazy', 'Mean', 'Clever (Thông minh, mưu trí)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Favorite Bedtime Tales',
      text: 'Mai loves reading Vietnamese folk tales. Her favorite story is The Legend of Watermelon. The main character, Mai An Tiem, is hard-working, brave, and resourceful on the deserted island.',
      questions: [
        { question: 'What is Mai An Tiem like?', options: ['Lazy and greedy', 'Hard-working and brave', 'Selfish', 'Cruel'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: C L _ V E R (Thông minh)', answer: 'E', maskedWord: 'C L _ V E R' },
      { type: 'sentence_builder', prompt: 'Ghép câu: reading? / are / What / you', answer: 'What are you reading?', scrambledTokens: ['you', 'What', 'reading?', 'are'] }
    ],
    speechPrompts: [
      { phrase: 'I am reading a fairy tale', vietnamese: 'Mình đang đọc một câu chuyện cổ tích', phoneticTip: 'Chú ý phát âm fairy tale /ˈfeəri teɪl/' }
    ],
    oddWords: [
      { words: ['Door', 'Kind', 'Brave', 'Clever'], oddIndex: 0, explanation: 'Door là cánh cửa, các từ còn lại là tính cách nhân vật!' }
    ]
  },
  {
    id: 'g5-unit-9',
    title: 'Unit 9: What Did You See at the Zoo?',
    vietnameseTitle: 'Bài 9: Bạn đã nhìn thấy con gì ở vườn thú? (Hành động động vật)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Zoo Animals & Actions',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v91', word: 'Pythons', phonetic: '/ˈpaɪθənz/', vietnamese: 'Những con trăn', exampleSentence: 'The pythons moved slowly.', emoji: '🐍', category: 'Animals' },
      { id: 'g5-v92', word: 'Crocodiles', phonetic: '/ˈkrɒkədaɪlz/', vietnamese: 'Những con cá sấu', exampleSentence: 'Big crocodiles in the water.', emoji: '🐊', category: 'Animals' },
      { id: 'g5-v93', word: 'Peacocks', phonetic: '/ˈpiːkɒks/', vietnamese: 'Những con công', exampleSentence: 'Peacocks danced beautifully.', emoji: '🦚', category: 'Animals' },
      { id: 'g5-v94', word: 'Gorillas', phonetic: '/ɡəˈrɪləz/', vietnamese: 'Những con tinh tinh đột biến', exampleSentence: 'Gorillas moved quickly.', emoji: '🦍', category: 'Animals' },
      { id: 'g5-v95', word: 'Roared loudly', phonetic: '/rɔːd ˈlaʊdli/', vietnamese: 'Gầm to (tiếng hổ/sư tử)', exampleSentence: 'The tigers roared loudly.', emoji: '🦁', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'What did you see at the zoo? - I saw peacocks and tigers.', vietnamese: 'Bạn đã nhìn thấy con gì ở vườn thú? - Mình đã thấy những chú công và hổ.', dialogue: 'A: What did you see at the zoo? \nB: I saw peacocks. They danced beautifully!' },
      { pattern: 'What did the tigers do when you were there? - They roared loudly.', vietnamese: 'Những con hổ đã làm gì khi bạn ở đó? - Chúng đã gầm rất to.', dialogue: 'A: What did the tigers do? \nB: They roared loudly.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq91',
        audioScript: 'When we were at the zoo yesterday, the colorful peacocks spread their wings and danced beautifully!',
        question: 'Những chú chim công đã làm gì?',
        options: ['Roared loudly', 'Slept quietly', 'Swam fast', 'Danced beautifully (Múa rất đẹp)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Exciting Day at Thu Le Zoo',
      text: 'Last Sunday, Nam went to Thu Le Zoo in Ha Noi. He saw big crocodiles sunbathing near the pond and funny gorillas jumping from branch to branch. The tigers roared loudly when the keeper arrived with meat.',
      questions: [
        { question: 'What did the tigers do when the keeper arrived?', options: ['They hid in trees', 'They swam away', 'They roared loudly', 'They fell asleep'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P _ A C O C K', answer: 'E', maskedWord: 'P _ A C O C K' },
      { type: 'sentence_builder', prompt: 'Ghép câu: saw / I / peacocks / zoo / the / at', answer: 'I saw peacocks at the zoo', scrambledTokens: ['I', 'peacocks', 'at', 'saw', 'zoo', 'the'] }
    ],
    speechPrompts: [
      { phrase: 'The peacocks danced beautifully', vietnamese: 'Những con công đã múa rất đẹp', phoneticTip: 'Chú ý nhấn trọng âm beau-ti-ful-ly' }
    ],
    oddWords: [
      { words: ['Pencil', 'Gorillas', 'Crocodiles', 'Peacocks'], oddIndex: 0, explanation: 'Pencil là cây bút chì, các từ còn lại là động vật ở sở thú!' }
    ]
  },
  {
    id: 'g5-unit-10',
    title: 'Unit 10: When Will Sports Day Be?',
    vietnameseTitle: 'Bài 10: Khi nào sẽ diễn ra Ngày Hội Thể Thao?',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'School Events & Sports Day',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v101', word: 'Sports Day', phonetic: '/spɔːts deɪ/', vietnamese: 'Ngày hội thể thao', exampleSentence: 'Join Sports Day.', emoji: '🏅', category: 'Events' },
      { id: 'g5-v102', word: 'Teachers Day', phonetic: '/ˈtiːtʃəz deɪ/', vietnamese: 'Ngày Nhà giáo Việt Nam', exampleSentence: 'Celebrate Teachers Day.', emoji: '💐', category: 'Events' },
      { id: 'g5-v103', word: 'Independence Day', phonetic: '/ˌɪndɪˈpendəns deɪ/', vietnamese: 'Ngày Quốc khánh', exampleSentence: 'National Independence Day.', emoji: '🇻🇳', category: 'Events' },
      { id: 'g5-v104', word: 'Childrens Day', phonetic: '/ˈtʃɪldrənz deɪ/', vietnamese: 'Ngày Quốc tế Thiếu nhi', exampleSentence: 'Gifts on Childrens Day.', emoji: '🎈', category: 'Events' },
      { id: 'g5-v105', word: 'Take part in', phonetic: '/teɪk pɑːt ɪn/', vietnamese: 'Tham gia vào', exampleSentence: 'Take part in the race.', emoji: '🏃', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'When will Sports Day be? - It will be on Saturday.', vietnamese: 'Khi nào sẽ diễn ra Hội thao? - Hội thao sẽ diễn ra vào thứ Bảy.', dialogue: 'A: When will Sports Day be? \nB: It will be on next Saturday.' },
      { pattern: 'What are you going to do on Sports Day? - I am going to play football.', vietnamese: 'Bạn sẽ làm gì trong ngày Hội thao? - Mình sẽ tham gia thi đấu bóng đá.', dialogue: 'A: What are you going to do? \nB: I am going to play football and run the 100-meter race.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq101',
        audioScript: 'When will Sports Day be, Tony? It will be next Saturday on the twenty-fifth of October!',
        question: 'Ngày hội thể thao sẽ diễn ra vào lúc nào?',
        options: ['Next Saturday on 25th October', 'Next Sunday', 'Last month', 'Next year'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Excitement for Sports Day',
      text: 'Our school Sports Day will be next Friday. Many students are practicing hard. Phong and Nam are going to play table tennis. Mai and Linda are going to take part in the relay race.',
      questions: [
        { question: 'What are Mai and Linda going to take part in?', options: ['The singing contest', 'The chess contest', 'The relay race', 'The swimming gala'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S P _ R T S', answer: 'O', maskedWord: 'S P _ R T S' },
      { type: 'sentence_builder', prompt: 'Ghép câu: will / Sports Day / When / be?', answer: 'When will Sports Day be?', scrambledTokens: ['Sports Day', 'When', 'be?', 'will'] }
    ],
    speechPrompts: [
      { phrase: 'When will Sports Day be? It will be on Saturday', vietnamese: 'Khi nào hội thao diễn ra? Vào thứ Bảy', phoneticTip: 'Lên giọng ở cuối câu hỏi' }
    ],
    oddWords: [
      { words: ['Sports Day', 'Teachers Day', 'Apple', 'Childrens Day'], oddIndex: 2, explanation: 'Apple là trái cây, các từ còn lại là các ngày lễ hội trường học!' }
    ]
  },
  {
    id: 'g5-unit-11',
    title: 'Unit 11: What\'s the Matter with You? - Health',
    vietnameseTitle: 'Bài 11: Bạn bị làm sao vậy? (Sức khỏe & Bệnh thông thường)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Health & Illnesses',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v111', word: 'Headache', phonetic: '/ˈhedeɪk/', vietnamese: 'Đau đầu', exampleSentence: 'I have a bad headache.', emoji: '🤕', category: 'Health' },
      { id: 'g5-v112', word: 'Toothache', phonetic: '/ˈtuːθeɪk/', vietnamese: 'Đau răng', exampleSentence: 'A sharp toothache.', emoji: '🦷', category: 'Health' },
      { id: 'g5-v113', word: 'Stomach ache', phonetic: '/ˈstʌmək eɪk/', vietnamese: 'Đau dạ dày / đau bụng', exampleSentence: 'A stomach ache.', emoji: '🤢', category: 'Health' },
      { id: 'g5-v114', word: 'Fever', phonetic: '/ˈfiːvə(r)/', vietnamese: 'Bị sốt', exampleSentence: 'She has a high fever.', emoji: '🤒', category: 'Health' },
      { id: 'g5-v115', word: 'Go to the doctor', phonetic: '/ɡəʊ tu ðə ˈdɒktə(r)/', vietnamese: 'Đi khám bác sĩ', exampleSentence: 'You should go to the doctor.', emoji: '👨‍⚕️', category: 'Advice' }
    ],
    sentences: [
      { pattern: 'What is the matter with you? - I have a headache.', vietnamese: 'Bạn bị làm sao vậy? - Mình bị đau đầu.', dialogue: 'A: What is the matter with you, Tony? \nB: I have a bad toothache. Ouch!' },
      { pattern: 'You should go to the doctor. - Yes, I will. Thanks.', vietnamese: 'Bạn nên đi khám bác sĩ. - Vâng, mình sẽ đi khám. Cảm ơn bạn.', dialogue: 'A: You should go to the dentist. \nB: Yes, I will. Thank you.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq111',
        audioScript: 'Tony cannot eat sweets today because he has a painful toothache.',
        question: 'Tony đang bị đau ở đâu?',
        options: ['Headache (Đau đầu)', 'Toothache (Đau răng)', 'Backache', 'Broken leg'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Visiting the School Nurse',
      text: 'During break time, Mai went to the medical room. She had a high fever and a sore throat. The kind school nurse gave her warm water and advised her to rest at home.',
      questions: [
        { question: 'What did the school nurse advise Mai to do?', options: ['Rest at home', 'Play football', 'Eat ice cream', 'Run outside'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: H _ A D A C H E', answer: 'E', maskedWord: 'H _ A D A C H E' },
      { type: 'sentence_builder', prompt: 'Ghép câu: matter / What / the / with / is / you?', answer: 'What is the matter with you?', scrambledTokens: ['you?', 'with', 'What', 'is', 'matter', 'the'] }
    ],
    speechPrompts: [
      { phrase: 'What is the matter with you? I have a headache', vietnamese: 'Bạn bị sao thế? Mình bị đau đầu', phoneticTip: 'Chú ý âm đuôi /eɪk/ trong headache' }
    ],
    oddWords: [
      { words: ['Headache', 'Toothache', 'Fever', 'Pencil'], oddIndex: 3, explanation: 'Pencil là bút chì, các từ còn lại là triệu chứng bệnh!' }
    ]
  },
  {
    id: 'g5-unit-12',
    title: 'Unit 12: Don\'t Ride Your Bike Too Fast!',
    vietnameseTitle: 'Bài 12: Đừng đi xe đạp quá nhanh! (An toàn & Phòng tai nạn)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Safety & Accidents',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v121', word: 'Ride bike fast', phonetic: '/raɪd baɪk fɑːst/', vietnamese: 'Đi xe đạp quá nhanh', exampleSentence: 'Do not ride your bike fast.', emoji: '🚴', category: 'Actions' },
      { id: 'g5-v122', word: 'Play with matches', phonetic: '/pleɪ wɪð ˈmætʃɪz/', vietnamese: 'Nghịch diêm / lửa', exampleSentence: 'Never play with matches.', emoji: '🔥', category: 'Safety' },
      { id: 'g5-v123', word: 'Play with knife', phonetic: '/pleɪ wɪð naɪf/', vietnamese: 'Nghịch dao sắc', exampleSentence: 'Do not play with the sharp knife.', emoji: '🔪', category: 'Safety' },
      { id: 'g5-v124', word: 'Climb the tree', phonetic: '/klaɪm ðə triː/', vietnamese: 'Trèo cây cao', exampleSentence: 'Do not climb the tree.', emoji: '🌳', category: 'Safety' },
      { id: 'g5-v125', word: 'Fall off', phonetic: '/fɔːl ɒf/', vietnamese: 'Ngã xuống', exampleSentence: 'You may fall off.', emoji: '🤕', category: 'Danger' }
    ],
    sentences: [
      { pattern: "Do not ride your bike too fast! - OK, I will not.", vietnamese: 'Đừng đi xe đạp quá nhanh! - Được rồi, mình sẽ không đi nhanh.', dialogue: 'A: Do not ride your bike too fast! \nB: OK, I will not.' },
      { pattern: "Why should I not play with matches? - Because you may get a burn.", vietnamese: 'Vì sao mình không nên nghịch diêm? - Vì bạn có thể bị bỏng.', dialogue: 'A: Why should I not play with matches? \nB: Because you may get a burn.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq121',
        audioScript: 'Look at Phong! Do not ride your bike down the steep hill so fast, Phong! You may fall off and break your arm!',
        question: 'Điều gì có thể xảy ra nếu Phong phóng xe đạp quá nhanh xuống dốc?',
        options: ['He may sleep', 'He may win a medal', 'He may eat cake', 'He may fall off and break his arm'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Safety Rules at Home and School',
      text: 'To avoid accidents at home, children should never play with matches or touch hot stoves because they may get burned. In the playground, do not run on wet stairs because you may slip and fall.',
      questions: [
        { question: 'Why shouldn\'t children play with matches?', options: ['Because they may get burned', 'Because it is cold', 'Because it makes juice', 'Because matches are expensive'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: K N _ F E (Con dao)', answer: 'I', maskedWord: 'K N _ F E' },
      { type: 'sentence_builder', prompt: 'Ghép câu: Don\'t / bike / your / fast! / ride / too', answer: 'Don\'t ride your bike too fast!', scrambledTokens: ['ride', 'fast!', 'Don\'t', 'too', 'your', 'bike'] }
    ],
    speechPrompts: [
      { phrase: 'Don\'t ride your bike too fast', vietnamese: 'Đừng đi xe đạp quá nhanh', phoneticTip: 'Chú ý âm câm k trong knife và b trong climb' }
    ],
    oddWords: [
      { words: ['Matches', 'Apple', 'Stove', 'Knife'], oddIndex: 1, explanation: 'Apple là trái cây, các từ còn lại là đồ vật dễ gây nguy hiểm cần cẩn thận!' }
    ]
  },
  {
    id: 'g5-unit-13',
    title: 'Unit 13: What Do You Do in Your Free Time?',
    vietnameseTitle: 'Bài 13: Hoạt động rảnh rỗi và sở thích cá nhân',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Free Time & Hobbies',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v131', word: 'Surf the Internet', phonetic: '/sɜːf ðə ˈɪntənet/', vietnamese: 'Lướt mạng Internet', exampleSentence: 'Surf the Internet for news.', emoji: '🌐', category: 'Activities' },
      { id: 'g5-v132', word: 'Go to the cinema', phonetic: '/ɡəʊ tu ðə ˈsɪnəmə/', vietnamese: 'Đi xem phim rạp', exampleSentence: 'Watch a 3D movie at the cinema.', emoji: '🎬', category: 'Activities' },
      { id: 'g5-v133', word: 'Clean the house', phonetic: '/kliːn ðə haʊs/', vietnamese: 'Dọn dẹp nhà cửa', exampleSentence: 'Clean the house on Saturday.', emoji: '🧹', category: 'Housework' },
      { id: 'g5-v134', word: 'Go fishing', phonetic: '/ɡəʊ ˈfɪʃɪŋ/', vietnamese: 'Đi câu cá', exampleSentence: 'Go fishing with grandfather.', emoji: '🎣', category: 'Activities' },
      { id: 'g5-v135', word: 'Skateboarding', phonetic: '/ˈskeɪtbɔːdɪŋ/', vietnamese: 'Trượt ván', exampleSentence: 'Practice skateboarding in the park.', emoji: '🛹', category: 'Sports' }
    ],
    sentences: [
      { pattern: 'What do you do in your free time? - I often read books.', vietnamese: 'Bạn làm gì vào lúc rảnh rỗi? - Mình thường đọc sách tiếng Anh.', dialogue: 'A: What do you do in your free time? \nB: I often surf the Internet to learn English songs.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq131',
        audioScript: 'On Sunday mornings, Nam often goes fishing by the calm lake with his grandfather.',
        question: 'Nam thường làm gì vào sáng Chủ nhật cùng ông?',
        options: ['Watches cartoons', 'Plays football', 'Goes fishing (Đi câu cá)', 'Does homework'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Weekend Hobbies',
      text: 'On weekends, Quan and his friends have various activities. Quan loves going to the cinema to watch adventurous films. Linda helps her mother clean the house and waters the flower pots.',
      questions: [
        { question: 'What does Quan love doing on weekends?', options: ['Studying Maths', 'Playing with matches', 'Sleeping all day', 'Going to the cinema'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: C _ N E M A', answer: 'I', maskedWord: 'C _ N E M A' },
      { type: 'sentence_builder', prompt: 'Ghép câu: do / What / you / free time? / in your / do', answer: 'What do you do in your free time?', scrambledTokens: ['do', 'you', 'in your', 'free time?', 'What', 'do'] }
    ],
    speechPrompts: [
      { phrase: 'I surf the Internet in my free time', vietnamese: 'Mình lướt mạng vào lúc rảnh rỗi', phoneticTip: 'Chú ý phát âm surf the Internet' }
    ],
    oddWords: [
      { words: ['Cinema', 'Fishing', 'Tiger', 'Skateboarding'], oddIndex: 2, explanation: 'Tiger là con hổ, các từ còn lại là hoạt động giải trí!' }
    ]
  },
  {
    id: 'g5-unit-14',
    title: 'Unit 14: What Happened in the Story?',
    vietnameseTitle: 'Bài 14: Chuyện gì đã xảy ra trong câu chuyện? (Kể chuyện cổ tích)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Storytelling & Sequence Words',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v141', word: 'First', phonetic: '/fɜːst/', vietnamese: 'Đầu tiên', exampleSentence: 'First, the king ordered.', emoji: '1️⃣', category: 'Sequence' },
      { id: 'g5-v142', word: 'Then', phonetic: '/ðen/', vietnamese: 'Sau đó', exampleSentence: 'Then, An Tiem found seeds.', emoji: '2️⃣', category: 'Sequence' },
      { id: 'g5-v143', word: 'Next', phonetic: '/nekst/', vietnamese: 'Tiếp theo', exampleSentence: 'Next, they grew watermelons.', emoji: '3️⃣', category: 'Sequence' },
      { id: 'g5-v144', word: 'In the end', phonetic: '/ɪn ði end/', vietnamese: 'Cuối cùng thì', exampleSentence: 'In the end, they returned home.', emoji: '🏁', category: 'Sequence' },
      { id: 'g5-v145', word: 'Watermelon seeds', phonetic: '/ˈwɔːtəmelən siːdz/', vietnamese: 'Hạt dưa hấu', exampleSentence: 'Plant the watermelon seeds.', emoji: '🍉', category: 'Nature' }
    ],
    sentences: [
      { pattern: 'What happened in the story? - First, the king gave seeds. Then, he grew watermelons. In the end, he returned home.', vietnamese: 'Chuyện gì đã xảy ra trong câu chuyện? - Đầu tiên, vua ban hạt giống. Sau đó, chàng trồng dưa hấu. Cuối cùng, chàng được đón về cung.', dialogue: 'A: What happened in the story of Mai An Tiem? \nB: First, the king exiled An Tiem to an island. Then, he grew sweet watermelons. In the end, the king welcomed him back!' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq141',
        audioScript: 'In the end of the folk tale, the kind king realized An Tiem was innocent and invited his whole family back to the royal palace.',
        question: 'Điều gì xảy ra ở phần kết của câu chuyện Mai An Tiêm?',
        options: ['An Tiem stayed on the island forever', 'The king welcomed An Tiem family back to the palace', 'An Tiem lost his seeds', 'The ship sank'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'The Story of The Fox and The Crow',
      text: 'First, a hungry crow was sitting on a high tree branch holding a delicious piece of cheese in her beak. Then, a cunning fox came under the tree and praised the crow beautiful voice. When the crow opened her beak to sing, the cheese dropped and the fox caught it.',
      questions: [
        { question: 'What did the crow drop when opening her beak?', options: ['A watermelon', 'An apple', 'A gold coin', 'The delicious piece of cheese'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: F _ R S T (Đầu tiên)', answer: 'I', maskedWord: 'F _ R S T' },
      { type: 'sentence_builder', prompt: 'Ghép câu: happened / What / the / in / story?', answer: 'What happened in the story?', scrambledTokens: ['What', 'happened', 'story?', 'in', 'the'] }
    ],
    speechPrompts: [
      { phrase: 'In the end, the family lived happily ever after', vietnamese: 'Cuối cùng, gia đình sống hạnh phúc mãi mãi', phoneticTip: 'Chú ý nối âm in the end' }
    ],
    oddWords: [
      { words: ['Pencil', 'Then', 'Next', 'First'], oddIndex: 0, explanation: 'Pencil là bút chì, các từ còn lại là từ nối trình tự thời gian kể chuyện!' }
    ]
  },
  {
    id: 'g5-unit-15',
    title: 'Unit 15: What Would You Like to Be in the Future?',
    vietnameseTitle: 'Bài 15: Bạn muốn làm nghề gì trong tương lai? (Ước mơ nghề nghiệp)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Future Dreams & Careers',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v151', word: 'Pilot', phonetic: '/ˈpaɪlət/', vietnamese: 'Phi công', exampleSentence: 'Fly a plane as a pilot.', emoji: '👨‍✈️', category: 'Careers' },
      { id: 'g5-v152', word: 'Astronaut', phonetic: '/ˈæstrənɔːt/', vietnamese: 'Phi hành gia vũ trụ', exampleSentence: 'Travel to space as an astronaut.', emoji: '🧑‍🚀', category: 'Careers' },
      { id: 'g5-v153', word: 'Architect', phonetic: '/ˈɑːkɪtekt/', vietnamese: 'Kiến trúc sư', exampleSentence: 'Design buildings as an architect.', emoji: '👷', category: 'Careers' },
      { id: 'g5-v154', word: 'Writer', phonetic: '/ˈraɪtə(r)/', vietnamese: 'Nhà văn / Tác giả', exampleSentence: 'Write stories as a writer.', emoji: '✍️', category: 'Careers' },
      { id: 'g5-v155', word: 'Look after patients', phonetic: '/lʊk ˈɑːftə ˈpeɪʃnts/', vietnamese: 'Chăm sóc bệnh nhân', exampleSentence: 'Doctors look after patients.', emoji: '🩺', category: 'Actions' }
    ],
    sentences: [
      { pattern: 'What would you like to be in the future? - I would like to be an architect.', vietnamese: 'Bạn muốn trở thành nghề gì trong tương lai? - Mình muốn trở thành một kiến trúc sư.', dialogue: 'A: What would you like to be in the future? \nB: I would like to be an architect, because I want to design modern green buildings.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq151',
        audioScript: 'I love airplanes and blue skies. In the future, I would like to be a commercial pilot flying around the world!',
        question: 'Bạn nhỏ ước mơ làm nghề gì?',
        options: ['A pilot (Phi công)', 'A farmer', 'A clerk', 'A driver'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our Future Dreams',
      text: 'Every student in class 5A has a bright dream. Tony wants to be an astronaut exploring Mars. Linda would like to be a doctor to look after sick children in the countryside.',
      questions: [
        { question: 'Why does Linda want to be a doctor?', options: ['To make money', 'To look after sick children', 'To fly planes', 'To build bridges'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P _ L O T (Phi công)', answer: 'I', maskedWord: 'P _ L O T' },
      { type: 'sentence_builder', prompt: 'Ghép câu: would / like / What / to be? / you', answer: 'What would you like to be?', scrambledTokens: ['you', 'to be?', 'What', 'would', 'like'] }
    ],
    speechPrompts: [
      { phrase: 'I would like to be an architect', vietnamese: 'Mình muốn trở thành kiến trúc sư', phoneticTip: 'Chú ý phát âm architect /ˈɑːkɪtekt/' }
    ],
    oddWords: [
      { words: ['Pilot', 'Cake', 'Architect', 'Astronaut'], oddIndex: 1, explanation: 'Cake là bánh ngọt, các từ còn lại là nghề nghiệp mơ ước tương lai!' }
    ]
  },
  {
    id: 'g5-unit-16',
    title: 'Unit 16: Where is the Post Office? - Directions',
    vietnameseTitle: 'Bài 16: Bưu điện ở đâu? (Chỉ đường & Vị trí nơi chốn)',
    grade: 5,
    bookSeries: 'Global Success',
    theme: 'Directions & Places',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g5-v161', word: 'Post office', phonetic: '/ˈpəʊst ɒfɪs/', vietnamese: 'Bưu điện', exampleSentence: 'Send letters at the post office.', emoji: '🏤', category: 'Places' },
      { id: 'g5-v162', word: 'Pharmacy (Chemist\'s)', phonetic: '/ˈfɑːməsi/', vietnamese: 'Hiệu thuốc tây', exampleSentence: 'Buy medicine at the pharmacy.', emoji: '💊', category: 'Places' },
      { id: 'g5-v163', word: 'Supermarket', phonetic: '/ˈsuːpəmɑːkɪt/', vietnamese: 'Siêu thị', exampleSentence: 'Shop at the supermarket.', emoji: '🛒', category: 'Places' },
      { id: 'g5-v164', word: 'Turn left', phonetic: '/tɜːn left/', vietnamese: 'Rẽ trái', exampleSentence: 'Turn left at the corner.', emoji: '⬅️', category: 'Directions' },
      { id: 'g5-v165', word: 'Turn right', phonetic: '/tɜːn raɪt/', vietnamese: 'Rẽ phải', exampleSentence: 'Turn right at the traffic lights.', emoji: '➡️', category: 'Directions' },
      { id: 'g5-v166', word: 'Opposite', phonetic: '/ˈɒpəzɪt/', vietnamese: 'Đối diện', exampleSentence: 'Opposite the cinema.', emoji: '↔️', category: 'Directions' }
    ],
    sentences: [
      { pattern: 'Excuse me, where is the post office? - Go straight and turn left.', vietnamese: 'Xin lỗi, bưu điện ở đâu ạ? - Hãy đi thẳng rồi rẽ trái.', dialogue: 'A: Excuse me, where is the post office? \nB: Go straight ahead. Turn left at the corner. It is opposite the museum.' }
    ],
    listeningQuestions: [
      {
        id: 'g5-lq161',
        audioScript: 'Excuse me, how can I get to the pharmacy? Walk straight along Green Street. It is on your right, next to the supermarket.',
        question: 'Hiệu thuốc nằm ở vị trí nào?',
        options: ['Under the bridge', 'Behind the school', 'On your right, next to the supermarket', 'Inside the airport'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Finding Our Way in the City',
      text: 'Tourist: Excuse me, where is the city post office? Police officer: Go straight ahead for two blocks. Turn right at the traffic lights. The post office is on your left, opposite the bank.',
      questions: [
        { question: 'Where is the post office located?', options: ['Inside the church', 'Opposite the bank', 'On a mountain', 'In the park'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P H _ R M A C Y', answer: 'A', maskedWord: 'P H _ R M A C Y' },
      { type: 'sentence_builder', prompt: 'Ghép câu: is / Excuse me, / post office? / the / where', answer: 'Excuse me, where is the post office?', scrambledTokens: ['post office?', 'where', 'Excuse me,', 'is', 'the'] }
    ],
    speechPrompts: [
      { phrase: 'Excuse me, where is the post office', vietnamese: 'Xin lỗi, bưu điện ở đâu vậy', phoneticTip: 'Chú ý lên giọng lịch sự ở Excuse me' }
    ],
    oddWords: [
      { words: ['Post office', 'Pharmacy', 'Supermarket', 'Apple'], oddIndex: 3, explanation: 'Apple là trái cây, các từ còn lại là địa điểm công cộng trong thành phố!' }
    ]
  }
];
