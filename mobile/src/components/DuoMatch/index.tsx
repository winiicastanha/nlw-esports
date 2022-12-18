import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({discord, onClose, ...rest }: Props) {
  const [isCoping, setIsCoping] = useState(false);
  
  async function handleCopyDiscordUserToClipboard() {
    setIsCoping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord Coopiado!', 'Usuário copiado para você colar no Discord e encontrar seu Duo!')
    setIsCoping(false);
  }

  
  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}
    >
         <View style={styles.container}>

          <View style={styles.content}>
            <TouchableOpacity 
              style={styles.closeIcon}
              onPress={onClose}
            >
              <MaterialIcons 
                name='close'
                size={20}
                color={THEME.COLORS.CAPTION_500}
              />
            </TouchableOpacity>

            <MaterialIcons 
              name='check-circle'
              size={64}
              color={THEME.COLORS.SUCCESS}
            />
            
            <Heading
              title="Let's Play!"
              subtitle='Agora é só começar a jogar!'
              style={{alignItems: 'center', marginTop: 24}}
            />

            <Text style={styles.label}>
              Adicione no Discord
            </Text>

            <TouchableOpacity
              style={styles.discordButton}
              onPress={handleCopyDiscordUserToClipboard}
              disabled={isCoping}
            >
              <Text style={styles.discord} >
                  {isCoping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
              </Text>

            </TouchableOpacity>
          </View>
        </View>
    </Modal>
  );
}