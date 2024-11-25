"use client";
import axios from "axios";
import style from "./DeleteBtn.module.css";
import { useRouter } from "next/navigation";

interface DeleteBtnProps {
  applianceId: string | string[];
}

const DeleteBtn = ({ applianceId }: DeleteBtnProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;
  const router = useRouter();

  const onDelete = async () => {
    try {
      const res = await axios.post(`${API_URL}/appliances/delete/${userId}/${applianceId}`);

      if (res.status === 200) {
        router.push("/list");
      } else {
        console.error("삭제 실패:", res.data);
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={style.deleteBtnWrapper}>
      <button className={style.deleteBtn} onClick={onDelete}>
        삭제하기
      </button>
    </div>
  );
};

export default DeleteBtn;
