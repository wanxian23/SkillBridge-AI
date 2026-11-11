import Field from './Field'

// filterOptions: first entry should be the "all" option, e.g. { value: 'all', label: 'All skills' }
export default function SearchFilterBar({
  query,
  onQueryChange,
  searchPlaceholder,
  filter,
  onFilterChange,
  filterOptions,
}) {
  return (
    <div className="adm-filters">
      <Field
        label="Search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={searchPlaceholder}
        autoComplete="off"
      />
      <Field
        label="Filter"
        as="select"
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
        options={filterOptions}
      />
    </div>
  )
}
