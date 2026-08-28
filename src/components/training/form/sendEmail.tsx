// components/training/sendInscriptionEmail.ts
import { InscriptionFormData } from '@/components/training/types';

const EMAILJS_SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY!;
const EMAIL_DEVIS = process.env.EXPO_PUBLIC_EMAIL_DEVIS!;

export async function sendEmail(data: InscriptionFormData, formationName: string) {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
                formation: formationName || '-',
                lieu: data.lieu,
                date: data.date,
                civilite: data.civilite,
                nom: data.nom,
                prenom: data.prenom,
                email: data.email,
                email_devis: EMAIL_DEVIS,
                telephone: data.telephone || '-',
                statut: data.statut,
                commentaires: data.commentaires || '-',
            },
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Échec de l'envoi (${response.status}) : ${errorText}`);
    }
}