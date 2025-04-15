import { SafeAreaView, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProfileScreen() {
  const userInfo = useSelector((state: RootState) => state.auth);

  return (
    <SafeAreaView>
      <Text>{userInfo.emailAddress}</Text>
      <Text>{userInfo.fullname}</Text>
    </SafeAreaView>
  );
}
