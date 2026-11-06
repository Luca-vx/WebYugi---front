import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../../../lib/api/client";
import { authApi } from "../../../lib/api/endpoints";
import { Button } from "../../../components/Button";
import { AuthLayout } from "../components/AuthLayout";

export function SignupPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    if (!name || !email || !password.trim()) { setMessage("Preencha todos os campos."); return; }

    setBusy(true); setMessage("");
    let accountCreated = false;
    try {
      await authApi.signup({ Name: name, Email: email, Senha: password });
      accountCreated = true;
      setMessageType("success"); setMessage("Conta criada. Autenticando…");
      await authApi.login({ EmailOrName: email, Password: password });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessageType("error");
      if (accountCreated) {
        setMessage("A conta foi criada, mas não foi possível autenticar. Acesse o login para entrar.");
      } else if (error instanceof ApiError && error.status === 409) {
        setMessage("Esse e-mail ou nome de usuário já está cadastrado.");
      } else {
        setMessage(error instanceof Error ? error.message : "Não foi possível criar a conta. Tente novamente.");
      }
    } finally { setBusy(false); }
  }

  return (
    <div className="auth-page signup-page">
      <AuthLayout eyebrow="SUA PRÓXIMA JOGADA COMEÇA AQUI" title={<>Construa seu<br /><em>próprio legado.</em></>} description="Organize suas cartas e acompanhe seu universo de duelos em um só lugar." formEyebrow="CRIE SUA CONTA" formTitle="Entre para o duelo." formDescription="Crie seu acesso para começar a organizar sua coleção." footer={<p className="auth-switch">Já tem uma conta? <Link to="/login">Acessar plataforma</Link></p>}>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Nome de usuário</label>
          <input id="signup-name" name="name" autoComplete="username" required placeholder="Como podemos te chamar?" />
          <label htmlFor="signup-email">E-mail</label>
          <input id="signup-email" name="email" type="email" autoComplete="email" required placeholder="voce@exemplo.com" />
          <label htmlFor="signup-password">Senha</label>
          <input id="signup-password" name="password" type="password" autoComplete="new-password" required placeholder="Digite sua senha" />
          <div className={`form-message ${messageType === "success" ? "success" : ""}`} role="status" aria-live="polite">{message}</div>
          <Button type="submit" busy={busy} busyLabel="Criando conta" className="button-wide"><span>Criar conta</span><span>↗</span></Button>
        </form>
      </AuthLayout>
    </div>
  );
}
