import Layout from '../components/layout';
import PhotoPreview from '../components/photo-preview';
import AboutMe from '../components/about-me'
import styles from './css-modules/index.module.css';
import { useState, useEffect } from 'react';

function Home() {
    const [photos, setPhotos] = useState([]);

    async function getLatestPhotos() {
        const req = await fetch('/api/getPhotos');
        const photoData = await req.json();
        photoData.sort((a, b) => {
            return b.data.photo_data.date_taken.localeCompare(a.data.photo_data.date_taken);
        });
        photoData.length = 4;
        setPhotos(photoData);
    }

    useEffect(() => {
        getLatestPhotos();
    },[])

    return (
        <Layout>
            <section>
                <div className={styles.photos}>
                    {photos.map((d) => (<PhotoPreview id={d.data.url_id} title={d.data.title} filename={d.data.filename}/>))}
                </div>
                <div>
                    <AboutMe />
                </div>
            </section>
        </Layout>
    )
}

export default Home
