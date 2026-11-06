import { Link } from "react-router-dom";
import { Brand } from "../../../components/Brand";

export function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <Brand />
        <nav className="landing-nav" aria-label="Navegação principal"><a href="#sobre">A plataforma</a><a href="#como-funciona">Como funciona</a></nav>
        <div className="landing-actions"><Link className="landing-login" to="/login">Entrar</Link><Link className="button button-primary landing-signup" to="/cadastro">Criar conta <span>↗</span></Link></div>
      </header>
      <main>
        <section className="landing-hero" id="sobre">
          <div className="hero-copy"><span className="eyebrow"><span className="hero-dot" /> O SEU ESPAÇO, DUELISTA</span><h1>Seu universo de<br />duelo, <em>em um só lugar.</em></h1><p>O WebYugi é uma plataforma para explorar cartas e dar os primeiros passos na organização dos seus decks. Entre, conheça o catálogo e acompanhe a evolução do projeto.</p><div className="hero-actions"><Link className="button button-primary" to="/cadastro">Começar agora <span>↗</span></Link><Link className="hero-secondary" to="/login">Já tenho uma conta <span>→</span></Link></div><div className="hero-note"><span className="hero-note-icon">✦</span><span>Feito para quem vive o duelo.<br /><small>Um projeto em constante evolução.</small></span></div></div>
          <div className="hero-art" aria-label="Ilustração abstrata inspirada em cartas e duelos"><div className="art-halo" /><div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" /><div className="duel-card-back card-back-one"><span className="card-inner"><span className="card-star">✦</span><span className="card-lines" /><span className="card-seal">WY</span></span></div><div className="duel-card-back card-back-two"><span className="card-inner"><span className="card-star">✧</span><span className="card-lines" /><span className="card-seal">WY</span></span></div><div className="art-center"><span className="center-mark">W</span><span>WEBYUGI</span></div><span className="art-label label-top">CATÁLOGO DE CARTAS</span><span className="art-label label-bottom">SUA JORNADA COMEÇA AQUI</span></div>
        </section>
        <section className="landing-details" id="como-funciona"><div className="details-heading"><span className="eyebrow">EXPLORE. ORGANIZE. EVOLUA.</span><h2>Um ponto de partida<br />para sua próxima estratégia.</h2></div><div className="details-grid"><article className="detail-card"><span className="detail-index">01</span><span className="detail-icon">▧</span><h3>Explore o catálogo</h3><p>Consulte as cartas já cadastradas na plataforma e descubra os detalhes de cada uma.</p></article><article className="detail-card"><span className="detail-index">02</span><span className="detail-icon">⌘</span><h3>Tenha seu espaço</h3><p>Crie sua conta e acesse uma área dedicada ao seu perfil de duelista.</p></article><article className="detail-card"><span className="detail-index">03</span><span className="detail-icon">✦</span><h3>Acompanhe o projeto</h3><p>O WebYugi está sendo construído para ampliar, passo a passo, as ferramentas para a comunidade.</p></article></div></section>
      </main>
      <footer className="landing-footer"><Brand /><span>Uma plataforma feita para duelistas.</span><div><Link to="/login">Entrar</Link><Link to="/cadastro">Criar conta</Link></div></footer>
    </div>
  );
}
