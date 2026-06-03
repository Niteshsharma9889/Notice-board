import { useEffect, useState } from "react";
import NoticeForm from "../components/NoticeForm";
import styles from "../styles/NoticeBoard.module.css";

export default function Home() {
  const [notices, setNotices] = useState([]);

  async function fetchNotices() {
    try {
      const res = await fetch("/api/notices");
      const data = await res.json();

      setNotices(data);
    } catch (error) {
      console.log(error);
    }
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

      {notices.length === 0 && (
        <p>No notices available</p>
      )}

      {notices.map((notice) => (
        <div
          key={notice.id}
          className={styles.card}
        >

          <h2>{notice.title}</h2>

          <p>{notice.body}</p>

          <div className={styles.noticeMeta}>

            <span
              className={`${styles.badge} ${
                styles[
                  notice.category.toLowerCase()
                ]
              }`}
            >
              {notice.category}
            </span>

            <span
              className={`${styles.badge} ${styles.priority}`}
            >
              {notice.priority}
            </span>

          </div>

          <p>
            Publish Date:{" "}
            {new Date(
              notice.publishDate
            ).toLocaleDateString()}
          </p>

          <div>

            <button
              className={`${styles.button} ${styles.updateBtn}`}
              onClick={async () => {
                await fetch(
                  `/api/notices/${notice.id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    body: JSON.stringify(notice),
                  }
                );

                fetchNotices();
              }}
            >
              Update
            </button>

            <button
              className={`${styles.button} ${styles.deleteBtn}`}
              onClick={async () => {
                await fetch(
                  `/api/notices/${notice.id}`,
                  {
                    method: "DELETE",
                  }
                );

                fetchNotices();
              }}
            >
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}