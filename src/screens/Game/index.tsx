import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import Logo from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

interface RoutesProps {
  id: string;
  title: string;
  bannerUrl: string;
}

export default function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { id, title, bannerUrl } = params as RoutesProps;

  useEffect(() => {
    fetch(`http://192.168.100.41:8080/games/${id}/ads`).then((res) =>
      res.json().then((json) => setDuos(json))
    );
  }, []);

  function handleGoBack() {
    goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.100.41:8080/ads/${adsId}/discord`).then((res) =>
      res.json().then((json) => setDiscordDuoSelected(json.discord))
    );
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={Logo} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <Image
            source={{ uri: bannerUrl }}
            style={styles.cover}
            resizeMode='cover'
            resizeMethod='resize'
          />
          <Heading title={title} subtitle='Conecte-se e comece a jogar!' />

          <FlatList
            data={duos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.contentList, {}]}
            style={styles.containerList}
            ListEmptyComponent={() => {
              return (
                <Text style={styles.emptyListText}>
                  {' '}
                  Não há anúncios publicados ainda{' '}
                </Text>
              );
            }}
          />
        </ScrollView>

        <DuoMatch
          onClose={() => setDiscordDuoSelected('')}
          discord={discordDuoSelected}
          visible={discordDuoSelected.length > 0}
        />
      </SafeAreaView>
    </Background>
  );
}
