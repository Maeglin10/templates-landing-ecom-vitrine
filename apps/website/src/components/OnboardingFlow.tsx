"use client";

import { useState } from "react";
import { palettes } from "@repo/config";

type OnboardingData = {
  projectType: string;
  businessType: string;
  paletteId: string;
  businessName: string;
  businessDescription: string;
  adminCount: number;
};

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    projectType: "vitrine",
    businessType: "",
    paletteId: "default",
    businessName: "",
    businessDescription: "",
    adminCount: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = 4;

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => setStep((s) => Math.min(totalSteps, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFinished(true);
    }, 1500);
  };

  if (isFinished) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-2xl font-bold">Génération terminée !</h2>
        <p className="text-muted-foreground text-lg">
          Votre projet <strong>{data.businessName}</strong> est en cours de création. Vous pourrez bientôt vous connecter à votre espace admin ou nous envoyer vos photos et logos.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto border rounded-xl shadow-lg bg-card text-card-foreground p-6 md:p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center text-sm font-medium mb-4">
          <span>Étape {step} sur {totalSteps}</span>
          <span className="text-primary">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
            <div>
              <h2 className="text-xl font-bold mb-2">Quel est votre type de projet ?</h2>
              <p className="text-muted-foreground text-sm mb-4">Choisissez le type de site web dont vous avez besoin.</p>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { id: "landing", label: "Landing Page", icon: "📄" },
                  { id: "vitrine", label: "Site Vitrine", icon: "🏢" },
                  { id: "ecommerce", label: "E-Commerce", icon: "🛍️" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateData({ projectType: type.id })}
                    className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
                      data.projectType === type.id 
                        ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2" 
                        : "hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span className="text-3xl mb-2">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Secteur d'activité</h2>
              <label className="block text-sm font-medium mb-2 opacity-80">Dans quel domaine exercez-vous ? (ex: Restauration, Tech, Mode...)</label>
              <input 
                type="text" 
                value={data.businessType}
                onChange={(e) => updateData({ businessType: e.target.value })}
                placeholder="Ex: Immobilier"
                className="w-full p-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
            <h2 className="text-xl font-bold mb-2">Parlez-nous de votre entreprise</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nom de l'entreprise</label>
              <input 
                type="text" 
                value={data.businessName}
                onChange={(e) => updateData({ businessName: e.target.value })}
                className="w-full p-3 bg-background border border-input rounded-md"
                placeholder="Mon Super Projet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description rapide</label>
              <textarea 
                value={data.businessDescription}
                onChange={(e) => updateData({ businessDescription: e.target.value })}
                className="w-full p-3 bg-background border border-input rounded-md h-32"
                placeholder="Décrivez votre activité en quelques mots..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nombre de comptes administrateurs nécessaires</label>
              <p className="text-xs text-muted-foreground mb-2">Pour gérer le site, le blog ou la boutique.</p>
              <input 
                type="number" 
                min="1"
                max="20"
                value={data.adminCount}
                onChange={(e) => updateData({ adminCount: parseInt(e.target.value) || 1 })}
                className="w-full p-3 bg-background border border-input rounded-md"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
            <h2 className="text-xl font-bold mb-2">Choisissez votre identité visuelle</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Sélectionnez une palette de couleurs. Ne vous inquiétez pas, vous pourrez la modifier plus tard.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
              {palettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => updateData({ paletteId: palette.id })}
                  className={`flex flex-col items-center p-3 border rounded-lg transition-all text-left w-full ${
                    data.paletteId === palette.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2"
                      : "hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <span className="font-medium text-sm w-full mb-3 truncate">{palette.name}</span>
                  <div className="flex w-full h-8 rounded-md overflow-hidden shadow-sm">
                    {/* Render primary, secondary and accent blocks using HSL format (we approximate by applying standard HSL styles if needed, but since our palettes use CSS variables formatted strings, we will just pass them as custom props, wait, let's just show standard preview colors, actually we have the HSL strings but inline styling HSL strings needs formatting. To keep it simple we'll just show some stylized blocks. Wait, our strings are "240 5.9% 10%", so we can use `hsl(${palette.colors.primary})`. */}
                    <div className="flex-1" style={{ backgroundColor: `hsl(${palette.colors.primary})` }}></div>
                    <div className="flex-1" style={{ backgroundColor: `hsl(${palette.colors.secondary})` }}></div>
                    <div className="flex-1" style={{ backgroundColor: `hsl(${palette.colors.accent})` }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
            <h2 className="text-xl font-bold mb-2">Récapitulatif & Génération</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Vérifiez vos informations avant de lancer la création. Vous pourrez ensuite nous envoyer vos ressources graphiques (photos, logo..).
            </p>

            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm gap-y-2">
                <div className="text-muted-foreground">Type de projet</div>
                <div className="font-medium capitalize">{data.projectType}</div>
                
                <div className="text-muted-foreground">Domaine</div>
                <div className="font-medium">{data.businessType || "-"}</div>

                <div className="text-muted-foreground">Nom d'entreprise</div>
                <div className="font-medium">{data.businessName || "-"}</div>

                <div className="text-muted-foreground">Palette choisie</div>
                <div className="font-medium">{palettes.find(p => p.id === data.paletteId)?.name || data.paletteId}</div>

                <div className="text-muted-foreground">Comptes admin</div>
                <div className="font-medium">{data.adminCount}</div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-sm text-primary-foreground">
              <p>Une fois le bouton cliqué, notre système génèrera la configuration initiale de votre espace. Vous recevrez des instructions par email pour fournir vos photos et contenus textes.</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between pt-6 border-t border-border">
        {step > 1 ? (
          <button 
            onClick={handleBack}
            className="px-6 py-2 rounded-md border border-input font-medium hover:bg-muted transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            Retour
          </button>
        ) : (
          <div></div> // Spacer
        )}

        {step < totalSteps ? (
          <button 
            onClick={handleNext}
            className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Continuer
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center min-w-[120px]"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : "Lancer la création"}
          </button>
        )}
      </div>
    </div>
  );
}
