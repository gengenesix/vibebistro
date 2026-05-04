"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Menu, X, ShoppingBag, MapPin, Phone, Clock, Instagram, Trash2, ChevronRight } from "lucide-react"

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FOOD = [
  {
    id: 1,
    name: "The OG Burger",
    price: 120,
    tag: "Best Seller",
    tagBg: "#ff4d00",
    tagFg: "white",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    desc: "Triple-smashed wagyu beef, secret vibe sauce, pickles on brioche.",
  },
  {
    id: 2,
    name: "Electric Pepperoni",
    price: 150,
    tag: "Spicy",
    tagBg: "#2d31fa",
    tagFg: "white",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    desc: "Double pepperoni, hot honey drizzle, fermented dough.",
  },
  {
    id: 3,
    name: "Loaded Fries XL",
    price: 85,
    tag: "Popular",
    tagBg: "#bff000",
    tagFg: "#1a1a1a",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    desc: "Crispy fries, smoked cheddar fondue, scallions, pickled jalapeños.",
  },
  {
    id: 4,
    name: "Vibe Chicken Sandwich",
    price: 115,
    tag: "New",
    tagBg: "#bff000",
    tagFg: "#1a1a1a",
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80",
    desc: "Buttermilk fried thigh, sriracha honey, slaw on a potato bun.",
  },
  {
    id: 5,
    name: "Portobello Stack",
    price: 100,
    tag: "Vegan",
    tagBg: "#22c55e",
    tagFg: "white",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    desc: "Grilled portobello, roasted peppers, cashew aioli on sourdough.",
  },
  {
    id: 6,
    name: "Late Night Nachos",
    price: 130,
    tag: "After 10PM",
    tagBg: "#1a1a1a",
    tagFg: "white",
    img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80",
    desc: "House tortillas, black beans, pico de gallo, vibe guac, crema.",
  },
]

const DRINKS = [
  {
    id: 7,
    name: "Disco Sour",
    price: 95,
    tag: "Popular",
    tagBg: "#bff000",
    tagFg: "#1a1a1a",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    desc: "Gin, butterfly pea, elderflower, and gold glitter edible dust.",
  },
  {
    id: 8,
    name: "Orange Crush",
    price: 85,
    tag: "Fan Fave",
    tagBg: "#ff4d00",
    tagFg: "white",
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=80",
    desc: "Fresh-squeezed OJ, Aperol, sparkling wine, rosemary sprig.",
  },
  {
    id: 9,
    name: "Cold Brew Float",
    price: 65,
    tag: "Non-Alcoholic",
    tagBg: "#1a1a1a",
    tagFg: "white",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
    desc: "House cold brew, vanilla gelato, tonic water, caramel drizzle.",
  },
  {
    id: 10,
    name: "Vibe Margarita",
    price: 110,
    tag: "Signature",
    tagBg: "#2d31fa",
    tagFg: "white",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    desc: "Reposado tequila, lime, tajín rim, mango chili foam.",
  },
]

const EVENTS = [
  {
    id: 1,
    title: "RETRO FRIDAY",
    date: "Every Friday",
    time: "9PM \u2192 2AM",
    desc: "90s and 00s bangers all night. DJ Vibe on the 1s and 2s. No cover before 10.",
    accentBg: "#2d31fa",
    accentFg: "white",
  },
  {
    id: 2,
    title: "BRUNCH CLUB",
    date: "Sat & Sun",
    time: "11AM \u2192 3PM",
    desc: "Unlimited mimosas, live jazz, bottomless vibes. \u20b5280 per head.",
    accentBg: "#ff4d00",
    accentFg: "white",
  },
  {
    id: 3,
    title: "OPEN MIC NIGHT",
    date: "Every Wednesday",
    time: "7PM \u2192 11PM",
    desc: "Got bars? A hook? A guitar riff? We have a mic. Sign up at the door.",
    accentBg: "#bff000",
    accentFg: "#1a1a1a",
  },
]

const LOCATIONS = [
  {
    id: 1,
    name: "Downtown",
    address: "420 Retro Lane, Suite 1A",
    hours: "Tue\u2013Sun: 12PM \u2013 2AM",
    phone: "(555) 420-7890",
  },
  {
    id: 2,
    name: "East Side",
    address: "88 Vibe Ave, Floor 2",
    hours: "Tue\u2013Sun: 12PM \u2013 12AM",
    phone: "(555) 420-0088",
  },
  {
    id: 3,
    name: "Uptown",
    address: "1974 Groove Street",
    hours: "Fri\u2013Sun: 5PM \u2013 2AM",
    phone: "(555) 420-1974",
  },
]

