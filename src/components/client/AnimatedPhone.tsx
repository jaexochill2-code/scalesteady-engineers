import React, { useState, useEffect } from "react";

export default function AnimatedPhone() {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    let isActive = true;

    const runSequence = () => {
      if (!isActive) return;
      setBeat(0);
      
      setTimeout(() => { if (isActive) setBeat(1); }, 1500);
      setTimeout(() => { if (isActive) setBeat(2); }, 3800);
      setTimeout(() => { if (isActive) setBeat(3); }, 6500);
      setTimeout(() => { if (isActive) setBeat(4); }, 11000);
      
      setTimeout(() => {
        if (isActive) runSequence();
      }, 11700);
    };

    // Wait a brief moment before starting to let the hero reveal
    setTimeout(() => {
      if (isActive) runSequence();
    }, 800);

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="phone-stage" style={{ perspective: "1200px" }}>
        {/* iPhone Shell */}
        <div className="phone-shell">
          {/* Dynamic Island */}
          <div className="island"></div>

          {/* Screen */}
          <div className="phone-screen-inner" id="phone-screen">
            {/* BEAT 0: Dark lock screen */}
            <div className="beat-0" style={{ opacity: beat < 4 ? 1 : 0, transition: "opacity 0.6s ease" }}>
              <div className="lockscreen-time">9:41</div>
              <div className="lockscreen-date">Tuesday, April 8</div>
            </div>

            {/* Notifications */}
            <div className="notif-stack">
              <div 
                className={`ios-notif ${beat >= 1 && beat < 4 ? 'is-visible' : ''}`}
                style={{ opacity: beat >= 4 ? 0 : '', transition: beat >= 4 ? "opacity 0.6s ease" : "" }}
              >
                <div className="notif-app-icon notif-icon-mail">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 8 5a2 2 0 0 0 4 0l8-5"/></svg>
                </div>
                <div className="notif-body">
                  <div className="notif-app">Outreach</div>
                  <div className="notif-title">New Inquiry: Mike's Roofing</div>
                  <div className="notif-msg">"Interested in your services. What does this look like?"</div>
                </div>
                <div className="notif-time">now</div>
              </div>

              <div 
                className={`ios-notif ${beat >= 2 && beat < 4 ? 'is-visible' : ''}`}
                style={{ opacity: beat >= 4 ? 0 : '', transition: beat >= 4 ? "opacity 0.6s ease" : "" }}
              >
                <div className="notif-app-icon notif-icon-reply">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                </div>
                <div className="notif-body">
                  <div className="notif-app">Outreach</div>
                  <div className="notif-title">Mike replied</div>
                  <div className="notif-msg">"Sounds great, what time works this week?"</div>
                </div>
                <div className="notif-time">1m ago</div>
              </div>
            </div>

            {/* Calendar Confirmation */}
            <div 
              className={`cal-confirmation ${beat >= 3 && beat < 4 ? 'is-visible' : ''}`}
              style={{ opacity: beat >= 4 ? 0 : '', transition: beat >= 4 ? "opacity 0.6s ease" : "" }}
            >
              <div className="cal-conf-header">
                <div className="cal-conf-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <span>Calendar</span>
              </div>
              <div className="cal-conf-dot-row">
                <span className="cal-conf-dot"></span>
                <span className="cal-conf-label">Discovery Call Booked</span>
              </div>
              <div className="cal-conf-event">
                <div className="cal-conf-name">Mike / Roofing Lead</div>
                <div className="cal-conf-time">Tue • 2:00 PM • 30 min</div>
                <div className="cal-conf-status">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  Confirmed
                </div>
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}
