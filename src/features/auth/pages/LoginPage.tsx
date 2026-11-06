import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../../../lib/api/client";
import { authApi } from "../../../lib/api/endpoints";
import { Button } from "../../../components/Button";
import { AuthLayout } from "../components/AuthLayout";

export function LoginPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    authApi.me().then(() => { if (active) navigate("/dashboard", { replace: true }); }).catch(() => undefined);
    return () => { active = false; };
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const identity = String(formData.get("emailOrName") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    setMessage(""); setBusy(true);
    try {
      await authApi.login({ EmailOrName: identity, Password: password });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage(error instanceof ApiError && error.status === 401 ? "Usuário ou senha inválidos." : error instanceof Error ? error.message : "Não foi possível entrar. Tente novamente.");
    } finally { setBusy(false); }
  }

  return (
    <div className="auth-page login-page">
      <AuthLayout eyebrow="BOM TER VOCÊ DE VOLTA" title={<>Seu próximo<br /><em>movimento.</em></>} description="Acesse sua conta para explorar o catálogo e continuar sua jornada como duelista." formEyebrow="ACESSO À PLATAFORMA" formTitle="Bem-vindo de volta." formDescription="Entre com seu e-mail ou nome de usuário." footer={<p className="auth-switch">Ainda não tem conta? <Link to="/cadastro">Criar conta</Link></p>}>
        <form className="standalone-login" onSubmit={handleSubmit}>
          <label htmlFor="login-identity">E-mail ou nome de usuário</label>
          <input id="login-identity" name="emailOrName" autoComplete="username" required placeholder="E-mail ou nome de usuário" />
          <label htmlFor="login-password">Senha</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" required placeholder="Sua senha" />
          <div className="form-message" role="status" aria-live="polite">{message}</div>
          <Button type="submit" busy={busy} busyLabel="Entrando" className="button-wide"><span>Entrar</span><span>↗</span></Button>
        </form>
      </AuthLayout>
    </div>
  );
}
