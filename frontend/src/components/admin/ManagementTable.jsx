// columns: [{ label: 'USER', width: '350fr' }, ...]
// rows:    [{ key: 'u1', cells: [node, node, ...] }]  (one cell per column, in order)
export default function ManagementTable({ columns, rows, emptyMessage = 'No results match your search.' }) {
  const template = columns.map((column) => column.width).join(' ')

  return (
    <div className="adm-table">
      <div className="adm-table-inner" role="table">
        <div className="adm-table-head" role="row" style={{ '--cols': template }}>
          {columns.map((column) => (
            <span key={column.label} role="columnheader">
              {column.label}
            </span>
          ))}
        </div>
        {rows.length === 0 && <p className="adm-table-empty">{emptyMessage}</p>}
        {rows.map((row) => (
          <div className="adm-table-row" role="row" key={row.key} style={{ '--cols': template }}>
            {row.cells.map((cell, index) => (
              <div key={columns[index].label} role="cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
