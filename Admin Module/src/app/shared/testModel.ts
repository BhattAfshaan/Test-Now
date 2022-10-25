import { Question } from "./question1.model"

export class Test {
    _id: string
    testCode:string
    testName:string
    testDate: string
    testStartTime: string
    testEndTime: string
    testQuestions:Question[]= []
}