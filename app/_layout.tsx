import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
    >
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
            headerTitle: "Art Gallery",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </Provider>
    </ClerkProvider>
  );
}
