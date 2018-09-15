import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

const mobileMenu = new MobileMenu();
const revealOnScrollFeatures = new RevealOnScroll($('.feature-item'), '85%');
const revealOnScrollTestimonials = new RevealOnScroll($('.testimonial'), '60%');