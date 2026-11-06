export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "credentials">;

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(`/api${path}`, { ...options, headers, credentials: "include" });
  } catch {
    throw new ApiError("Não foi possível conectar à API. Confirme se o backend está em execução.", 0);
  }

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("content-type") ?? "";
  const payload: unknown = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const body = payload as { message?: string; title?: string } | string;
    const message = typeof body === "string" ? body : body?.message ?? body?.title;
    throw new ApiError(message || `A solicitação falhou (${response.status}).`, response.status);
  }

  return payload as T;
}
