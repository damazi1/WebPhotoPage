import { Link } from "react-router-dom";
function Informacje(){
    return(
        <div>
            <div>
                <h1>Get inspired <br/> Then get started <br/>All on LOGO NAZWA NASZA</h1>

                <p>About NAZWA NASZA</p>
                <h2>Pinterest is a visual search and discovery platform<br/>where people find inspiration, curate ideas and shop<br/> products—all in a positive place online. Headquartered <br/>in San Francisco, Pinterest launched in 2010 and has<br/> over half a billion monthly active users worldwide.</h2>
                <button><Link to="/"> Strona główna </Link></button>
            </div>

            <div className="informacje-flex">
                <div>
                    <h2>578 milion</h2>
                    <p>monthly active users</p>
                </div>
                <div>
                    <h2>1.5 bilion</h2>
                    <p>Pins saved every week</p>
                </div>
                <div>
                    <h2>More than 50%</h2>
                    <p>of users think of NAZWA NASZA as a<br/>place to shop</p>
                </div>
            </div>
            <div>
                <h2>Latest news</h2>
                <div>
                    <img src=""/>
                    <h2>NASZA NAZWA rolls out new tools to give users<br/>more control over GenAI content</h2>
                </div>
                                <div>
                    <img src=""/>
                    <h2>NASZA NAZWA introduces Top of Search ads and<br/>new advertising tools to power visual<br/>shopping decisions</h2>
                </div>
                                <div>
                    <img src=""/>
                    <h2>Where-to-buy links turn inspiration into<br/>action for CPG brands on NASZA NAZWA</h2>
                </div>
            </div>
            <div>
                <div>
                    <h4>Impact</h4>
                    <h4>People</h4>
                    <h4>Product</h4>
                    <h4>Planet</h4>
                </div>
                <h1>A more inspired internet.<br/>A better world. It's Possible.</h1>
                <h5>We're building a more positive place online. A place that inspires the people<br/>we serve and protects the planet we share.</h5>
            </div>
            <div>
                <h1>Meet NASZA NAZWA leadership</h1>
                <h4>Get to know our executive team. </h4>
                TUTAJ MAJA BYC ZDJECIA W LEWO CO SIE KRECA W KOLKO
            </div>
        </div>
    )
}

export default Informacje