import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface QuizDataType {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  isCorrect: string;
}

interface QuizContextType extends QuizDataType {
  setQuizData: (data: QuizDataType) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext를 찾을 수 없습니다.");
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [quizData, setQuizData] = useState<QuizDataType>({
    question: "",
    userAnswer: "",
    correctAnswer: "",
    explanation: "",
    isCorrect: ""
  });

  useEffect(() => {
    console.log("QuizProvider State:", quizData);
  }, [quizData]);

  return (
    <QuizContext.Provider value={{ ...quizData, setQuizData }}>{children}</QuizContext.Provider>
  );
};
