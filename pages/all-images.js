import Layout from '../components/Layout'
import styles from './css-modules/all-images.module.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { XMasonry, XBlock } from 'react-xmasonry'
import ImageModal from '../components/ImageModal'
import SortingButtons from '../components/SortingButtons'

function AllImages() {
    const [photos, setPhotos] = useState([])
    const [sortKey, setSortKey] = useState(0)

    async function getAllImages() {
        const req = await fetch('/api/getPhotos')
        const photoData = await req.json()
        photoData.sort((a, b) => {
            return b.date.localeCompare(a.date)
        })
        setPhotos(photoData)
    }

    function SortBy(type) {
        setSortKey((prevSortKey) => prevSortKey + 1)
        const sortedPhotos = [...photos]
        switch (type) {  
            case 'date-o-n':
                sortedPhotos.sort((a, b) => {
                    return a.date.localeCompare(b.date)
                })
                break;
            case 'date-n-o':
                sortedPhotos.sort((a, b) => {
                    return b.date.localeCompare(a.date)
                })
                break;
            case 'title-a-z':
                sortedPhotos.sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
                break;
            case 'title-z-a':
                sortedPhotos.sort((a, b) => {
                    return b.title.localeCompare(a.title)
                })
                break;
        }
        setPhotos(sortedPhotos)
    }

    useEffect(() => {
        getAllImages()
    }, [])

    return (
        <Layout>
            <Head>
                <title>All Images | Lewis Inches Photography</title>
            </Head>
            <section className={styles.container}>
                <SortingButtons SortBy={SortBy} />
                <XMasonry key={sortKey} maxColumns="3" targetBlockWidth="550">
                    {photos.map((d) => (
                        <XBlock key={d.id}>
                            <ImageModal data={d} key={d.id} />
                        </XBlock>
                    ))}
                </XMasonry>
            </section>
        </Layout>
    )
}

export default AllImages
