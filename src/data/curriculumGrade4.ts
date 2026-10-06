import { Unit } from '../types';

export const CURRICULUM_GRADE_4: Unit[] = [
  {
    id: 'g4-unit-1',
    title: 'Unit 1: My Friends & Nationalities',
    vietnameseTitle: 'Bài 1: Bạn bè và quốc tịch các nước',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Countries & Nationalities',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v1', word: 'Vietnam', phonetic: '/ˌvjetˈnæm/', vietnamese: 'Nước Việt Nam', exampleSentence: 'I live in Vietnam.', emoji: '🇻🇳', category: 'Countries' },
      { id: 'g4-v2', word: 'England', phonetic: '/ˈɪŋɡlənd/', vietnamese: 'Nước Anh', exampleSentence: 'Tom is from England.', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', category: 'Countries' },
      { id: 'g4-v3', word: 'America', phonetic: '/əˈmerɪkə/', vietnamese: 'Nước Mỹ', exampleSentence: 'Mary is from America.', emoji: '🇺🇸', category: 'Countries' },
      { id: 'g4-v4', word: 'Australia', phonetic: '/ɒˈstreɪliə/', vietnamese: 'Nước Úc', exampleSentence: 'Kangaroos live in Australia.', emoji: '🇦🇺', category: 'Countries' },
      { id: 'g4-v5', word: 'Japanese', phonetic: '/ˌdʒæpəˈniːz/', vietnamese: 'Người Nhật / Quốc tịch Nhật', exampleSentence: 'Akiko is Japanese.', emoji: '🇯🇵', category: 'Nationalities' }
    ],
    sentences: [
      { pattern: 'Where are you from? - I am from Vietnam.', vietnamese: 'Bạn đến từ đâu? - Mình đến từ Quốc gia.', dialogue: 'A: Where are you from? \nB: I am from Vietnam.' },
      { pattern: 'What nationality are you? - I am Vietnamese.', vietnamese: 'Quốc tịch của bạn là gì? - Mình là người Quốc tịch.', dialogue: 'A: What nationality are you? \nB: I am Vietnamese.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq1',
        audioScript: 'Hello! My name is Hakim. I am from Malaysia. I am Malaysian.',
        question: 'Bạn Hakim đến từ quốc gia nào?',
        options: ['Vietnam', 'Malaysia', 'England', 'Japan'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our International Friends',
      text: 'Today our class has three new international friends. Akiko is from Tokyo, Japan. Tony is from Sydney, Australia. Linda is from London, England. We are all good friends in grade 4.',
      questions: [
        { question: 'Where is Akiko from?', options: ['Australia', 'America', 'Vietnam', 'Japan'], correctIndex: 3 },
        { question: 'Where is Tony from?', options: ['Australia', 'England', 'Singapore', 'Korea'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: V I _ T N A M', answer: 'E', maskedWord: 'V I _ T N A M' },
      { type: 'sentence_builder', prompt: 'Ghép câu: are / Where / from? / you', answer: 'Where are you from?', scrambledTokens: ['from?', 'Where', 'you', 'are'] }
    ],
    speechPrompts: [
      { phrase: 'Where are you from? I am from Vietnam', vietnamese: 'Bạn đến từ đâu? Mình đến từ Việt Nam', phoneticTip: 'Chú ý nhấn trọng âm Viet-nam' }
    ],
    oddWords: [
      { words: ['Vietnam', 'England', 'America', 'Pencil'], oddIndex: 3, explanation: 'Pencil là bút chì, các từ còn lại là tên quốc gia!' }
    ]
  },
  {
    id: 'g4-unit-2',
    title: 'Unit 2: Time and Daily Routines',
    vietnameseTitle: 'Bài 2: Thời gian và hoạt động hàng ngày',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Time & Daily Routines',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v21', word: 'Oclock', phonetic: '/əˈklɒk/', vietnamese: 'Giờ đúng', exampleSentence: 'It is seven oclock.', emoji: '⏰', category: 'Time' },
      { id: 'g4-v22', word: 'Get up', phonetic: '/ɡet ʌp/', vietnamese: 'Thức dậy', exampleSentence: 'I get up at six.', emoji: '🌅', category: 'Routines' },
      { id: 'g4-v23', word: 'Have breakfast', phonetic: '/hæv ˈbrekfəst/', vietnamese: 'Ăn bữa sáng', exampleSentence: 'I have breakfast with eggs.', emoji: '🍳', category: 'Routines' },
      { id: 'g4-v24', word: 'Go to school', phonetic: '/ɡəʊ tu skuːl/', vietnamese: 'Đi đến trường', exampleSentence: 'We go to school together.', emoji: '🏫', category: 'Routines' },
      { id: 'g4-v25', word: 'Go to bed', phonetic: '/ɡəʊ tu bed/', vietnamese: 'Đi ngủ', exampleSentence: 'I go to bed at nine thirty.', emoji: '🛏️', category: 'Routines' }
    ],
    sentences: [
      { pattern: 'What time is it? - It is seven oclock.', vietnamese: 'Mấy giờ rồi? - Bây giờ là bảy giờ đúng.', dialogue: 'A: What time is it? \nB: It is six oclock.' },
      { pattern: 'What time do you get up? - I get up at six oclock.', vietnamese: 'Bạn thức dậy lúc mấy giờ? - Mình thức dậy lúc sáu giờ đúng.', dialogue: 'A: What time do you get up? \nB: I get up at six fifteen.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq21',
        audioScript: 'Wake up, Phong! It is seven oclock! It is time for school!',
        question: 'Bây giờ là mấy giờ?',
        options: ['Eight oclock', 'Six oclock', 'Seven oclock (7 giờ đúng)', 'Nine oclock'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'A Day in the Life of Nam',
      text: 'Every morning, Nam gets up at six oclock. He brushes his teeth, washes his face, and has breakfast at six thirty. At seven oclock, he walks to school with his friends.',
      questions: [
        { question: 'What time does Nam get up?', options: ['At eight oclock', 'At seven oclock', 'At six oclock', 'At five oclock'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: O C L _ C K', answer: 'O', maskedWord: 'O C L _ C K' },
      { type: 'sentence_builder', prompt: 'Ghép câu: time / is / What / it?', answer: 'What time is it?', scrambledTokens: ['it?', 'What', 'is', 'time'] }
    ],
    speechPrompts: [
      { phrase: 'What time is it? It is seven oclock', vietnamese: 'Mấy giờ rồi? 7 giờ đúng', phoneticTip: 'Nối âm time is' }
    ],
    oddWords: [
      { words: ['Get up', 'Tiger', 'Go to bed', 'Have breakfast'], oddIndex: 1, explanation: 'Tiger là con hổ, các từ còn lại là thói quen sinh hoạt!' }
    ]
  },
  {
    id: 'g4-unit-3',
    title: 'Unit 3: My Week and Days',
    vietnameseTitle: 'Bài 3: Các ngày trong tuần (Monday to Sunday)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Days of the Week',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v31', word: 'Monday', phonetic: '/ˈmʌndeɪ/', vietnamese: 'Thứ Hai', exampleSentence: 'I study English on Monday.', emoji: '📅', category: 'Days' },
      { id: 'g4-v32', word: 'Tuesday', phonetic: '/ˈtjuːzdeɪ/', vietnamese: 'Thứ Ba', exampleSentence: 'We have PE on Tuesday.', emoji: '📅', category: 'Days' },
      { id: 'g4-v33', word: 'Wednesday', phonetic: '/ˈwenzdeɪ/', vietnamese: 'Thứ Tư', exampleSentence: 'Music on Wednesday.', emoji: '📅', category: 'Days' },
      { id: 'g4-v34', word: 'Thursday', phonetic: '/ˈθɜːzdeɪ/', vietnamese: 'Thứ Năm', exampleSentence: 'Science on Thursday.', emoji: '📅', category: 'Days' },
      { id: 'g4-v35', word: 'Friday', phonetic: '/ˈfraɪdeɪ/', vietnamese: 'Thứ Sáu', exampleSentence: 'Art on Friday.', emoji: '📅', category: 'Days' },
      { id: 'g4-v36', word: 'Weekend', phonetic: '/ˌwiːkˈend/', vietnamese: 'Cuối tuần (Thứ 7 & CN)', exampleSentence: 'Have fun on the weekend.', emoji: '🎉', category: 'Days' }
    ],
    sentences: [
      { pattern: 'What day is it today? - It is Monday.', vietnamese: 'Hôm nay là thứ mấy? - Hôm nay là Thứ.', dialogue: 'A: What day is it today? \nB: It is Monday. We have English today!' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq31',
        audioScript: 'Today is Friday. Tomorrow is Saturday, so we can sleep a bit longer!',
        question: 'Hôm nay là ngày thứ mấy?',
        options: ['Friday (Thứ Sáu)', 'Monday', 'Wednesday', 'Sunday'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our School Week',
      text: 'From Monday to Friday, we go to school. On Wednesday afternoon, we play badminton in the gym. On Saturday and Sunday, we visit our grandparents.',
      questions: [
        { question: 'When do students visit their grandparents?', options: ['Every night', 'On Monday', 'On Tuesday', 'On Saturday and Sunday'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: M _ N D A Y', answer: 'O', maskedWord: 'M _ N D A Y' },
      { type: 'sentence_builder', prompt: 'Ghép câu: is / today? / What / day / it', answer: 'What day is it today?', scrambledTokens: ['it', 'What', 'today?', 'is', 'day'] }
    ],
    speechPrompts: [
      { phrase: 'What day is it today? It is Monday', vietnamese: 'Hôm nay thứ mấy? Thứ hai', phoneticTip: 'Lên giọng ở cuối câu hỏi' }
    ],
    oddWords: [
      { words: ['Monday', 'Tuesday', 'Apple', 'Friday'], oddIndex: 2, explanation: 'Apple là trái cây, các từ còn lại là các ngày trong tuần!' }
    ]
  },
  {
    id: 'g4-unit-4',
    title: 'Unit 4: My Birthday and Months',
    vietnameseTitle: 'Bài 4: Ngày sinh nhật và 12 tháng trong năm',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Months & Birthdays',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v41', word: 'January', phonetic: '/ˈdʒænjuəri/', vietnamese: 'Tháng Một', exampleSentence: 'New Year in January.', emoji: '❄️', category: 'Months' },
      { id: 'g4-v42', word: 'March', phonetic: '/mɑːtʃ/', vietnamese: 'Tháng Ba', exampleSentence: 'Spring in March.', emoji: '🌸', category: 'Months' },
      { id: 'g4-v43', word: 'June', phonetic: '/dʒuːn/', vietnamese: 'Tháng Sáu', exampleSentence: 'Summer starts in June.', emoji: '☀️', category: 'Months' },
      { id: 'g4-v44', word: 'September', phonetic: '/sepˈtembə(r)/', vietnamese: 'Tháng Chín', exampleSentence: 'Back to school in September.', emoji: '🎒', category: 'Months' },
      { id: 'g4-v45', word: 'December', phonetic: '/dɪˈsembə(r)/', vietnamese: 'Tháng Mười Hai', exampleSentence: 'Christmas in December.', emoji: '🎄', category: 'Months' }
    ],
    sentences: [
      { pattern: 'When is your birthday? - It is in May.', vietnamese: 'Sinh nhật bạn vào khi nào? - Sinh nhật mình vào Tháng.', dialogue: 'A: When is your birthday? \nB: It is in September.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq41',
        audioScript: 'My birthday is on the fifth of June. We celebrate it on the beach!',
        question: 'Sinh nhật bạn nhỏ vào tháng mấy?',
        options: ['January', 'June (Tháng Sáu)', 'September', 'December'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Birthday Calendar',
      text: 'Our class has a birthday calendar on the wall. Mai birthday is in March. Phong birthday is in June. We prepare nice cards for every birthday.',
      questions: [
        { question: 'When is Mai birthday?', options: ['In March', 'In July', 'In November', 'In December'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: M _ R C H', answer: 'A', maskedWord: 'M _ R C H' },
      { type: 'sentence_builder', prompt: 'Ghép câu: birthday / is / When / your?', answer: 'When is your birthday?', scrambledTokens: ['your?', 'When', 'birthday', 'is'] }
    ],
    speechPrompts: [
      { phrase: 'When is your birthday? It is in October', vietnamese: 'Sinh nhật bạn khi nào? Vào tháng mười', phoneticTip: 'Chú ý nhấn trọng âm Oc-to-ber' }
    ],
    oddWords: [
      { words: ['Desk', 'March', 'June', 'January'], oddIndex: 0, explanation: 'Desk là bàn học, các từ còn lại là các tháng trong năm!' }
    ]
  },
  {
    id: 'g4-unit-5',
    title: 'Unit 5: Can and Can\'t - Abilities',
    vietnameseTitle: 'Bài 5: Khả năng làm được và không làm được',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Abilities & Skills',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v51', word: 'Swim', phonetic: '/swɪm/', vietnamese: 'Bơi lội', exampleSentence: 'I can swim fast.', emoji: '🏊', category: 'Abilities' },
      { id: 'g4-v52', word: 'Ride a bike', phonetic: '/raɪd ə baɪk/', vietnamese: 'Đi xe đạp', exampleSentence: 'Ride a bike to school.', emoji: '🚴', category: 'Abilities' },
      { id: 'g4-v53', word: 'Play the piano', phonetic: '/pleɪ ðə piˈænəʊ/', vietnamese: 'Chơi đàn piano', exampleSentence: 'Play the piano nicely.', emoji: '🎹', category: 'Abilities' },
      { id: 'g4-v54', word: 'Cook', phonetic: '/kʊk/', vietnamese: 'Nấu ăn', exampleSentence: 'Cook delicious meals.', emoji: '👨‍🍳', category: 'Abilities' },
      { id: 'g4-v55', word: 'Skate', phonetic: '/skeɪt/', vietnamese: 'Trượt patin', exampleSentence: 'Skate in the park.', emoji: '🛼', category: 'Abilities' }
    ],
    sentences: [
      { pattern: 'What can you do? - I can swim.', vietnamese: 'Bạn có thể làm gì? - Mình có thể bơi lội.', dialogue: 'A: What can you do? \nB: I can swim and play the piano.' },
      { pattern: 'Can you swim? - Yes, I can. / No, I cannot.', vietnamese: 'Bạn có biết bơi không? - Có, mình biết. / Không, mình không biết.', dialogue: 'A: Can you ride a bike? \nB: Yes, I can!' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq51',
        audioScript: 'I love water sports! I can swim very well, but I cannot ride a horse.',
        question: 'Bạn nhỏ có thể làm được việc gì?',
        options: ['Drive a car', 'Ride a horse', 'Fly', 'Swim (Bơi lội)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Talents Show',
      text: 'In our school talent contest, Tony can play the guitar and sing pop songs. Linda can dance gracefully. Nam can skate fast on the yard.',
      questions: [
        { question: 'What can Tony do?', options: ['Cook soup', 'Play the guitar and sing', 'Fly a kite', 'Swim'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S W _ M', answer: 'I', maskedWord: 'S W _ M' },
      { type: 'sentence_builder', prompt: 'Ghép câu: can / I / the / play / piano', answer: 'I can play the piano', scrambledTokens: ['play', 'I', 'the', 'can', 'piano'] }
    ],
    speechPrompts: [
      { phrase: 'I can swim and ride a bike', vietnamese: 'Mình có thể bơi và đi xe đạp', phoneticTip: 'Nối âm can swim' }
    ],
    oddWords: [
      { words: ['Table', 'Skate', 'Cook', 'Swim'], oddIndex: 0, explanation: 'Table là cái bàn, các từ còn lại là động từ chỉ khả năng!' }
    ]
  },
  {
    id: 'g4-unit-6',
    title: 'Unit 6: Our School and Subjects',
    vietnameseTitle: 'Bài 6: Các môn học ở trường tiểu học',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'School Subjects',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v61', word: 'Maths', phonetic: '/mæθs/', vietnamese: 'Môn Toán', exampleSentence: 'Numbers in Maths.', emoji: '📐', category: 'Subjects' },
      { id: 'g4-v62', word: 'Vietnamese', phonetic: '/ˌvjetnəˈmiːz/', vietnamese: 'Môn Tiếng Việt', exampleSentence: 'Read stories in Vietnamese.', emoji: '📖', category: 'Subjects' },
      { id: 'g4-v63', word: 'English', phonetic: '/ˈɪŋɡlɪʃ/', vietnamese: 'Môn Tiếng Anh', exampleSentence: 'Speak English fluently.', emoji: '🇬🇧', category: 'Subjects' },
      { id: 'g4-v64', word: 'Science', phonetic: '/ˈsaɪəns/', vietnamese: 'Môn Khoa học', exampleSentence: 'Experiments in Science.', emoji: '🔬', category: 'Subjects' },
      { id: 'g4-v65', word: 'Music', phonetic: '/ˈmjuːzɪk/', vietnamese: 'Môn Âm nhạc', exampleSentence: 'Sing in Music class.', emoji: '🎵', category: 'Subjects' },
      { id: 'g4-v66', word: 'Art', phonetic: '/ɑːt/', vietnamese: 'Môn Mĩ thuật', exampleSentence: 'Paint pictures in Art.', emoji: '🎨', category: 'Subjects' }
    ],
    sentences: [
      { pattern: 'What subjects do you have today? - I have Maths and English.', vietnamese: 'Hôm nay bạn có những môn học nào? - Mình có Các môn.', dialogue: 'A: What subjects do you have today? \nB: I have Maths, English, and Science.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq61',
        audioScript: 'Today is Tuesday. We have three lessons: English, Maths, and Art.',
        question: 'Môn học nào có trong ngày Thứ Ba?',
        options: ['Music and PE', 'History and Geography', 'English, Maths, and Art', 'Informatics'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Wednesday Timetable',
      text: 'On Wednesday morning, our class has four interesting subjects. First, we study Maths. Then, we practice English dialogue. After break time, we have Science and Music.',
      questions: [
        { question: 'What is the first subject on Wednesday?', options: ['Art', 'Music', 'English', 'Maths'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: M _ T H S', answer: 'A', maskedWord: 'M _ T H S' },
      { type: 'sentence_builder', prompt: 'Ghép câu: have / I / today / English', answer: 'I have English today', scrambledTokens: ['English', 'today', 'I', 'have'] }
    ],
    speechPrompts: [
      { phrase: 'I have Maths and English today', vietnamese: 'Hôm nay mình học Toán và Tiếng Anh', phoneticTip: 'Chú ý âm /θ/ trong Maths' }
    ],
    oddWords: [
      { words: ['Maths', 'English', 'Science', 'Ruler'], oddIndex: 3, explanation: 'Ruler là thước kẻ, các từ còn lại là môn học!' }
    ]
  },
  {
    id: 'g4-unit-7',
    title: 'Unit 7: My Favourite Subjects',
    vietnameseTitle: 'Bài 7: Môn học yêu thích nhất & Lý do',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Favourite Subjects & Reasons',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v71', word: 'Favourite', phonetic: '/ˈfeɪvərɪt/', vietnamese: 'Yêu thích nhất', exampleSentence: 'My favourite subject is English.', emoji: '⭐', category: 'General' },
      { id: 'g4-v72', word: 'Because', phonetic: '/bɪˈkɒz/', vietnamese: 'Bởi vì', exampleSentence: 'Because it is interesting.', emoji: '💡', category: 'Conjunctions' },
      { id: 'g4-v73', word: 'Interesting', phonetic: '/ˈɪntrəstɪŋ/', vietnamese: 'Thú vị', exampleSentence: 'Science is interesting.', emoji: '✨', category: 'Adjectives' },
      { id: 'g4-v74', word: 'Fun', phonetic: '/fʌn/', vietnamese: 'Vui vẻ', exampleSentence: 'PE is fun.', emoji: '😄', category: 'Adjectives' }
    ],
    sentences: [
      { pattern: 'What is your favourite subject? - It is English.', vietnamese: 'Môn học yêu thích của bạn là gì? - Đó là môn Môn.', dialogue: 'A: What is your favourite subject? \nB: It is English, because I want to talk with foreigners.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq71',
        audioScript: 'My favourite subject is Music because I love singing lovely songs!',
        question: 'Vì sao bạn nhỏ thích môn Âm nhạc?',
        options: ['Because she likes math puzzles', 'Because she loves singing lovely songs', 'Because she wants to paint', 'Because it is hard'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Preferred Lessons',
      text: 'Mai favourite subject is Art because she loves drawing blooming flowers. Nam prefers PE because he gets to play football with friends on the pitch.',
      questions: [
        { question: 'What is Mai favourite subject?', options: ['History', 'Maths', 'Art', 'Geography'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: F _ N (Vui vẻ)', answer: 'U', maskedWord: 'F _ N' },
      { type: 'sentence_builder', prompt: 'Ghép câu: favourite / is / My / subject / English', answer: 'My favourite subject is English', scrambledTokens: ['subject', 'My', 'English', 'is', 'favourite'] }
    ],
    speechPrompts: [
      { phrase: 'My favourite subject is Science', vietnamese: 'Môn học yêu thích của mình là Khoa học', phoneticTip: 'Nhấn trọng âm Sci-ence' }
    ],
    oddWords: [
      { words: ['Interesting', 'Pencil', 'Favourite', 'Fun'], oddIndex: 1, explanation: 'Pencil là bút chì, các từ còn lại là tính từ cảm xúc bài học!' }
    ]
  },
  {
    id: 'g4-unit-8',
    title: 'Unit 8: Our School Timetable',
    vietnameseTitle: 'Bài 8: Thời khóa biểu của em (How often / Days)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Timetable & Frequency',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v81', word: 'Once a week', phonetic: '/wʌns ə wiːk/', vietnamese: 'Một lần một tuần', exampleSentence: 'I have Music once a week.', emoji: '1️⃣', category: 'Frequency' },
      { id: 'g4-v82', word: 'Twice a week', phonetic: '/twaɪs ə wiːk/', vietnamese: 'Hai lần một tuần', exampleSentence: 'PE twice a week.', emoji: '2️⃣', category: 'Frequency' },
      { id: 'g4-v83', word: 'Three times a week', phonetic: '/θriː taɪmz ə wiːk/', vietnamese: 'Ba lần một tuần', exampleSentence: 'Science three times a week.', emoji: '3️⃣', category: 'Frequency' },
      { id: 'g4-v84', word: 'Every school day', phonetic: '/ˈevri skuːl deɪ/', vietnamese: 'Mọi ngày đi học', exampleSentence: 'Maths every school day.', emoji: '📆', category: 'Frequency' }
    ],
    sentences: [
      { pattern: 'How often do you have English? - I have it four times a week.', vietnamese: 'Bạn học môn Môn mấy lần? - Mình học Tần suất.', dialogue: 'A: How often do you have English? \nB: I have it four times a week.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq81',
        audioScript: 'English is our core subject. We have English lessons four times a week!',
        question: 'Các bạn nhỏ học Tiếng Anh mấy lần mỗi tuần?',
        options: ['Four times a week (4 lần một tuần)', 'Once a week', 'Twice a week', 'Never'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our Grade 4 Timetable',
      text: 'In grade 4, we have Maths and Vietnamese every school day. We have Music once a week on Wednesday and PE twice a week on Tuesday and Friday.',
      questions: [
        { question: 'When do students have Music?', options: ['Never', 'Every day', 'Once a week on Wednesday', 'On Sunday'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: T W _ C E', answer: 'I', maskedWord: 'T W _ C E' },
      { type: 'sentence_builder', prompt: 'Ghép câu: have / I / English / four times a week', answer: 'I have English four times a week', scrambledTokens: ['English', 'four times a week', 'have', 'I'] }
    ],
    speechPrompts: [
      { phrase: 'I have English four times a week', vietnamese: 'Mình học Tiếng Anh 4 lần một tuần', phoneticTip: 'Chú ý âm /w/ trong week' }
    ],
    oddWords: [
      { words: ['Once', 'Twice', 'Apple', 'Three times'], oddIndex: 2, explanation: 'Apple là trái cây, các từ còn lại là trạng từ chỉ tần suất!' }
    ]
  },
  {
    id: 'g4-unit-9',
    title: 'Unit 9: Our Sports and Games',
    vietnameseTitle: 'Bài 9: Các môn thể thao và trò chơi vận động',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Sports & Fitness',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v91', word: 'Basketball', phonetic: '/ˈbɑːskɪtbɔːl/', vietnamese: 'Bóng rổ', exampleSentence: 'Shoot the basketball.', emoji: '🏀', category: 'Sports' },
      { id: 'g4-v92', word: 'Volleyball', phonetic: '/ˈvɒlibɔːl/', vietnamese: 'Bóng chuyền', exampleSentence: 'Spike the volleyball.', emoji: '🏐', category: 'Sports' },
      { id: 'g4-v93', word: 'Tennis', phonetic: '/ˈtenɪs/', vietnamese: 'Quần vợt', exampleSentence: 'Hit the tennis ball.', emoji: '🎾', category: 'Sports' },
      { id: 'g4-v94', word: 'Skipping', phonetic: '/ˈskɪpɪŋ/', vietnamese: 'Nhảy dây', exampleSentence: 'Skipping rope.', emoji: '🪢', category: 'Activities' },
      { id: 'g4-v95', word: 'Aerobics', phonetic: '/eəˈrəʊbɪks/', vietnamese: 'Thể dục nhịp điệu', exampleSentence: 'Do aerobics.', emoji: '🤸', category: 'Sports' }
    ],
    sentences: [
      { pattern: 'What sport do you like? - I like table tennis.', vietnamese: 'Bạn thích môn thể thao nào? - Mình thích Môn.', dialogue: 'A: What sport do you like? \nB: I like basketball. It is energetic!' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq91',
        audioScript: 'After school, Nam often goes to the gym to play basketball with his teammates.',
        question: 'Sau giờ học, Nam thường chơi môn thể thao nào?',
        options: ['Basketball (Bóng rổ)', 'Tennis', 'Golf', 'Skipping'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Sports Day at School',
      text: 'Our school Sports Day is coming soon. The 4A boys are practicing basketball while girls practice aerobics with lively music.',
      questions: [
        { question: 'What are the 4A boys practicing?', options: ['Swimming', 'Basketball', 'Chess', 'Tennis'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: T _ N N I S', answer: 'E', maskedWord: 'T _ N N I S' },
      { type: 'sentence_builder', prompt: 'Ghép câu: play / I / basketball / afternoon / in the', answer: 'I play basketball in the afternoon', scrambledTokens: ['play', 'afternoon', 'I', 'in the', 'basketball'] }
    ],
    speechPrompts: [
      { phrase: 'I like playing basketball', vietnamese: 'Mình thích chơi bóng rổ', phoneticTip: 'Chú ý phát âm basketball' }
    ],
    oddWords: [
      { words: ['Basketball', 'Volleyball', 'Tennis', 'Book'], oddIndex: 3, explanation: 'Book là quyển sách, các từ còn lại là môn thể thao bóng!' }
    ]
  },
  {
    id: 'g4-unit-10',
    title: 'Unit 10: Where Were You Yesterday?',
    vietnameseTitle: 'Bài 10: Ngày hôm qua bạn ở đâu? (Thì quá khứ đơn)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Past Places & Activities',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v101', word: 'Yesterday', phonetic: '/ˈjestədeɪ/', vietnamese: 'Ngày hôm qua', exampleSentence: 'I was at home yesterday.', emoji: '⏪', category: 'Time' },
      { id: 'g4-v102', word: 'At home', phonetic: '/æt həʊm/', vietnamese: 'Ở nhà', exampleSentence: 'I was at home.', emoji: '🏡', category: 'Places' },
      { id: 'g4-v103', word: 'At school', phonetic: '/æt skuːl/', vietnamese: 'Ở trường', exampleSentence: 'We were at school.', emoji: '🏫', category: 'Places' },
      { id: 'g4-v104', word: 'At the zoo', phonetic: '/æt ðə zuː/', vietnamese: 'Tại sở thú', exampleSentence: 'He was at the zoo.', emoji: '🦁', category: 'Places' },
      { id: 'g4-v105', word: 'On the beach', phonetic: '/ɒn ðə biːtʃ/', vietnamese: 'Trên bãi biển', exampleSentence: 'They were on the beach.', emoji: '🏖️', category: 'Places' }
    ],
    sentences: [
      { pattern: 'Where were you yesterday? - I was in Ha Long Bay.', vietnamese: 'Hôm qua bạn ở đâu? - Hôm qua mình ở Vịnh Hạ Long.', dialogue: 'A: Where were you yesterday? \nB: I was at the zoo with my family.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq101',
        audioScript: 'Yesterday was Sunday. Where were you, Linda? I was on the sunny beach with my cousins.',
        question: 'Hôm qua Linda đã ở đâu?',
        options: ['In the library', 'At home', 'At school', 'On the beach (Trên bãi biển)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Our Sunday Outings',
      text: 'Yesterday was a sunny Sunday. Nam was at the zoo looking at giraffes. Mai was at the cinema with her sister. Peter was at home reading comic books.',
      questions: [
        { question: 'Where was Nam yesterday?', options: ['At school', 'At the zoo', 'In the hospital', 'On the beach'], correctIndex: 1 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: Y _ S T E R D A Y', answer: 'E', maskedWord: 'Y _ S T E R D A Y' },
      { type: 'sentence_builder', prompt: 'Ghép câu: were / you / Where / yesterday?', answer: 'Where were you yesterday?', scrambledTokens: ['yesterday?', 'were', 'Where', 'you'] }
    ],
    speechPrompts: [
      { phrase: 'Where were you yesterday? I was at home', vietnamese: 'Hôm qua bạn ở đâu? Mình ở nhà', phoneticTip: 'Phát âm chuẩn âm /w/ trong where were' }
    ],
    oddWords: [
      { words: ['Yesterday', 'Today', 'Ruler', 'Tomorrow'], oddIndex: 2, explanation: 'Ruler là cây thước kẻ, các từ còn lại là từ chỉ thời gian!' }
    ]
  },
  {
    id: 'g4-unit-11',
    title: 'Unit 11: My Home and Hometown',
    vietnameseTitle: 'Bài 11: Ngôi nhà và quê hương của em (City, Village...)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Hometown & Geography',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v111', word: 'Hometown', phonetic: '/ˈhəʊmtaʊn/', vietnamese: 'Quê hương', exampleSentence: 'My hometown is Da Nang.', emoji: '🏙️', category: 'Places' },
      { id: 'g4-v112', word: 'City', phonetic: '/ˈsɪti/', vietnamese: 'Thành phố', exampleSentence: 'A bustling city.', emoji: '🌆', category: 'Places' },
      { id: 'g4-v113', word: 'Town', phonetic: '/taʊn/', vietnamese: 'Thị trấn', exampleSentence: 'A peaceful town.', emoji: '🏘️', category: 'Places' },
      { id: 'g4-v114', word: 'Village', phonetic: '/ˈvɪlɪdʒ/', vietnamese: 'Làng quê', exampleSentence: 'A green village.', emoji: '🏡', category: 'Places' },
      { id: 'g4-v115', word: 'Island', phonetic: '/ˈaɪlənd/', vietnamese: 'Hòn đảo', exampleSentence: 'Phu Quoc island.', emoji: '🏝️', category: 'Places' }
    ],
    sentences: [
      { pattern: 'What is your hometown like? - It is small and quiet.', vietnamese: 'Quê hương của bạn như thế nào? - Quê mình nhỏ và yên bình.', dialogue: 'A: What is your hometown like? \nB: It is large and bustling with tall buildings.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq111',
        audioScript: 'My hometown is Ha Long city. It is famous for beautiful islands and fresh seafood.',
        question: 'Quê hương của bạn nhỏ là thành phố nào?',
        options: ['Hue citadel', 'Ha Noi capital', 'Ha Long city', 'Can Tho'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Our Hometowns',
      text: 'Akiko comes from Tokyo, a very large and modern city in Japan. Quan comes from a quiet village in Ninh Binh province with scenic limestone mountains.',
      questions: [
        { question: 'What is Tokyo like?', options: ['A very large and modern city', 'A small village', 'A tiny island', 'A desert'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: C _ T Y (Thành phố)', answer: 'I', maskedWord: 'C _ T Y' },
      { type: 'sentence_builder', prompt: 'Ghép câu: hometown / is / What / your / like?', answer: 'What is your hometown like?', scrambledTokens: ['your', 'What', 'like?', 'hometown', 'is'] }
    ],
    speechPrompts: [
      { phrase: 'My hometown is quiet and peaceful', vietnamese: 'Quê mình yên tĩnh và thanh bình', phoneticTip: 'Chú ý phát âm peaceful /ˈpiːsfl/' }
    ],
    oddWords: [
      { words: ['City', 'Pencil', 'Village', 'Town'], oddIndex: 1, explanation: 'Pencil là bút chì, các từ còn lại là địa danh nơi chốn!' }
    ]
  },
  {
    id: 'g4-unit-12',
    title: 'Unit 12: Jobs and Workplaces',
    vietnameseTitle: 'Bài 12: Nghề nghiệp và nơi làm việc (Hospital, Factory...)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Jobs & Workplaces',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v121', word: 'Worker', phonetic: '/ˈwɜːkə(r)/', vietnamese: 'Công nhân', exampleSentence: 'A factory worker.', emoji: '👷', category: 'Jobs' },
      { id: 'g4-v122', word: 'Clerk', phonetic: '/klɑːk/', vietnamese: 'Nhân viên văn phòng', exampleSentence: 'An office clerk.', emoji: '🧑‍💼', category: 'Jobs' },
      { id: 'g4-v123', word: 'Hospital', phonetic: '/ˈhɒspɪtl/', vietnamese: 'Bệnh viện', exampleSentence: 'Doctors work in a hospital.', emoji: '🏥', category: 'Places' },
      { id: 'g4-v124', word: 'Factory', phonetic: '/ˈfæktri/', vietnamese: 'Nhà máy', exampleSentence: 'Workers in a factory.', emoji: '🏭', category: 'Places' },
      { id: 'g4-v125', word: 'Field', phonetic: '/fiːld/', vietnamese: 'Cánh đồng', exampleSentence: 'Farmers in the field.', emoji: '🌾', category: 'Places' }
    ],
    sentences: [
      { pattern: 'Where does a doctor work? - A doctor works in a hospital.', vietnamese: 'Nghề làm việc ở đâu? - Nghề làm việc tại Nơi làm việc.', dialogue: 'A: Where does a doctor work? \nB: A doctor works in a hospital.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq121',
        audioScript: 'My father is a skilled engineer. He works at a modern car factory in Hai Phong.',
        question: 'Bố bạn nhỏ làm việc ở đâu?',
        options: ['A farm', 'A hospital', 'A primary school', 'A modern car factory (Nhà máy ô tô)'],
        correctIndex: 3
      }
    ],
    readingPassage: {
      title: 'Where People Work',
      text: 'Different people work in different places. Teachers work in schools to teach students. Doctors and nurses work in hospitals to care for patients.',
      questions: [
        { question: 'Where do doctors and nurses work?', options: ['On ships', 'In factories', 'In fields', 'In hospitals'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: H _ S P I T A L', answer: 'O', maskedWord: 'H _ S P I T A L' },
      { type: 'sentence_builder', prompt: 'Ghép câu: works / in / a / hospital / doctor / A', answer: 'A doctor works in a hospital', scrambledTokens: ['hospital', 'A', 'works', 'in', 'doctor', 'a'] }
    ],
    speechPrompts: [
      { phrase: 'A doctor works in a hospital', vietnamese: 'Bác sĩ làm việc ở bệnh viện', phoneticTip: 'Nhấn trọng âm hos-pi-tal' }
    ],
    oddWords: [
      { words: ['Apple', 'Factory', 'School', 'Hospital'], oddIndex: 0, explanation: 'Apple là trái cây, các từ còn lại là nơi làm việc!' }
    ]
  },
  {
    id: 'g4-unit-13',
    title: 'Unit 13: Appearance and Clothes',
    vietnameseTitle: 'Bài 13: Miêu tả ngoại hình và trang phục (Tall, Slim...)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Appearance & Description',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v131', word: 'Tall', phonetic: '/tɔːl/', vietnamese: 'Cao ráo', exampleSentence: 'He is tall.', emoji: '🦒', category: 'Appearance' },
      { id: 'g4-v132', word: 'Short', phonetic: '/ʃɔːt/', vietnamese: 'Thấp / Ngắn', exampleSentence: 'She is short.', emoji: '📏', category: 'Appearance' },
      { id: 'g4-v133', word: 'Slim', phonetic: '/slɪm/', vietnamese: 'Thon thả', exampleSentence: 'A slim girl.', emoji: '🧍', category: 'Appearance' },
      { id: 'g4-v134', word: 'T-shirt', phonetic: '/ˈtiː ʃɜːt/', vietnamese: 'Áo phông', exampleSentence: 'A red T-shirt.', emoji: '👕', category: 'Clothes' },
      { id: 'g4-v135', word: 'Jeans', phonetic: '/dʒiːnz/', vietnamese: 'Quần bò jean', exampleSentence: 'Blue jeans.', emoji: '👖', category: 'Clothes' }
    ],
    sentences: [
      { pattern: 'What does he look like? - He is tall and slim.', vietnamese: 'Cậu ấy trông như thế nào? - Cậu ấy cao ráo và mảnh mai.', dialogue: 'A: What does your brother look like? \nB: He is tall and slim with curly black hair.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq131',
        audioScript: 'Look at the boy wearing a green T-shirt! He is very tall and plays basketball well.',
        question: 'Bạn nam mặc áo phông xanh có ngoại hình như thế nào?',
        options: ['Very tall (Rất cao)', 'Short', 'Chubby', 'Tiny'],
        correctIndex: 0
      }
    ],
    readingPassage: {
      title: 'Our Best Friends',
      text: 'Phong is my best friend. He is tall and wears blue jeans and a white T-shirt. He is always smiling and cheerful.',
      questions: [
        { question: 'What clothes does Phong wear?', options: ['A yellow dress', 'A black suit', 'Blue jeans and a white T-shirt', 'Pajamas'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: T _ L L (Cao)', answer: 'A', maskedWord: 'T _ L L' },
      { type: 'sentence_builder', prompt: 'Ghép câu: look / does / What / he / like?', answer: 'What does he look like?', scrambledTokens: ['he', 'What', 'like?', 'does', 'look'] }
    ],
    speechPrompts: [
      { phrase: 'He is tall and slim', vietnamese: 'Anh ấy cao và thon thả', phoneticTip: 'Chú ý phát âm slim /slɪm/' }
    ],
    oddWords: [
      { words: ['Tall', 'Cake', 'Slim', 'Short'], oddIndex: 1, explanation: 'Cake là bánh ngọt, các từ còn lại là tính từ miêu tả ngoại hình!' }
    ]
  },
  {
    id: 'g4-unit-14',
    title: 'Unit 14: Daily Activities & Free Time',
    vietnameseTitle: 'Bài 14: Sinh hoạt hàng ngày và thời gian rảnh rỗi',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Daily Activities',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v141', word: 'Watch TV', phonetic: '/wɒtʃ ˌtiː ˈviː/', vietnamese: 'Xem vô tuyến', exampleSentence: 'Watch TV cartoons.', emoji: '📺', category: 'Activities' },
      { id: 'g4-v142', word: 'Listen to music', phonetic: '/ˈlɪsn tu ˈmjuːzɪk/', vietnamese: 'Nghe nhạc', exampleSentence: 'Listen to music with headphones.', emoji: '🎧', category: 'Activities' },
      { id: 'g4-v143', word: 'Do homework', phonetic: '/duː ˈhəʊmwɜːk/', vietnamese: 'Làm bài tập về nhà', exampleSentence: 'Do homework before dinner.', emoji: '📝', category: 'Activities' },
      { id: 'g4-v144', word: 'Help parents', phonetic: '/help ˈpeərənts/', vietnamese: 'Giúp đỡ bố mẹ', exampleSentence: 'Help parents with housework.', emoji: '🧹', category: 'Activities' }
    ],
    sentences: [
      { pattern: 'What do you do in your free time? - I read books.', vietnamese: 'Bạn làm gì vào thời gian rảnh? - Mình đọc sách.', dialogue: 'A: What do you do in your free time? \nB: I listen to English songs and help my parents.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq141',
        audioScript: 'In my free time, I love listening to cheerful pop songs on the radio.',
        question: 'Bạn nhỏ làm gì trong thời gian rảnh rỗi?',
        options: ['Play video games all night', 'Listen to music (Nghe nhạc)', 'Go shopping', 'Sleep all day'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'Our Evening Routines',
      text: 'After dinner, Linda does her English homework for forty minutes. Then, she helps her mother wash the dishes and listens to soft music before going to bed.',
      questions: [
        { question: 'What does Linda do after dinner?', options: ['Does her English homework', 'Plays video games', 'Goes outside', 'Takes a bath'], correctIndex: 0 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: M _ S I C', answer: 'U', maskedWord: 'M _ S I C' },
      { type: 'sentence_builder', prompt: 'Ghép câu: to / listen / I / music / evening / in the', answer: 'I listen to music in the evening', scrambledTokens: ['music', 'I', 'evening', 'listen', 'in the', 'to'] }
    ],
    speechPrompts: [
      { phrase: 'I listen to music in my free time', vietnamese: 'Mình nghe nhạc vào thời gian rảnh', phoneticTip: 'Chú ý âm câm t trong listen' }
    ],
    oddWords: [
      { words: ['Watch TV', 'Listen to music', 'Do homework', 'Tiger'], oddIndex: 3, explanation: 'Tiger là con hổ, các từ còn lại là hoạt động thường ngày!' }
    ]
  },
  {
    id: 'g4-unit-15',
    title: 'Unit 15: At the Food Stall & Prices',
    vietnameseTitle: 'Bài 15: Tại quầy ẩm thực và hỏi giá tiền (How much is it?)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Food Stall & Shopping',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v151', word: 'Sandwich', phonetic: '/ˈsænwɪtʃ/', vietnamese: 'Bánh mì kẹp', exampleSentence: 'A ham sandwich.', emoji: '🥪', category: 'Food' },
      { id: 'g4-v152', word: 'Lemonade', phonetic: '/ˌleməˈneɪd/', vietnamese: 'Nước chanh', exampleSentence: 'A glass of lemonade.', emoji: '🍋', category: 'Drinks' },
      { id: 'g4-v153', word: 'Thousand', phonetic: '/ˈθaʊznd/', vietnamese: 'Nghìn (tiền)', exampleSentence: 'Ten thousand dong.', emoji: '💵', category: 'Numbers' },
      { id: 'g4-v154', word: 'Price', phonetic: '/praɪs/', vietnamese: 'Giá cả', exampleSentence: 'A reasonable price.', emoji: '🏷️', category: 'Shopping' }
    ],
    sentences: [
      { pattern: 'How much is the pen? - It is ten thousand dong.', vietnamese: 'Món này giá bao nhiêu? - Món này có giá mười nghìn đồng.', dialogue: 'A: How much is this sandwich? \nB: It is fifteen thousand dong.' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq151',
        audioScript: 'Good morning! This tasty egg sandwich is twenty thousand dong.',
        question: 'Chiếc bánh mì kẹp trứng có giá bao nhiêu?',
        options: ['Ten thousand dong', 'Twenty thousand dong (20.000 đồng)', 'Fifty thousand dong', 'Five thousand dong'],
        correctIndex: 1
      }
    ],
    readingPassage: {
      title: 'At the School Canteen Stall',
      text: 'At break time, many students buy drinks at the food stall. A carton of milk is eight thousand dong and a fresh lemonade is ten thousand dong.',
      questions: [
        { question: 'How much is the fresh lemonade?', options: ['One hundred thousand', 'Fifty thousand dong', 'Free', 'Ten thousand dong'], correctIndex: 3 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: P R _ C E', answer: 'I', maskedWord: 'P R _ C E' },
      { type: 'sentence_builder', prompt: 'Ghép câu: much / How / sandwich? / is / this', answer: 'How much is this sandwich?', scrambledTokens: ['this', 'How', 'is', 'much', 'sandwich?'] }
    ],
    speechPrompts: [
      { phrase: 'How much is this glass of milk', vietnamese: 'Cốc sữa này giá bao nhiêu', phoneticTip: 'Lên giọng ở cuối câu hỏi giá' }
    ],
    oddWords: [
      { words: ['Ruler', 'Lemonade', 'Thousand', 'Sandwich'], oddIndex: 0, explanation: 'Ruler là thước kẻ, các từ còn lại gắn liền với mua bán đồ ăn!' }
    ]
  },
  {
    id: 'g4-unit-16',
    title: 'Unit 16: Weather and Seasons',
    vietnameseTitle: 'Bài 16: Thời tiết và bốn mùa trong năm (Sunny, Rainy...)',
    grade: 4,
    bookSeries: 'Global Success',
    theme: 'Weather & Seasons',
    status: 'approved',
    updatedAt: '2026-10-01',
    vocabularies: [
      { id: 'g4-v161', word: 'Sunny', phonetic: '/ˈsʌni/', vietnamese: 'Nắng ấm', exampleSentence: 'A sunny day.', emoji: '☀️', category: 'Weather' },
      { id: 'g4-v162', word: 'Rainy', phonetic: '/ˈreɪni/', vietnamese: 'Mưa nhiều', exampleSentence: 'A rainy afternoon.', emoji: '🌧️', category: 'Weather' },
      { id: 'g4-v163', word: 'Windy', phonetic: '/ˈwɪndi/', vietnamese: 'Nhiều gió', exampleSentence: 'Windy in autumn.', emoji: '💨', category: 'Weather' },
      { id: 'g4-v164', word: 'Summer', phonetic: '/ˈsʌmə(r)/', vietnamese: 'Mùa hè', exampleSentence: 'Hot in summer.', emoji: '🏖️', category: 'Seasons' },
      { id: 'g4-v165', word: 'Winter', phonetic: '/ˈwɪntə(r)/', vietnamese: 'Mùa đông', exampleSentence: 'Cold in winter.', emoji: '❄️', category: 'Seasons' }
    ],
    sentences: [
      { pattern: 'What is the weather like today? - It is sunny and warm.', vietnamese: 'Thời tiết hôm nay như thế nào? - Trời nắng và ấm áp.', dialogue: 'A: What is the weather like today? \nB: It is sunny and warm. Let us go outside!' }
    ],
    listeningQuestions: [
      {
        id: 'g4-lq161',
        audioScript: 'Look out the window! The sky is gray and it is rainy and cold outside.',
        question: 'Thời tiết bên ngoài hôm nay như thế nào?',
        options: ['Snowy', 'Sunny and hot', 'Rainy and cold (Mưa và lạnh)', 'Dry and dusty'],
        correctIndex: 2
      }
    ],
    readingPassage: {
      title: 'Four Seasons in Vietnam',
      text: 'In northern Vietnam, there are four seasons: spring, summer, autumn, and winter. Spring is warm with drizzling rain. Summer is hot and sunny. Autumn is cool and breezy. Winter is cold and dry.',
      questions: [
        { question: 'What is summer like in northern Vietnam?', options: ['Dark', 'Freezing and snowy', 'Hot and sunny', 'Stormy every day'], correctIndex: 2 }
      ]
    },
    writingChallenges: [
      { type: 'missing_letter', prompt: 'Điền chữ cái: S _ N N Y', answer: 'U', maskedWord: 'S _ N N Y' },
      { type: 'sentence_builder', prompt: 'Ghép câu: weather / is / What / like? / the', answer: 'What is the weather like?', scrambledTokens: ['weather', 'What', 'like?', 'the', 'is'] }
    ],
    speechPrompts: [
      { phrase: 'It is sunny and windy today', vietnamese: 'Hôm nay trời nắng và có gió', phoneticTip: 'Chú ý phát âm sunny and windy' }
    ],
    oddWords: [
      { words: ['Sunny', 'Rainy', 'Pencil case', 'Windy'], oddIndex: 2, explanation: 'Pencil case là hộp bút, các từ còn lại là tính từ thời tiết!' }
    ]
  }
];
