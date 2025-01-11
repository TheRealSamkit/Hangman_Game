export { streakAnimation, spawnBloodSplatter, shakeContainer, con_animation, key_animation, hang_animation, pop_up_animation, bounce_effect, wrong_effect };
const streak = document.querySelector('.streak-container');
const con_animation = () => {
    anime({
        targets: '.container',
        translateX: [-500, 0], // Move the container from left to right
        opacity: [0, 1],       // Fade in
        duration: 1500,
        easing: 'easeOutExpo'
    });
}

const key_animation = () => {
    anime({
        targets: '.letter',
        scale: [0, 1],  // Start from scale 0, expand to 1
        opacity: [0, 1],  // Fade in from 0 to 1
        duration: 500,
        easing: 'easeOutExpo',
        delay: anime.stagger(20)  // Delay the start of each letter animation
    });
}

const hang_animation = () => {
    anime({
        targets: '.hang',
        scaleY: [0.8, 1], // scales from 0 to 1 in Y direction
        opacity: [0, 1],
        easing: 'easeOutBounce',
        duration: 1000
    });

}

const pop_up_animation = () => {
    anime({
        targets: '.popup-content',
        scale: [0.8, 1],  // Zoom in
        opacity: [0, 1],  // Fade in
        translateY: [250, 0],  // Move from left to right
        duration: 1000,
        easing: 'easeOutExpo'
    });
}

const bounce_effect = () => {
    anime({
        targets: '.playAgain',
        scale: [0.3, 1], // Starts small, grows to normal size
        opacity: [0, 1], // Starts invisible, becomes visible
        duration: 1000, // Animation duration
        easing: 'easeOutBounce', // Bounce easing
        delay: 200, // Delay before starting the animation
    });
}

const wrong_effect = () => {
    anime({
        targets: '.wrong',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo',
        duration: 1000,
        delay: anime.stagger(100),
    })
}

function shakeContainer() {
    anime({
        targets: '.container',  // Replace with your container's selector
        translateX: [
            { value: -10, duration: 100 },
            { value: 10, duration: 100 },
            { value: -7, duration: 100 },
            { value: 7, duration: 100 },
            { value: 0, duration: 100 }
        ],
        easing: 'easeInOutQuad'
    });
}

function spawnBloodSplatter() {
    const container = document.querySelector('.container');
    const splatter = document.createElement('div');
    splatter.classList.add('blood-splatter');

    // Random position inside the container
    const containerRect = container.getBoundingClientRect();
    const randomX = Math.random() * (containerRect.width - 20);  // Subtract splatter size
    const randomY = Math.random() * (containerRect.height - 20);

    splatter.style.left = `${randomX}px`;
    splatter.style.top = `${randomY}px`;

    const randomSize = Math.random() * 100 + 50;
    splatter.style.width = `${randomSize}px`;
    splatter.style.height = `${randomSize}px`;

    container.appendChild(splatter);

    // Animate the splatter
    anime({
        targets: splatter,
        scale: [0, 1.5],
        opacity: [0, 0.5],
        rotate: Math.random() * 360,
        easing: 'easeOutBounce',
        duration: 800,
        complete: function () {
            // Optional: Fade out after a while
            anime({
                targets: splatter,
                opacity: [.6, 0],
                duration: 1500,
                easing: 'easeInExpo',
                delay: 4000 // Stay visible before fading
            });
        }
    });
}

function streakAnimation() {
    streak.classList.remove("hide");
    anime({
        targets: '.streak-container',
        translateX: [300, -300],
        duration: 4000,
        easing: 'easeOutExpo',
        complete: function () {
            streak.classList.add("hide");
        }
    });
}