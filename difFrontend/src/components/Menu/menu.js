import React, { useState } from "react";
import { MenuExpanded } from "./styled";
import { Card, CardContent, Grid, Fade, Typography } from "@mui/material";
import Button from "../Button/button";

export default function Menu(props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const plants = [
    { name: "wheat", owned: 23, id: 1 },
    { name: "corn", owned: 5, id: 2 },
    { name: "potato", owned: 8, id: 3 },
    { name: "strawberry", owned: 11, id: 4 },
  ];

  return (
    <>
      <Fade direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <MenuExpanded elevation={3}>
          <Grid container>
            {plants.map((plant) => (
              <Grid item lg={3} key={plant.name}>
                <Card onClick={props.setCropInt(plant.id)}>
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
