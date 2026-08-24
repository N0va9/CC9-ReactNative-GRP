import { useLocalSearchParams, router } from "expo-router";
import { StyleSheet, Image, Pressable, View, ScrollView, ActivityIndicator, Button } from "react-native";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { catalogService } from '@/services/catalogService';
import { CatalogItemDetailed } from '@/types/CatalogItemDetailed';
import { useThemeColors } from '@/hooks/useThemeColors';
import { printDuration, printAudience, customSlice, printObjectives } from "@/utils/format";
import React, { useEffect } from 'react';
import { Card } from "@/components/Card";
import { TrainingSpec } from "@/components/training/TrainingSpec";
import { EmailLink } from "@/components/EmailLink";
import { TrainingSpecButton } from "@/components/training/TrainingSpecButton";


export default function FormationDetails() {
    const params = useLocalSearchParams<{ slug: string }>();
    const [details, setDetails] = React.useState<CatalogItemDetailed | null>(null);
    const [loading, setLoading] = React.useState(true);
    const colors = useThemeColors();

    useEffect(() => {
        const loadFormationDetails = async () => {
            try {
                const itemDetails = await catalogService.getItemDetails(params.slug);
                setDetails(itemDetails);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadFormationDetails();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color={colors.redCustom} />;
    }

    return (
        <RootView style={{ flex: 1 }}>
            <ScrollView>
                <Image
                    source={require("@/../assets/images/logo-dawan-only.png")}
                    style={styles.dawanLogo}
                    width={208}
                    height={208}
                />
                <Row style={styles.header}>
                    <Pressable onPress={router.back}>
                        <Row gap={8}>
                            <Image
                                source={require("@/../assets/images/back.png")}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: colors.redCustom
                                }}
                            />
                            <ThemedText color="redCustom" variant="headline" style={{ flexWrap: "wrap" }}>
                                Retour
                            </ThemedText>
                        </Row>
                    </Pressable>
                </Row>
                <Row>
                    <View style={[styles.bar, { backgroundColor: colors.redCustom }]} />
                    <ThemedText variant="formationTitle">Formation <ThemedText variant="formationTitle" style={{ color: colors.redCustom, fontStyle: "italic" }}>{details?.title}</ThemedText></ThemedText>
                </Row>
                <Row >
                    <View style={{zIndex: 999, flex: 1}}>
                    <TrainingSpecButton />

                    </View>
                </Row>
                <View style={styles.body}>
                    <Card style={styles.card}>
                        <ThemedText variant="subtitle1" style={{ color: colors.redCustom, textAlign: "center", paddingBottom: 20 }}>
                            A propos
                        </ThemedText>
                        <View style={{ paddingBottom: 10 }}>
                            <TrainingSpec title="Public" description={printAudience(details?.audience)} image={require("@/../assets/images/users.png")} />
                            <TrainingSpec title="Durée" description={printDuration(details?.duration)} image={require("@/../assets/images/clock.png")} />
                        </View>
                        <View style={{ borderStyle: 'solid', borderBottomWidth: 1, borderColor: colors.redCustom, paddingHorizontal: '20%' }}></View>
                        <View style={{ paddingTop: 20 }}>
                            <TrainingSpec title="Pré-requis" description={details?.prerequisites ?? 'Non défini'} color="redCustom" />
                            <TrainingSpec title="Objectifs" description={printObjectives(details?.objectives ?? 'Non défini')} color="redCustom" />
                            <TrainingSpec title="Sanction" description="Attestation de fin de formation mentionnant le résultat des acquis" color="yellowCustom" />
                            <TrainingSpec title="Référence" description={details?.reference ?? 'Non défini'} color="yellowCustom" />
                            <TrainingSpec
                                title="Accessibilité"
                                children={
                                    <ThemedText>
                                        Si vous êtes en situation de handicap, nous sommes en mesure de vous accueillir, n'hésitez pas à nous contacter à&#160;
                                        <EmailLink
                                            email="referenthandicap@dawan.fr"
                                            subject={`Demande d'information pour la formation ${customSlice(details?.title ?? 'Non défini', 30)}`}
                                            body={`Bonjour, je vous contacte aujourd'hui au sujet de la formation ${details?.title}.\n\nJ'aimerais savoir si cette formation accueille les personnes handicapés et les différentes mesures mises en place prévues pour cela.\n\nMerci d'avance.\n\nCordialement`} />
                                        , nous étudierons ensemble vos besoins
                                    </ThemedText>}
                                color="yellowCustom" />
                            <TrainingSpec title="Contact" children={<EmailLink email="commercial@dawan.fr" />} color="yellowCustom" />
                        </View>
                    </Card>
                </View>


            </ScrollView>
        </RootView>
    )
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: "space-between",
    },
    dawanLogo: {
        opacity: 0.1,
        position: "absolute",
        right: 1,
        top: 8
    },
    body: {
        marginTop: 20,
    },
    card: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center"
    },
    bar: {
        width: 4,
        height: "100%",
        marginRight: 14,
        marginLeft: 5
    },
    backdrop: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    }
})