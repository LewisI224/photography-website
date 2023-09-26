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
                    <div className={styles.title}>
                        <h2>Olympus OM40</h2>
                        <Image src="/om40.jpg" width={300} height={300} className={styles.imageLeft}/>
                    </div>
                    <div className={styles.textRight}>
                        <p>The OM40 was released in 1985. It was called OM-PC on some markets. It has a modified, rubberised body, and is more rugged than the OM 10/20/30, yet cheaper than the OM-2SP. Like the OM-2SP it has a program mode,
                            an aperture priority automatic mode and a manual mode. It has TTL flash automation, and a metering system called 'ESP' (Electro-Selective Pattern) — a basic matrix system with two zones: center and edges. If the
                            meter detects great differences in light between the center and the corners (e.g. a person wearing black against a white wall), it will disregard the corners in order to correctly expose the center. This mode works
                            fine when the subject is placed centrally, but is not ideal for more artistic compositions.The OM40 features the highest OM system integration of any of the double-digit bodies, though also strangely offers the
                            lowest fps with the motor drive (3.5fps opposed to 5fps for all other compatible OM bodies) </p>
                    </div>
                </div>

                <div className={styles.cameraRight}>
                    <div className={styles.textLeft}>
                        <p>Adox Golf 63 is a folding film camera manufactured by Adox Fotowerke, Wiesbaden, Germany, produced between 1954-59. Uses 120 roll film 120 and picture size is 6x6cm It has a coated Adoxar 1:6.3 f=75mm lens with
                            turnable front lens element for focusing. The lens is combined with a flash-synchronized Vario leaf shutter. Speeds are B, 1/25, 1/50, 1/100 and 1/200 sec. </p>
                    </div>
                    <div className={styles.title}>
                        <h2>Adox Golf Model 63</h2>
                        <Image src="/om40.jpg"width={300} height={300} className={styles.imageRight}/>
                    </div>
                </div>

                <div className={styles.cameraLeft}>
                    <div className={styles.title}>
                        <h2>Agfa Agfamatic 2000</h2>
                        <Image src="/om40.jpg" width={300} height={300} className={styles.imageLeft}/>
                    </div>
                    <div className={styles.textRight}>
                        <p>The Agfamatic 2000 pocket sensor is a 110 cartridge film pocket camera made by Agfa, introduced in 1973. Sun & Cloud weather symbols selects between 1/100 and 1/50s shutter speeds. Flash is provided by magicubes.
                            As all of the pocket Agfamatics it has the push-pull film advance, meaning that closing and opening again the camera once after an exposure causes the film to advance to the next image frame. </p>
                    </div>
                </div>

            </section>
        </Layout>
    )
}

export default MyCameras
