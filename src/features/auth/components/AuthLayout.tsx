import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Brand } from "../../../components/Brand";

interface AuthLayoutProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  formEyebrow: string;
  formTitle: string;
  formDescription: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ eyebrow, title, description, formEyebrow, formTitle, formDescription, children, footer }: AuthLayoutProps) {
  return (
    <main className="auth-shell">
      <section className="auth-aside">
        <Brand />
        <div className="aside-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
        <div className="aside-foot"><span className="orb orb-one" /><span className="orb orb-two" /><span className="aside-line" /><small>Uma plataforma feita para duelistas.</small></div>
      </section>
      <section className="auth-main">
        <div className="auth-card">
          <Link className="back-link" to="/">← Página inicial</Link>
          <span className="mobile-brand"><Brand /></span>
          <span className="eyebrow">{formEyebrow}</span><h2>{formTitle}</h2><p className="muted">{formDescription}</p>
          {children}{footer}
          <p className="fine-print">Suas credenciais são enviadas diretamente à API da plataforma.</p>
        </div>
      </section>
    </main>
  );
}
