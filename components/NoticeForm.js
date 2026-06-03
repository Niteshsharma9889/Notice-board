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

    if (
      !form.title ||
      !form.body ||
      !form.publishDate
    ) {
      alert("Please fill all required fields");
      return;
    }

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
    } else {
      alert("Failed to create notice");
    }
  }

  return (
    <form onSubmit={submit}>

      <input
        className={styles.input}
        placeholder="Enter Notice Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <textarea
        className={styles.textarea}
        placeholder="Enter Notice Details"
        value={form.body}
        onChange={(e) =>
          setForm({
            ...form,
            body: e.target.value,
          })
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
        className={styles.select}
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      >
        <option value="General">
          General
        </option>

        <option value="Exam">
          Exam
        </option>

        <option value="Event">
          Event
        </option>

      </select>

      <select
        className={styles.select}
        value={form.priority}
        onChange={(e) =>
          setForm({
            ...form,
            priority: e.target.value,
          })
        }
      >
        <option value="Normal">
          Normal
        </option>

        <option value="Urgent">
          Urgent
        </option>

      </select>

      <button
        type="submit"
        className={`${styles.button} ${styles.saveBtn}`}
      >
        Save Notice
      </button>

    </form>
  );
}