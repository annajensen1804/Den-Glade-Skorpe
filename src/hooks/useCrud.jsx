import { serverPath } from "../settings";
import { useRevalidator } from "react-router";
import { useAuthContext } from "../context/useAuthContext";

export const useCrud = () => {
  const { token } = useAuthContext();
  const revalidator = useRevalidator();

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const buildRequest = (method, body) => {
    if (body instanceof FormData) {
      return { method, headers: { ...authHeader }, body };
    }
    return {
      method,
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify(body),
    }
  }

  const create = async (endpoint, body) => {
    const res = await fetch(`${serverPath}/${endpoint}`, buildRequest("POST", body));
    if (!res.ok) throw new Error("Kunne ikke oprette");
    revalidator.revalidate();
  }

  const update = async (endpoint, body) => {
    const res = await fetch(`${serverPath}/${endpoint}`, buildRequest("PUT", body));
    if (!res.ok) throw new Error("Kunne ikke opdatere");
    revalidator.revalidate();
  }

  const remove = async (endpoint, id) => {
    if (!window.confirm("Er du dikker?")) return;
    const res = await fetch(
      `${serverPath}/${endpoint}/${id}`, { 
        method: "DELETE",
      ...authHeader
    }
    );
    if (!res.ok) throw new Error("Kunne ikke slette");
    revalidator.revalidate();
  };

  return { create, update, remove }
};