import React, { useState, useEffect, useCallback } from "react";
import { CircularProgress } from "@mui/material";
import api from "./services/api";
import topCells from "./assets/TOP.png";
import midCells from "./assets/MID.png";
import botCells from "./assets/BOT.png";
import {
  Container,
  Content,
  DescriptionTittle,
  Tittle,
  DescriptionText,
  ButtonRefresh,
} from "./styles";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});
  const [resultsMaps, setResultsMaps] = useState([]);

  const convertKelvinToCelsius = (temperature) => {
    const kelvin = 273.15;
    const result = Math.trunc(temperature - kelvin);
    return result;
  };

  const getLocationAttually = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          // callback de erro
          alert("Erro ao obter localização!");
          console.log("Erro ao obter localização.", error);
        }
      );
    } else {
      alert("Erro ao obter localização!");
    }
    const keyMaps = "AIzaSyBqoWRLTUg8_ijd6nFe8d3eEH_uch6j65A";
    const keyName = "0f948b34ca826394a9f82d2a2659abbc";

    if (latitude && longitude) {
      setLoading(true);

      await api
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${keyMaps}`
        )
        .then((response) => {
          if (response && response.data.results) {
            setResultsMaps(response.data.results);
          }
        })
        .finally(() => {
          setLoading(false);
        });

      await api
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyName}`
        )
        .then((response) => {
          if (response && response.data) {
            setResult(response.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    getLocationAttually();
  }, [getLocationAttually]);

  return (
    <React.Fragment>
      {/* <GlobalStyle /> */}
      <Container>
        <Content>
          <Tittle>Localização atual</Tittle>
          <DescriptionTittle>
            Latitude:
            {loading ? <CircularProgress size={20} /> : ` ${result.coord?.lat}`}
          </DescriptionTittle>
          <DescriptionTittle>
            Longitude:
            {loading ? <CircularProgress size={20} /> : ` ${result.coord?.lon}`}
          </DescriptionTittle>

          <DescriptionText>
            Cidade:
            {loading ? <CircularProgress size={20} /> : ` ${result.name}`}
          </DescriptionText>
          <DescriptionText>
            País:
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              ` ${result.sys?.country}`
            )}
          </DescriptionText>
          <DescriptionText>
            Temperatura:
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              ` ${convertKelvinToCelsius(result.main?.temp)}`
            )}
            {loading === false && "°C"}
          </DescriptionText>

          <div>
            <DescriptionText>
              N:
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                ` ${
                  resultsMaps.length > 0 &&
                  resultsMaps
                    .map((item) => item.address_components)[0]
                    .map((item) => item.long_name)
                    .join(" - ")
                }`
              )}
            </DescriptionText>
          </div>
          <ButtonRefresh
            variant="contained"
            style={{ marginLeft: 16, marginTop: 20 }}
            onClick={getLocationAttually}
          >
            Atualizar localização
          </ButtonRefresh>
        </Content>

        <div style={{ position: "absolute", top: 10 }}>
          <div
            style={{
              width: 300,
              height: 550,
              borderRadius: 50,
              zIndex: 1000,
              background: "black",
            }}
          ></div>
          <div style={{ position: "absolute", top: 5 }}>
            <img src={topCells} width={300} alt="top" />
          </div>
          <div style={{ position: "absolute", top: 40 }}>
            <img src={midCells} width={300} alt="mid" />
          </div>
          <div style={{ position: "absolute", top: 478, left: 2 }}>
            <img src={botCells} width={297} alt="bot" />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
