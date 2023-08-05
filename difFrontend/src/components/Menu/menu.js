import React, { useState } from "react";
import { MenuExpanded } from "./styled";
import { Card, CardContent, Grid, Fade, Typography } from "@mui/material";
import Button from "../Button/button";
import { ethers } from "ethers";
import Token from "../../artifacts/CropFarm.json";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Menu(props) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [plants, setPlants] = useState([
    { name: "Wheat", owned: 0, id: 1 },
    { name: "Corn", owned: 0, id: 2 },
    { name: "Potato", owned: 0, id: 3 },
    { name: "Strawberry", owned: 0, id: 4 },
    { name: "Blueberry", owned: 0, id: 5 },
    { name: "Watermelon", owned: 0, id: 6 },
    { name: "Pumpkin", owned: 0, id: 7 },
    { name: "Lettuce", owned: 0, id: 8 },
    { name: "Tomato", owned: 0, id: 9 },
    { name: "Cauliflower", owned: 0, id: 10 },
    { name: "Eggplant", owned: 0, id: 11 },
    { name: "Carrot", owned: 0, id: 12 },
  ]);

  async function checkOwned() {
    const contract = new ethers.Contract(
      tokenAddress,
      Token.abi,
      props.provider
    );
    let temp = [...plants];
    for (let i = 0; i < 12; i++) {
      let amountOwned = Number(
        await contract.viewBalance(props.userAccount, i + 1, 0)
      );
      temp[i].owned = amountOwned;
    }
    setPlants(temp);
  }

  return (
    <>
      <Fade direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <MenuExpanded elevation={3}>
          <Grid container>
            {plants.map((plant) => (
              <Grid item xs={6} key={plant.id}>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      props.setCropInt(plant.id);
                      setMenuOpen(false);
                    }}
                    className="px-4 py-4 rounded-xl bg-green-600 text-sm border-black text-white hover:opacity-80"
                  >
                    {plant.name}
                  </button>
                </div>
                <Typography
                  textAlign="center"
                  variant="body2"
                  sx={{ marginTop: 1, marginBottom: 2 }}
                  centered
                >
                  Owned: {plant.owned}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </MenuExpanded>
      </Fade>
      {isMenuOpen ? (
        <div>
          <Button
            variant="outlined"
            label="Exit"
            onClick={() => {
              setMenuOpen(false);
            }}
          />
          <button
            className="absolute bottom-1 right-[225px] px-4 py-1 w-24 rounded-xl bg-white text-sm border-black border-[1px] text-black hover:opacity-80"
            onClick={async () => {
              const contract = new ethers.Contract(
                tokenAddress,
                Token.abi,
                props.signer
              );
              await contract.buyPlot();
            }}
          >
            Buy Plot
          </button>
        </div>
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
