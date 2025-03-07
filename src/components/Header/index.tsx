import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  AboutUser,
  Avatar,
  TextContainer,
  HelloMessage,
  BoldText,
  SecondaryMessage,
  AddButton,
  Icon,
  BackButton,
  Title,
} from "./styles";
import { View } from "react-native";

interface HeaderProps {
  user?: {
    name: string;
    avatar_url: string;
  };
}

export function Header({ user }: HeaderProps) {
  const { navigate, goBack } = useNavigation();

  function handleAddPass() {
    navigate("RegisterLoginData");
  }

  return (
    <Container
      hasUserData={!!user}
      style={{
        ...(user
          ? {
              backgroundColor: "#1967FB",
            }
          : {
              backgroundColor: "#FFFFFF",
            }),
      }}
    >
      {user ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <AboutUser>
            <Avatar source={{ uri: user.avatar_url }} />

            <TextContainer>
              <HelloMessage>
                Olá, <BoldText>{user.name}</BoldText>
              </HelloMessage>

              <SecondaryMessage>Sinta-se seguro aqui</SecondaryMessage>
            </TextContainer>
          </AboutUser>

          <AddButton onPress={handleAddPass}>
            <Icon name="plus" color="#FFFFFF" size={24} />
          </AddButton>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <BackButton onPress={goBack}>
            <Icon name="chevron-left" color="#1967FB" size={28} />
          </BackButton>

          <Title>Cadastro de senha</Title>
        </View>
      )}
    </Container>
  );
}
