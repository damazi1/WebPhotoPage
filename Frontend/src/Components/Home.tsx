import "../Styles/Home.css";
import useSectionScroll from "../Scripts/Wheel";
import { useEffect, useMemo, useRef, useState } from "react";
import { useScrollReveal } from "../Scripts/ScrollReveal";

type HeroTheme = {
    phrase: string;
    color: string;
    images: string[];
};

const HERO_THEMES: HeroTheme[] = [
    {
        phrase: "oryginalne wzory tatuaży",
        color: "gold",
        images: [
            "main/yellow/1.jpeg",
            "main/yellow/2.jpeg",
            "main/yellow/3.jpeg",
            "main/yellow/4.jpeg",
            "main/yellow/5.jpeg",
            "main/yellow/6.jpeg",
            "main/yellow/7.jpeg",
            "main/yellow/8.jpeg",
        ],
    },
    {
        phrase: "wyjątkowe wnętrza",
        color: "turquoise",
        images: [
            "main/cyan/1.jpeg",
            "main/cyan/2.jpeg",
            "main/cyan/3.jpeg",
            "main/cyan/4.jpeg",
            "main/cyan/5.jpeg",
            "main/cyan/6.jpeg",
            "main/cyan/7.jpeg",
            "main/cyan/8.jpeg",
        ],
    },
    {
        phrase: "inspiracje ze świata sztuki",
        color: "blue",
        images: [
            "main/blue/1.jpeg",
            "main/blue/2.jpeg",
            "main/blue/3.jpeg",
            "main/blue/4.jpeg",
            "main/blue/5.jpeg",
            "main/blue/6.jpeg",
            "main/blue/7.jpeg",
            "main/blue/8.jpeg",
        ],
    },
    {
        phrase: "przepisy na jedzenie",
        color: "green",
        images: [
            "main/green/1.jpeg",
            "main/green/2.jpeg",
            "main/green/3.jpeg",
            "main/green/4.jpeg",
            "main/green/5.jpeg",
            "main/green/6.jpeg",
            "main/green/7.jpeg",
            "main/green/8.jpeg",
        ],
    },
];

