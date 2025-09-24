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
        paddingVertical: 16,
        backgroundColor: "#fff",
        elevation: 4, // shadow for Android
        shadowColor: "#000", // shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {/* Left - Menu Icon */}
      <TouchableOpacity onPress={onMenuPress}>
         <AppIcon type="Feather" name="menu" size={32} color="#000" />
      </TouchableOpacity>

      {/* Center - Username */}
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
        {username}
      </Text>

      {/* Right - Profile Icon */}
      <TouchableOpacity onPress={onProfilePress}>
               <AppIcon type="Ionicons" name="person-circle" size={44} color="#54c747"  />

      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
