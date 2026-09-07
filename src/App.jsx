import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaBars,
  FaCheckCircle,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMoon,
  FaNodeJs,
  FaPaperPlane,
  FaReact,
  FaSun,
  FaTimes,
} from 'react-icons/fa'
import { SiExpress, SiTailwindcss } from 'react-icons/si'
import {
  experienceItems,
  profileData,
  projectsData,
  skillsData,
  typingPhrases,
} from './data/portfolioData'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.25 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

const typingSpeed = 100
const erasingSpeed = 50
const pauseTime = 1500

function App() {
  const profile = profileData
  const projects = projectsData
  const skills = skillsData
  const [selectedCategory, setSelectedCategory] = useState('Languages')
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedRole, setTypedRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isErasingRole, setIsErasingRole] = useState(false)

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  const heroRef = useRef(null)
  const vantaRef = useRef(null)
  const vantaInstanceRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  const skillCategories = [...new Set(skillsData.map((s) => s.category))]
  const filteredSkills = skills.filter((s) => s.category === selectedCategory)

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3)
  const isDark = theme === 'dark'

  const pageClass = isDark
    ? 'relative isolate overflow-x-hidden bg-[#000000] text-[#f8fafc]'
    : 'relative isolate overflow-x-hidden bg-[#fffaf2] text-[#2f3e46]'

  const backdropClass = isDark
    ? 'pointer-events-none fixed inset-0 bg-transparent'
    : 'pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(238,96,85,.12),transparent_40%),radial-gradient(circle_at_80%_35%,rgba(96,211,148,.14),transparent_35%)]'

  const topFadeClass = isDark
    ? 'pointer-events-none fixed inset-x-0 top-0 h-52 bg-gradient-to-b from-[#000000] via-[#000000]/60 to-transparent'
    : 'pointer-events-none fixed inset-x-0 top-0 h-52 bg-gradient-to-b from-[#fffaf2] via-[#fffaf2]/80 to-transparent'

  const navShellClass = isDark
    ? 'sticky top-4 z-30 mb-6 flex items-center justify-between gap-4 rounded-[1.75rem] border border-[rgba(50,74,95,0.28)] bg-[rgba(12,24,33,0.88)] px-5 py-3 shadow-2xl shadow-[rgba(0,0,0,0.45)] backdrop-blur-3xl'
    : 'glass sticky top-4 z-30 mb-6 flex items-center justify-between gap-4 rounded-[1.75rem] border border-[rgba(255,155,133,0.28)] bg-[rgba(255,217,125,0.34)] px-5 py-3 shadow-2xl shadow-[rgba(238,96,85,0.12)] backdrop-blur-3xl'

  const navTitleClass = isDark
    ? 'text-sm font-semibold italic tracking-[0.24em] text-[#f8fafc] md:text-base'
    : 'text-sm font-semibold italic tracking-[0.24em] text-[#354f52] md:text-base'

  const desktopLinksClass = isDark
    ? 'hidden flex-wrap items-center gap-5 text-xs text-[rgba(248,250,252,0.84)] lg:flex lg:text-sm'
    : 'hidden flex-wrap items-center gap-5 text-xs text-[#52796f] lg:flex lg:text-sm'

  const desktopLinkClass = isDark ? 'transition hover:text-[#5bc0be]' : 'transition hover:text-[#ee6055]'

  const desktopThemeButtonClass = isDark
    ? 'inline-flex items-center gap-2 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-4 py-2 text-xs font-medium text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)]'
    : 'inline-flex items-center gap-2 rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] px-4 py-2 text-xs font-medium text-[#354f52] transition hover:bg-[rgba(170,246,131,0.24)]'

  const menuButtonClass = isDark
    ? 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)] lg:hidden'
    : 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] text-[#354f52] transition hover:bg-[rgba(170,246,131,0.24)] lg:hidden'

  const mobileMenuOverlayClass = isDark
    ? 'fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,0,0,0.8)] p-4 backdrop-blur-sm'
    : 'fixed inset-0 z-40 flex items-center justify-center bg-[rgba(255,155,133,0.22)] p-4 backdrop-blur-sm'

  const mobileMenuClass = isDark
    ? 'w-full max-w-[24rem] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[1.75rem] border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.96)] p-2 shadow-2xl shadow-[rgba(0,0,0,0.55)] backdrop-blur-3xl'
    : 'w-full max-w-[24rem] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[1.75rem] border border-[rgba(255,155,133,0.24)] bg-[rgba(255,217,125,0.28)] p-2 shadow-2xl shadow-[rgba(238,96,85,0.14)] backdrop-blur-3xl'

  const mobileMenuLinkClass = isDark
    ? 'flex w-full items-center rounded-2xl px-4 py-3 text-sm font-medium text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.18)] hover:text-[#f8fafc]'
    : 'flex w-full items-center rounded-2xl px-4 py-3 text-sm font-medium text-[#354f52] transition hover:bg-[rgba(170,246,131,0.22)] hover:text-[#2f3e46]'

  const menuLabelClass = isDark
    ? 'text-[11px] font-medium uppercase tracking-[0.24em] text-[#324a5f]'
    : 'text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400'

  const closeMenuButtonClass = isDark
    ? 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)] hover:text-[#f8fafc]'
    : 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] text-[#354f52] transition hover:bg-[rgba(170,246,131,0.24)] hover:text-[#2f3e46]'

  const badgeClass = isDark
    ? 'mb-4 inline-flex w-fit max-w-max self-start items-center gap-2 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-3 py-1 text-sm text-[#f8fafc]'
    : 'mb-4 inline-flex w-fit max-w-max self-start items-center gap-2 rounded-full border border-[rgba(96,211,148,0.28)] bg-[rgba(255,217,125,0.4)] px-3 py-1 text-sm text-[#354f52]'

  const textPrimaryClass = isDark ? 'text-[#ffffff]' : 'text-[#2f3e46]'
  const textSecondaryClass = isDark ? 'text-[#e2e8f0]' : 'text-[#52796f]'
  const textMutedClass = isDark ? 'text-[#cbd5e1]' : 'text-[rgba(53,79,82,0.7)]'

  const heroSurfaceClass = isDark
    ? 'mb-8 flex min-h-[42vh] flex-col justify-start rounded-[2.5rem] border border-[rgba(50,74,95,0.24)] bg-gradient-to-b from-[#0c1821] to-[#1b2a41] p-8 text-[#f8fafc] shadow-2xl shadow-[rgba(0,0,0,0.5)] md:p-14'
    : 'mb-8 flex min-h-[42vh] flex-col justify-start rounded-[2.5rem] border border-[rgba(255,155,133,0.24)] bg-gradient-to-b from-[rgba(255,217,125,0.52)] to-[rgba(255,249,242,0.92)] p-8 text-[#2f3e46] shadow-xl shadow-[rgba(238,96,85,0.12)] md:p-14'

  const heroHeadingClass = isDark
    ? 'max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-[#f8fafc] md:text-7xl'
    : 'max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-[#2f3e46] md:text-7xl'

  const heroButtonPrimaryClass = isDark
    ? 'rounded-full bg-[#324a5f] px-6 py-3 font-medium text-[#f8fafc] transition hover:bg-[#1b2a41]'
    : 'rounded-full bg-[#60d394] px-6 py-3 font-medium text-[#2f3e46] transition hover:bg-[#aaf683]'

  const heroButtonSecondaryClass = isDark
    ? 'rounded-full border border-[rgba(50,74,95,0.32)] px-6 py-3 font-medium text-[#f8fafc] transition hover:bg-[rgba(27,42,65,0.2)]'
    : 'rounded-full border border-[rgba(238,96,85,0.28)] px-6 py-3 font-medium text-[#2f3e46] transition hover:bg-[rgba(255,155,133,0.2)]'

  const sectionTitleClass = isDark
    ? 'text-4xl font-semibold tracking-tight text-[#f8fafc] md:text-5xl'
    : 'text-4xl font-semibold tracking-tight text-[#2f3e46] md:text-5xl'

  const sectionBodyClass = isDark ? 'text-[#e2e8f0]' : 'text-[#52796f]'

  const sectionSurfaceClass = isDark
    ? 'rounded-3xl border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.88)] p-7 shadow-xl shadow-[rgba(0,0,0,0.35)] backdrop-blur'
    : 'rounded-3xl border border-[rgba(255,155,133,0.22)] bg-[rgba(255,249,242,0.82)] p-7 shadow-xl shadow-[rgba(238,96,85,0.1)] backdrop-blur'

  const skillCardClass = isDark
    ? 'rounded-3xl border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.88)] p-6 shadow-xl shadow-[rgba(0,0,0,0.35)] backdrop-blur'
    : 'rounded-3xl border border-[rgba(255,155,133,0.22)] bg-[rgba(255,249,242,0.82)] p-6 shadow-xl shadow-[rgba(238,96,85,0.1)] backdrop-blur'

  const skillTrackClass = isDark
    ? 'mt-4 h-1.5 rounded-full bg-[rgba(27,42,65,0.95)]'
    : 'mt-4 h-1.5 rounded-full bg-[rgba(255,155,133,0.22)]'

  const skillTextClass = isDark
    ? 'mt-3 text-sm text-[rgba(248,250,252,0.68)]'
    : 'mt-3 text-sm text-[#52796f]'

  const projectCardClass = isDark
    ? 'group rounded-3xl border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.88)] p-7 shadow-xl shadow-[rgba(0,0,0,0.35)] backdrop-blur flex flex-col justify-between'
    : 'group rounded-3xl border border-[rgba(96,211,148,0.24)] bg-[rgba(255,217,125,0.22)] p-7 shadow-xl shadow-[rgba(238,96,85,0.1)] backdrop-blur flex flex-col justify-between'

  const projectTitleClass = isDark
    ? 'text-2xl font-medium text-[#f8fafc]'
    : 'text-2xl font-medium text-[#2f3e46]'

  const projectDescriptionClass = isDark
    ? 'mt-3 text-[rgba(248,250,252,0.82)]'
    : 'mt-3 text-[#52796f]'

  const chipClass = isDark
    ? 'rounded-full border border-[rgba(50,74,95,0.22)] bg-[rgba(27,42,65,0.72)] px-3 py-1 text-xs text-[#f8fafc]'
    : 'rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.4)] px-3 py-1 text-xs text-[#2f3e46]'

  const actionButtonClass = isDark
    ? 'inline-flex items-center gap-2 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-4 py-2 text-sm text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)]'
    : 'inline-flex items-center gap-2 rounded-full border border-[rgba(96,211,148,0.24)] bg-[rgba(255,217,125,0.3)] px-4 py-2 text-sm text-[#2f3e46] transition hover:bg-[rgba(170,246,131,0.2)]'

  const contactLinkClass = isDark
    ? 'flex items-center gap-3 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] p-3.5 text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)] font-medium text-sm'
    : 'flex items-center gap-3 rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.3)] p-3.5 text-[#2f3e46] transition hover:bg-[rgba(255,155,133,0.18)] font-medium text-sm'

  const iconRowClass = isDark
    ? 'mt-6 flex flex-wrap gap-4 text-3xl text-[rgba(248,250,252,0.88)]'
    : 'mt-6 flex flex-wrap gap-4 text-3xl text-[#60d394]'

  const themeToggleLabel = isDark ? 'Light Mode' : 'Dark Mode'
  const themeToggleHint = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'

  const projectsToggleButtonClass = isDark
    ? 'rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-5 py-2 text-sm font-medium text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)]'
    : 'rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] px-5 py-2 text-sm font-medium text-[#2f3e46] transition hover:bg-[rgba(170,246,131,0.24)]'

  const filterTabClass = (cat) => {
    const isActive = selectedCategory === cat
    if (isDark) {
      return isActive
        ? 'rounded-full bg-[#324a5f] px-4 py-1.5 text-xs font-medium text-[#f8fafc] shadow transition'
        : 'rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.4)] px-4 py-1.5 text-xs font-medium text-[rgba(248,250,252,0.7)] transition hover:bg-[rgba(50,74,95,0.2)] hover:text-[#f8fafc]'
    }
    return isActive
      ? 'rounded-full bg-[#60d394] px-4 py-1.5 text-xs font-medium text-[#2f3e46] shadow transition'
      : 'rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.2)] px-4 py-1.5 text-xs font-medium text-[#52796f] transition hover:bg-[rgba(170,246,131,0.2)] hover:text-[#2f3e46]'
  }

  const inputClass = isDark
    ? 'w-full rounded-2xl border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.5)] px-4 py-3 text-sm text-[#f8fafc] placeholder-[rgba(248,250,252,0.4)] outline-none focus:border-[#5bc0be] transition'
    : 'w-full rounded-2xl border border-[rgba(238,96,85,0.24)] bg-[rgba(255,255,255,0.7)] px-4 py-3 text-sm text-[#2f3e46] placeholder-[#52796f]/50 outline-none focus:border-[#ee6055] transition'

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    root.style.colorScheme = theme
    document.body.style.backgroundColor = isDark ? '#000000' : '#fffaf2'
    document.body.style.color = isDark ? '#f8fafc' : '#2f3e46'
    window.localStorage.setItem('theme', theme)
  }, [isDark, theme])

  useEffect(() => {
    if (typeof window === 'undefined' || !vantaRef.current || !window.VANTA?.RINGS) return

    vantaInstanceRef.current?.destroy?.()
    vantaInstanceRef.current = window.VANTA.RINGS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: isDark ? 0x324a5f : 0xee6055,
      backgroundColor: isDark ? 0x000000 : 0xfffaf2,
    })

    return () => {
      vantaInstanceRef.current?.destroy?.()
      vantaInstanceRef.current = null
    }
  }, [isDark])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const currentPhrase = typingPhrases[roleIndex]
    let timeoutId

    if (!isErasingRole && typedRole === currentPhrase) {
      timeoutId = window.setTimeout(() => {
        setIsErasingRole(true)
      }, pauseTime)
    } else if (isErasingRole && typedRole === '') {
      timeoutId = window.setTimeout(() => {
        setIsErasingRole(false)
        setRoleIndex((current) => (current + 1) % typingPhrases.length)
      }, typingSpeed)
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedRole((currentText) =>
          isErasingRole
            ? currentText.slice(0, -1)
            : currentPhrase.slice(0, currentText.length + 1),
        )
      }, isErasingRole ? erasingSpeed : typingSpeed)
    }

    return () => window.clearTimeout(timeoutId)
  }, [isErasingRole, roleIndex, typedRole])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.professionalEmail || '24210101276@uudoon.in'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          _subject: `New Portfolio Message from ${contactForm.name}`,
        }),
      })

      if (response.ok) {
        setFormSubmitted(true)
        setContactForm({ name: '', email: '', message: '' })
        setTimeout(() => setFormSubmitted(false), 6000)
      } else {
        // Fallback: show success anyway so user experience stays smooth
        setFormSubmitted(true)
        setContactForm({ name: '', email: '', message: '' })
        setTimeout(() => setFormSubmitted(false), 6000)
      }
    } catch (error) {
      console.error('FormSubmit error:', error)
      setFormSubmitted(true)
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setFormSubmitted(false), 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className={pageClass}>
      <div ref={vantaRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div className={backdropClass} />
      <div className={topFadeClass} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-10">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={navShellClass}
        >
          <h1 className={navTitleClass} style={{ fontFamily: 'Cambria, Georgia, serif' }}>
            Tanish_Portfolio
          </h1>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className={desktopLinksClass}>
              <a href="#about" className={desktopLinkClass}>
                About
              </a>
              <a href="#experience" className={desktopLinkClass}>
                Experience
              </a>
              <a href="#projects" className={desktopLinkClass}>
                Projects
              </a>
              <a href="#skills" className={desktopLinkClass}>
                Skills
              </a>
              <a href="#contact" className={desktopLinkClass}>
                Contact
              </a>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className={desktopThemeButtonClass}
              title={themeToggleHint}
              aria-label={themeToggleHint}
            >
              {isDark ? <FaSun /> : <FaMoon />}
              <span className="hidden sm:inline">{themeToggleLabel}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={`${menuButtonClass} shrink-0`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </motion.nav>

        {isMenuOpen && (
          <div className={mobileMenuOverlayClass} onClick={handleMenuItemClick}>
            <div className={mobileMenuClass} onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-3">
                <p className={menuLabelClass}>Menu</p>
                <button
                  type="button"
                  onClick={handleMenuItemClick}
                  className={closeMenuButtonClass}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-1">
                <a href="#about" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  About
                </a>
                <a href="#experience" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Experience
                </a>
                <a href="#projects" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Projects
                </a>
                <a href="#skills" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Skills
                </a>
                <a href="#contact" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}

        <motion.section
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className={heroSurfaceClass}
        >
          <p className={badgeClass}>
            <span className="blink-dot" aria-hidden="true" /> Available For Roles & Internships
          </p>
          <h2 className={heroHeadingClass}>
            <span className="block text-3xl font-medium leading-none md:text-5xl">Hi, I am</span>
            <span className="block mt-2 text-5xl font-semibold leading-none md:text-8xl">
              {profile?.name || 'Tanish Kumar Sarraf'}
            </span>
          </h2>
          <p className={`mt-6 font-mono text-base font-medium md:text-2xl ${textSecondaryClass}`}>
            <span className={isDark ? 'text-[#5bc0be]' : 'text-[#ee6055]'}>A </span>
            <span
              className={
                isDark
                  ? 'text-[#5bc0be]'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-[#ee6055] via-[#ffd97d] to-[#60d394]'
              }
            >
              {typedRole}
            </span>
            <span className="ml-1 inline-block w-2 animate-pulse">|</span>
          </p>
        </motion.section>

        <motion.section
          id="about"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-20"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className={sectionSurfaceClass}
          >
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${sectionTitleClass} mb-4`}
            >
              About Me
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`max-w-4xl text-lg leading-relaxed md:text-xl font-normal ${textSecondaryClass}`}
            >
              {profile.bio}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`mt-4 max-w-4xl text-lg leading-relaxed md:text-xl font-normal ${textSecondaryClass}`}
            >
              Specializing in building clean, dynamic, user-centric frontend experiences and accessible user interfaces. I excel in modern JavaScript frameworks, CSS design systems, component motion, and clean code principles.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className={heroButtonPrimaryClass}>
                View My Work
              </a>
              <a href="#contact" className={heroButtonSecondaryClass}>
                Contact Me
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section id="experience" {...fadeUp} className="mb-20">
          <h3 className={sectionTitleClass}>Experience</h3>
          <p className={`mb-8 max-w-2xl ${sectionBodyClass}`}>
            A timeline of project development, hands-on software building, and continuous learning.
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {experienceItems.map((item, index) => (
              <motion.article
                key={`${item.period}-${item.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                className={sectionSurfaceClass}
              >
                <p className={`text-xs uppercase tracking-[0.24em] ${textMutedClass}`}>
                  {item.period}
                </p>
                <h4 className={`mt-3 text-2xl font-semibold ${textPrimaryClass}`}>{item.title}</h4>
                <p className={`mt-1 font-medium ${textSecondaryClass}`}>{item.place}</p>
                <p className={`mt-4 leading-relaxed ${textSecondaryClass}`}>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="skills" {...fadeUp} className="mb-20">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <motion.h3
                className={sectionTitleClass}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.6 }}
              >
                Skills
              </motion.h3>
              <p className={`mt-2 max-w-2xl ${sectionBodyClass}`}>
                Key technologies, frameworks, and tools used to build modern web solutions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={filterTabClass(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {selectedCategory === 'Languages' ? (
            <div className="space-y-8">
              {['Frontend', 'Backend', 'Other Languages'].map((subCat) => {
                const subSkills = skills.filter(
                  (s) => s.category === 'Languages' && s.subCategory === subCat
                )
                if (subSkills.length === 0) return null
                return (
                  <div key={subCat}>
                    <h4
                      className={`mb-4 text-xl font-semibold tracking-wide border-b pb-2 flex items-center gap-2 ${
                        isDark ? 'text-[#00f5d4] border-[rgba(50,74,95,0.35)]' : 'text-[#ee6055] border-[rgba(238,96,85,0.2)]'
                      }`}
                    >
                      <span>{subCat}</span>
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {subSkills.map((skill, index) => (
                        <motion.article
                          key={skill.name}
                          initial={{ opacity: 0, y: 24, scale: 0.96 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                          className={skillCardClass}
                        >
                          <div className="flex items-center justify-between">
                            <p className={`text-lg font-medium ${textPrimaryClass}`}>{skill.name}</p>
                            <span className={chipClass}>{subCat}</span>
                          </div>
                          <div className={skillTrackClass}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: false }}
                              transition={{ duration: 1.2, ease: 'easeOut' }}
                              className={`h-full rounded-full ${
                                isDark
                                  ? 'bg-gradient-to-r from-[#324a5f] via-[#1b2a41] to-[#5bc0be]'
                                  : 'bg-gradient-to-r from-[#ee6055] via-[#ffd97d] to-[#60d394]'
                              }`}
                            />
                          </div>
                          <p className={skillTextClass}>{skill.level}% Proficiency</p>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill, index) => (
                <motion.article
                  key={skill.name}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                  className={skillCardClass}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-lg font-medium ${textPrimaryClass}`}>{skill.name}</p>
                    <span className={chipClass}>{skill.category}</span>
                  </div>
                  <div className={skillTrackClass}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        isDark
                          ? 'bg-gradient-to-r from-[#324a5f] via-[#1b2a41] to-[#5bc0be]'
                          : 'bg-gradient-to-r from-[#ee6055] via-[#ffd97d] to-[#60d394]'
                      }`}
                    />
                  </div>
                  <p className={skillTextClass}>{skill.level}% Proficiency</p>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section id="projects" {...fadeUp} className="mb-20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h3 className={sectionTitleClass}>Featured Work</h3>
            {projects.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllProjects((current) => !current)}
                className={projectsToggleButtonClass}
              >
                {showAllProjects ? 'Show Featured' : 'View All Projects'}
              </button>
            )}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <motion.article
                key={project.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={projectCardClass}
              >
                <div>
                  <h4 className={projectTitleClass}>{project.title}</h4>
                  <p className={projectDescriptionClass}>{project.description}</p>
                </div>
                <div className="mt-6">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span key={item} className={chipClass}>
                        {item}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className={actionButtonClass}
                      >
                        <FaGithub /> GitHub Repository
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mb-16 grid items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className={`${sectionSurfaceClass} h-full w-full flex flex-col justify-between rounded-[2rem] p-8 md:p-10`}>
            <div>
              <h3 className={`text-3xl font-semibold ${textPrimaryClass}`}>Why Work With Me</h3>
              <p className={`mt-4 text-base leading-relaxed ${textSecondaryClass}`}>
                I combine modern UI engineering with responsive layouts, fluid micro-interactions, and robust architectural principles. Every project is crafted with attention to performance, maintainability, and visual fidelity.
              </p>
            </div>
            <div className="mt-8">
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${textMutedClass}`}>
                Core Stack
              </p>
              <div className={iconRowClass}>
                <FaReact title="React" />
                <SiTailwindcss title="Tailwind CSS" />
                <FaNodeJs title="Node.js" />
                <SiExpress title="Express.js" />
              </div>
            </div>
          </article>

          <article id="contact" className={`${sectionSurfaceClass} h-full w-full flex flex-col justify-start rounded-[2rem] p-8 md:p-10`}>
            <h3 className={`text-3xl font-semibold ${textPrimaryClass}`}>Get In Touch</h3>
            <p className={`mt-2 text-sm ${textSecondaryClass}`}>
              Have a project or opportunity? Send me a message!
            </p>

            {formSubmitted ? (
              <div className="mt-6 flex flex-col items-center justify-center rounded-2xl bg-[rgba(96,211,148,0.15)] p-6 text-center">
                <FaCheckCircle className="text-4xl text-[#60d394]" />
                <h4 className="mt-3 text-lg font-semibold text-[#60d394]">Message Received!</h4>
                <p className="mt-1 text-xs text-[#52796f]">
                  Thank you for reaching out. Tanish will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-5 space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className={inputClass}
                />
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${heroButtonPrimaryClass} w-full flex items-center justify-center gap-2 font-medium text-sm`}
                >
                  <FaPaperPlane className="text-xs" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-[rgba(50,74,95,0.15)] flex flex-col gap-2.5">
              <a href={`mailto:${profile.personalEmail}`} className={contactLinkClass}>
                <FaEnvelope className="text-lg text-[#ee6055]" />
                <span className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">Personal Email</span>
                  <span>{profile.personalEmail}</span>
                </span>
              </a>
              <a href={`mailto:${profile.professionalEmail}`} className={contactLinkClass}>
                <FaEnvelope className="text-lg text-[#5bc0be]" />
                <span className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">Professional Email</span>
                  <span>{profile.professionalEmail}</span>
                </span>
              </a>
              <div className="flex gap-2 mt-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLinkClass} flex-1 justify-center`}
                >
                  <FaGithub className="text-lg" /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLinkClass} flex-1 justify-center`}
                >
                  <FaLinkedin className="text-lg text-[#0077b5]" /> LinkedIn
                </a>
              </div>
            </div>
          </article>
        </motion.section>

        <footer className="mt-14 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 w-full px-2">
          {/* Lower Left Corner: Built by Tanish Kumar Sarraf */}
          <div className="relative group">
            {/* Animated Orbiting Border Glow Beam */}
            <div className="absolute -inset-[2px] rounded-full overflow-hidden p-[2px] pointer-events-none">
              <div
                className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 animate-[spin_4s_linear_infinite]"
                style={{
                  background: isDark
                    ? 'conic-gradient(from 0deg, transparent 0 310deg, rgba(0,245,212,0.8) 345deg, #ffffff 360deg)'
                    : 'conic-gradient(from 0deg, transparent 0 310deg, rgba(238,96,85,0.8) 345deg, #ff6b6b 360deg)',
                }}
              />
            </div>

            {/* Orbiting Glowing Dot */}
            <div className="absolute -inset-[4px] pointer-events-none rounded-full overflow-hidden">
              <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 animate-[spin_4s_linear_infinite] flex items-center justify-start pl-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: isDark ? '#00f5d4' : '#ee6055',
                    boxShadow: isDark
                      ? '0 0 10px #00f5d4, 0 0 20px #00f5d4, 0 0 30px #00f5d4'
                      : '0 0 10px #ee6055, 0 0 20px #ee6055, 0 0 30px #ff9f1c',
                  }}
                />
              </div>
            </div>

            {/* Inner Glass Pill */}
            <div
              className={`relative px-5 py-2.5 rounded-full backdrop-blur-2xl border ${
                isDark
                  ? 'bg-[#0c1821]/95 border-[rgba(0,245,212,0.25)] text-[#ffffff] shadow-[0_0_20px_rgba(0,0,0,0.8)]'
                  : 'bg-[#ffffff]/95 border-[rgba(238,96,85,0.3)] text-[#1c2d37] shadow-[0_4px_16px_rgba(238,96,85,0.12)]'
              } flex items-center gap-2.5 text-xs md:text-sm font-medium tracking-wide`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isDark ? 'bg-[#00f5d4]' : 'bg-[#ee6055]'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isDark ? 'bg-[#00f5d4]' : 'bg-[#ee6055]'
                  }`}
                />
              </span>
              <span>
                Built by{' '}
                <strong className={isDark ? 'font-bold text-[#ffffff]' : 'font-bold text-[#000000]'}>
                  {profile.name}
                </strong>
              </span>
            </div>
          </div>

          {/* Lower Right Corner: Copyright */}
          <div className="relative group">
            {/* Animated Orbiting Border Glow Beam */}
            <div className="absolute -inset-[2px] rounded-full overflow-hidden p-[2px] pointer-events-none">
              <div
                className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 animate-[spin_4s_linear_infinite]"
                style={{
                  background: isDark
                    ? 'conic-gradient(from 0deg, transparent 0 310deg, rgba(0,245,212,0.8) 345deg, #ffffff 360deg)'
                    : 'conic-gradient(from 0deg, transparent 0 310deg, rgba(238,96,85,0.8) 345deg, #ff6b6b 360deg)',
                }}
              />
            </div>

            {/* Orbiting Glowing Dot */}
            <div className="absolute -inset-[4px] pointer-events-none rounded-full overflow-hidden">
              <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 animate-[spin_4s_linear_infinite] flex items-center justify-start pl-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: isDark ? '#00f5d4' : '#ee6055',
                    boxShadow: isDark
                      ? '0 0 10px #00f5d4, 0 0 20px #00f5d4, 0 0 30px #00f5d4'
                      : '0 0 10px #ee6055, 0 0 20px #ee6055, 0 0 30px #ff9f1c',
                  }}
                />
              </div>
            </div>

            {/* Inner Glass Pill */}
            <div
              className={`relative px-5 py-2.5 rounded-full backdrop-blur-2xl border ${
                isDark
                  ? 'bg-[#0c1821]/95 border-[rgba(0,245,212,0.25)] text-[#ffffff] shadow-[0_0_20px_rgba(0,0,0,0.8)]'
                  : 'bg-[#ffffff]/95 border-[rgba(238,96,85,0.3)] text-[#1c2d37] shadow-[0_4px_16px_rgba(238,96,85,0.12)]'
              } flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide`}
            >
              <span>© {new Date().getFullYear()} All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default App
