import style from "./ToolTip.module.css";
import InfoFillIcon from "@/../public/icon/info_white_icon.svg";
import InfoIcon from "@/../public/icon/info_icon.svg";
import { useState } from "react";
import Image from "next/image";

export default function ToolTip() {
  const [click, setClick] = useState(false);

  const onClick = () => setClick(prevState => !prevState);

  return (
    <div className={style.Wrap}>
      <div className={style.btnWrap}>
        <div className={style.btnContainer} onClick={onClick}>
          <div className={style.iconWrap}>{click ? <InfoFillIcon /> : <InfoIcon />}</div>
          <div
            className={style.text}
            style={{
              color: click ? "#F1F3F5" : "#5e5e5e",
              textDecoration: click ? "none" : "underline"
            }}
          >
            어떻게 추가하는지 모르겠다면?
          </div>
        </div>
      </div>
      {click && (
        <div>
          <div className={`${style.tooltip} ${click ? style.show : ""}`}>
            <div className={style.section}>
              <div className={style.title}>1. 기자재 명칭을 먼저 선택해주세요</div>
              <div className={style.description}>ex) 냉장고</div>
            </div>
            <div className={style.section}>
              <div className={style.title}>2. 제품 모델명을 입력해주세요</div>
              <div className={style.description}>
                모델명은 본인의 가전제품에서
                <br />
                직접 확인할 수 있어요!
              </div>
            </div>
            <div className={style.imgWrapper}>
              <Image
                src="/img/add-example.png"
                alt="가전 추가 예시 사진"
                width={127}
                height={115.06}
              />
            </div>
          </div>
          <div className={style.overlay} onClick={onClick} />
        </div>
      )}
    </div>
  );
}
