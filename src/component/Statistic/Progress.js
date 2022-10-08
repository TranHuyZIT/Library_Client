import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size="100px"
        variant="determinate"
        value={props.value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="h6" color="text.secondary">
          {`${props.progress.toFixed(1)} sao`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic({ progress, value }) {
  return (
    <CircularProgressWithLabel
      variant="determinate"
      value={value}
      progress={progress}
    />
  );
}