const ROTATE_DELAY_MS = 6000;
const FADE_START_MS = 5500; // <-- zaczynamy fade-out sekundę przed rotacją
const FADE_DURATION_MS = ROTATE_DELAY_MS - FADE_START_MS; // = 1000 ms
function Home() {
    useScrollReveal();
    const sectionClasses = useMemo(
        () => ["home-main", "home-main2", "home-main3", "home-main4", "home-main5"],
        []
    );
    const currentSection = useSectionScroll(sectionClasses, ".navbar-app", 1000);

    const [activeIdx, setActiveIdx] = useState(0);
    const [headlineVisible, setHeadlineVisible] = useState(true);

    const rotateTimeoutRef = useRef<number | null>(null);
    const fadeTimeoutRef = useRef<number | null>(null);

    const clearTimers = () => {
        if (rotateTimeoutRef.current !== null) {
            window.clearTimeout(rotateTimeoutRef.current);
            rotateTimeoutRef.current = null;
        }
        if (fadeTimeoutRef.current !== null) {
            window.clearTimeout(fadeTimeoutRef.current);
            fadeTimeoutRef.current = null;
        }
    };
    const [preFade, setPreFade] = useState(false);
    useEffect(() => {
        if (currentSection !== 0) {
            clearTimers();
            setHeadlineVisible(true);
            return clearTimers;
        }

        clearTimers();

        // 1) w 5.5s: włącz klasę pre-fade (CSS wygasi aktualny set + motto)
        fadeTimeoutRef.current = window.setTimeout(() => {
            setPreFade(true);
            setHeadlineVisible(false); // jeśli chcesz też schować motto logicznie
        }, FADE_START_MS);

        // 2) w 6s: zmień motyw i wyłącz pre-fade (nowy set wejdzie normalnie)
        rotateTimeoutRef.current = window.setTimeout(() => {
            setActiveIdx((idx) => (idx + 1) % HERO_THEMES.length);
            setPreFade(false);
            setHeadlineVisible(true);
        }, ROTATE_DELAY_MS);

        return clearTimers;
    }, [activeIdx, currentSection]);

    const handleThemeChange = (index: number) => {
        if (index === activeIdx) return;

        clearTimers();
        setHeadlineVisible(false);

        fadeTimeoutRef.current = window.setTimeout(() => {
            setActiveIdx(index);
            setHeadlineVisible(true);
        }, FADE_DURATION_MS);
    };

    const activeTheme = HERO_THEMES[activeIdx];

    return (
        <div>
            <div className="home-main">
                <h1 className="headline">Odkrywaj pomysły na</h1>
                <p
                    className={`headline-motto ${headlineVisible ? "in" : "out"}`}
                    style={{ color: activeTheme.color }}
                >
                    {activeTheme.phrase}
                </p>

                <div className="Kropki">
                    {HERO_THEMES.map((theme, index) => {
                        const dotStyle =
                            index === activeIdx
                                ? { backgroundColor: theme.color, borderColor: theme.color }
                                : undefined;

                        return (
                            <div
                                key={theme.phrase}
                                onClick={() => handleThemeChange(index)}
                                className={index === activeIdx ? "active" : ""}
                                style={dotStyle}
                            />
                        );
                    })}
                </div>

                <div className="photo-circle">
                    {HERO_THEMES.map((theme, setIndex) => {
                        const isActive = setIndex === activeIdx;
                        return (
                            <div
                                key={theme.color}
                                className={`photo-set ${isActive ? "visible" : ""} ${preFade && isActive ? "pre-fade" : ""}`}
                            >
                                {theme.images.slice(0, 8).map((img, i) => (
                                    <Slot key={i} img={img} index={i} isVisible={isActive} />
                                ))}
                            </div>
                        );
                    })}
                </div>




            </div>

            <section className="home-main2">
                <p className="intro scroll-reveal">
                    Oto dlaczego warto z nami — inspiracje, społeczność i pomysły dopasowane do Ciebie.
                </p>

                <div className="entries">
                    <article className="checks">
                        <p className="scroll-reveal">
                            <img src="main/icons/check.png" alt="" /> Darmowe zapisywanie pomysłów
                        </p>
                        <p className="scroll-reveal">
                            <img src="main/icons/check.png" alt="" /> Rekomendacje dopasowane do Ciebie
                        </p>
                        <p className="scroll-reveal">
                            <img src="main/icons/check.png" alt="" /> Nowe inspiracje każdego dnia
                        </p>
                        <p className="scroll-reveal">
                            <img src="main/icons/check.png" alt="" /> Kreatywna społeczność twórców
                        </p>
                        <p className="scroll-reveal">
                            <img src="main/icons/check.png" alt="" /> Kolekcje i tablice tematyczne
                        </p>
                        <p className="scroll-reveal">
                            <img src="main/icons/check.png" alt="" /> Szybki podgląd i zapisywanie
                        </p>
                    </article>

                    <div className="image-side">
                        <img className="scroll-reveal" src="main/blue/1.jpeg" alt="Przykładowy widok" />
                    </div>
                </div>
            </section>


            <div className="home-main3">
                
            </div>

            <div className="home-main4">
                <img src="" alt="end" /> jakies zdjecie tu ma byc
                <h1>
                    Zarejestruj
                    <br />
                    się, aby
                    <br />
                    odkrywać
                    <br />
                    pomysły
                </h1>
            </div>
        </div>
    );
}

export default Home;
type SlotProps = {
    img: string;
    index: number;
    isVisible: boolean;
};

function Slot({ img, index, isVisible }: SlotProps) {
    const [hoverDisabled, setHoverDisabled] = useState(true);

    useEffect(() => {
        if (isVisible) {
            setHoverDisabled(true);
            const timer = setTimeout(() => setHoverDisabled(false), 800); // tyle co animacja riseUp
            return () => clearTimeout(timer);
        } else {
            setHoverDisabled(true);
        }
    }, [isVisible]);

    return (
        <div
            className={`slot img-${index} ${hoverDisabled ? "no-hover" : ""}`}
        >
            <div className="img-anim">
                <img src={img} alt={`photo-${index}`} className="circle-img" />
            </div>
        </div>
    );
}


