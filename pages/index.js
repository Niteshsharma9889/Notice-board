import { useEffect, useState } from "react";
import NoticeForm from "../components/NoticeForm";
import styles from "../styles/NoticeBoard.module.css";

export default function Home() {
  const [notices, setNotices] = useState([]);

  async function fetchNotices() {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Notice Board
      </h1>

      <div className={styles.formBox}>
        <NoticeForm refresh={fetchNotices} />
      </div>

      {notices.map((notice) => (
        <div
          key={notice.id}
          className={styles.card}
        >
          <h2>{notice.title}</h2>

          <p>{notice.body}</p>

          <div className={styles.noticeMeta}>
            {notice.category} | {notice.priority}
          </div>

          <button
            className={`${styles.button} ${styles.updateBtn}`}
          >
            Update
          </button>

          <button
            className={`${styles.button} ${styles.deleteBtn}`}
            onClick={async () => {
              await fetch(`/api/notices/${notice.id}`, {
                method: "DELETE",
              });

              fetchNotices();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}