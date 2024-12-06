import React from "react";
import style from "./page.module.css";
import Box from "@/components/Box";
import { bookList } from "@/mock/bookList";
import Link from "next/link";
import { getImage } from "@/utils/getImage";
import Image from "next/image";

const Page = () => {
  return (
    <div className={style.pageWrap}>
      <div className={style.boxContainer}>
        {bookList
          ? bookList.map(item => (
              <Link href={`/book/${item.id}`}>
                <Box key={item.id}>
                  <div className={style.card}>
                    <div className={style.imgWrapper}>
                      <Image src={getImage(item.name)} alt={item.name} width={93} />
                    </div>
                    <div className={style.rightSection}>
                      <div className={style.itemName}>{item.name}</div>
                      <button className={style.tipBtn}>꿀팁 보러가기</button>
                    </div>
                  </div>
                </Box>
              </Link>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Page;
