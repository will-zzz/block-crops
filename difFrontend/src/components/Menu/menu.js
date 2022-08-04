import React, { useState } from "react";
import { MenuExpanded } from "./styled";
import { Card, CardContent, Grid, Fade, Typography } from "@mui/material";
import Button from "../Button/button";

export default function Menu() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const plants = [
    { name: "wheat", owned: 23 },
    { name: "tomato", owned: 5 },
    { name: "blueberry", owned: 8 },
    { name: "pumpkin", owned: 11 },
    { name: "corn", owned: 15 },
  ];

  return (
    <>
      <Fade direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <MenuExpanded elevation={3}>
          <Grid container>
            {plants.map((plant) => (
              <Grid item lg={3} key={plant.name}>
                <Card>
                  <CardContent>{plant.name}</CardContent>
                </Card>
                <Typography
                  textAlign="center"
                  variant="body2"
                  sx={{ marginTop: 1 }}
                >
                  Owned: {plant.owned}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </MenuExpanded>
      </Fade>
      {isMenuOpen ? (
        <Button
          variant="outlined"
          label="Exit"
          onClick={() => setMenuOpen(false)}
        />
      ) : (
        <Button
          variant="contained"
          label="Menu"
          onClick={() => setMenuOpen(true)}
        />
      )}
    </>
  );
}
