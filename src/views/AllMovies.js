import React, { useContext, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MovieSwippableItem from "../components/MovieSwippableItem";
import AppDataContext from "../contexts/AppData";
import LoadingModal from "../components/LoadingModal";
import api from "../api/api";
import TextInput from "../components/TextInput";

export default () => {
  const [isLoading, setLoadingState] = useState(false);
  const { allMovies, refreshData } = useContext(AppDataContext);
  const [search, setSearchText] = useState("");

  const submitSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <ScrollView>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <TextInput
            placeholder="Pesquisa"
            returnKeyType="search"
            onSubmitEditing={submitSearch}
            onChangeText={submitSearch}
          />
        </View>
        {allMovies.map((movie) => {
          if (
            !search ||
            !search.trim() ||
            movie.title.toLowerCase().search(search.toLowerCase()) !== -1
          ) {
            return (
              <MovieSwippableItem
                key={movie._id}
                movie={movie}
                onPress={() => {
                  api.delete(`/movies?_id=${movie._id}`).then(async () => {
                    setLoadingState(true);
                    await refreshData();
                    setLoadingState(false);
                  });
                }}
              />
            );
          }
        })}
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </View>
  );
};
