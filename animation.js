export { con_animation, key_animation, music_animation, hang_animation, pop_up_animation, body_animation, bounce_effect, wrong_effect };

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
        duration: 1000,
        easing: 'easeOutExpo'
    });
}

const body_animation = () => {
    anime({
        targets: 'body',
        backgroundColor: ['#1E1E1E', '#2C2C2C'],  // Subtle dark-to-dark color transition
        easing: 'linear',
        duration: 2000,  // Smooth color change over time
        loop: true,  // Continuous loop
    });

}

const music_animation = () => {
    anime({
        targets: '.music,.sound',
        rotate: '1turn',  // Rotate once
        duration: 2000,
        easing: 'linear',
        loop: true
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