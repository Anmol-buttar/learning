import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';

/**
 * Shared page header with title, subtitle, and primary action.
 */
function PageHeader({ title, subtitle = '', onAdd, addLabel = 'Add' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            flexShrink: 0,
          }}
        >
          <BusinessIcon />
        </Box>
        <Box>
          <Typography variant="h5" component="h1" fontWeight={700} color="text.primary">
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </Box>

      {onAdd ? (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{ textTransform: 'none', fontWeight: 600, px: 2.5 }}
        >
          {addLabel}
        </Button>
      ) : null}
    </Box>
  );
}

export default PageHeader;
