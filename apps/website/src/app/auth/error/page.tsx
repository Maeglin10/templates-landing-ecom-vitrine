export default function AuthError() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Erreur d&apos;authentification</h1>
        <a href="/auth/login" className="text-stone-600 underline">Réessayer</a>
      </div>
    </main>
  );
}
