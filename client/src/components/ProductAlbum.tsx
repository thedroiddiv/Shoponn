import { useState } from 'react'
import { Card } from 'react-bootstrap'



interface AlbumProps {
    photos: string[]
}

function ProductAlbum({ photos }: AlbumProps) {
    const [selectedIndex, setselectedIndex] = useState(0)
    return (
        <>
            <div className="row my-2">
                <img src={photos[selectedIndex]} alt={`img-${selectedIndex}`} />
            </div>
            <div className="row">
                {photos.map((photo, index) => (
                    <span key={index} className="col-3">
                        <Card.Img className="my-2" onClick={e => { setselectedIndex(index) }} style={{ width: '100%', height: 'auto' }} variant="top" src={photo} />
                    </span>
                ))}
            </div>
        </>
    )
}

export default ProductAlbum
