"use server";

// This action is designed to integrate with Zoho CRM to create a new lead.

async function getZohoAccessToken() {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Zoho credentials in environment variables.");
  }

  // Exchange the Refresh Token for a new Access Token
  const response = await fetch(`https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`, {
    method: 'POST',
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    console.error("Zoho Token Refresh Error:", data);
    throw new Error("Failed to refresh Zoho access token.");
  }

  return data.access_token;
}

/**
 * Temporary test function to verify Zoho connectivity and token refresh logic.
 */
export async function testZohoConnection() {
  try {
    const token = await getZohoAccessToken();
    console.log("Successfully retrieved access token:", token.substring(0, 10) + "...");
    return { success: true, message: "Token refresh works!" };
  } catch (error: any) {
    console.error("Test Refresh Failed:", error.message);
    return { success: false, error: error.message };
  }
}

export async function createLeadInZoho(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!email) {
    return { success: false, error: "Email is required." };
  }

  // Zoho CRM requires a 'Last_Name' for a lead. We'll use the provided name,
  // or the company name, or fallback to the part of the email before the '@'.
  const lastName = name || company || email.split('@')[0];
  if (!lastName) {
    return { success: false, error: "A name, company, or email is required." };
  }

  const leadData = {
    data: [
      {
        "Last_Name": lastName,
        "Company": company,
        "Email": email,
        "Description": message,
      },
    ],
    "trigger": ["workflow"]
  };

  try {
    // Dynamically get a fresh access token using the refresh token
    const accessToken = await getZohoAccessToken();

    const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const responseData = await response.json();

    if (responseData.data && responseData.data[0].status === 'success') {
      return { success: true };
    } else {
      const errorDetails = responseData.data ? responseData.data[0] : responseData;
      console.error("Zoho API Error:", JSON.stringify(errorDetails, null, 2));
      return { success: false, error: "Failed to submit inquiry to CRM." };
    }
  } catch (error) {
    console.error("Error submitting to Zoho:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}