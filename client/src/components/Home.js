import { React, useState, useEffect }from "react"
import TrailCard from "./TrailCard"
import '../styling/Home.css'
import { Card } from "semantic-ui-react"

function Home(){
    const [trails, setTrails] = useState([])
    const [search, setSearch] = useState(''); // State for search query

useEffect(() => {
    fetch('https://mytrails-backend.onrender.com/trails')
    .then(r => r.json())
    .then(data => setTrails(data))
},[])

useEffect(() => {
    document.title="My Trails | Home"
}, [])

const filteredTrails = trails.filter(trail =>
    trail.name.toLowerCase().includes(search.toLowerCase())
    ).map(filteredTrail => (
    <TrailCard
        key={filteredTrail.id}
        name={filteredTrail.name}
        location={filteredTrail.location}
        park={filteredTrail.park}
        image={filteredTrail.image}
    />
));

    return(
        <div className="trail-list">
            <h1 className="trail-list-header">Trails</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    icon="search"
                    placeholder="Search trails . . ."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <Card.Group itemsPerRow={3}>
                {filteredTrails}
            </Card.Group>
        </div>
    )
}

export default Home