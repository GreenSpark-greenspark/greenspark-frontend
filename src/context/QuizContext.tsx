"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 상태 타입 정의
interface QuizStatus {
  quiz1: boolean;
  quiz2: boolean;
}

interface QuizContextType {
  quizStatus: QuizStatus;
  updateQuizStatus: (quizId: string) => void;
}

// Context 생성
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider 컴포넌트
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizStatus, setQuizStatus] = useState<QuizStatus>({
    quiz1: false,
    quiz2: false
  });

  // 퀴즈 상태 업데이트 함수
  const updateQuizStatus = (quizId: string) => {
    setQuizStatus(prevStatus => ({
      ...prevStatus,
      [quizId]: true
    }));
  };

  return (
    <QuizContext.Provider value={{ quizStatus, updateQuizStatus }}>{children}</QuizContext.Provider>
  );
};

// Custom hook (컨텍스트 사용 편의성)
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
