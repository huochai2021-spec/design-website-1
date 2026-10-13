import { useEffect, useMemo, useRef, useState } from "react";
import {
  aboutInterests,
  heroPieces,
  projects,
} from "./content";
import DotCursor from "./components/DotCursor";

function usePortfolioRoute() {
  const [route, setRoute] = useState(() => window.location.pathname || "/");

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to, options = {}) => {
    const [path, hash] = to.split("#");
    const nextPath = path || "/";
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", `${nextPath}${hash ? `#${hash}` : ""}`);
      setRoute(nextPath);
    } else if (hash) {
      window.history.replaceState({}, "", `${nextPath}#${hash}`);
    }
    requestAnimationFrame(() => {
      const scroller = document.querySelector(".portfolio-scroller");
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: options.instant ? "auto" : "smooth" });
      } else {
        scroller?.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
      }
    });
  };

  return { route, navigate };
}

function InnerLink({ to, navigate, children, className = "", ariaLabel, onClick }) {
  return (
    <a
      href={to}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function WallHeader({ onOpen }) {
  return (
    <header className="wall-header">
      <div className="wall-brand">
        <img src="/assets/wall/e7cc87465acb9272-Wall-of-Portfolios-Logo.a44e6c92a8e9.svg" alt="Wall of Portfolios" />
      </div>
      <nav className="wall-actions" aria-label="作品集平台操作">
        <button onClick={() => onOpen("search")}>⌕&nbsp;&nbsp; 搜索职位</button>
        <button onClick={() => onOpen("submit")}>提交作品集</button>
        <button onClick={() => onOpen("login")}>登录 / 注册</button>
      </nav>
    </header>
  );
}

function WallSidebar({ activeTab, setActiveTab, onOpen }) {
  const [saved, setSaved] = useState(false);
  return (
    <aside className="wall-sidebar">
      <div className="wall-profile">
        <div className="profile-photo-wrap">
          <img
            className="profile-photo"
            src="/assets/wall/39f9baca42c859ff-profile_priyanka-r_20260825175627.avif"
            alt="LiJing"
          />
          <span className="open-dot" aria-hidden="true" />
        </div>
        <span className="open-label">正在寻找机会</span>
        <h1>LiJing</h1>
        <p className="profile-role">视觉传达设计学生</p>
        <div className="profile-meta">
          <span><img src="/assets/wall/1ec7a936c9e38625-location.57fea50af63b.svg" alt="" /> 印度</span>
          <span><img src="/assets/wall/25b0fa7641704be2-work.8718280c086b.svg" alt="" /> 1 年以下经验</span>
        </div>
        <div className="experience-block">
          <span className="eyebrow">工作经历：</span>
          <div className="company-row">
            <img src="/assets/wall/6d931fbb48aad985-company_the-madras-branding-company_20260825175626.avif" alt="The Madras Branding Company" />
            <span>The Madras Branding Company</span>
          </div>
        </div>
        <div className="sidebar-cta-row">
          <button className="message-button" onClick={() => onOpen("message")}>留言</button>
          <button
            className={`bookmark-button ${saved ? "is-saved" : ""}`}
            aria-label={saved ? "取消收藏" : "收藏 LiJing"}
            aria-pressed={saved}
            onClick={() => setSaved((value) => !value)}
          >
            <img src="/assets/wall/98506cf4c1531c03-bookmark.053041d62d05.svg" alt="" />
          </button>
        </div>
      </div>

      <div className="sidebar-tabs" role="tablist" aria-label="作品集资料标签">
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
          <img src="/assets/wall/5c09c0131f949744-Profile.e51da622561d.svg" alt="" /> 个人资料
        </button>
        <button className={activeTab === "portfolio" ? "active" : ""} onClick={() => setActiveTab("portfolio")}>
          <img src="/assets/wall/d13f5681f73760ac-portfolio_activetab.461cd8e56f1a.svg" alt="" /> 作品集
        </button>
      </div>
    </aside>
  );
}

function WallModal({ type, close }) {
  if (!type) return null;
  const content = {
    search: ["搜索职位", "浏览作品集平台上的开放设计职位。"],
    submit: ["提交作品集", "登录后提交作品集进行审核。"],
    login: ["登录 / 注册", "使用你的作品集平台账号继续。"],
    message: ["给 LiJing 留言", "登录后即可与 LiJing 开始交流。"],
  }[type];
  return (
    <div className="wall-modal-backdrop" role="presentation" onMouseDown={close}>
      <section className="wall-modal" role="dialog" aria-modal="true" aria-label={content[0]} onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="关闭">×</button>
        <img src="/assets/wall/e7cc87465acb9272-Wall-of-Portfolios-Logo.a44e6c92a8e9.svg" alt="Wall of Portfolios" />
        <h2>{content[0]}</h2>
        <p>{content[1]}</p>
        {type === "search" ? (
          <label className="search-field"><span className="sr-only">搜索</span><input autoFocus placeholder="搜索职位、人才或技能" /></label>
        ) : (
          <button className="wall-primary">继续登录</button>
        )}
      </section>
    </div>
  );
}

function PortfolioNav({ navigate, active }) {
  const nav = [
    ["/", "LiJing"],
    ["/works", "项目"],
    ["/aboutme", "关于我"],
    ["/#contact", "联系"],
  ];
  return (
    <nav className="portfolio-nav" aria-label="LiJing 作品集导航">
      {nav.map(([href, label]) => (
        <InnerLink key={href} to={href} navigate={navigate} className={active === href ? "active" : ""}>
          {label}
        </InnerLink>
      ))}
    </nav>
  );
}

function AudioWidget({ light = false }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const format = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  };

  return (
    <div className={`audio-widget ${light ? "light" : ""}`}>
      <audio
        ref={audioRef}
        src="/assets/audio/you-are-my-defense.m4a"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
      />
      <button onClick={toggle} aria-label={playing ? "暂停音频" : "播放音频"}>{playing ? "Ⅱ" : "▶"}</button>
      <span>{format(time)}/{format(duration)}</span>
      <input
        aria-label="音频进度"
        type="range"
        min="0"
        max={duration || 1}
        step="0.1"
        value={Math.min(time, duration || 1)}
        onChange={(event) => {
          const next = Number(event.target.value);
          audioRef.current.currentTime = next;
          setTime(next);
        }}
      />
    </div>
  );
}

function HomeHero() {
  return (
    <section className="home-hero" aria-label="LiJing 的视觉介绍">
      {heroPieces.map((piece) => <img key={piece.className} className={`hero-piece ${piece.className}`} src={piece.src} alt={piece.alt} />)}
      <span className="hero-portrait-name" aria-hidden="true">LiJing</span>
      <span className="hero-note note-love">Something I love</span>
      <span className="hero-note note-travel">Something that<br />needs travel</span>
      <span className="hero-note note-passion">Something I'm<br />passionate about!</span>
      <span className="hero-note note-pretty">Something pretty</span>
      <span className="hero-note note-made">Something made by me ;)</span>
      <span className="hero-note note-need">Something we all need</span>
      <span className="hero-note note-laugh">Something that<br />makes me laugh</span>
      <span className="hero-note note-artist">Something said by my<br />favorite artist</span>
      <span className="hero-note note-timeless">Something timeless…</span>
      <div className="hero-audio"><AudioWidget /></div>
    </section>
  );
}

