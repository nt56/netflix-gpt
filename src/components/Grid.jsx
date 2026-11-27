// Responsive grid. Pass "columns" to change the column classes.
const Grid = ({
  columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  children,
}) => <div className={`grid gap-3 sm:gap-4 ${columns}`}>{children}</div>;

export default Grid;
