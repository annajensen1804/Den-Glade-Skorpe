// ─────────────────────────────────────────────────────────────────────────
// TODO (code-along): CRUD-hook til backoffice
//
// Læsning sker via loaders (DataLoaders.jsx). Denne hook håndterer de
// handlinger, der ÆNDRER data. Med modaler bruger vi update() til redigering:
//
//   create(endpoint, formData) → POST   (dish/employee, sendes som FormData)
//   update(endpoint, body)     → PUT    (dish/employee = FormData, order = JSON)
//   remove(endpoint, id)       → DELETE, med SweetAlert-bekræftelse først
//   placeOrder(orderData)      → POST /order (JSON) — bruges fra kurven
//
// Nyttige byggeklodser:
//   - const { token } = useAuthContext();  // login er allerede bygget
//   - const revalidator = useRevalidator(); // revalidator.revalidate() genindlæser
//     loaderen, så listerne opdaterer sig selv efter create/update/delete
//   - toast.success/error (react-toastify) til feedback
//   - Authorization: `Bearer ${token}` på de beskyttede kald
//   - serverPath fra "../settings"
//
// Bemærk: modalen lukkes af formularen selv (onClose) EFTER at create/update
// er lykkedes — useCrud kalder bare revalidate() + toast.
// ─────────────────────────────────────────────────────────────────────────

import { useAuthContext} from "../context/useAuthContext";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router";

const useCrud = () => {

  const revalidator = useRevalidator(); 
  // TODO: implementér create, update, remove og placeOrder
  
  const serverPath = `http://localhost:3042`;
  const { token } = useAuthContext();
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const create = async (endpoint, formData) => {
    try {
      const response = await fetch(`${serverPath}/${endpoint}`, {
      method: "POST",
      body: formData,
      headers: authHeader,
    });
    
    if (!response.ok) {
      throw new Error("Fejl ved oprettelse");
    }
      toast.success("Oprettet!");
      revalidator.revalidate();
      return await response.json();
      
    } catch (error) {
      toast.error("Der skete en fejl");
      throw error;
    }
};

const remove = async (endpoint, id) => {
  try {
    const res = await fetch(`${serverPath}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: authHeader,
    });
    
    if (!res.ok) {
      throw new Error("Kunne ikke slette");
    }

    toast.success("Slettet!");
    revalidator.revalidate();
    return await res.json();

  } catch (error) {
    toast.error("Der skete en fejl");
    throw error;
  }
}

const update = async (endpoint, formData) => {
  try {
    const res = await fetch(`${serverPath}/${endpoint}`, {
      method: "PUT",
      headers: authHeader,
      body: formData,
    })

    if(!res.ok) {
      throw new Error("Kunne ikke opdatere")
    }

    toast.success("Opdateret!")
    revalidator.revalidate();
    return await res.json();

  } catch (error) {
    toast.error("Kunne ikke opdatere");
    throw error;
  }
}

  return {
    create,
    update,
    remove,
    isLoading: false,
    error: null,
  };
};

export { useCrud };

