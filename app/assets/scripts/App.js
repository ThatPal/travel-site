import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

const mobileMenu = new MobileMenu();
const revealOnScrollFeatures = new RevealOnScroll($('.feature-item'), '85%');
const revealOnScrollTestimonials = new RevealOnScroll($('.testimonial'), '60%');
const stickyHeader = new StickyHeader();
const modal = new Modal();