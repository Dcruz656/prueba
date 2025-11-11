
import { GoogleGenAI, Type } from "@google/genai";
import type { SearchStrategy } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateSearchStrategies(topic: string): Promise<SearchStrategy[]> {
  const prompt = `
    Eres un bibliotecario experto y estratega de investigación. Tu tarea es ayudar a los usuarios a transformar una idea general en estrategias de búsqueda precisas y accionables para entornos académicos y profesionales.

    Dado el tema del usuario, genera tres (3) estrategias de búsqueda distintas y complementarias. Cada estrategia debe tener un enfoque claro (ej: conceptual, contextual/geográfico, comparativo, histórico, de impacto, etc.).

    El resultado DEBE ser un array JSON válido que contenga tres objetos, sin texto introductorio, explicaciones adicionales o formato markdown. Todo el contenido de la respuesta JSON (títulos, descripciones, palabras clave, etc.) debe estar en español.

    Tema del usuario: "${topic}"
  `;

  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "Un título claro y conciso para la estrategia (ej. 'Estrategia Conceptual y Teórica').",
        },
        description: {
          type: Type.STRING,
          description: "Una breve explicación del enfoque y el objetivo de esta estrategia de búsqueda.",
        },
        keywords: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Una lista de palabras clave y sinónimos relevantes para esta estrategia.",
        },
        advancedQuery: {
          type: Type.STRING,
          description: "Un ejemplo de una consulta de búsqueda avanzada usando operadores booleanos (AND, OR, NOT), comillas para frases exactas y paréntesis para agrupar términos.",
        },
        recommendedSources: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Una lista de fuentes o plataformas recomendadas para esta estrategia (ej. 'Google Scholar', 'Scopus', 'Repositorios gubernamentales').",
        },
      },
      required: ['title', 'description', 'keywords', 'advancedQuery', 'recommendedSources'],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const strategies = JSON.parse(jsonText);
    return strategies as SearchStrategy[];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate strategies from AI.");
  }
}
