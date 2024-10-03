import React from "react";

function Todo({
  id,
  title,
  description,
  mongoId,
  complete,
  deleteTodo,
  completeTodo,
}) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {id}{" "}
        {/* Affiche l'ID MongoDB, ou utilisez un autre identifiant significatif */}
      </td>
      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>{title}</td>
      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4">{complete ? "Completed" : "Pending"}</td>
      <td className="px-6 py-4 flex gap-1">
        <button
          type="button" // Spécifiez le type du bouton
          onClick={() => deleteTodo(mongoId)}
          className="py-2 px-4 bg-red-500 text-white rounded"
          aria-label={`Delete todo ${title}`} // Accessibilité
        >
          Delete
        </button>
        <button
          type="button"
          className={`py-2 px-4 bg-green-500 text-white rounded ${
            complete ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label={`Mark todo ${title} as done`}
          onClick={() => !complete && completeTodo(mongoId)} // Prevent action if complete
        >
          Done
        </button>
      </td>
    </tr>
  );
}

export default Todo;
