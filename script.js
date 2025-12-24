// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal animation on scroll
const revealItems = document.querySelectorAll('.reveal-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealItems.forEach(item => {
    revealObserver.observe(item);
});

// Mentors Carousel
const mentors = [
    {
        name: 'Markus Villig',
        role: 'Founder & CEO',
        company: 'Bolt',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/markusvillig',
    },
    {
        name: 'Qasar Younis',
        role: 'Co-founder & CEO',
        company: 'Applied Intuition',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/qasaryounis',
    },
    {
        name: 'Hélène Huby',
        role: 'Founder & CEO',
        company: 'The Exploration Company',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/helenehuby',
    },
    {
        name: 'Gabe Pereyra',
        role: 'Co-founder & President',
        company: 'Harvey',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/gabrielpereyra',
    },
    {
        name: 'Alex Liu',
        role: 'Founder',
        company: 'Lex',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/alexliu',
    },
    {
        name: 'Sarah Chen',
        role: 'VP of Engineering',
        company: 'OpenAI',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/sarahchen',
    },
    {
        name: 'David Park',
        role: 'CTO',
        company: 'Anthropic',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/davidpark',
    },
    {
        name: 'Maria Garcia',
        role: 'Head of AI',
        company: 'Google DeepMind',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        linkedin: 'https://www.linkedin.com/in/mariagarcia',
    },
];

// Duplicate mentors for seamless infinite scroll
const allMentors = [...mentors, ...mentors, ...mentors];

const mentorsCarousel = document.getElementById('mentorsCarousel');
let isPlaying = true;
let scrollAmount = 0;
let animationFrameId = null;
const scrollSpeed = 0.5;
// Card width varies by screen size - adjust dynamically (includes gap)
const getCardWidth = () => {
    return window.innerWidth < 768 ? 208 : 352; // 12rem card + 1rem gap on mobile, 20rem card + 2rem gap on desktop
};
let cardWidth = getCardWidth();

// Populate mentors carousel
allMentors.forEach((mentor, index) => {
    const mentorCard = document.createElement('a');
    mentorCard.href = mentor.linkedin;
    mentorCard.target = '_blank';
    mentorCard.rel = 'noopener noreferrer';
    mentorCard.className = 'mentor-card';
    mentorCard.innerHTML = `
        <div class="mentor-image-wrapper">
            <img src="${mentor.image}" alt="${mentor.name}" class="mentor-image">
        </div>
        <div>
            <h3 class="mentor-name">${mentor.name}</h3>
            <p class="mentor-role">${mentor.role}</p>
            <p class="mentor-company">(${mentor.company})</p>
        </div>
    `;
    mentorsCarousel.appendChild(mentorCard);
});

// Auto-scroll function
function scrollCarousel() {
    if (isPlaying && mentorsCarousel) {
        cardWidth = getCardWidth(); // Update card width on each frame
        scrollAmount += scrollSpeed;
        mentorsCarousel.scrollLeft = scrollAmount;

        // Reset to start when reaching one set of mentors (seamless loop)
        if (scrollAmount >= cardWidth * mentors.length) {
            scrollAmount = 0;
        }
    }
    animationFrameId = requestAnimationFrame(scrollCarousel);
}

// Start auto-scroll
scrollCarousel();

// Carousel controls
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pauseIcon = playPauseBtn.querySelector('.pause-icon');
const playIcon = playPauseBtn.querySelector('.play-icon');

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        pauseIcon.style.display = 'block';
        playIcon.style.display = 'none';
    } else {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
    }
});

prevBtn.addEventListener('click', () => {
    if (mentorsCarousel) {
        cardWidth = getCardWidth();
        scrollAmount = Math.max(0, scrollAmount - cardWidth * 2);
        mentorsCarousel.scrollLeft = scrollAmount;
    }
});

nextBtn.addEventListener('click', () => {
    if (mentorsCarousel) {
        cardWidth = getCardWidth();
        scrollAmount += cardWidth * 2;
        mentorsCarousel.scrollLeft = scrollAmount;
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});
