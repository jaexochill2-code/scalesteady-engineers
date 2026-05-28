const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(
  "https://zjsnsihnbmtyklmtooda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqc25zaWhuYm10eWtsbXRvb2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjg5NzQ2NywiZXhwIjoyMDg4NDczNDY3fQ.YWwhLB7UUySTv4QbiV2bvtSJx_mjR5xMn_DnPPU9Wj0"
);

async function run() {
  // Step 1: Check if table exists
  const { data: check, error: checkErr } = await supabase
    .from("onboarding_submissions")
    .select("id")
    .limit(1);

  if (checkErr && checkErr.message.includes("Could not find")) {
    console.log("Table does NOT exist. Need to create via Supabase Dashboard SQL Editor.");
    console.log("Migration SQL file: onboarding_migration.sql");
    console.log("\nAttempting insert test to confirm...");
  } else if (checkErr) {
    console.log("Unexpected error:", checkErr.message);
  } else {
    console.log("Table EXISTS. Rows found:", check.length);
  }

  // Step 2: Try test insert anyway (will fail gracefully if table missing)
  const testPayload = {
    company_name: "E2E_TEST_PRACTICE",
    contact_name: "E2E Test",
    contact_details: "test@e2e.com",
    email_names: ["sarah", "mike", "jessica", "david", "rachel"],
    icp_description: "Target: desk workers 30-55\nObjection: cost concerns",
    brand_signature: "Voice: friendly\nServices: adjustments\nEdge: same-day\nPatient Words: changed my life",
    campaign_offer: "$49 first visit",
    core_deal_value: "Past Results: Facebook ads\nBest Win: Google listing\n90-Day Goals: 20 new patients/month",
    geographic_target: "",
    routing_destination: "Direct Calendar Link: https://cal.com/test",
  };

  const { data, error } = await supabase
    .from("onboarding_submissions")
    .insert([testPayload])
    .select("id");

  if (error) {
    console.log("\nINSERT FAILED:", error.message);
    console.log("Code:", error.code);
    console.log("Details:", error.details);
  } else {
    console.log("\nINSERT SUCCESS! ID:", data[0]?.id);
    // Clean up test row
    if (data[0]?.id) {
      await supabase.from("onboarding_submissions").delete().eq("id", data[0].id);
      console.log("Test row cleaned up.");
    }
  }
}

run().catch(console.error);
