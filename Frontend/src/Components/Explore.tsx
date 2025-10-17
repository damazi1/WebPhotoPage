import '../Styles/Explore.css'
function Explore(){
    return(
        <div className="explore-main">
            <input className="search-bar" type="search" placeholder="Search for easy dinners, fashion, etc."/>
            
            <div className='explore-main-tekst'>
                <h1>Explore the best of Pinterest</h1>
            </div>

            <div className='explore-images1'>
                    Mapowanie tu ma byc
            </div>

            <button className='explore-see-more'>See more</button>

            <div className='explore-main-tekst'>
                <h1>Browse by category</h1>
            </div>

            <div className='explore-images1'>
                    Tu tez jakies mapowanie
            </div>

            <button className='explore-see-more'>See more</button>

            <div className='explore-main-tekst'>
                <h1>What's new on Pinterest</h1>
            </div>

            <div className='explore-images1'>
                    Tu zdjecia maja miec stala szerokosc ale rozna wysokosc nwm o co chodzi
            </div>

        </div>
    );
}

export default Explore