function ScribbleTitle({ children, className = "" }) {
  return <h2 className={`scribble-title ${className}`}><span>{children}</span></h2>;
}

const repeatTracks = [
  {
    title: "特别的人",
    artist: "方大同",
    href: "https://music.163.com/#/search/m/?s=%E7%89%B9%E5%88%AB%E7%9A%84%E4%BA%BA%20%E6%96%B9%E5%A4%A7%E5%90%8C&type=1",
    tone: "special-person",
  },
  {
    title: "Landing Guy",
    artist: "刘昊霖, Kidult",
    href: "https://music.163.com/#/search/m/?s=Landing%20Guy%20%E5%88%98%E6%98%8A%E9%9C%96%20Kidult&type=1",
    tone: "landing-guy",
  },
  {
    title: "拥抱",
    artist: "五月天",
    href: "https://music.163.com/#/search/m/?s=%E6%8B%A5%E6%8A%B1%20%E4%BA%94%E6%9C%88%E5%A4%A9&type=1",
    tone: "embrace",
  },
];

function SpotifyTrackCard({ track, featured = false }) {
  return (
    <a
      className={`spotify-track-card spotify-track-${track.tone} ${featured ? "spotify-track-featured" : ""}`}
      href={track.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`在网易云音乐打开 ${track.title}`}
    >
      <span className="spotify-cover" aria-hidden="true"><span>♫</span></span>
      <span className="spotify-track-meta"><strong>{track.title}</strong><span>{track.artist}</span></span>
      <span className="spotify-brand" aria-hidden="true">●</span>
      <span className="spotify-play" aria-hidden="true">▶</span>
    </a>
  );
}

