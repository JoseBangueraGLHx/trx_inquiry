export function stylesApplyButton(validated) {
  return {
    backgroundColor: validated ? "#F5F5F5" : "#fadb14",
    borderColor: validated ? "#F5F5F5" : "#fadb14",
    color: validated ? "#8c8c8c" : "#000",
    cursor: validated ? "not-allowed" : "pointer",
    marginRight: 8,
  };
}
