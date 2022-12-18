import { Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';

import { styles } from './styles';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]); 

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() => {
    fetch('http://192.168.1.105:3333/games')
    .then(response => response.json())
    .then(data => setGames(data[0]))
  }, []);

  return (

    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Econtre seu duo"
          subtitle="Selecione o que deseja jogar..."
        />

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}  //se a função tem paramentro, usar () =>
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}