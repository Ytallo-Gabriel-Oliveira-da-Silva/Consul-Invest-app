import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const API_KEY = process.env.API_KEY;

export const initializeGemini = () => {
  if (!API_KEY) {
    console.warn("API Key not found for Gemini.");
    return;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  }
};

export const getChatSession = (): Chat => {
  if (!genAI) {
    initializeGemini();
  }
  
  if (!genAI) {
    throw new Error("Gemini AI not initialized. Check API Key.");
  }

  if (!chatSession) {
    chatSession = genAI.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é a "Consul AI", uma consultora financeira de elite dentro do aplicativo Consul Invest.
        
        Suas características:
        1. Respostas concisas, profissionais e tecnologicamente avançadas.
        2. Fale português do Brasil.
        3. Você não pode executar transações reais, apenas dar insights baseados em dados de mercado.
        4. O tom deve ser sofisticado, como um banqueiro privado misturado com um analista de dados de IA.
        5. Se o usuário perguntar sobre "Comprar" ou "Vender", lembre-o de fazer sua própria pesquisa (DYOR), mas forneça análise técnica básica.
        6. Use formatação Markdown para listas e negrito em valores importantes.
        `,
      },
    });
  }
  return chatSession;
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    const session = getChatSession();
    const result = await session.sendMessage({ message });
    return result.text || "Desculpe, não consegui processar a resposta.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Erro de conexão com a rede neural da Consul AI. Tente novamente.";
  }
};
