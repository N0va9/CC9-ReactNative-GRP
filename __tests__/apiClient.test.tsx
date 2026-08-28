import { apiClient } from '../src/services/apiClient';

describe("Récupération données API", () => {
    // Avant chaque test, on remplace global.fetch par une fonction mockée
    beforeEach(() => {
        global.fetch = jest.fn();
    })

    // Nettoyage pour éviter les effets de bord
    afterEach(()=>{
        jest.restoreAllMocks();
    })


    it("Retourne les données si succès", async() => {
        // Données fictives que l'API renvoie
        const mockData = {id: 1, name: "Python Initiation"};

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status:200,
            json: async () => mockData
        });
        
        // On appelle notre apiClient avec une URL fictive
        const result = await apiClient.get("https://api.example.com/formation/1");
        
        // On compare le résultat aux données mockées
        expect(result).toEqual(mockData);

        // Vérification que le fetch utilise la bonne URL et les bonnes options
        expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/formation/1", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    });

    it("Erreur si réponse HTTP non OK", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok:false,
            status:404,
        });
        await expect(apiClient.get("https://api.example.com/notfound")).rejects.toThrow(`Erreur HTTP : 404`);
    });

    it("Gestion erreur réseau", async () => {
        // Simulation d'une erreur réseau (pas de connexion, DNS, etc)
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erreur réseau'));

        // ON vérifié que l'erreur est bien donnée par apiClient.get
        await expect(apiClient.get("https://api.example.com/offline")).rejects.toThrow('Erreur réseau');
    });
        
});