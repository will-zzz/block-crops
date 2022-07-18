import { styled, Button, Paper } from "@mui/material";

export const CustomizedButton = styled(Button)(
  ({ theme }) => `
        .MuiInputBase-input {
            font-size: 14px;
        }
        .MuiInputLabel-root {
            color: ${theme.palette.primary.main};
            font-size: 14px;
        }
        position: absolute;
        bottom: 25px;
        right: 25px;
        border-radius: 8px;
        min-width: 106px;
    `
);

export const MenuExpanded = styled(Paper)(
  ({ theme }) => `
        position: absolute;
        right: 15px;
        bottom: 15px;
        padding: 32px;
        width: 30vw;
        border-radius: 8px;
        .MuiGrid-container {
            width: 75%;
            .MuiGrid-item {
                margin: 10px;
                .MuiCardContent-root {
                    background-color: ${theme.palette.background.default};
                    color: #fff;
                    font-weight: 500;
                    text-align: center;
                }
            }
        }
    `
);
