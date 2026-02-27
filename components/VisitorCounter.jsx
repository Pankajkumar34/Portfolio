"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [stats, setStats] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie.includes("cookie_consent=true");

    if (!hasConsent) {
      setShowPopup(true);
    } else {
      loadVisitor();
    }
  }, []);

  const loadVisitor = async () => {
  try {
    const res = await fetch("/api/visit");
    if (!res.ok) {
      throw new Error("API Error");
    }

    const data = await res.json();
    // addData(data);
    setStats(data);
  } catch (error) {
    console.error("Visitor API Error:", error);
  }
};

  const handleAccept = () => {
    document.cookie =
      "cookie_consent=true; max-age=" + 60 * 60 * 24 * 180 + "; path=/";

    setShowPopup(false);
    loadVisitor();
  };

  const handleDecline = () => {
    document.cookie =
      "cookie_consent=false; max-age=" + 60 * 60 * 24 * 180 + "; path=/";

    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-white shadow-2xl rounded-2xl p-6 w-80 border border-gray-200 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2">🍪 Cookie Consent</h2>
            <p className="text-sm text-gray-600 mb-4">
              We use cookies to improve your experience.
            </p>

            <div className="flex justify-between">
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-gray-300 rounded-lg text-sm"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {stats && (
        <div className="text-center text-white mt-10">
          <p>👀 Total Visits: {stats.totalVisits}</p>
          <p>👤 Unique Visitors: {stats.uniqueVisitors}</p>
        </div>
      )} */}
    </>
  );
}