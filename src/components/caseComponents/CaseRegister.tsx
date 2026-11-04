

// Bruker skal ha mulighet til å sende inn en ny sak, og denne skal da lagres et sted.
// Akkurat nå kommer jeg til å jobbe med fake hardkodet data, men i fremtiden skal dette lagres i en database. 
// Dette CaseRegister skal ta imot informasjon i form av en skjema.
// Skjemaet skal ha like props som CaseItem, men det skal ikke ha en id eller createdAt, da dette skal genereres automatisk. Her kan omit brukes. 
// data-en skal lagres i en variabel, som for eksempel CaseData.

import { Theme, useTheme } from '@/components/ui/theme/themeProvider';
import { useStyles } from '@/components/ui/theme/useStyles';
import type { CaseCategory, CaseSeverity, NewCase } from '@/types/types';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



// Lagd en type for en ny Case

interface CaseRegisterProps {
    onSubmit: (newCase: NewCase) => Promise<void>; // Interface for å ta med typen med en onSubmit
}

const initialCase: NewCase = {
    title: '',
    description: '',
    category: 'complaint',
    severity: 'low',
    propertyId: '',
    tenantId: ''
    }



export function CaseRegister({onSubmit}: CaseRegisterProps) {

const { colors } = useTheme();
const styles = useStyles(makeStyles);

// States med standardverdier
// Å gjøre:  Lage et objekt for alle states.

const [CaseData, setCaseData] = useState<NewCase>(initialCase)

const [error, setError] = useState<string | null>(null);
// handleSubmit: Når en case blir trykket på, vil den lagre NewCase med propsene nedenfor

const handleSubmit = async () => { 
    if (CaseData.title.trim() === "") {
        setError("Tittel kan ikke være tom");
        return;   
    }

    if(CaseData.description.trim() === "") {
        setError("Beskrivelse kan ikke være tom")
        return;
    }
    try {
    await onSubmit(CaseData)
    setCaseData(initialCase) 
    setError(null) 
    }
    catch (e) {
        setError(e instanceof Error ? e.message : "kunne ikke lagre saken, Prøv igjen!")
    } 
    // Når en case har blitt sendt inn så resetes standard verdiene igjen
}
  return (
    <View style={styles.container}>
        <Text style={styles.label}>Skriv inn Tittel</Text>
        <TextInput style={styles.InputStyle} placeholderTextColor={colors.textMuted} // Textinput er react-native sin type form
        value={CaseData.title}
        placeholder="Ovnen funker ikke..."      
        onChangeText={(text) => setCaseData({...CaseData, title: text})}                
        maxLength={30}                     
        />
        <Text style={styles.label}>Skriv inn beskrivelse:</Text>
        <TextInput style={styles.InputStyle} placeholderTextColor={colors.textMuted}
        value={CaseData.description}
        placeholder="Ovnen funker ikke, og jeg har prøvd å skru den av og på igjen..."      
          onChangeText={(text) => setCaseData({ ...CaseData, description: text })}                     
        maxLength={200}                     
        />
        <Text style={styles.label}>Velg en kategori:</Text>

        <Picker style={styles.picker}//Picker: Picker er react-native sin mulighet for dropdown meny 
            selectedValue={CaseData.category}
            onValueChange={(value) => setCaseData({...CaseData, category: value as CaseCategory})}
        >
            <Picker.Item label="vann" value="water" />
            <Picker.Item label="Elektrisitet" value="electricity" />
            <Picker.Item label="varme" value="heating" />
            <Picker.Item label="klage" value="complaint" />
            <Picker.Item label="annet" value="other" />
        </Picker>
        <Text style={styles.label}>Velg alvorlighetsgrad:</Text>
        <Picker style={styles.picker} 
            selectedValue={CaseData.severity}
            onValueChange={(value) => setCaseData({...CaseData, severity: value as CaseSeverity})}>
            
            <Picker.Item label="lav" value="low" />
            <Picker.Item label="middels" value="medium" />
            <Picker.Item label="høy" value="high" />
            <Picker.Item label="akutt" value="urgent" />

        </Picker>
        {error && <Text style={styles.error}>{error}</Text>}
        <Pressable style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Send inn</Text>
        </Pressable> 
    </View> //Tilslutt, onPress vil kjøre handleSubmit som vil lagre data i en NewCase. På denne måten har CasePage tilgjengelig på ny dataen som sendes inn.
  );
} 

const makeStyles = ({ colors, spacing, radii, fontSizes }: Theme) => StyleSheet.create ({
    container: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radii.md,
        marginBottom: spacing.md
    },
    InputStyle: {
        backgroundColor: colors.background,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.secondaryTint,
        color: colors.text,
        padding: spacing.sm,
        marginBottom: spacing.sm
    },
    label: {
        fontSize: fontSizes.sm,
        fontWeight: "600",
        color: colors.textMuted
    },
    picker: {
        backgroundColor: colors.background,
        color: colors.text,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.secondaryTint,
        gap: spacing.sm,
        marginBottom: spacing.sm,
        fontSize: fontSizes.sm,
    },
    error: {
        color: colors.danger,
        marginBottom: spacing.sm
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: radii.md,
        alignItems: "center",
        marginBottom: spacing.md
    },
    buttonText: {
        color: colors.surface,
        fontSize: fontSizes.md,
        fontWeight: "600"
    }
})