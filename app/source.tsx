import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const Source = () => {
  const sheetRef = useRef<BottomSheet>(null);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChange = useCallback((index:any) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index:any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const renderItem = useCallback(
    (item:any) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  



  return (
    <View style={styles.container}>
      {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} /> */}
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={true}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

export default Source

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});