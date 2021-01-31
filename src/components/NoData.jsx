import { Card, CardContent, Typography, Paper } from "@material-ui/core";
import React from "react";

const NoData = () => {
  return (
    <>
      <Paper mt={2}>
        <Card>
          <CardContent style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">0 Results found.</Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default NoData;
