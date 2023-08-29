import Link from 'next/link'
import styles from './Header.module.css'
import { useEffect, useState } from 'react'

export default function Header() {
    const [data, setCollections] = useState([])

    async function getCollections() {
        const req = await fetch('/api/collections')
        const collectionData = await req.json()
        setCollections(collectionData)
    }

    useEffect(() => {
        getCollections()
    }, [])

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <Link className={styles.title} href="/">
                    Lewis Inches
                </Link>
                <div>
                    <p className={styles.tagline}>Photography</p>
                </div>
            </div>
            <div className={styles.navs}>
                <Link className={styles.navlink} href="/all-photos">
                    All Images
                </Link>
                <Link className={styles.navlink} href="/collections">
                    Collections
                </Link>
                <Link className={styles.navlink} href="/photo-map">
                    GPS Map
                </Link>
                {/* {data.map((d) => (
                    <Link
                        className={styles.navlink}
                        href={`/collections/${d.data.collection_id}`}
                        key={d.data.collection_id}
                    >
                        {d.data.collection_name}
                    </Link>
                ))} */}
            </div>
        </div>
    )
}