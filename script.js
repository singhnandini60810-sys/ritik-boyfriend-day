/* =========================================================
   NANDU × RITIK
   LOVE SCRAPBOOK
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const openGift = document.getElementById("openGift");

const musicButton =
    document.getElementById("musicButton");

const musicPlayer =
    document.getElementById("musicPlayer");

const heartButton =
    document.getElementById("heartButton");

const finalMessage =
    document.getElementById("finalMessage");

const floatingHearts =
    document.getElementById("floating-hearts");


/* =========================================================
   SONGS
========================================================= */

const songs = {

    opening:
        "assets/songs/opening.mp3",

    story:
        "assets/songs/story.mp3",

    memories:
        "assets/songs/memories.mp3",

    firstKiss:
        "assets/songs/first-kiss.mp3",

    final:
        "assets/songs/final.mp3"

};


let currentSong = "";
let musicPlaying = false;


/* =========================================================
   PLAY SONG
========================================================= */

function playSong(name) {

    if (!songs[name]) return;

    if (currentSong === name &&
        musicPlaying) {
        return;
    }

    currentSong = name;

    musicPlayer.src = songs[name];

    musicPlayer.volume = 0.45;

    musicPlayer.play()
        .then(() => {

            musicPlaying = true;

            musicButton.innerHTML =
                "♫ <span>Playing</span>";

        })
        .catch(() => {

            musicPlaying = false;

            musicButton.innerHTML =
                "♫ <span>Music</span>";

        });
}


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    () => {

        if (!musicPlayer.src) {

            playSong("opening");

            return;
        }


        if (musicPlaying) {

            musicPlayer.pause();

            musicPlaying = false;

            musicButton.innerHTML =
                "♫ <span>Music</span>";

        } else {

            musicPlayer.play()
                .then(() => {

                    musicPlaying = true;

                    musicButton.innerHTML =
                        "♫ <span>Playing</span>";

                });

        }

    }
);


/* =========================================================
   OPEN SCRAPBOOK
========================================================= */

openGift.addEventListener(
    "click",
    () => {

        playSong("opening");

        createHeartExplosion(20);

        const story =
            document.querySelector(".story");

        if (story) {

            story.scrollIntoView({
                behavior: "smooth"
            });

        }

    }
);


/* =========================================================
   SECTION MUSIC
========================================================= */

const sections =
    document.querySelectorAll(".page");


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (!entry.isIntersecting)
                        return;


                    const section =
                        entry.target;


                    if (
                        section.classList.contains(
                            "story"
                        )
                    ) {

                        changeSong("story");

                    }


                    if (
                        section.classList.contains(
                            "memories"
                        )
                    ) {

                        changeSong("memories");

                    }


                    if (
                        section.classList.contains(
                            "kiss"
                        )
                    ) {

                        changeSong("firstKiss");

                    }


                    if (
                        section.classList.contains(
                            "final"
                        )
                    ) {

                        changeSong("final");

                    }

                }
            );

        },

        {
            threshold: 0.55
        }

    );


sections.forEach(
    section =>
        sectionObserver.observe(section)
);


/* =========================================================
   CHANGE SONG
========================================================= */

function changeSong(name) {

    if (!musicPlaying)
        return;

    if (currentSong === name)
        return;

    playSong(name);
}


/* =========================================================
   WHEN SONG ENDS
========================================================= */

musicPlayer.addEventListener(
    "ended",
    () => {

        /*
           Start the same song again.

           If you want songs to stop instead,
           delete this section.
        */

        if (currentSong) {

            musicPlayer.currentTime = 0;

            musicPlayer.play();

        }

    }
);


/* =========================================================
   FLOATING HEART
========================================================= */

function createFloatingHeart() {

    const heart =
        document.createElement("span");


    const symbols = [
        "♡",
        "♥",
        "❤",
        "✦",
        "✿"
    ];


    heart.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.bottom =
        "-30px";


    heart.style.fontSize =
        14 + Math.random() * 25 + "px";


    heart.style.animationDuration =
        5 + Math.random() * 5 + "s";


    floatingHearts.appendChild(heart);


    setTimeout(
        () => heart.remove(),
        11000
    );

}


/* =========================================================
   CONTINUOUS HEARTS
========================================================= */

setInterval(
    createFloatingHeart,
    1800
);


/* =========================================================
   HEART EXPLOSION
========================================================= */

function createHeartExplosion(
    amount = 25
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(
            () => {

                const heart =
                    document.createElement("span");


                heart.textContent =
                    Math.random() > .5
                        ? "♥"
                        : "♡";


                heart.style.position =
                    "fixed";


                heart.style.left =
                    "50%";


                heart.style.top =
                    "50%";


                heart.style.zIndex =
                    "5000";


                heart.style.pointerEvents =
                    "none";


                heart.style.color =
                    Math.random() > .5
                        ? "#f2a3b5"
                        : "#ffffff";


                heart.style.fontSize =
                    15 + Math.random() * 35 + "px";


                const x =
                    (Math.random() - .5) *
                    600;


                const y =
                    (Math.random() - .5) *
                    600;


                heart.animate(

                    [

                        {
                            transform:
                                "translate(-50%,-50%) scale(.2)",
                            opacity: 0
                        },

                        {
                            transform:
                                "translate(-50%,-50%) scale(1)",
                            opacity: 1
                        },

                        {
                            transform:
                                `translate(
                                    calc(-50% + ${x}px),
                                    calc(-50% + ${y}px)
                                )
                                scale(.5)`,
                            opacity: 0
                        }

                    ],

                    {

                        duration:
                            900 +
                            Math.random() *
                            700,

                        easing:
                            "cubic-bezier(.2,.8,.3,1)"

                    }

                );


                document.body.appendChild(
                    heart
                );


                setTimeout(
                    () => heart.remove(),
                    1800
                );

            },
            i * 30
        );

    }

}


/* =========================================================
   FINAL HEART
========================================================= */

heartButton.addEventListener(
    "click",
    () => {

        finalMessage.classList.add(
            "show"
        );


        heartButton.innerHTML =
            "♥";


        createHeartExplosion(45);


        heartButton.animate(

            [

                {
                    transform:
                        "scale(1)"
                },

                {
                    transform:
                        "scale(1.3)"
                },

                {
                    transform:
                        "scale(1)"
                }

            ],

            {
                duration: 600
            }

        );

    }
);


/* =========================================================
   POLAROID CLICK
========================================================= */

document
    .querySelectorAll(
        ".photo-card, .polaroid"
    )
    .forEach(
        photo => {

            photo.addEventListener(
                "click",
                () => {

                    photo.style.zIndex = "50";

                    photo.animate(

                        [

                            {
                                transform:
                                    "scale(1)"
                            },

                            {
                                transform:
                                    "scale(1.06)"
                            },

                            {
                                transform:
                                    "scale(1)"
                            }

                        ],

                        {
                            duration: 400
                        }

                    );

                }
            );

        }
    );


/* =========================================================
   SECRET "HONEY" EASTER EGG
========================================================= */

let secretText = "";


document.addEventListener(
    "keydown",
    event => {

        secretText +=
            event.key.toLowerCase();


        if (
            secretText.includes("honey")
        ) {

            createHeartExplosion(50);

            secretText = "";

        }


        if (
            secretText.length > 20
        ) {

            secretText =
                secretText.slice(-10);

        }

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);