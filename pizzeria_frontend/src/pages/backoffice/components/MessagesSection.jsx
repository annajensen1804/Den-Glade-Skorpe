// TODO (code-along): Vis alle beskeder i en tabel.
//   - Props fra Backoffice: messages.
//   - Kolonner: navn, emne, besked, handlinger.
//   - "Læs" kan afsløre teksten (lokal useState — behøver ikke gemmes i backend).
//   - "Slet" → remove("message", message._id) fra useCrud
//   (Beskeder har ingen rediger-formular, så ingen modal her.)

import { useState } from "react";
import { useCrud } from "../../../hooks/useCrud";
import Button from "../../../components/button/Button";

const MessagesSection = ({ messages, onDelete }) => {
  const { remove } = useCrud();

  const [expandedMessages, setExpandedMessages] = useState({});
  const [readMessages, setReadMessages] = useState({});

   const handleReadClick = (id) => {
     setExpandedMessages((prev) => ({
       ...prev,
       [id]: !prev[id],
     }));

     setReadMessages((prev) => ({
       ...prev,
       [id]: true,
     }));
   };

  return (
    <section className="table-container">
      <h2>Beskeder</h2>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Emne</th>
            <th>Status</th>
            <th>Besked</th>
            <th>Handlinger</th>
          </tr>
        </thead>

        <tbody>

          {messages.map((message) => {
            const isExpanded = expandedMessages[message._id];
            const isRead = readMessages[message._id];

            const shortText =
              message.description && message.description.length > 50
                ? `${message.message.substring(0, 50)}...`
                : message.description;

          return (
            
            <tr key={message._id}>
              <td>{message.name}</td>

              <td>{message.subject}</td>

              <td>
                  <span className={`status-badge ${isRead ? "read" : "unread"}`}>
                    {isRead ? "Læst" : "Ulæst"}
                  </span>
                </td>

                <td>
                  {isExpanded ? message.description : shortText}
                </td>

              <td>
                <Button
                  buttonText={isExpanded ? "Skjul" : "Læs"}
                  variant="small"
                  onClick={() => handleReadClick(message._id)}
                />
                <Button
                  buttonText="Slet"
                  variant="red"
                  onClick={() => onDelete(message)}
                />
              </td>
            </tr>
          );
})}
        </tbody>
      </table>
    </section>
  );
};

export default MessagesSection;