const INSTA_IMGS = [
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80",
]

const TIME_OPTIONS = [
  { label: "12:00 PM", value: "12:00" },
  { label: "1:00 PM",  value: "13:00" },
  { label: "2:00 PM",  value: "14:00" },
  { label: "5:00 PM",  value: "17:00" },
  { label: "6:00 PM",  value: "18:00" },
  { label: "7:00 PM",  value: "19:00" },
  { label: "8:00 PM",  value: "20:00" },
  { label: "9:00 PM",  value: "21:00" },
  { label: "10:00 PM", value: "22:00" },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

type OrderItem = { id: number; name: string; price: number }

function groupOrder(items: OrderItem[]) {
  const map = new Map<number, { item: OrderItem; qty: number }>()
  for (const item of items) {
    const entry = map.get(item.id)
    if (entry) entry.qty++
    else map.set(item.id, { item, qty: 1 })
  }
  return Array.from(map.values())
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileOpen, setMobileOpen]           = useState(false)
  const [bookingOpen, setBookingOpen]         = useState(false)
  const [orderOpen, setOrderOpen]             = useState(false)
  const [activeTab, setActiveTab]             = useState<"food" | "drinks">("food")
  const [order, setOrder]                     = useState<OrderItem[]>([])
  const [orderBarVisible, setOrderBarVisible] = useState(false)
  const [orderTimer, setOrderTimer]           = useState<ReturnType<typeof setTimeout> | null>(null)
  const [bookingDone, setBookingDone]         = useState(false)
  const [orderPlaced, setOrderPlaced]         = useState(false)
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "19:00", party: "2" })

  const menuRef      = useRef<HTMLElement>(null)
  const eventsRef    = useRef<HTMLElement>(null)
  const locationsRef = useRef<HTMLElement>(null)
  const aboutRef     = useRef<HTMLElement>(null)

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    setMobileOpen(false)
  }

  function addToOrder(item: Omit<OrderItem, never>) {
    setOrder((prev) => [...prev, item])
    setOrderBarVisible(true)
    if (orderTimer) clearTimeout(orderTimer)
    const t = setTimeout(() => setOrderBarVisible(false), 3500)
    setOrderTimer(t)
  }

  function removeFromOrder(id: number) {
    setOrder((prev) => {
      const idx = prev.findLastIndex((i) => i.id === id)
      if (idx === -1) return prev
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
    })
  }

  function handleBooking(e: React.FormEvent) {
    e.preventDefault()
    setBookingDone(true)
  }

  function openBooking() {
    setBookingOpen(true)
    setMobileOpen(false)
  }

  function openOrder() {
    setOrderOpen(true)
    setOrderBarVisible(false)
  }

  const orderTotal = order.reduce((s, i) => s + i.price, 0)
  const grouped    = groupOrder(order)

  return (
    <>
      <div className="grain-overlay" />

      {/* FLOATING ORDER BAR */}
      <div className={`order-bar${orderBarVisible && order.length > 0 ? " visible" : ""}`}>
        <ShoppingBag size={16} />
        <span>
          {order.length} item{order.length !== 1 ? "s" : ""} &middot; &#8373;{orderTotal}
        </span>
        <button
          className="btn-cta"
          style={{ background: "var(--accent)", color: "var(--dark)", fontSize: "11px", padding: "6px 14px", boxShadow: "none" }}
          onClick={openOrder}
        >
          View Order
        </button>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="logo">VIBE*BISTRO</div>
        <nav>
          <a href="#menu"      onClick={(e) => { e.preventDefault(); scrollTo(menuRef) }}>Menu</a>
          <a href="#about"     onClick={(e) => { e.preventDefault(); scrollTo(aboutRef) }}>Vibe Check</a>
          <a href="#events"    onClick={(e) => { e.preventDefault(); scrollTo(eventsRef) }}>Events</a>
          <a href="#locations" onClick={(e) => { e.preventDefault(); scrollTo(locationsRef) }}>Locations</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {order.length > 0 && (
            <button className="cart-pill" onClick={openOrder} aria-label="View order">
              <ShoppingBag size={13} />
              <span>{order.length}</span>
            </button>
          )}
          <button className="btn-cta hide-xs" onClick={openBooking}>Book a Table</button>
          <button className="hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <a href="#menu"      onClick={(e) => { e.preventDefault(); scrollTo(menuRef) }}>Menu</a>
        <a href="#about"     onClick={(e) => { e.preventDefault(); scrollTo(aboutRef) }}>Vibe Check</a>
        <a href="#events"    onClick={(e) => { e.preventDefault(); scrollTo(eventsRef) }}>Events</a>
        <a href="#locations" onClick={(e) => { e.preventDefault(); scrollTo(locationsRef) }}>Locations</a>
        <button className="btn-cta" style={{ alignSelf: "flex-start" }} onClick={openBooking}>
          Book a Table
        </button>
        {order.length > 0 && (
          <button
            className="btn-cta"
            style={{ alignSelf: "flex-start", background: "var(--accent)", color: "var(--dark)" }}
            onClick={openOrder}
          >
            View Order ({order.length})
          </button>
        )}
      </div>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              NO CAP,
              <br />
              JUST <span>FLAVOR</span>
            </h1>
            <p className="hero-sub">
              Serving 70s aesthetics with a modern twist. Locally sourced,
              highkey delicious, and strictly for the vibers.
            </p>
            <div className="hero-btns">
              <button
                className="btn-cta"
                style={{ background: "var(--primary)", color: "white" }}
                onClick={() => scrollTo(menuRef)}
              >
                Order Now
              </button>
              <button className="btn-cta" style={{ background: "white" }} onClick={() => scrollTo(menuRef)}>
                View Menu
              </button>
            </div>
          </div>
          <div className="hero-img">
            <div className="sticker">
              FRESH AF
              <br />
              EVERY DAY
            </div>
            <div className="floating-tag hero-tag-1">#AESTHETIC</div>
            <div className="floating-tag hero-tag-2">LOWKEY FIRE</div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="marquee-content">
            &nbsp; &#9733; BURGERS THAT SLAP &#9733; CRAFT COCKTAILS &#9733; RETRO VIBES ONLY &#9733; OPEN UNTIL 2AM &#9733; BEST IN
            THE CITY &#9733; BURGERS THAT SLAP &#9733; CRAFT COCKTAILS &#9733; RETRO VIBES ONLY &#9733; OPEN UNTIL 2AM &#9733; BEST IN
            THE CITY &nbsp;
          </div>
        </div>

        {/* MENU */}
        <section className="section-padding" ref={menuRef} id="menu">
          <div className="section-header">
            <h2 className="section-title">THE MENU</h2>
            <div className="menu-tabs">
              <button
                className={`tab-btn${activeTab === "food" ? " active" : ""}`}
                onClick={() => setActiveTab("food")}
              >
                Food
              </button>
              <button
                className={`tab-btn${activeTab === "drinks" ? " active" : ""}`}
                onClick={() => setActiveTab("drinks")}
              >
                Drinks
              </button>
            </div>
          </div>
          <div className="menu-grid">
            {(activeTab === "food" ? FOOD : DRINKS).map((item) => (
              <div key={item.id} className="menu-card">
                <span className="menu-tag" style={{ background: item.tagBg, color: item.tagFg }}>
                  {item.tag}
                </span>
                <div className="menu-card-img">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
                <div className="menu-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", gap: "8px" }}>
                    <h3 style={{ fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 800, lineHeight: 1.2 }}>{item.name}</h3>
                    <span className="price" style={{ flexShrink: 0 }}>&#8373;{item.price}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.55, marginBottom: "16px" }}>
                    {item.desc}
                  </p>
                  <button
                    className="btn-add"
                    onClick={() => addToOrder({ id: item.id, name: item.name, price: item.price })}
                  >
                    + Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIBE CHECK */}
        <section className="retro-vibe" ref={aboutRef} id="about">
          <div>
            <h2 className="vibe-title">THE VIBE CHECK IS PASSED.</h2>
            <p className="vibe-text">
              We don&apos;t just do food. We do moments. From the curated 90s hip-hop playlist to the 70s
              diner seats, every corner is designed for your next dump. No reservations needed for the
              main room, just bring the energy.
            </p>
            <button
              className="btn-cta"
              style={{ background: "var(--dark)", color: "white", borderColor: "white" }}
              onClick={openBooking}
            >
              Book Your Seat
            </button>
          </div>
          <div className="vibe-img" />
        </section>

        {/* EVENTS */}
        <section className="section-padding" ref={eventsRef} id="events">
          <div className="section-header">
            <h2 className="section-title">EVENTS</h2>
            <span style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "13px", letterSpacing: "1px" }}>
              More Coming Soon &#8595;
            </span>
          </div>
          <div className="events-grid">
            {EVENTS.map((ev) => (
              <div key={ev.id} className="event-card">
                <div className="event-accent" style={{ background: ev.accentBg, color: ev.accentFg }}>
                  <span className="event-title-text">{ev.title}</span>
                </div>
                <div className="event-body">
                  <div className="event-meta">
                    <span>{ev.date}</span>
                    <span className="event-time">{ev.time}</span>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#555" }}>{ev.desc}</p>
                  <button
                    className="btn-cta"
                    style={{ marginTop: "20px", fontSize: "12px" }}
                    onClick={openBooking}
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATIONS */}
        <section className="locations-section" ref={locationsRef} id="locations">
          <div className="locations-inner">
            <h2 className="section-title" style={{ marginBottom: "clamp(28px, 5vw, 56px)" }}>
              FIND US
            </h2>
            <div className="locations-grid">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="location-card">
                  <h3 className="location-name">{loc.name}</h3>
                  <div className="location-detail">
                    <MapPin size={15} strokeWidth={2.5} />
                    <span>{loc.address}</span>
                  </div>
                  <div className="location-detail">
                    <Clock size={15} strokeWidth={2.5} />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="location-detail">
                    <Phone size={15} strokeWidth={2.5} />
                    <a href={`tel:${loc.phone.replace(/\D/g, "")}`}>{loc.phone}</a>
                  </div>
                  <button
                    className="btn-cta"
                    style={{ width: "100%", marginTop: "24px", fontSize: "12px" }}
                    onClick={openBooking}
                  >
                    Book at {loc.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="section-padding" style={{ paddingBottom: 0 }}>
          <h2 className="section-title" style={{ marginBottom: "clamp(20px, 4vw, 40px)", textAlign: "center" }}>
            @VIBE.BISTRO
          </h2>
          <div className="social-grid">
            {INSTA_IMGS.map((src, i) => (
              <a
                key={i}
                className="social-item"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="social-img"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <div className="social-overlay">
                  <Instagram size={28} color="white" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-logo">VIBE*BISTRO</div>
          <p style={{ color: "#666", lineHeight: 1.65, marginBottom: "24px" }}>
            Your local spot for high-fidelity food and low-fidelity vibes.
            <br />
            Since 2024 but feels like 1974.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["IG", "TW", "TK"].map((s) => (
              <a key={s} href="#" className="social-badge" target="_blank" rel="noopener noreferrer">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <h4>Navigate</h4>
          <ul>
            <li><a href="#menu"      onClick={(e) => { e.preventDefault(); scrollTo(menuRef) }}>Menu</a></li>
            <li><a href="#about"     onClick={(e) => { e.preventDefault(); scrollTo(aboutRef) }}>About</a></li>
            <li><a href="#events"    onClick={(e) => { e.preventDefault(); scrollTo(eventsRef) }}>Events</a></li>
            <li><a href="#locations" onClick={(e) => { e.preventDefault(); scrollTo(locationsRef) }}>Locations</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Hours</h4>
          <ul>
            <li>Tue&ndash;Thu: 12pm &ndash; 11pm</li>
            <li>Fri&ndash;Sat: 12pm &ndash; 2am</li>
            <li>Sun: 11am &ndash; 9pm</li>
            <li>Mon: Closed</li>
          </ul>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 GENESIS GROUP</span>
          <span>Designed &amp; Built by Erick</span>
          <button
            onClick={openBooking}
            style={{ background: "none", border: "none", fontWeight: 800, fontSize: "inherit", textTransform: "uppercase", cursor: "pointer" }}
          >
            BOOK A TABLE &#8594;
          </button>
        </div>
      </footer>

      {/* ── ORDER MODAL ─────────────────────────────────────────────────────── */}
      <Dialog
        open={orderOpen}
        onOpenChange={(open) => {
          setOrderOpen(open)
          if (!open) setOrderPlaced(false)
        }}
      >
        <DialogContent
          style={{
            background: "var(--bg)",
            border: "3px solid var(--dark)",
            borderRadius: 0,
            maxWidth: "480px",
            width: "calc(100% - 2rem)",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(20px, 5vw, 30px)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "-1px",
              }}
            >
              {orderPlaced ? "ORDER PLACED!" : "YOUR ORDER"}
            </DialogTitle>
          </DialogHeader>

          {orderPlaced ? (
            <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
              <div style={{ fontSize: "56px", marginBottom: "12px" }}>&#127829;</div>
              <p style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>
                It&apos;s on its way!
              </p>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6 }}>
                Your order has been sent to the kitchen.
                <br />
                Sit tight, it&apos;ll be with you shortly.
              </p>
              <button
                className="btn-cta"
                style={{ background: "var(--primary)", color: "white", width: "100%", padding: "14px", marginTop: "24px" }}
                onClick={() => { setOrderOpen(false); setOrder([]); setOrderPlaced(false) }}
              >
                Done
              </button>
            </div>
          ) : order.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, margin: "0 auto 16px" }} />
              <p style={{ color: "#999", fontWeight: 700 }}>Your order is empty.</p>
              <button
                className="btn-cta"
                style={{ marginTop: "20px" }}
                onClick={() => { setOrderOpen(false); scrollTo(menuRef) }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div>
              <div className="order-list">
                {grouped.map(({ item, qty }) => (
                  <div key={item.id} className="order-row">
                    <div className="order-row-left">
                      <span className="order-qty">{qty}&#215;</span>
                      <span className="order-name">{item.name}</span>
                    </div>
                    <div className="order-row-right">
                      <span className="order-item-total">&#8373;{item.price * qty}</span>
                      <button
                        className="order-remove"
                        onClick={() => removeFromOrder(item.id)}
                        aria-label={`Remove one ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total-row">
                <span style={{ fontWeight: 800, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>Total</span>
                <span className="order-grand-total">&#8373;{orderTotal}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                <button
                  className="btn-cta"
                  style={{ background: "var(--primary)", color: "white", width: "100%", padding: "14px", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                  onClick={() => setOrderPlaced(true)}
                >
                  Place Order <ChevronRight size={16} />
                </button>
                <button
                  className="btn-cta"
                  style={{ background: "transparent", width: "100%", padding: "10px", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  onClick={() => setOrder([])}
                >
                  <Trash2 size={13} /> Clear Order
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── BOOKING MODAL ───────────────────────────────────────────────────── */}
      <Dialog
        open={bookingOpen}
        onOpenChange={(open) => {
          setBookingOpen(open)
          if (!open) setBookingDone(false)
        }}
      >
        <DialogContent
          style={{
            background: "var(--bg)",
            border: "3px solid var(--dark)",
            borderRadius: 0,
            maxWidth: "520px",
            width: "calc(100% - 2rem)",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(22px, 5vw, 34px)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "-1px",
              }}
            >
              {bookingDone ? "YOU'RE IN." : "BOOK A TABLE"}
            </DialogTitle>
          </DialogHeader>

          {bookingDone ? (
            <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
              <div style={{ fontSize: "56px", marginBottom: "12px", color: "var(--primary)" }}>&#10003;</div>
              <p style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>Table locked in.</p>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6 }}>
                We&apos;ll confirm via email shortly.
                <br />
                {form.name} &middot; Party of {form.party} &middot; {form.date}{" "}
                at {TIME_OPTIONS.find((t) => t.value === form.time)?.label ?? form.time}
              </p>
              <button
                className="btn-cta"
                style={{ background: "var(--primary)", color: "white", width: "100%", padding: "14px", marginTop: "24px" }}
                onClick={() => setBookingOpen(false)}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-name">Your Name</label>
                  <input
                    id="bk-name"
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-email">Email</label>
                  <input
                    id="bk-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-date">Date</label>
                  <input
                    id="bk-date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-time">Time</label>
                  <select
                    id="bk-time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bk-party">Party Size</label>
                <select
                  id="bk-party"
                  value={form.party}
                  onChange={(e) => setForm({ ...form, party: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                  ))}
                  <option value="8+">8+ (large group)</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-cta"
                style={{
                  background: "var(--primary)",
                  color: "white",
                  width: "100%",
                  padding: "15px",
                  fontSize: "15px",
                  marginTop: "4px",
                }}
              >
                Confirm Reservation
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
