import { Unit } from '../types';
import { CURRICULUM_GRADE_1 } from './curriculumGrade1';
import { CURRICULUM_GRADE_2 } from './curriculumGrade2';
import { CURRICULUM_GRADE_3 } from './curriculumGrade3';
import { CURRICULUM_GRADE_4 } from './curriculumGrade4';
import { CURRICULUM_GRADE_5 } from './curriculumGrade5';

// Toàn bộ Chương trình Sách Giáo Khoa Tiếng Anh Tiểu Học Cả Năm (Lớp 1 đến Lớp 5)
// Theo chuẩn Chương trình Giáo dục phổ thông mới của Bộ GD&ĐT (Global Success / Tiếng Anh 1-5)
// Tổng cộng 80 Units chính khóa được phân chia khoa học theo Học kỳ 1 và Học kỳ 2
export const FULL_YEAR_SGK_CURRICULUM: Unit[] = [
  ...CURRICULUM_GRADE_1,
  ...CURRICULUM_GRADE_2,
  ...CURRICULUM_GRADE_3,
  ...CURRICULUM_GRADE_4,
  ...CURRICULUM_GRADE_5
];
