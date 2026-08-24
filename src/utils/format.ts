export function customSlice(str: string, maxLength: number) {
    if (str == null) {
        return "Cliquez pour + de détails..."
    }
    if (str.length <= maxLength) {
        return str;
    }

    const cut = str.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");

    return (lastSpace === -1 ? cut : cut.slice(0, lastSpace)) + "...";
}

export function printAudience(audience : string = "Tous"){
    return `${audience}`;
}

export function printDuration(days : string = "Non défini"){
    if (days == "Non défini") return "Non défini";
    return `${days} jour${(Number(days) > 1)? 's':''}`;
}

export function printObjectives(objectives: string) {
    // Si on voit des tirets dans les objectifs, on le formate proprement
    const listObjectives = objectives.split(" - ");

    // Généralement, le premier tiret est manquant 
    return (listObjectives.length > 1 ? ([""].concat(listObjectives)).join("\n- ") : objectives);
}