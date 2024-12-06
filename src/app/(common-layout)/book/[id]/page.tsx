"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import style from "./page.module.css";
import Box from "@/components/Box";
import { bookList } from "@/mock/bookList";
import Image from "next/image";
import { getImage } from "@/utils/getImage";

export default function Page({ params }: { params: { id: string } }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [tips, setTips] = useState<{ tipContent: string; tip_id: number }[]>([]);
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
      <div>
        <Image src={getImage(bookName)} alt={bookName} width={180} />
      </div>
      <div className={style.bookName}>{bookName}</div>
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
