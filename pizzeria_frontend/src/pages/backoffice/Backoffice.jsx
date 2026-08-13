import styles from "./backoffice.module.css";

import { useState } from "react";
import { useLoaderData } from "react-router";
import { useCrud } from "../../hooks/useCrud";

import DishesSection from "./components/DishesSection";
import Modal from "../../components/modal/Modal";
import DishForm from "./forms/DishForm";
import DishEditForm from "./forms/DishEditForm";
import EmployeesSection from "./components/EmployeesSection";
import EmployeeForm from "./forms/EmployeeForm";
import EmployeeEditForm from "./forms/EmployeeEditForm";
import OrdersSection from "./components/OrdersSection";
import OrderEditForm from "./forms/OrderEditForm";
import MessagesSection from "./components/MessagesSection";
import ConfirmationForm from "./forms/ConfirmationForm";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Backoffice = () => {
  const { remove } = useCrud();

  const { dishes, ingredients, categories, employees, orders, messages } =
    useLoaderData();
  const [modal, setModal] = useState(null);

  /* Tab state: dishes er åbne som default */
  const [activeTab, setActiveTab] = useState("dishes");

  const close = () => setModal(null);

  // Bekræftelse funktion
  const handleConfirmAction = async () => {
    if (modal?.onConfirm) {
      try {
            await modal.onConfirm();
      } catch (error) {
        console.error("Action failed:", error);
      }
    }
    close();
  };

  // Titler til vores modal vinduer
  const titles = {
    "dish-add": "Tilføj ret",
    "dish-edit": "Rediger ret",
    "employee-add": "Tilføj medarbejder",
    "employee-edit": "Rediger medarbejder",
    "order-edit": "Rediger ordre",
    "confirm-delete": "Bekræft sletning",
  };

  return (
    <article className="backoffice">
      <h1>DASHBOARD</h1>

      <div className="backoffice-tabs">
        <button
          type="button"
          className={`${styles["tab-button"]} ${activeTab === "dishes" ? styles.active : ""}`}
          onClick={() => setActiveTab("dishes")}
        >
          Retter
        </button>

        <button
          type="button"
          className={`${styles["tab-button"]} ${activeTab === "employees" ? styles.active : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          Medarbejdere
        </button>

        <button
          type="button"
          className={`${styles["tab-button"]} ${activeTab === "orders" ? styles.active : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Bestillinger
        </button>

        <button
          type="button"
          className={`${styles["tab-button"]} ${activeTab === "messages" ? styles.active : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Beskeder
        </button>
      </div>

      <div className="backoffice-content">
        {activeTab === "dishes" && (
          <DishesSection
            dishes={dishes}
            /* Callback functions */
            onAdd={() => setModal({ type: "dish-add" })}
            onEdit={(dish) => setModal({ type: "dish-edit", item: dish })}
            onDelete={(dish) =>
              setModal({
                type: "confirm-delete",
                message: `Er du sikker på, at du vil slette "${dish.title}"?`,
                onConfirm: () => remove("dish", dish._id),
              })
            }
          />
        )}

        {activeTab === "employees" && (
          <EmployeesSection
            employees={employees}
            onAdd={() => setModal({ type: "employee-add" })}
            onEdit={(employee) =>
              setModal({ type: "employee-edit", item: employee })
            }
            onDelete={(employee) =>
              setModal({
                type: "confirm-delete",
                message: `Er du sikker på, at du vil slette "${employee.name}"?`,
                onConfirm: () => remove("employee", employee._id),
              })
            }
          />
        )}

        {activeTab === "orders" && (
          <OrdersSection
            orders={orders}
            dishes={dishes}
            onEdit={(order) => setModal({ type: "order-edit", item: order })}
            onDelete={(order) =>
              setModal({
                type: "confirm-delete",
                message: `Er du sikker på, at du vil slette ordre # ${order._id}?`,
                onConfirm: () => remove("order", order._id),
              })
            }
          />
        )}

        {activeTab === "messages" && (
          <MessagesSection
            messages={messages}
            onEdit={(message) =>
              setModal({ type: "message-edit", item: message })
            }
            onDelete={(message) =>
              setModal({
                type: "confirm-delete",
                message: `Er du sikker på, at du vil slette "${message.name}"?`,
                onConfirm: () => remove("message", message._id),
              })
            }
          />
        )}
      </div>

      <Modal
        isOpen={!!modal}
        onClose={close}
        /* Ternary condition */
        title={modal ? titles[modal.type] : ""}
      >
        {modal?.type?.startsWith("confirm-") && (
          <ConfirmationForm
            message={modal.message}
            onConfirm={handleConfirmAction}
            onCancel={close}
          />
        )}

        {modal?.type === "dish-add" && (
          <DishForm
            categories={categories}
            ingredients={ingredients}
            onClose={close}
          />
        )}
        {modal?.type === "dish-edit" && (
          <DishEditForm
            dish={modal.item}
            categories={categories}
            ingredients={ingredients}
            onClose={close}
          />
        )}

        {modal?.type === "employee-add" && <EmployeeForm onClose={close} />}
        {modal?.type === "employee-edit" && (
          <EmployeeEditForm employee={modal.item} onClose={close} />
        )}

        {modal?.type === "order-edit" && (
          <OrderEditForm order={modal.item} dishes={dishes} onClose={close} />
        )}
      </Modal>

      <ToastContainer position="bottom-center" autoClose={3000} theme="light" />

    </article>
  );
};

export default Backoffice;