

// Bruker skal ha mulighet til å sende inn en ny sak, og denne skal da lagres et sted.
// Akkurat nå kommer jeg til å jobbe med fake hardkodet data, men i fremtiden skal dette lagres i en database. 
// Dette CaseRegister skal ta imot informasjon i form av en skjema.
// Skjemaet skal ha like props som CaseItem, men det skal ikke ha en id eller createdAt, da dette skal genereres automatisk. Her kan omit brukes. 
// data-en skal lagres i en variabel, som for eksempel CaseData.

import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import type { CaseCategory, CaseSeverity } from "./CaseItem";
import { CaseItemProps } from "./CaseItem";



export type NewCase = Omit<CaseItemProps, "id" | "createdAt" | "status"> ; // Lagd en type for en ny Case

interface CaseRegisterProps {
    onSubmit: (newCase: NewCase) => void; // Interface for å ta med typen med en onSubmit
}



export function CaseRegister({onSubmit}: CaseRegisterProps) {

// States med standardverdier

const [title, setTitle] = useState<string>(''); 
const [description, setDescription] = useState<string>('');
const [category, setCategory] = useState<CaseCategory>("complaint");
const [severity, setSeverity] = useState<CaseSeverity>("low");

// handleSubmit: Når en case blir trykket på, vil den lagre NewCase med propsene nedenfor

const handleSubmit = () => { 
    const newCase: NewCase = {
        title,
        description,
        category,
        severity
    };
    // Når en case har blitt sendt inn så resetes standard verdiene igjen
    onSubmit(newCase);
    setTitle(''); 
    setDescription('');
    setCategory("complaint");
    setSeverity("low");
};

  return (
    <View>
        <TextInput // Textinput er react-native sin type form
        value={title}
        placeholder="Ovnen funker ikke..."      
        onChangeText={setTitle}                       
        maxLength={30}                     
        />
        <TextInput
        value={description}
        placeholder="Ovnen funker ikke, og jeg har prøvd å skru den av og på igjen..."      
        onChangeText={setDescription}                       
        maxLength={200}                     
        />
        <Text>Velg en kategori:</Text>

        <Picker //Picker: Picker er react-native sin mulighet for dropdown meny 
            selectedValue={category}
            onValueChange={setCategory}
        >
            <Picker.Item label="vann" value="water" />
            <Picker.Item label="Elektrisitet" value="electricity" />
            <Picker.Item label="varme" value="heating" />
            <Picker.Item label="klage" value="complaint" />
            <Picker.Item label="annet" value="other" />
        </Picker>
        <Text>Velg alvorlighetsgrad:</Text>
        <Picker   
            selectedValue={severity}
            onValueChange={setSeverity}>
            
            <Picker.Item label="lav" value="low" />
            <Picker.Item label="middels" value="medium" />
            <Picker.Item label="høy" value="high" />
            <Picker.Item label="akutt" value="urgent" />

        </Picker>
        <Pressable onPress={() => handleSubmit()}>
            <Text>Send inn</Text>
        </Pressable> 
    </View> //Tilslutt, onPress vil kjøre handleSubmit som vil lagre data i en NewCase. På denne måten har CasePage tilgjengelig på ny dataen som sendes inn.
  );
} 