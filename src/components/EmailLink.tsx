import { View, Pressable, Linking } from 'react-native';
import { ThemedText } from './ThemedText';

type Props = {
    email: string;
    subject?: string;
    body?: string;
    label?: string;
}

export function EmailLink({email, subject="Demande d'information", body="Bonjour,\n Je vous contacte aujourd'hui pour avoir des informations sur ...", label} : Props){
    const handlePress = async () => {
        const url = `mailto:${email}` + 
        `?subject=${encodeURIComponent(subject)}` + 
        `&body=${encodeURIComponent(body)}`;

        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
            await Linking.openURL(url)
        }
    }

    return (
        <ThemedText 
            onPress={handlePress} 
            variant="emailStyle" 
            style={{textDecorationLine: 'underline'}}>{label ?? email}
        </ThemedText>
    )
}