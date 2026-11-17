import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Reusable search input used across listing screens.
 */
function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  label = 'Search',
}) {
  return (
    <TextField
      size="small"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      sx={{ minWidth: { xs: '100%', sm: 260 }, flex: 1 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchBar;
