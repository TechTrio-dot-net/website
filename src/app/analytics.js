import { google } from "googleapis";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  try {
    const keyFile = path.resolve(process.cwd(), "path/to/your/service-account.json"); // Update path
    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const analytics = google.analyticsdata({ version: "v1beta", auth });

    const response = await analytics.properties.runReport({
      property: "properties/YOUR_PROPERTY_ID", // Replace with your GA4 property ID
      requestBody: {
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        dimensions: [{ name: "city" }],
        metrics: [{ name: "activeUsers" }],
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
