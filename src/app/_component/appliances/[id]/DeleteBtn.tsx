import style from "./DeleteBtn.module.css";

const DeleteBtn = () => {
  return (
    <div className={style.deleteBtnWrapper}>
      <button className={style.deleteBtn}>삭제하기</button>
    </div>
  );
};

export default DeleteBtn;
