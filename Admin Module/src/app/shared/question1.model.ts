import { Subject } from "./subjectModel";

export class Question {
    _id: string;
    questionCode: string;
    questionDescription: string;
    topicName: string;
    unitName: string;
    marks: string;
    optionOne: string
    optionTwo: string
    optionThree: string
    optionFour: string
    correctAnswer: string
    subjectDetails: Subject
}
