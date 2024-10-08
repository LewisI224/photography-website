import Image from 'next/image'
import styles from './ImageModal.module.css'

export default function ImageModal({ data, page }) {
    return (
        <div>
            <div
                className={
                    page === 'Home'
                        ? styles.photo
                        : page === 'All'
                          ? styles.photoAll
                          : page === 'Collections'
                            ? styles.photoCollections
                            : styles.photo
                }
                data-bs-toggle="modal"
                data-bs-target={'#Modal' + data.id}
            >
                <Image
                    src={`https://photography-website.s3.eu-west-2.amazonaws.com/images/${data.url}`}
                    alt={data.title}
                    width="1386"
                    height="919"
                    sizes="100vw"
                    className={
                        page === 'Home'
                            ? styles.imageHome
                            : page === 'All'
                              ? styles.imageAll
                              : page === 'Collections'
                                ? styles.imageCollections
                                : styles.image
                    }
                />
                <h5 className={styles.thumbnailTitle}>{data.title}</h5>
            </div>

            <div
                className="modal fade"
                id={'Modal' + data.id}
                tabIndex="-1"
                aria-labelledby={'Modal' + data.title}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div
                        style={{ backgroundColor: '#f4f2de' }}
                        className="modal-content"
                    >
                        <div
                            style={{ paddingBottom: '0' }}
                            className="modal-header"
                        >
                            <p className={styles.imageTitle}>
                                {data.title}, {data.location}
                            </p>
                            <button
                                style={{
                                    right: '2%',
                                    top: '2%',
                                    position: 'absolute',
                                }}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div style={{ padding: '0 1%' }} className="modal-body">
                            <a href={`/images/${data.id}`}>
                                <Image
                                    src={`https://photography-website.s3.eu-west-2.amazonaws.com/images/${data.url}`}
                                    alt={data.title}
                                    width="1386"
                                    height="919"
                                    className={styles.image}
                                    sizes="100vw"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </a>
                        </div>
                        <div className="modal-footer">
                            <p className={styles.imageCamera}>
                                Camera: {data.camera}
                            </p>
                            {data.film != 'null' ? (
                                <p className={styles.imageFilm}>
                                    Film: {data.film}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
