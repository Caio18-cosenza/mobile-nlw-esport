import { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';

import Logo from '../../assets/logo-nlw-esports.png';

export default function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const { navigate } = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigate('game', {
      id,
      title,
      bannerUrl,
    });
  }

  useEffect(() => {
    fetch('http://192.168.100.41:8080/games').then((res) =>
      res.json().then((json) => setGames(json))
    );
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Heading
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
