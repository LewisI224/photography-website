import Head from 'next/head'
import Layout from '../components/Layout'
import styles from './css-modules/my-cameras.module.css'
import Image from 'next/image'


function MyCameras() {


    return (
        <Layout>
            <Head>
                <title>My Cameras | Lewis Inches Photography</title>
            </Head>
            <section>
            <div className={styles.cameraLeft}>
                    <Image src="/om40.jpg" width={500} height={500} className={styles.imageLeft}/>
                    <div className={styles.textRight}>
                        <h2>Olympus OM40</h2>
                        <p></p>
                    </div>
                </div>
                <div className={styles.cameraRight}>
                <div className={styles.textLeft}>
                        <h2>Adox Golf Model 63</h2>
                        <p></p>
                    </div>
                    <Image src="/m63.jpg" width={500} height={500} className={styles.imageRight}/>
                </div>
                <div className={styles.cameraLeft}>
                    <Image src="/a100.jpg" width={500} height={500} className={styles.imageLeft}/>
                    <div className={styles.textRight}>
                        <h2>Agfa Agfamatic 100</h2>
                        <p></p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default MyCameras
