/* ==========================================
   COOLER®
   INTERACTIVE ENGINE
========================================== */


/* ==========================================
   LOADER
========================================== */

let progress = 0;

const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loaderProgress");

const loading = setInterval(() => {

    progress += Math.random() * 12;

    if (progress >= 100) {

        progress = 100;

        clearInterval(loading);

        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 700);

        }, 300);
    }

    loaderProgress.style.width = progress + "%";

}, 100);


/* ==========================================
   CURSOR
========================================== */

const cursor = document.getElementById("cursor");
const cursorText = document.getElementById("cursorText");

document.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    document.getElementById("coordinates").textContent =
        `X: ${String(e.clientX).padStart(3, "0")} Y: ${String(e.clientY).padStart(3, "0")}`;

});


document.querySelectorAll("button, .draggable").forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursor.style.width = "28px";
        cursor.style.height = "28px";

        cursorText.style.left = event.clientX + "px";
        cursorText.style.top = event.clientY + "px";

        cursorText.style.opacity = "1";

    });

    element.addEventListener("mouseleave", () => {

        cursor.style.width = "12px";
        cursor.style.height = "12px";

        cursorText.style.opacity = "0";

    });

});


/* ==========================================
   CLOCK
========================================== */

function updateClock() {

    const now = new Date();

    const time =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent = time;

}

setInterval(updateClock, 1000);

updateClock();


/* ==========================================
   DRAGGING SYSTEM
========================================== */

let highestZ = 100;

document.querySelectorAll(".draggable").forEach(element => {

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener("pointerdown", e => {

        dragging = true;

        highestZ++;

        element.style.zIndex = highestZ;

        const rect = element.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        element.setPointerCapture(e.pointerId);

    });

    element.addEventListener("pointermove", e => {

        if (!dragging) return;

        const canvasRect =
            document.getElementById("canvas").getBoundingClientRect();

        element.style.left =
            (e.clientX - canvasRect.left - offsetX) + "px";

        element.style.top =
            (e.clientY - canvasRect.top - offsetY) + "px";

    });

    element.addEventListener("pointerup", () => {

        dragging = false;

    });

});


/* ==========================================
   DISCOVERY SYSTEM
========================================== */

let discoveries =
    Number(localStorage.getItem("coolerDiscoveries")) || 0;

const discoveredItems =
    JSON.parse(localStorage.getItem("coolerItems") || "[]");


function discover(id) {

    if (discoveredItems.includes(id)) return;

    discoveredItems.push(id);

    discoveries++;

    localStorage.setItem(
        "coolerDiscoveries",
        discoveries
    );

    localStorage.setItem(
        "coolerItems",
        JSON.stringify(discoveredItems)
    );

    updateDiscoveries();

    toast(
        `DISCOVERY ${discoveries}/37`
    );

}


function updateDiscoveries() {

    document.getElementById("discoveryCount")
        .textContent = discoveries;

    document.getElementById("discoveryProgress")
        .style.width =
        Math.min((discoveries / 37) * 100, 100) + "%";

}

updateDiscoveries();


document.querySelectorAll("[data-discovery]")
    .forEach(element => {

        element.addEventListener("click", () => {

            discover(
                element.dataset.discovery
            );

        });

    });


/* ==========================================
   TOAST
========================================== */

let toastTimeout;

function toast(message) {

    const toastElement =
        document.getElementById("toast");

    document.getElementById("toastText")
        .textContent = message;

    toastElement.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toastElement.classList.remove("show");

    }, 2200);

}


/* ==========================================
   RANDOM EVENTS
========================================== */

const randomEvents = [

    "nothing serious.",
    "why are you clicking everything?",
    "you found absolutely nothing.",
    "cool.",
    "keep going.",
    "404: personality not found.",
    "this wasn't planned.",
    "look somewhere else.",
    "you're still here?",
    "nice.",
    "COOLER RADIO ONLINE.",
    "something changed.",
    "don't tell anyone.",
    "okay that was weird.",
    "try again."

];


