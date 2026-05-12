import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="#hero" className={styles.logo}>
        Designed by Mayank
      </Link>
      <ul className={styles.ul}>
        <li><Link href="#projects" className={styles.link}>Work</Link></li>
        <li><Link href="#about" className={styles.link}>About</Link></li>
        <li><Link href="#contact" className={styles.link}>Contact</Link></li>
        <li><Link href="#" className={styles.resume}>Resume</Link></li>
      </ul>
    </nav>
  );
}