function ProjectCard({ project, navigate }) {
  return (
    <InnerLink to={`/works/${project.slug}`} navigate={navigate} className="project-card">
      <div className="project-cover-wrap"><img src={project.cover} alt={`${project.title} 封面`} /></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <span className="project-tag">{project.category}</span>
    </InnerLink>
  );
}

function WorksSection({ navigate, all = false }) {
  const shown = all ? projects : projects.slice(0, 4);
  return (
    <section className={`works-section ${all ? "works-page-section" : ""}`}>
      <ScribbleTitle>{all ? "Works" : "Selected Work"}</ScribbleTitle>
      <p className="handwritten section-subtitle">A collection of ideas, experiments, and stories<br />brought to life through design.</p>
      <div className="projects-grid">
        {shown.map((project) => <ProjectCard key={project.slug} project={project} navigate={navigate} />)}
      </div>
      {!all && <a className="resume-button" href="/assets/resume/lijing-uiux-resume.pdf" download aria-label="下载李晶的 UI/UX 设计师简历">Download Resume ↓</a>}
    </section>
  );
}

const contactRows = [
  { id: "email", label: "邮箱", value: "jlmsulrich@163.com" },
  { id: "phone", label: "电话/微信", value: "18701460361" },
];

function ContactSection() {
  const [copied, setCopied] = useState("");

  const copyContact = async (value, id) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      setCopied(id);
      window.setTimeout(() => setCopied((current) => current === id ? "" : current), 1600);
    } catch {
      setCopied("");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <img className="contact-eyes" src="/assets/home/8c7a333ae669e578.gif" alt="手绘眼睛" />
      <h2>Looking for a<br /><span>fresh</span> perspective?</h2>
      <p>I’m ready to bring my ideas and curiosity to your team.</p>
      <div className="contact-list">
        {contactRows.map(({ id, label, value }) => (
          <button key={id} type="button" onClick={() => copyContact(value, id)} aria-label={`复制${label}：${value}`}>
            <span>{label}</span><strong>{copied === id ? "已复制 ✓" : value}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function SiteFooter({ navigate }) {
  return (
    <footer className="site-footer">
      <InnerLink to="/" navigate={navigate}>LiJing</InnerLink>
      <p>© 2026 由 LiJing 设计。保留所有权利。</p>
    </footer>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <PortfolioNav navigate={navigate} active="/" />
      <HomeHero />
      <WorksSection navigate={navigate} />
      <ContactSection />
      <SiteFooter navigate={navigate} />
    </>
  );
}

function WorksPage({ navigate }) {
  return (
    <>
      <PortfolioNav navigate={navigate} active="/works" />
      <WorksSection navigate={navigate} all />
      <SiteFooter navigate={navigate} />
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <PortfolioNav navigate={navigate} active="/aboutme" />
      <main className="about-page">
        <section className="interests-section">
          <ScribbleTitle className="interests-title">My Interests</ScribbleTitle>
          <div className="interest-collage">
            {aboutInterests.map(([label, src, tilt, position], index) => (
              <figure key={label} className={`interest-polaroid ${tilt} interest-${index + 1}`}>
                <img src={src} alt={label} style={{ objectPosition: position }} />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="repeat-section">
          <ScribbleTitle>On Repeat</ScribbleTitle>
          <div className="spotify-grid">
            {repeatTracks.map((track, index) => <SpotifyTrackCard key={track.title} track={track} featured={index === 0} />)}
          </div>
        </section>
      </main>
      <SiteFooter navigate={navigate} />
    </>
  );
}

function MediaVideo({ src, className = "", loop = false, label }) {
  return <video className={className} src={src} controls={!loop} muted={loop} loop={loop} autoPlay={loop} playsInline aria-label={label} preload="metadata" />;
}

function SidequestsPage({ navigate }) {
  return (
    <>
      <PortfolioNav navigate={navigate} active="" />
      <ContactSection />
      <SiteFooter navigate={navigate} />
    </>
  );
}

function ProjectDetailPage({ project, navigate }) {
  const next = projects.find((item) => item.slug === project.next);
  const hasScreenGallery = project.screens?.length;
  return (
    <>
      <PortfolioNav navigate={navigate} active="" />
      <main className={`project-detail ${hasScreenGallery ? "project-detail--screen-gallery" : ""}`}>
        {hasScreenGallery ? (
          <section className="project-screen-gallery" aria-label={`${project.title} 项目页面`}>
            {project.screens.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`${project.title} 第 ${index + 1} 页`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </section>
        ) : (
          <>
            <header className="project-hero">
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <span>{project.category}</span>
            </header>
            <img className="detail-cover" src={project.cover} alt={`${project.title} 封面`} />
            <img className="case-study" src={project.caseStudy} alt={`${project.title} 完整案例研究`} />
            {project.video && (
              <div className="project-video-wrap"><MediaVideo src={project.video} label={`${project.title} 项目视频`} /></div>
            )}
          </>
        )}
        <nav className="project-pagination" aria-label="项目翻页">
          <InnerLink to="/works" navigate={navigate}>← 返回全部作品</InnerLink>
          {next && <InnerLink to={`/works/${next.slug}`} navigate={navigate}>{next.title} →</InnerLink>}
        </nav>
      </main>
      <ContactSection />
      <SiteFooter navigate={navigate} />
    </>
  );
}

function ProfilePanel({ setActiveTab }) {
  return (
    <main className="outer-profile-panel">
      <img src="/assets/wall/39f9baca42c859ff-profile_priyanka-r_20260825175627.avif" alt="LiJing" />
      <div>
        <span>正在寻找机会</span>
        <h2>LiJing</h2>
        <p>来自印度的视觉传达设计学生，拥有不到一年的专业经验，曾就职于 The Madras Branding Company。</p>
        <button onClick={() => setActiveTab("portfolio")}>查看作品集</button>
      </div>
    </main>
  );
}

function PortfolioSite({ route, navigate }) {
  const project = useMemo(() => {
    const slug = route.startsWith("/works/") ? route.split("/").filter(Boolean).pop() : null;
    return projects.find((item) => item.slug === slug);
  }, [route]);

  let page;
  if (route === "/works") page = <WorksPage navigate={navigate} />;
  else if (route === "/sidequests") page = <SidequestsPage navigate={navigate} />;
  else if (route === "/aboutme") page = <AboutPage navigate={navigate} />;
  else if (project) page = <ProjectDetailPage project={project} navigate={navigate} />;
  else page = <HomePage navigate={navigate} />;

  return (
    <>
      <div className="portfolio-scroller">
        <div className="portfolio-site">{page}</div>
      </div>
      <DotCursor />
    </>
  );
}

export function App() {
  const { route, navigate } = usePortfolioRoute();

  return (
    <main className="standalone-portfolio">
      <PortfolioSite route={route} navigate={navigate} />
      <div className="desktop-required">本复刻仅适配桌面网页端。</div>
    </main>
  );
}
