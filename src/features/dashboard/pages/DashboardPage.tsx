import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brand } from "../../../components/Brand";
import { CatalogCard } from "../components/CatalogCard";
import { ApiError } from "../../../lib/api/client";
import { authApi, cardsApi } from "../../../lib/api/endpoints";
import type { CardDto, UserDto } from "../../../types/api";

export function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDto | null>(null);
  const [cards, setCards] = useState<CardDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardsError, setCardsError] = useState("");
  const [pageError, setPageError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadDashboard() {
      try {
        const currentUser = await authApi.me();
        if (!active) return;
        setUser(currentUser);
        try {
          const catalog = await cardsApi.list();
          if (active) setCards(catalog);
        } catch (error) {
          if (active) setCardsError(error instanceof Error ? error.message : "Não foi possível carregar o catálogo.");
        }
      } catch (error) {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) navigate("/login", { replace: true });
        else setPageError(error instanceof Error ? error.message : "Não foi possível validar sua sessão.");
      } finally { if (active) setLoading(false); }
    }
    void loadDashboard();
    return () => { active = false; };
  }, [navigate]);

  async function handleLogout() {
    setLoggingOut(true);
    try { await authApi.logout(); navigate("/", { replace: true }); }
    catch (error) { setPageError(error instanceof Error ? error.message : "Não foi possível encerrar a sessão."); }
    finally { setLoggingOut(false); }
  }

  if (loading || !user) {
    return <main className="dashboard-loading"><div className="loading-mark">W</div><p>{pageError || "Verificando sua sessão…"}</p>{pageError && <Link className="button button-primary" to="/login">Voltar ao login</Link>}</main>;
  }

  return (
    <div className="dashboard-page"><div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <Brand /><div className="side-label">ESPAÇO DO DUELISTA</div>
        <nav className="nav-list" aria-label="Navegação da plataforma"><a className="nav-link active" href="#inicio" onClick={() => setMenuOpen(false)}><span>⌂</span> Visão geral</a><a className="nav-link" href="#cartas" onClick={() => setMenuOpen(false)}><span>▧</span> Catálogo de cartas</a><a className="nav-link" href="#conta" onClick={() => setMenuOpen(false)}><span>◉</span> Minha conta</a></nav>
        <div className="side-bottom"><div className="duel-card"><span className="duel-glyph">✦</span><strong>Seu próximo deck<br />começa aqui.</strong><span className="duel-caption">Explore o catálogo de cartas</span><a href="#cartas" className="text-link" onClick={() => setMenuOpen(false)}>Ver catálogo <span>↗</span></a></div><span className="side-version">WEBYUGI · CENTRAL DO DUELISTA</span></div>
      </aside>
      {menuOpen && <button className="sidebar-backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
      <main className="main-area"><header className="topbar"><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">☰</button><div className="breadcrumb">WebYugi <span>/</span> <strong>Visão geral</strong></div><div className="top-actions"><span className="status-dot" /><span className="api-status">Conectado</span><Link to="/" className="top-link">Página inicial</Link></div></header>
        <div className="content-wrap" id="inicio"><section className="welcome-row"><div><span className="eyebrow">CENTRAL DO DUELISTA</span><h1>Olá, {user.name}.</h1><p className="muted">Sua central de cartas e decks está pronta.</p></div><div className="user-chip"><span className="avatar">{user.name.trim().charAt(0).toUpperCase()}</span><span><strong>{user.name}</strong><small>{user.email}</small></span><button className="icon-button" onClick={() => void handleLogout()} disabled={loggingOut} title="Sair" aria-label="Sair">↗</button></div></section>
          {pageError && <p className="dashboard-error" role="alert">{pageError}</p>}
          <section className="overview-grid" aria-label="Resumo da plataforma"><article className="metric-card"><div className="metric-top"><span className="metric-label">CARTAS NO CATÁLOGO</span><span className="metric-symbol">▧</span></div><strong className="metric-value">{cardsError ? "—" : cards.length.toLocaleString("pt-BR")}</strong><span className="metric-note">{cardsError ? "Catálogo indisponível" : cards.length ? "Disponíveis no catálogo" : "Nenhuma carta cadastrada ainda"}</span></article><article className="metric-card metric-accent"><div className="metric-top"><span className="metric-label">SUA COLEÇÃO</span><span className="metric-symbol">✦</span></div><strong className="metric-value metric-text">Pronta para crescer</strong><span className="metric-note">Explore as cartas disponíveis</span></article><article className="metric-card"><div className="metric-top"><span className="metric-label">DUELISTA</span><span className="metric-symbol">◉</span></div><strong className="metric-value metric-text">Acesso ativo</strong><span className="metric-note">Conta #{user.id}</span></article></section>
          <section className="lower-grid"><article className="panel catalog-panel" id="cartas"><div className="section-heading"><div><span className="eyebrow">BIBLIOTECA</span><h2>Catálogo de cartas</h2><p className="muted">Cartas cadastradas na plataforma.</p></div><span className="count-pill">{cardsError ? "—" : cards.length}</span></div>{cardsError ? <div className="empty-state" role="status">{cardsError}</div> : cards.length === 0 ? <div className="empty-state">O catálogo ainda não tem cartas cadastradas.</div> : <div className="card-grid">{cards.slice(0, 6).map(card => <CatalogCard card={card} key={card.id} />)}</div>}</article>
            <article className="panel account-panel" id="conta"><div className="section-heading"><div><span className="eyebrow">PERFIL</span><h2>Minha conta</h2></div><span className="panel-icon">◉</span></div><div className="account-content"><div className="account-row"><span>Nome de usuário</span><strong>{user.name}</strong></div><div className="account-row"><span>E-mail</span><strong>{user.email}</strong></div><div className="account-row"><span>Cadastro</span><strong>{user.dataCadastro ? new Date(user.dataCadastro).toLocaleDateString("pt-BR") : "—"}</strong></div></div><div className="account-foot"><span className="status-dot" /><span>Sessão autenticada</span></div></article>
          </section><footer className="page-footer"><span>WEBYUGI <span className="footer-sep">/</span> Gestão de cartas e decks</span><span>Feito para quem vive o duelo.</span></footer>
        </div>
      </main>
    </div></div>
  );
}
