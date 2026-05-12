import Link from "next/link";
import styles from "./page.module.css";

const videos = [
  { id: "1PRrUeDXpXRJOZAFAfWIt3qqgcnDgb2t5", title: "work 01" },
  { id: "149v56iieWV2WtjCgn01Wrwxk6YVbHYye", title: "work 02" },
  { id: "1wqOCPNbOPb3liu9qxawUMmzAIMXQESB7", title: "work 03" },
  { id: "1tM0KWcVBESiEXn7PKj0wwACjeQWiz-jE", title: "work 04" },
  { id: "1gQ2bZ4uSNqMWZNQvatnl-GzMAJccCrIQ", title: "work 05" },
  { id: "1NK9D2u8Zn2d8U5VPbH9XajJGMrONGYjn", title: "work 06" },
  { id: "1aOp22EdYSkgX3-nvUl3hEZbdqSP94Alm", title: "work 07" },
  { id: "14tPblU7F34KtTsQCorx6WRXURz7bKW1f", title: "work 08" },
  { id: "1R6l-qNmciPlhF0TjNPXE6U4jh9WZCo5Z", title: "work 09" },
  { id: "17dCFxH2PLwbopN5FEmlCqCgIDPkZvH01", title: "work 10" },
];

export default function VideosPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/#projects" className={styles.backLink}>
          Back to home
        </Link>
        <div>
          <p className={styles.eyebrow}>Project archive</p>
          <h1 className={styles.title}>All Videos</h1>
        </div>
      </header>

      <section className={styles.videoGrid} aria-label="Project videos">
        {videos.map((video) => (
          <article key={video.id} className={styles.videoCard}>
            <iframe
              className={styles.video}
              src={`https://drive.google.com/file/d/${video.id}/preview`}
              allow="autoplay"
              title={video.title}
            />
            <h2 className={styles.videoTitle}>{video.title}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
