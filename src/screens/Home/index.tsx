import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import { LoginDataItem } from "../../components/LoginDataItem";

import {
  Container,
  Metadata,
  Title,
  TotalPassCount,
  LoginList,
} from "./styles";

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchText, setSearchText] = useState("");
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  async function loadData() {
    const dataKey = "@savepass:logins";
    // Get asyncStorage data, use setSearchListData and setData

    const data = await AsyncStorage.getItem(dataKey);

    if (data) {
      const dataFormatted = JSON.parse(data);

      setSearchListData(dataFormatted);
      setData(dataFormatted);
    }
  }

  function handleFilterLoginData() {
    // Filter results inside data, save with setSearchListData

    const searchData = searchListData.filter((data) => {
      if (data.service_name.includes(searchText)) {
        return data;
      }
    });
    setSearchListData(searchData);
  }

  function handleChangeInputText(text: string) {
    // Update searchText value
    setSearchText(text);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <>
      <Header
        user={{
          name: "Clerton Filho",
          avatar_url:
            "https://instagram.ffor27-1.fna.fbcdn.net/v/t51.2885-19/454510785_397736379998712_8145734099658330635_n.jpg?_nc_ht=instagram.ffor27-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2AGJI75RQrlaunkLPlQMyU1wtchXjmFPFfMNef-q3edzZZM-jWX-0BpOQAGnKHGIzI-orDcNBPjcKDmNIe9Tiu9J&_nc_ohc=NAf524yjfM8Q7kNvgGFvZ8B&_nc_gid=bf8baed5481348089cc5b4b6553ae63c&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYG4bn12fRZgHHI0PaX7V0oxRQR3MJLbP9tKTBg8hmpt7Q&oe=67D01006&_nc_sid=7a9f4b",
        }}
      />
      <Container>
        <SearchBar
          placeholder="Qual senha você procura?"
          onChangeText={handleChangeInputText}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}
          onSearchButtonPress={handleFilterLoginData}
        />

        <Metadata>
          <Title>Suas senhas</Title>
          <TotalPassCount>
            {searchListData.length
              ? `${`${searchListData.length}`.padStart(2, "0")} ao total`
              : "Nada a ser exibido"}
          </TotalPassCount>
        </Metadata>

        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          renderItem={({ item: loginData }) => {
            return (
              <LoginDataItem
                service_name={loginData.service_name}
                email={loginData.email}
                password={loginData.password}
              />
            );
          }}
        />
      </Container>
    </>
  );
}
