import React from "react";
import styles from "./GradeLabel.module.css";

export default function GradeLabel({ grade }: { grade: string }) {
  return <div className={styles.labeText}>{grade}등급</div>;
}
