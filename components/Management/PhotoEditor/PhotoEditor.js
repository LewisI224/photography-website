import { useEffect, useState } from 'react'
import styles from './photo-editor.module.css'

export default function PhotoEditor({ id }) {
    const [photoData, setPhotoData] = useState([])
    const [cameraData, setCameraData] = useState([])
    const [filmData, setFilmData] = useState([])
    const [date, setDate] = useState([])

    function selectCamera(valueToSelect) {
        let element = document.getElementById('camera')
        element.value = valueToSelect
    }

    function selectFilm(valueToSelect) {
        let element = document.getElementById('film')
        element.value = valueToSelect
    }

    function waitForElm(selector) {
        return new Promise((resolve) => {
            if (document.getElementById(selector)) {
                return resolve(document.getElementById(selector))
            }

            const observer = new MutationObserver(() => {
                if (document.getElementById(selector)) {
                    resolve(document.getElementById(selector))
                    observer.disconnect()
                }
            })

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            })
        })
    }

    async function getPhotoData() {
        const req = await fetch(`/api/management/read/photo/${id}`)
        const newPhotoData = await req.json()
        setDate(new Date(newPhotoData.date).toISOString().substring(0, 10))
        setPhotoData(newPhotoData)
        console.log(newPhotoData)
    }

    async function getCameraData() {
        const req = await fetch(`/api/management/read/cameras`)
        setCameraData(await req.json())
    }

    async function getFilmData() {
        const req = await fetch(`/api/management/read/film`)
        setFilmData(await req.json())
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const isoDate = new Date(event.target.date.value)
        const isoInt = parseInt(event.target.iso.value)
        const boolFeatured =
            event.target.featured.checked === 'on' ? true : false
        var gpsLat = null
        var gpsLong = null
        if (
            typeof event.target.gps_lat != 'undefined' ||
            typeof event.target.gps_long != 'undefined'
        ) {
            gpsLat = parseFloat(event.target.gps_lat.value)
            gpsLong = parseFloat(event.target.gps_long.value)
        }
        const data = {
            url: event.target.url.value,
            title: event.target.title.value,
            subtitle: event.target.subtitle.value,
            description_long: event.target.description_long.value,
            description_short: event.target.description_short.value,
            alt_text: event.target.alt_text.value,
            camera: event.target.camera.value,
            film: event.target.film.value,
            date: isoDate,
            location: event.target.location.value,
            author: event.target.author.value,
            iso: isoInt,
            aperture: event.target.aperture.value,
            shutter_speed: event.target.shutter_speed.value,
            featured: boolFeatured,
            gps_lat: gpsLat,
            gps_long: gpsLong,
        }

        const endpoint = `/api/management/update/photo/${id}`

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(endpoint, options)
        await response.json()
        if (confirm('Photo edited successfully!')) {
            window.location.href = '/management'
        }
    }

    useEffect(() => {
        getPhotoData()
        getFilmData()
        getCameraData()
        waitForElm('camera').then(() => {
            selectCamera(photoData.camera)
        })
        waitForElm('film').then(() => {
            selectFilm(photoData.film)
        })
    }, [])

    return (
        <form onSubmit={handleSubmit} method="post" className={styles.form}>
            <label htmlFor="url">URL:</label>
            <input
                type="text"
                id="url"
                name="url"
                defaultValue={photoData.url}
                required
            />

            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                defaultValue={photoData.title}
                required
            />

            <label htmlFor="subtitle">Subtitle:</label>
            <input type="text" id="subtitle" name="subtitle" />

            <label htmlFor="description_long">Description - Long:</label>
            <input
                type="text"
                id="description_long"
                name="description_long"
                defaultValue={photoData.description_long}
            />

            <label htmlFor="description_short">Description - Short:</label>
            <input
                type="text"
                id="description_short"
                name="description_short"
                defaultValue={photoData.description_short}
            />

            <label htmlFor="alt_text">Alt Text:</label>
            <input
                type="text"
                id="alt_text"
                name="alt_text"
                defaultValue={photoData.alt_text}
                required
            />

            <label htmlFor="camera">Camera:</label>
            <select id="camera" name="camera" aria-label="Select camera">
                {cameraData.map((c) => (
                    <option key={c.model} value={c.brand + ' ' + c.model}>
                        {c.brand + ' ' + c.model}
                    </option>
                ))}
            </select>

            <label htmlFor="film">Film:</label>
            <select id="film" name="film" aria-label="Select film">
                {filmData.map((f) => (
                    <option key={f.name} value={f.name}>
                        {f.brand} {f.name}
                    </option>
                ))}
            </select>

            <label htmlFor="date">Date:</label>
            <input
                type="date"
                id="date"
                name="date"
                aria-describedby="dateHelp"
                defaultValue={date}
                required
            />

            <label htmlFor="location">Location:</label>
            <input
                type="text"
                id="location"
                name="location"
                defaultValue={photoData.location}
            />

            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                name="author"
                defaultValue={photoData.author}
            />

            <label htmlFor="iso">ISO:</label>
            <input
                type="number"
                id="iso"
                name="iso"
                defaultValue={photoData.iso}
            />

            <label htmlFor="shutter_speed">Shutter Speed:</label>
            <input
                type="text"
                id="shutter_speed"
                name="shutter_speed"
                defaultValue={photoData.shutter_speed}
            />

            <label htmlFor="aperture">Aperture:</label>
            <input
                type="text"
                id="aperture"
                name="aperture"
                defaultValue={photoData.aperture}
            />

            <div>
                <label htmlFor="featured">Featured</label>
                <input
                    type="checkbox"
                    role="switch"
                    id="featured"
                    name="featured"
                    defaultChecked={photoData.featured}
                />
            </div>

            <label htmlFor="gps_lat">GPS Latitude:</label>
            <input
                type="number"
                step={0.00001}
                id="gps_lat"
                name="gps_lat"
                defaultValue={photoData.gps_lat}
            />

            <label htmlFor="gps_long">GPS Longitude:</label>
            <input
                type="number"
                step={0.00001}
                id="gps_long"
                name="gps_long"
                defaultValue={photoData.gps_long}
            />

            <button type="submit">Submit</button>
        </form>
    )
}