document.getElementById("randomBtn")
    .addEventListener("click", randomEvent);

document.getElementById("doSomething")
    .addEventListener("click", randomEvent);


function randomEvent() {

    const event =
        randomEvents[
            Math.floor(
                Math.random() * randomEvents.length
            )
        ];

    document.getElementById("floatingText")
        .textContent = event;

    toast(event);

    const canvas =
        document.getElementById("canvas");

    canvas.classList.add("glitching");

    setTimeout(() => {

        canvas.classList.remove("glitching");

    }, 500);

    discover("random-" + event);

}


/* ==========================================
   LOGO SECRET
========================================== */

let logoClicks = 0;

document.getElementById("logo")
    .addEventListener("click", () => {

        logoClicks++;

        if (logoClicks === 3) {

            toast("you clicked the logo three times.");

        }

        if (logoClicks === 5) {

            toast("okay. stop.");

        }

        if (logoClicks >= 7) {

            discover("logo-secret");

            openOverlay(`
                <div class="overlay-title">
                    COOLER<br>
                    <i>CORE</i>
                </div>

                <div style="
                    margin-top:60px;
                    max-width:500px;
                    font-size:13px;
                    line-height:1.8;
                ">
                    YOU FOUND THE BACK DOOR.
                    <br><br>
                    THERE WAS NEVER SUPPOSED TO BE ONE.
                </div>
            `);

            logoClicks = 0;

        }

    });


/* ==========================================
   MUSIC PLAYER
========================================== */

let playing = false;
let track = 7;

const tracks = [

    {
        title: "NOBODY'S BUSINESS",
        artist: "COOLER RADIO"
    },

    {
        title: "AFTER HOURS",
        artist: "COOLER RADIO"
    },

    {
        title: "SIDE B",
        artist: "COOLER RADIO"
    },

    {
        title: "NO SIGNAL",
        artist: "COOLER RADIO"
    },

    {
        title: "OUTSIDE",
        artist: "COOLER RADIO"
    },

    {
        title: "LOWKEY",
        artist: "COOLER RADIO"
    }

];


const musicPlayer =
    document.querySelector(".music-player");

const playButton =
    document.getElementById("playBtn");


playButton.addEventListener("click", () => {

    playing = !playing;

    if (playing) {

        musicPlayer.classList.add("playing");

        playButton.textContent = "❚❚";

        toast("RADIO PLAYING");

    } else {

        musicPlayer.classList.remove("playing");

        playButton.textContent = "▶";

        toast("RADIO PAUSED");

    }

});


document.getElementById("nextBtn")
    .addEventListener("click", () => {

        track++;

        if (track > 12) track = 1;

        const selected =
            tracks[Math.floor(Math.random() * tracks.length)];

        document.getElementById("songTitle")
            .textContent = selected.title;

        document.getElementById("songArtist")
            .textContent = selected.artist;

        document.getElementById("trackNumber")
            .textContent =
            String(track).padStart(2, "0");

        toast("NEXT TRACK");

        discover("track-" + track);

    });


document.getElementById("prevBtn")
    .addEventListener("click", () => {

        track--;

        if (track < 1) track = 12;

        document.getElementById("trackNumber")
            .textContent =
            String(track).padStart(2, "0");

        toast("PREVIOUS TRACK");

    });


/* ==========================================
   VOLUME
========================================== */

document.getElementById("volume")
    .addEventListener("input", e => {

        const value = e.target.value;

        document.querySelector(".music-player")
            .style.opacity =
            .35 + (value / 100) * .65;

    });


/* ==========================================
   CHAOS
========================================== */

document.getElementById("chaos")
    .addEventListener("input", e => {

        const amount =
            Number(e.target.value);

        document.querySelectorAll(".sticker")
            .forEach((sticker, index) => {

                const x =
                    Math.sin(Date.now() / 500 + index) *
                    amount / 5;

                const y =
                    Math.cos(Date.now() / 400 + index) *
                    amount / 5;

                sticker.style.transform =
                    `translate(${x}px,${y}px)`;

            });

    });


