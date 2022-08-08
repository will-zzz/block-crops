import React, { useState } from "react";
import { MenuExpanded } from "./styled";
import { Card, CardContent, Grid, Fade, Typography } from "@mui/material";
import Button from "../Button/button";
import { ethers } from "ethers";
import Token from "../../artifacts/CropFarm.json";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Menu(props) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const plants = [
    { name: "wheat", owned: 23, id: 1 },
    { name: "corn", owned: 5, id: 2 },
    { name: "potato", owned: 8, id: 3 },
    { name: "strawberry", owned: 11, id: 4 },
  ];

  async function checkOwned() {
    const contract = new ethers.Contract(tokenAddress, Token.abi, props.signer);
    for (let i = 1; i <= 12; i++) {
      console.log(await contract.balanceOf(props.userAccount, i));
    }
  }

  return (
    <>
      <Fade direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <MenuExpanded elevation={3}>
          <Grid container>
            {plants.map((plant) => (
              <Grid item lg={3} key={plant.name}>
                <button
                  onClick={() => {
                    props.setCropInt(plant.id);
                    setMenuOpen(false);
                  }}
                  className="px-6 py-6 rounded-xl bg-orange-400"
                >
                  {plant.name}
                </button>
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
          onClick={() => {
            setMenuOpen(false);
          }}
        />
      ) : (
        <Button
          variant="contained"
          label="Menu"
          onClick={() => {
            setMenuOpen(true);
            checkOwned();
          }}
        />
      )}
    </>
  );
}
