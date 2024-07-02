"use client";

import { FilterHealthData, HealthJSONData } from "@/types/types";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import utc from "dayjs/plugin/utc";
import {
  Toolbar,
  alpha,
  Typography,
  Tooltip,
  IconButton,
  Box,
  Button,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { jsonValidator } from "@/utils/helpers/jsonValidator";
import {
  IconCloudUpload,
  IconCloudDownload,
} from "@tabler/icons-react";
import HealthTableFilter from "./HealthTableFilter";

dayjs.extend(utc);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface HealthTableToolbarProps {
  numSelected: number;
  filter: FilterHealthData[];
  setFilter: React.Dispatch<React.SetStateAction<FilterHealthData[]>>;
  setBeginDate: React.Dispatch<React.SetStateAction<number>>;
  setEndDate: React.Dispatch<React.SetStateAction<number>>;
  handleDownload: () => void;
  downloadStatus: boolean;
  fetchDataWrapper: () => void;
}

export default function HealthTableToolbar(props: HealthTableToolbarProps) {
  const {
    numSelected,
    setBeginDate,
    setEndDate,
    filter,
    setFilter,
    handleDownload,
    downloadStatus,
    fetchDataWrapper,
  } = props;
  const { isAuthenticated, getToken, getPermission } = useKindeBrowserClient();
  const [openError, setOpenError] = React.useState(false);
  const [success, setSuccess] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");


  const handleErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const handleAPICall = async (jsonData: HealthJSONData) => {
    const csrfResp = await fetch("/csrf-token");
    const { csrfToken } = await csrfResp.json();
    try {
      const dataForm = new FormData();
      dataForm.set("data", JSON.stringify(jsonData));
      const fetchArgs = {
        method: "POST",
        headers: {},
        body: dataForm,
      };
      if (csrfToken)
        fetchArgs.headers = {
          "X-CSRF-Token": csrfToken,
          Authorization: getToken(),
        };
      const res = await fetch(`/api/upload`, fetchArgs);
      const data = await res.json();
      if (data.status == 200) {
        setErrorMessage("Succesfully upload data.");
        setSuccess(true);
        setOpenError(true);
        fetchDataWrapper();
      } else {
        setErrorMessage("Failed to upload.");
        setSuccess(false);
        setOpenError(true);
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      let json: JSON;

      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          try {
            json = JSON.parse(e.target.result as string);
            const valid = await jsonValidator(json);
            if (valid) {
              handleAPICall(json as unknown as HealthJSONData);
            } else {
              setErrorMessage("Failed to upload.");
              setSuccess(false);
              setOpenError(true);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      };
      reader.readAsText(file);
    }
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ pr: 1 }}>
            <DateTimePicker
              label="Begin UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              timezone="UTC"
              minDate={dayjs.unix(1704088800)}
              maxDate={dayjs()}
              onChange={(newDate) =>
                newDate
                  ? setBeginDate(newDate.unix())
                  : setBeginDate(dayjs(0).unix())
              }
            />
          </Box>
          <Box sx={{ pl: 1, pr: 1 }}>
            <DateTimePicker
              label="End UTC"
              views={["year", "day", "hours", "minutes", "seconds"]}
              minDate={dayjs.unix(1704088800)}
              maxDate={dayjs()}
              timezone="UTC"
              onChange={(newDate) =>
                newDate
                  ? setEndDate(newDate.unix())
                  : setEndDate(dayjs().unix())
              }
            />
          </Box>
          <Box flexGrow={1} />
        </LocalizationProvider>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Download">
          <IconButton onClick={handleDownload} disabled={downloadStatus}>
            <IconCloudDownload />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {isAuthenticated && getPermission("data-upload")?.isGranted && (
            <Box sx={{ m: 1 }}>
              <Button
                color="primary"
                component="label"
                variant="contained"
                startIcon={<IconCloudUpload />}
              >
                Upload Data
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  accept="application/json,application/gzip"
                />
              </Button>
              <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                {success ? (
                  <Alert
                    onClose={handleErrorClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    <AlertTitle>Success</AlertTitle>
                    {errorMessage}
                  </Alert>
                ) : (
                  <Alert
                    onClose={handleErrorClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                  </Alert>
                )}
              </Snackbar>
            </Box>
          )}

          <HealthTableFilter filter={filter} setFilter={setFilter}/>
        </>
      )}
    </Toolbar>
  );
}
