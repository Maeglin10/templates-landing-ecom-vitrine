"use client";

export function CookiePreferences() {
  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    window.location.reload();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        onClick={handleAccept}
      >
        Tout accepter
      </button>
      <button 
        className="px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        onClick={handleDecline}
      >
        Tout refuser
      </button>
    </div>
  );
}
