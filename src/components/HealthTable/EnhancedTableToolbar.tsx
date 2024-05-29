import { Data } from "@/types/types";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Toolbar,
  alpha,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import * as React from "react";

interface EnhancedTableToolbarProps {
  numSelected: number;
  rows: Data[];
  selected: readonly number[];
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, rows, selected } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Health Data
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Download">
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            id="basic-menu"
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle>Filter</DialogTitle>
            <DialogContent></DialogContent>
          </Dialog>
        </>
      )}
    </Toolbar>
  );
}
