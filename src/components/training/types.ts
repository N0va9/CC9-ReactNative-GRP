export interface BottomSheetProps {
    activeHeight: number;
    children: React.ReactNode;
    backgroundColor?: string;
    backDropColor?: string;
    blurIntensity?: number;
    blurTint?: 'light' | 'dark' | 'default';
}

export interface BottomSheetHandle {
    openSheet: () => void;
    closeSheet: () => void;
}

export type Civilite = 'M.' | 'Mme';
export type Statut = 'RH' | 'Salarie' | 'Particulier' | 'DemandeurEmploi' | 'Autre';

export interface InscriptionFormData {
    lieu: string | null;
    date: string | null;
    civilite: Civilite | null;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    statut: Statut | null;
    commentaires: string;
}

export const initialFormData: InscriptionFormData = {
    lieu: null,
    date: null,
    civilite: null,
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    statut: null,
    commentaires: '',
};