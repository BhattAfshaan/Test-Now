export class Result {
  _id: string;
  departmentID: string;
  courseID: string;
  subjectID: string;
  testID: string;
  questionID: string;
  departmentName: string;
  courseName: string;
  subjectName: string;
  testName: string;
  email: string;
  userName: string;
  submittedAnswer: string;
  correctAnswer: string;
  marksObtained: number = 0;
  minMarks: number = 0;
  maxMarks: number = 0;
  result: string;
}
