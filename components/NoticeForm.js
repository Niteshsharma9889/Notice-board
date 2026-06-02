import { useState } from "react";
import styles from "../styles/NoticeBoard.module.css";

export default function NoticeForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "General",
    priority: "Normal",
    publishDate: "",
  });

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      refresh();

      setForm({
        title: "",
        body: "",
        category: "General",
        priority: "Normal",
        publishDate: "",
      });
    }
  }

  return (
    <form onSubmit={submit}>

      <input
        className={styles.input}
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        className={styles.textarea}
        placeholder="Body"
        value={form.body}
        onChange={(e) =>
          setForm({ ...form, body: e.target.value })
        }
      />

      <input
        type="date"
        className={styles.input}
        value={form.publishDate}
        onChange={(e) =>
          setForm({
            ...form,
            publishDate: e.target.value,
          })
        }
      />

      <select
        className={styles.input}
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      >
        <option>General</option>
        <option>Exam</option>
        <option>Event</option>
      </select>

      <select
        className={styles.input}
        value={form.priority}
        onChange={(e) =>
          setForm({
            ...form,
            priority: e.target.value,
          })
        }
      >
        <option>Normal</option>
        <option>Urgent</option>
      </select>

      <button
        className={`${styles.button} ${styles.saveBtn}`}
      >
        Save Notice
      </button>

    </form>
  );
}