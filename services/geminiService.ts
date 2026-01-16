
import { GoogleGenAI, Type } from "@google/genai";
import { TravelWho, TravelStyle } from "../types";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private static ai = new GoogleGenAI({ apiKey: API_KEY });

  static async generateTripItinerary(
    destination: string,
    startDate: string,
    endDate: string,
    who: TravelWho,
    styles: TravelStyle[],
    budget?: number
  ) {
    const prompt = `Plan a high-quality travel itinerary for a trip to ${destination} from ${startDate} to ${endDate}. 
    Travelers: ${who}. Style: ${styles.join(", ")}. Budget: ${budget ? `$${budget}` : "flexible"}.
    Create a daily breakdown with 3 unique places per day (Morning, Afternoon, Evening). 
    Ensure places have realistic lat/lng coordinates near ${destination}.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  places: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        category: { type: Type.STRING },
                        description: { type: Type.STRING },
                        bestTime: { type: Type.STRING },
                        costEstimate: { type: Type.STRING },
                        lat: { type: Type.NUMBER },
                        lng: { type: Type.NUMBER },
                        timeSlot: { type: Type.STRING }
                      },
                      required: ["name", "category", "description", "lat", "lng"]
                    }
                  }
                },
                required: ["dayNumber", "title", "places"]
              }
            },
            realityCheck: {
              type: Type.OBJECT,
              properties: {
                seasonInfo: { type: Type.STRING },
                crowdLevel: { type: Type.STRING },
                budgetHint: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  }

  static async askAboutPlace(placeName: string, destination: string, question: string) {
    const prompt = `Regarding ${placeName} in ${destination}: ${question}. Provide a helpful, concise travel expert response.`;
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text;
  }
}
