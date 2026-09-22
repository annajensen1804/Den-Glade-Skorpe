import { serverPath } from "../settings";
import { useRevalidator } from "react-router";

export const useCrud = () => {
  const revalidator = useRevalidator();

  const buildRequest = (method, body) => {
    if (body instanceof FormData) {
      return { method, body };
    }
    return {
      method,
      headers: { "Content-Type": "application/json" },
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
      `${serverPath}/${endpoint}/${id}`, { method: "DELETE"}
    );
    if (!res.ok) throw new Error("Kunne ikke slette");
    revalidator.revalidate();
  };

  return { create, update, remove }
};