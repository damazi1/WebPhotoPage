import '../Styles/Home.css'
import useSectionScroll from '../Scripts/Wheel';
import {useState, useEffect} from 'react'
function Home(){
    useSectionScroll(['home-main', 'home-main2', 'home-main3', 'home-main4'], 5, 1000);
    const mottos=[
        "weeknight dinner idea",
        "home decor idea",
        "new look outfit",
        "green thumb idea",
    ];
    const colors=[
        "gold",
        "turquoise",
        "blue",
        "green"
    ];
    const [motto,setMotto] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMotto(prev => (prev === mottos.length - 1 ? 0 : prev + 1));
    }, 1500); 

    return () => clearInterval(interval); 
  }, []); 


    return (
        <div>
            <div className='home-main'>
                <h1 style={{fontSize:"75px"}}>Get your next</h1>
                <p style={{color:`${colors[motto]}`,fontSize:"75px"}}className='motto-style'>{mottos[motto]}</p>
                <div className='Kropki'>
                    <div onClick={()=>setMotto(0)}style={motto==0 ? {backgroundColor:`${colors[motto]}`}:{}}></div>
                    <div onClick={()=>setMotto(1)}style={motto==1 ? {backgroundColor:`${colors[motto]}`}:{}}></div>
                    <div onClick={()=>setMotto(2)}style={motto==2 ? {backgroundColor:`${colors[motto]}`}:{}}></div>
                    <div onClick={()=>setMotto(3)}style={motto==3 ? {backgroundColor:`${colors[motto]}`}:{}}></div>
                </div>
            </div>
            <div className='home-main2'>
Tu maja byc zdjecia
            </div>
            <div className='home-main3'>
Tu maja byc zdjecia
            </div>
            <div className='home-main4'>
Tu maja byc zdjecia
            </div>
        </div>
    )
}

export default Home