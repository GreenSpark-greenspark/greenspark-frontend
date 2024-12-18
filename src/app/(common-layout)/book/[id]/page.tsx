"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import style from "./page.module.css";
import Box from "@/components/Box";
import { bookList } from "@/mock/bookList";
import Image from "next/image";
import { getImage } from "@/utils/getImage";

interface Tip {
  tipContent: string;
  tip_id: number;
  image?: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [tips, setTips] = useState<Tip[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef<number>(0);

  let bookName = "";
  for (let i = 0; i < 12; i++) {
    if (bookList[i].id == Number(params.id)) {
      bookName = bookList[i].name;
    }
  }

  useEffect(() => {
    const fetchDiction = async () => {
      try {
        const res = await axios.get(`${API_URL}/dictionary/${params.id}`);
        setTips(res.data.data);
      } catch (error) {
        console.log("오류 발생:", error);
      }
    };
    fetchDiction();
  }, [params.id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null) {
      deltaXRef.current = e.touches[0].clientX - startXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (deltaXRef.current > 50) {
      // 오른쪽으로 슬라이드
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : tips.length - 1));
    } else if (deltaXRef.current < -50) {
      // 왼쪽으로 슬라이드
      setCurrentIndex(prev => (prev < tips.length - 1 ? prev + 1 : 0));
    }
    startXRef.current = null;
    deltaXRef.current = 0;
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={style.wrapper}>
      {params.id !== "12" && (
        <div>
          <Image src={getImage(bookName)} alt={bookName} width={180} />
        </div>
      )}

      {/* book/12 회고 */}
      {params.id === "12" && (
        <div>
          {tips.map((tip, index) => (
            <div key={tip.tip_id}>
              {index === currentIndex && (
                <Image
                  key={tip.tip_id}
                  src={`/review/${88 + index}.png`}
                  alt={`미모티콘`}
                  width={200}
                  height={200}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className={style.bookName}>
        {bookName == "회고" ? "아기사자의 소감문 🦁" : <p>{bookName}</p>}
      </div>
      <div
        className={style.container}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {tips.length > 0 && (
          <div className={style.slider}>
            <div
              className={style.slides}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {tips.map((tip, index) => (
                <div key={tip.tip_id} className={style.slide}>
                  <Box minHeight="248px">
                    <div className={style.contentContainer}>
                      <div className={style.tipNumber}>Tip {currentIndex + 1}</div>
                      <div className={style.tipContent}>{tip.tipContent}</div>

                      <div className={style.dots}>
                        {tips.map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`${style.dot} ${
                              dotIndex === currentIndex ? style.active : ""
                            }`}
                            onClick={() => handleDotClick(dotIndex)}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </Box>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
