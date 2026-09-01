// Función de utilidad para obtener estilos de botón según el estado de validación.
// - validated: si true, el botón se muestra deshabilitado visualmente.
export function stylesApplyButton(validated) {
  return {
    backgroundColor: validated ? "#F5F5F5" : "#fadb14",
    borderColor: validated ? "#F5F5F5" : "#fadb14",
    color: validated ? "#8c8c8c" : "#000",
    cursor: validated ? "not-allowed" : "pointer",
    marginRight: 8,
  };
}
