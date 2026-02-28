"use client";

import {  VisitorContext } from "@/context/visitor.contex";
import { useContext, useEffect, useState } from "react";

export default function VisitorCounter() {
    const {acceptCookie,data,rejectCookie,showPopup,setShowPopup} = useContext(VisitorContext);

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
                onClick={rejectCookie}
                className="px-4 py-2 bg-gray-300 rounded-lg text-sm"
              >
                Decline
              </button>
              <button
                onClick={acceptCookie}
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