import axios from "axios";
import style from "./DeleteBtn.module.css";

const DeleteBtn = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const userId = 1;
  const applianceId = 4;

  const onDelete = async () => {
    try {
      const res = await axios.post(`${API_URL}/appliances/delete/${userId}/${applianceId}`);

      if (res.status === 200) {
        alert("삭제 성공!");
        // 삭제 후 로직
      } else {
        // 삭제 실패
        console.error("삭제 실패:", res.data);
        alert("삭제에 실패했습니다.");
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
