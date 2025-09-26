import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AppIcon from "../AppIcon";

const CustomHeader = ({ username, onMenuPress, onProfilePress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === "android" ? 15 : 20,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
      }}
    >
      {/* Left - Menu Icon */}
      <TouchableOpacity onPress={onMenuPress}>
         <AppIcon type="Feather" name="menu" size={28} color="#000" />
      </TouchableOpacity>

      {/* Center - Username */}
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
        {username}
      </Text>

      {/* Right - Profile Icon */}
      <TouchableOpacity onPress={onProfilePress}>
               <AppIcon type="Ionicons" name="person-circle" size={32} color="#54c747"  />

      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
