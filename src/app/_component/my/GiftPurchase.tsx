"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./GiftPurchase.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";
import PurchasePopup from "./PurchasePopup";
import { gift } from "@/mock/gift";
import { getNoticeByBrand } from "@/mock/commonNotice";

interface GiftPurchaseProps {
  id: number;
}

export default function GiftPurchase({ id }: GiftPurchaseProps) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedGift, setSelectedGift] = useState<any | null>(null);
  const [point, setPoint] = useState<number>(0);
  const [brandNotice, setBrandNotice] = useState<any | null>(null);

  const openPopup = (gift: any) => {
    setSelectedGift(gift);
    setIsPopupOpen(true);
  };

  const closePopup = async () => {
    setIsPopupOpen(false);
    await fetchPoints();
  };
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 상품 정보
  const fetchGiftById = (giftId: number) => {
    const giftData = gift.find(item => item.id === giftId);
    if (giftData) {
      setSelectedGift(giftData);
      fetchNotice(giftData.판매처);
    } else {
      console.error("상품 정보를 찾을 수 없습니다.");
    }
  };

  const fetchNotice = (brandName: string) => {
    const notice = getNoticeByBrand(brandName);
    if (notice.error) {
      console.error("공통 상세정보를 불러오지 못했습니다:", notice.error);
    } else {
      setBrandNotice(notice);
    }
  };

  const fetchPoints = async () => {
    try {
      const response = await axios.get(`${API_URL}/point`, {
        withCredentials: true
      });
      if (response.data && response.data.success) {
        setPoint(response.data.data);
      } else {
        console.error("포인트 데이터가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("포인트 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPoints();
    fetchGiftById(id);
  }, [id]);

  if (!selectedGift) {
    return <p>상품 정보를 불러오는 중입니다...</p>;
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <Image
            src={selectedGift.url}
            alt={selectedGift.메뉴이름}
            width={230}
            height={230}
            className={styles.giftImage}
          />
          <div className={styles.giftLeft}>
            <p className={styles.giftShopText}>{selectedGift.판매처}</p>
            <p className={styles.giftMenuText}>{selectedGift.메뉴이름}</p>
            <div className={styles.pointContainer}>
              <p className={styles.giftCostText}>
                {parseInt(selectedGift.가격, 10).toLocaleString()}
              </p>
              <IconPoint className={styles.iconPointSmall} />
            </div>
          </div>
        </div>
        <div style={{ width: "100%", height: "1.5rem", backgroundColor: "#F1F3F5" }} />
        <div>
          <div style={{ marginTop: "3.4rem", marginBottom: "4rem" }}>
            <p className={styles.title}>이용안내</p>
            <p className={styles.bodyText}>
              본 내용은 실제 전자상거래법을 따르고 있는 것이 아닌,
              <br />
              연출된 상품 정보 제공 고시입니다.
            </p>
          </div>
          <div>
            <p className={styles.title}>상세정보</p>
            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                유효기간
              </p>
              <p className={styles.bodyText} style={{ width: "18rem" }}>
                발급일 포함 367일
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                교환권 공급자
              </p>
              <p className={styles.bodyText} style={{ width: "18rem" }}>
                {brandNotice?.공급자}
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                발행자
              </p>
              <p className={styles.bodyText} style={{ width: "18rem" }}>
                그린스파크
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                판매처
              </p>
              <p className={styles.bodyText} style={{ width: "18rem" }}>
                {selectedGift.판매처}
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                소비자상담 관련 전화번호
              </p>
              <p className={styles.bodyText} style={{ width: "18rem" }}>
                {brandNotice?.전화번호}
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                이용 가능 매장
              </p>
              <p className={styles.bodyText} style={{ width: "18rem", whiteSpace: "pre-wrap" }}>
                {brandNotice?.이용가능매장}
              </p>
            </div>

            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                이용조건
              </p>
              <p className={styles.bodyText} style={{ width: "18rem", whiteSpace: "pre-wrap" }}>
                {brandNotice?.이용조건}
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.bodyText} style={{ width: "8rem" }}>
                환불조건 및 방법
              </p>
              <p className={styles.bodyText} style={{ width: "18rem" }}>
                {brandNotice?.환불조건}
              </p>
            </div>
          </div>
        </div>
        <button className={styles.purchaseBtn}>구매하기</button>
      </div>

      <button className={styles.purchaseBtn} onClick={() => openPopup(selectedGift)}>
        구매하기
      </button>

      {isPopupOpen && selectedGift && (
        <PurchasePopup
          imgurl={selectedGift.url}
          menuName={selectedGift.메뉴이름}
          shop={selectedGift.판매처}
          price={parseInt(selectedGift.가격, 10)}
          availablePoints={point}
          onClose={closePopup}
        />
      )}
    </>
  );
}