/* ==========================================
   GLITCH
========================================== */

document.getElementById("glitch")
    .addEventListener("input", e => {

        const amount =
            Number(e.target.value);

        document.getElementById("canvas")
            .style.transform =
            `skew(${amount / 20}deg)`;

    });


/* ==========================================
   SPEED
========================================== */

document.getElementById("speed")
    .addEventListener("input", e => {

        const amount =
            Number(e.target.value);

        document.documentElement.style
            .setProperty(
                "--animation-speed",
                `${Math.max(0.1, 2 - amount / 50)}s`
            );

    });


/* ==========================================
   INVERT WORLD
========================================== */

document.getElementById("invertBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle("inverted");

        toast(
            document.body.classList.contains("inverted")
                ? "WORLD INVERTED"
                : "WORLD RESTORED"
        );

    });


/* ==========================================
   CAMERA
========================================== */

document.getElementById("snapBtn")
    .addEventListener("click", () => {

        const flash =
            document.createElement("div");

        flash.style.position = "fixed";
        flash.style.inset = "0";
        flash.style.background = "white";
        flash.style.zIndex = "9998";
        flash.style.pointerEvents = "none";

        document.body.appendChild(flash);

        setTimeout(() => {

            flash.remove();

        }, 150);

        toast("PHOTO SAVED TO COOLER CAM");

        discover("camera-photo");

    });


/* ==========================================
   NAVIGATION
========================================== */

document.querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener("click", () => {

            const page =
                button.dataset.page;

            openPage(page);

        });

    });


function openPage(page) {

    discover("page-" + page);

    let content = "";

    if (page === "music") {

        content = `
            <div class="overlay-title">
                MUSIC
            </div>

            <div class="game">
                <small>COOLER RADIO</small>
                <h2 style="margin-top:15px;">
                    WHAT'S PLAYING?
                </h2>

                <p style="
                    margin-top:15px;
                    line-height:1.6;
                    color:#aaa;
                ">
                    A fictional radio archive for COOLER.
                    Plug in your own royalty-free tracks
                    later by adding audio files to the project.
                </p>
            </div>
        `;

    }


    if (page === "archive") {

        content = `
            <div class="overlay-title">
                ARCHIVE
            </div>

            <div class="overlay-grid">

                <div class="archive-item">
                    IMG_001
                </div>

                <div class="archive-item">
                    IMG_002
                </div>

                <div class="archive-item">
                    IMG_003
                </div>

                <div class="archive-item">
                    VIDEO_04
                </div>

                <div class="archive-item">
                    FILE_17
                </div>

                <div class="archive-item">
                    ???
                </div>

            </div>
        `;

    }


    if (page === "fashion") {

        content = `
            <div class="overlay-title">
                FASHION
            </div>

            <div class="game">

                <small>COOLER CLOSET</small>

                <h2 style="margin-top:15px;">
                    BUILD A FIT
                </h2>

                <p style="
                    margin-top:15px;
                    line-height:1.7;
                ">
                    Drag the cards around.
                    Mix pieces.
                    Make something stupid.
                    Make something cool.
                </p>

                <button onclick="toast('NEW ITEM UNLOCKED')">
                    RANDOM ITEM
                </button>

            </div>
        `;

    }


    if (page === "games") {

        content = `
            <div class="overlay-title">
                GAMES
            </div>

            <div class="game">

                <small>GAME 01</small>

                <h2 style="margin-top:10px;">
                    CLICK THE BUTTON
                </h2>

                <p id="gameScore">
                    SCORE: 0
                </p>

                <button id="gameButton">
                    CLICK
                </button>

            </div>
        `;

    }


    if (page === "secret") {

        content = `
            <div class="overlay-title">
                YOU
                <br>
                FOUND IT.
            </div>

            <div style="
                margin-top:70px;
                font-size:12px;
                line-height:2;
                max-width:500px;
            ">
                this page doesn't really do anything.

                <br><br>

                or maybe it does.

                <br><br>

                try clicking the number 17.
            </div>
        `;

    }


    openOverlay(content);


    if (page === "games") {

        let score = 0;

        setTimeout(() => {

            const button =
                document.getElementById("gameButton");

            if (!button) return;

            button.addEventListener("click", () => {

                score++;

                document.getElementById("gameScore")
                    .textContent =
                    "SCORE: " + score;

                if (score === 10) {

                    toast("OKAY YOU'RE GOOD");

                    discover("game-master");

                }

            });

        }, 50);

    }

}


