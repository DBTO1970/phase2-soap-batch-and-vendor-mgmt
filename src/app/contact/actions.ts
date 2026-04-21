"use server";

// This action is designed to integrate with Zoho CRM to create a new lead.

async function getZohoAccessToken() {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const region = process.env.ZOHO_REGION || "com"; // e.g., 'com', 'eu', 'in'

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Zoho credentials in environment variables.");
  }

  // Exchange the Refresh Token for a new Access Token
  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token'
  });

  const response = await fetch(`https://accounts.zoho.${region}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    console.error("Zoho Token Refresh Error:", data);
    throw new Error("Failed to refresh Zoho access token.");
  }

  return data.access_token;
}

/**
 * Extended test function to verify Zoho connectivity, token refresh, 
 * and Mail API access permissions.
 */
export async function testZohoConnection() {
  try {
    const token = await getZohoAccessToken();
    console.log("Successfully retrieved access token:", token.substring(0, 10) + "...");

    // Try to fetch account info to verify Mail scopes
    const accountId = await getZohoMailAccountId(token);
    console.log("Successfully retrieved Zoho Mail Account ID:", accountId);

    return { success: true, message: `Connected! Found Account ID: ${accountId}` };
  } catch (error: any) {
    console.error("Test Refresh Failed:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Helper to fetch the primary account ID for Zoho Mail.
 */
async function getZohoMailAccountId(accessToken: string) {
  const region = process.env.ZOHO_REGION || "com";
  const response = await fetch(`https://mail.zoho.${region}/api/accounts`, {
    headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` },
  });
  const data = await response.json();

  if (!response.ok) {
    console.error("Zoho Mail API Error Response:", data);
    throw new Error(`Zoho Mail API error (${response.status}): ${data.status?.description || data.message || "Unknown error"}`);
  }

  if (!data.data || data.data.length === 0) {
    throw new Error("No Zoho Mail accounts found for this user. Ensure the user has an active mailbox.");
  }

  return data.data[0].accountId;
}

/**
 * Sends a direct email notification via Zoho Mail API.
 * Requires the scope: ZohoMail.messages.CREATE
 */
async function sendEmailNotice(name: string, email: string, message: string, company: string) {
  try {
    const accessToken = await getZohoAccessToken();
    const accountId = await getZohoMailAccountId(accessToken);
    const region = process.env.ZOHO_REGION || "com";

    const emailBody = {
      // Note: fromAddress must be a verified alias or the primary address of your Zoho account
      fromAddress: "contact@morningritualsoap.com", 
      toAddress: "contact@morningritualsoap.com",
      subject: `New Contact Form Submission: ${name}`,
      content: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        
        Message:
        ${message}
      `,
      askReceipt: "no"
    };

    const response = await fetch(`https://mail.zoho.${region}/api/accounts/${accountId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to send email via Zoho Mail API:", error);
    return false;
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
    const region = process.env.ZOHO_REGION || "com";
    const crmDomain = region === "com" ? "zohoapis.com" : `zohoapis.${region}`;

    const response = await fetch(`https://www.${crmDomain}/crm/v2/Leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const responseData = await response.json();

    if (responseData.data && responseData.data[0].status === 'success') {
      // If lead creation succeeds, try to send the email notice directly
      await sendEmailNotice(name, email, message, company);
      return { success: true };
    } else {
      // Return detailed error message to help debugging
      const errorMsg = responseData.data?.[0]?.message || responseData.message || "Unknown Zoho Error";
      console.error("Zoho CRM API Error:", JSON.stringify(responseData, null, 2));
      return { success: false, error: `CRM Error: ${errorMsg}` };
    }
  } catch (error: any) {
    console.error("Error submitting to Zoho:", error.message);
    return { success: false, error: "An unexpected error occurred." };
  }
}