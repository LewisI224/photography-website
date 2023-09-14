import Image from 'next/image'
import styles from './BootstrapModal.module.css'

export default function BootstrapModal({id}) {

    const data = {
        title: 'Train Station',
        filename: 'train_station_19_12_2022.jpg',
        photo_data: {
            camera: 'Olympus OM40',
            film: 'Colorplus 200',
            date_taken: '2022-12-19',
            location: 'Edinburgh',
        }
    }

    return (
        <div>

            <div className={styles.photo} data-bs-toggle="modal" data-bs-target={'#Modal' + id}>
                <Image
                    src={`https://photography-website.s3.eu-west-2.amazonaws.com/train_station_19_12_2022.jpg`}
                    alt="Train Station"
                    width="1386"
                    height="919"
                    layout="responsive"
                />
                <h5 className={styles.thumbnailTitle}>{data.title}</h5>
            </div>

            <div className="modal fade" id={'Modal' + id} tabindex="-1" aria-labelledby={'Modal' + data.title} aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div style={{backgroundColor: "#f4f2de"}} className="modal-content">
                        <div style={{paddingBottom: "0"}} className="modal-header">
                            <p className={styles.imageTitle}>{data.title}, {data.photo_data.location}</p>
                            <button style={{right: "2%", top: "2%", position: "absolute"}} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div  style={{padding: "0 1%"}} className="modal-body" >
                            <a href={`/photos/${id}`}>
                            <Image
                                src={`https://photography-website.s3.eu-west-2.amazonaws.com/train_station_19_12_2022.jpg`}
                                alt="Train Station"
                                width="1386"
                                height="919"
                                className={styles.image}
                            />
                            </a>
                        </div>
                        <div className="modal-footer">
                            <p className={styles.imageCamera}>Camera: {data.photo_data.camera}</p>
                            <p className={styles.imageFilm}>Film: {data.photo_data.film}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}