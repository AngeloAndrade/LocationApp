import styled from "styled-components";
import { Button } from "@mui/material";

export const ButtonRefresh = styled(Button)`
}`;

export const Container = styled.div`
  font-size: 14px;
  font-family: "museo", Helvetica Neue, Helvetica, sans-serif;
  background: linear-gradient(
      180deg,
      #ffffff -3.78%,
      rgba(206, 206, 206, 0.8) 96.22%
    )
    fixed;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  padding: 5px;
  border: 5px solid;
  max-width: 250px;
  height: 420px;
  z-index: 1200;
  background: white;
  position: absolute;
  top: 60px;
`;

export const Tittle = styled.h1`
  margin-left: 10px;
`;
export const DescriptionTittle = styled.h3`
  margin-left: 10px;
`;
export const DescriptionText = styled.h3`
  font-weight: bold;
  font-size: 15px;
  margin-left: 10px;
  font-family: "museo", Helvetica Neue, Helvetica, sans-serif;
`;
