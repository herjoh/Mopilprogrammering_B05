

// Bruker skal ha mulighet til å sende inn en ny sak, og denne skal da lagres et sted.
// Akkurat nå kommer jeg til å jobbe med fake hardkodet data, men i fremtiden skal dette lagres i en database. 
// Dette CaseRegister skal ta imot informasjon i form av en skjema.
// Skjemaet skal ha like props som CaseItem, men det skal ikke ha en id eller createdAt, da dette skal genereres automatisk. Her kan omit brukes. 
// data-en skal lagres i en variabel, som for eksempel CaseData.

import type { CaseCategory, CaseSeverity, NewCase } from '@/constants/types';
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
        setError("kunne ikke lagre saken, Prøv igjen!")
    } 
    // Når en case har blitt sendt inn så resetes standard verdiene igjen
}
  return (
    <View>
        <TextInput style={styles.InputStyle} // Textinput er react-native sin type form
        value={CaseData.title}
        placeholder="Ovnen funker ikke..."      
        onChangeText={(text) => setCaseData({...CaseData, title: text})}                
        maxLength={30}                     
        />
        <TextInput style={styles.InputStyle}
        value={CaseData.description}
        placeholder="Ovnen funker ikke, og jeg har prøvd å skru den av og på igjen..."      
          onChangeText={(text) => setCaseData({ ...CaseData, description: text })}                     
        maxLength={200}                     
        />
        <Text>Velg en kategori:</Text>

        <Picker //Picker: Picker er react-native sin mulighet for dropdown meny 
            selectedValue={CaseData.category}
            onValueChange={(value) => setCaseData({...CaseData, category: value as CaseCategory})}
        >
            <Picker.Item label="vann" value="water" />
            <Picker.Item label="Elektrisitet" value="electricity" />
            <Picker.Item label="varme" value="heating" />
            <Picker.Item label="klage" value="complaint" />
            <Picker.Item label="annet" value="other" />
        </Picker>
        <Text>Velg alvorlighetsgrad:</Text>
        <Picker   
            selectedValue={CaseData.severity}
            onValueChange={(value) => setCaseData({...CaseData, severity: value as CaseSeverity})}>
            
            <Picker.Item label="lav" value="low" />
            <Picker.Item label="middels" value="medium" />
            <Picker.Item label="høy" value="high" />
            <Picker.Item label="akutt" value="urgent" />

        </Picker>
        {error && <Text>{error}</Text>}
        <Pressable onPress={() => handleSubmit()}>
            <Text>Send inn</Text>
        </Pressable> 
    </View> //Tilslutt, onPress vil kjøre handleSubmit som vil lagre data i en NewCase. På denne måten har CasePage tilgjengelig på ny dataen som sendes inn.
  );
} 

const styles = StyleSheet.create ({
    InputStyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        padding: 12
    }
})