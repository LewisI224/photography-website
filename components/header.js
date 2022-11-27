import Link from 'next/link';
import styles from './css-modules/header.module.css'

export default function Header () {
    return (
        <div className={styles.header}>
            <div className={styles.titleblock}>
                <div className={styles.title}>
                    <Link className={styles.titlelink} href="/">Lewis Inches</Link>
                </div>
                <div>
                    <p className={styles.tagline}>Photography in Edinburgh</p>
                </div>
            </div>
            <div className={styles.navs}>
                <Link className={styles.navlink} href="/all-photos" >View All Images</Link>
                
                <Link className={styles.navlink} href="/about-contact">About Me</Link>
            </div>
        </div>
    );

}