/* ==========================================
   OVERLAY
========================================== */

function openOverlay(content) {

    document.getElementById("overlayContent")
        .innerHTML = content;

    document.getElementById("overlay")
        .classList.add("active");

}


document.getElementById("closeOverlay")
    .addEventListener("click", () => {

        document.getElementById("overlay")
            .classList.remove("active");

    });


document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        document.getElementById("overlay")
            .classList.remove("active");

    }

});


/* ==========================================
   SECRET NUMBER 17
========================================== */

let numberClicks = 0;

document.getElementById("secretNumber")
    .addEventListener("click", () => {

        numberClicks++;

        if (numberClicks === 1) {

            toast("17?");

        }

        if (numberClicks === 3) {

            toast("why do you keep clicking it");

        }

        if (numberClicks === 7) {

            discover("17-secret");

            openOverlay(`
                <div class="overlay-title">
                    17
                </div>

                <div style="
                    margin-top:50px;
                    font-size:12px;
                    line-height:2;
                ">
                    YOU FOUND THE NUMBER.
                    <br><br>
                    THERE'S NO EXPLANATION.
                    <br><br>
                    KEEP EXPLORING.
                </div>
            `);

            numberClicks = 0;

        }

    });


/* ==========================================
   KONAMI-STYLE SECRET
========================================== */

let secretCode = "";

document.addEventListener("keydown", e => {

    secretCode += e.key.toLowerCase();

    if (secretCode.length > 20) {

        secretCode =
            secretCode.slice(-20);

    }

    if (secretCode.includes("cooler")) {

        discover("keyboard-secret");

        toast("KEYBOARD SECRET FOUND");

        document.body.classList.add("glitching");

        setTimeout(() => {

            document.body.classList.remove("glitching");

        }, 1000);

        secretCode = "";

    }

});


/* ==========================================
   RANDOM FLOATING MOVEMENT
========================================== */

let movementTime = 0;

function animateFloating() {

    movementTime += 0.01;

    document.querySelectorAll(".sticker")
        .forEach((sticker, index) => {

            if (
                document.activeElement === sticker
            ) return;

            const amount = 3 + index;

            sticker.style.marginTop =
                Math.sin(
                    movementTime * (1 + index * .2)
                ) * amount + "px";

        });

    requestAnimationFrame(animateFloating);

}

animateFloating();


/* ==========================================
   DOUBLE CLICK EVERYTHING
========================================== */

document.addEventListener("dblclick", e => {

    if (
        e.target.closest("button") ||
        e.target.closest("input")
    ) return;

    const element = e.target.closest(".draggable");

    if (!element) return;

    element.style.transform +=
        " rotate(360deg)";

    toast("SPINNING");

});


/* ==========================================
   RIGHT CLICK SECRET
========================================== */

document.addEventListener("contextmenu", e => {

    e.preventDefault();

    toast("nice try.");

    discover("right-click");

});


/* ==========================================
   EASTER EGG AFTER IDLE
========================================== */

let idleTimer;

function resetIdle() {

    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {

        toast("bro are you still there?");

    }, 30000);

}

["mousemove", "click", "keydown", "touchstart"]
    .forEach(event => {

        document.addEventListener(
            event,
            resetIdle
        );

    });

resetIdle();


/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(`
%cCOOLER®

you weren't supposed to open this.

there might be something hidden here.
`,
"font-size:30px;font-weight:900;");


/* ==========================================
   END
========================================== */
