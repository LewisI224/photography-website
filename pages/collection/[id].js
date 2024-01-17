import Layout from '../../components/Layout'
import styles from '../css-modules/all-images.module.css'
import prisma from '../../prisma/prisma'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { XMasonry, XBlock } from 'react-xmasonry'
import ImageModal from '../../components/ImageModal'
import SortingButtons from '../../components/SortingButtons'

export async function getStaticProps(context) {
    const images_in_collection =
        await prisma.collections_images_lookup.findMany({
            where: { collectionsId: context.params.id },
        })
    const collection_data = await prisma.collections.findUnique({
        where: { id: context.params.id },
    })
    const res = []
    for (const image of images_in_collection) {
        const image_data = await prisma.images.findUnique({
            where: { id: image.imagesId },
        })
        res.push(image_data)
    }
    return {
        props: {
            images_data: JSON.parse(JSON.stringify(res)),
            collection_data: JSON.parse(JSON.stringify(collection_data)),
        },
    }
}

export async function getStaticPaths() {
    const res = await prisma.collections.findMany()
    const paths = res.map((d) => {
        return {
            params: { id: d.id.toString() },
        }
    })
    return {
        paths,
        fallback: false,
    }
}

function Collection({ images_data, collection_data }) {
    const [photos, setPhotos] = useState([])
    const [sortKey, setSortKey] = useState(0)

    function SortBy(type) {
        setSortKey((prevSortKey) => prevSortKey + 1)
        const sortedPhotos = [...photos]
        switch (type) {
            case 'date-o-n':
                sortedPhotos.sort((a, b) => {
                    return a.date.localeCompare(b.date)
                })
                break
            case 'date-n-o':
                sortedPhotos.sort((a, b) => {
                    return b.date.localeCompare(a.date)
                })
                break
            case 'title-a-z':
                sortedPhotos.sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
                break
            case 'title-z-a':
                sortedPhotos.sort((a, b) => {
                    return b.title.localeCompare(a.title)
                })
                break
        }
        setPhotos(sortedPhotos)
    }

    useEffect(() => {
        setPhotos(images_data)
    }, [images_data])

    return (
        <Layout>
            <Head>
                <title>
                    {collection_data?.name} | Loowis Photography
                </title>
            </Head>
            <section className={styles.container}>
                <h1 className={styles.header}>{collection_data?.name}</h1>
                <SortingButtons SortBy={SortBy} page="Collections"/>
                <XMasonry key={sortKey} maxColumns="3" targetBlockWidth="550">
                    {photos?.map((d) => (
                        <XBlock key={d.id}>
                            <ImageModal data={d} key={d.id} page="Collections"/>
                        </XBlock>
                    ))}
                </XMasonry>
            </section>
        </Layout>
    )
}

export default Collection
