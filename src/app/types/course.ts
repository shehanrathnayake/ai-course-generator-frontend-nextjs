export interface QuizQuestion {
  question: string;
  choices?: string[];
  answer: string;
  explanation: string;
}

export interface CourseModule {
  title: string;
  description: string;
  content: string;
  quiz: QuizQuestion[];
}

export interface CourseResponse {
  modules: CourseModule[];
}
